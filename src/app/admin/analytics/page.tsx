import dbConnect from "@/lib/mongodb";
import SiteVisit from "@/models/SiteVisit";
import { format, subDays, startOfDay } from "date-fns";
import AnalyticsCharts from "./AnalyticsCharts";

export const metadata = {
  title: "Analytics | Workspace",
};

export default async function AnalyticsPage() {
  await dbConnect();
  
  const thirtyDaysAgo = subDays(startOfDay(new Date()), 30);
  
  // Exclude bots for clean analytics
  const visits = await SiteVisit.find({ 
    createdAt: { $gte: thirtyDaysAgo },
    isBot: { $ne: true } 
  }).sort({ createdAt: 1 }).lean(); // Ensure sorted by time for session logic

  const safeDecode = (val: string | undefined | null) => {
    if (!val || val === 'Unknown') return 'Unknown';
    try { return decodeURIComponent(val); } catch (e) { return val; }
  };

  // 1. Group into Sessions (by IP + Day)
  const sessionsMap = new Map<string, any[]>();
  visits.forEach((v: any) => {
    const day = format(new Date(v.createdAt), 'yyyy-MM-dd');
    const key = `${v.ip}-${day}`;
    if (!sessionsMap.has(key)) sessionsMap.set(key, []);
    sessionsMap.get(key)!.push(v);
  });

  const allSessions = Array.from(sessionsMap.values());
  const totalSessions = allSessions.length;
  
  // Calculate Users
  const uniqueUsers = new Set(visits.map(v => v.ip)).size;
  const totalVisits = visits.length;

  let totalBounceCount = 0;
  let totalTimeOnSiteNonBounces = 0;
  let nonBounceCount = 0;

  // Data maps
  const dailyData = new Map<string, { pageviews: number, users: Set<string>, sessions: number, time: number, nonBounces: number, bounces: number }>();
  const landingPages = new Map<string, { sessions: number, users: Set<string>, bounces: number, time: number, nonBounces: number }>();
  const exitPages = new Map<string, number>();
  const referrers = new Map<string, { sessions: number, users: Set<string> }>();
  const countries = new Map<string, { sessions: number, users: Set<string>, pageviews: number, bounces: number, time: number, nonBounces: number }>();
  const devices = { mobile: 0, desktop: 0, tablet: 0 };
  
  // Initialize daily data
  for (let i = 29; i >= 0; i--) {
    dailyData.set(format(subDays(new Date(), i), 'MMM dd'), { pageviews: 0, users: new Set(), sessions: 0, time: 0, nonBounces: 0, bounces: 0 });
  }

  // Iterate over sessions to calculate session-level metrics
  allSessions.forEach(sessionVisits => {
    const firstVisit = sessionVisits[0];
    const lastVisit = sessionVisits[sessionVisits.length - 1];
    const isBounce = sessionVisits.length === 1;
    const timeOnSite = isBounce ? 0 : (new Date(lastVisit.createdAt).getTime() - new Date(firstVisit.createdAt).getTime()) / 1000; // in seconds
    
    if (isBounce) totalBounceCount++;
    else {
      totalTimeOnSiteNonBounces += timeOnSite;
      nonBounceCount++;
    }

    const day = format(new Date(firstVisit.createdAt), 'MMM dd');
    const ip = firstVisit.ip;
    const landingPath = firstVisit.path || '/';
    const exitPath = lastVisit.path || '/';
    const country = safeDecode(firstVisit.country);
    
    let ref = 'Direct';
    try {
      ref = (firstVisit.referrer && firstVisit.referrer !== 'Unknown' && firstVisit.referrer !== 'Direct') ? new URL(firstVisit.referrer).hostname : 'Direct';
    } catch(e) {}

    // Daily Stats
    if (dailyData.has(day)) {
      const d = dailyData.get(day)!;
      d.sessions++;
      d.users.add(ip);
      d.pageviews += sessionVisits.length;
      if (isBounce) d.bounces++;
      else { d.nonBounces++; d.time += timeOnSite; }
    }

    // Landing Pages
    if (!landingPages.has(landingPath)) landingPages.set(landingPath, { sessions: 0, users: new Set(), bounces: 0, time: 0, nonBounces: 0 });
    const lp = landingPages.get(landingPath)!;
    lp.sessions++;
    lp.users.add(ip);
    if (isBounce) lp.bounces++;
    else { lp.nonBounces++; lp.time += timeOnSite; }

    // Exit Pages
    exitPages.set(exitPath, (exitPages.get(exitPath) || 0) + 1);

    // Referrers
    if (!referrers.has(ref)) referrers.set(ref, { sessions: 0, users: new Set() });
    const r = referrers.get(ref)!;
    r.sessions++;
    r.users.add(ip);

    // Countries
    if (!countries.has(country)) countries.set(country, { sessions: 0, users: new Set(), pageviews: 0, bounces: 0, time: 0, nonBounces: 0 });
    const c = countries.get(country)!;
    c.sessions++;
    c.users.add(ip);
    c.pageviews += sessionVisits.length;
    if (isBounce) c.bounces++;
    else { c.nonBounces++; c.time += timeOnSite; }

    // Devices
    if (firstVisit.device === 'mobile') devices.mobile++;
    else if (firstVisit.device === 'tablet') devices.tablet++;
    else devices.desktop++;
  });

  // Format Time Function
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Prepare Chart Data
  const chartData = Array.from(dailyData.entries()).map(([date, data]) => ({
    date,
    pageviews: data.pageviews,
    sessions: data.sessions,
    users: data.users.size,
    bounceRate: data.sessions > 0 ? Number(((data.bounces / data.sessions) * 100).toFixed(2)) : 0,
    timeOnSite: data.nonBounces > 0 ? Number((data.time / data.nonBounces).toFixed(0)) : 0
  }));

  const topLandingPages = Array.from(landingPages.entries())
    .map(([path, data]) => ({
      path,
      sessions: data.sessions,
      users: data.users.size,
      bounceRate: data.sessions > 0 ? ((data.bounces / data.sessions) * 100).toFixed(2) : "0.00",
      timeOnSite: formatTime(data.nonBounces > 0 ? data.time / data.nonBounces : 0),
      timeSeconds: data.nonBounces > 0 ? data.time / data.nonBounces : 0
    }))
    .sort((a, b) => b.sessions - a.sessions);

  const topExitPages = Array.from(exitPages.entries())
    .map(([path, value]) => ({ name: path, value }))
    .sort((a, b) => b.value - a.value);

  const topReferrers = Array.from(referrers.entries())
    .map(([name, data]) => ({ name, value: data.sessions, users: data.users.size }))
    .sort((a, b) => b.value - a.value);

  const topCountries = Array.from(countries.entries())
    .map(([name, data]) => ({
      name,
      sessions: data.sessions,
      users: data.users.size,
      pageviews: data.pageviews,
    }))
    .sort((a, b) => b.sessions - a.sessions);

  const avgBounceRate = totalSessions > 0 ? ((totalBounceCount / totalSessions) * 100).toFixed(2) : "0.00";
  const avgTimeOnSite = formatTime(nonBounceCount > 0 ? totalTimeOnSiteNonBounces / nonBounceCount : 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-[1600px] mx-auto p-2">
      <div>
        <h1 className="text-3xl font-bold font-serif text-white tracking-tight">Advanced Analytics</h1>
        <p className="text-slate-400 mt-2">Comprehensive session-based analytics over the last 30 days.</p>
      </div>

      <AnalyticsCharts 
        chartData={chartData} 
        topCountries={topCountries} 
        landingPages={topLandingPages}
        exitPages={topExitPages}
        deviceData={devices} 
        topReferrers={topReferrers}
        kpis={{
          sessions: totalSessions,
          users: uniqueUsers,
          pageviews: totalVisits,
          bounceRate: avgBounceRate,
          timeOnSite: avgTimeOnSite
        }}
      />
    </div>
  );
}
