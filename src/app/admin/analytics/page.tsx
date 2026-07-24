import dbConnect from "@/lib/mongodb";
import SiteVisit from "@/models/SiteVisit";
import { format, subDays } from "date-fns";
import AnalyticsCharts from "./AnalyticsCharts";

export const metadata = {
  title: "Analytics | Workspace",
};

export default async function AnalyticsPage() {
  await dbConnect();
  
  const thirtyDaysAgo = subDays(new Date(), 30);
  
  // Exclude bots for clean analytics
  const visits = await SiteVisit.find({ 
    createdAt: { $gte: thirtyDaysAgo },
    isBot: { $ne: true } 
  }).lean();

  // Basic counters
  const totalVisits = visits.length;
  const uniqueIPs = new Set(visits.map(v => v.ip)).size;
  const mobileVisits = visits.filter(v => v.device === 'mobile').length;
  const mobilePercent = totalVisits > 0 ? Math.round((mobileVisits / totalVisits) * 100) : 0;
  
  // Count Conversions
  const conversions = visits.filter(v => v.eventName).length;

  // Aggregate Data
  const dailyData: Record<string, number> = {};
  const countryData: Record<string, number> = {};
  const deviceData = { mobile: 0, desktop: 0, tablet: 0 };
  const osData: Record<string, number> = {};
  const referrerData: Record<string, number> = {};
  const pageData: Record<string, number> = {};
  const hourData: Record<string, number> = {}; // 0 to 23

  for (let i = 29; i >= 0; i--) {
    dailyData[format(subDays(new Date(), i), 'MMM dd')] = 0;
  }
  for(let i = 0; i < 24; i++) {
    hourData[i.toString().padStart(2, '0') + ":00"] = 0;
  }

  visits.forEach((v: any) => {
    const day = format(new Date(v.createdAt), 'MMM dd');
    const hour = format(new Date(v.createdAt), 'HH:00');
    
    if (dailyData[day] !== undefined) dailyData[day]++;
    if (hourData[hour] !== undefined) hourData[hour]++;
    
    countryData[v.country] = (countryData[v.country] || 0) + 1;
    osData[v.os || 'Unknown'] = (osData[v.os || 'Unknown'] || 0) + 1;
    
    let ref = 'Direct';
    try {
      ref = (v.referrer && v.referrer !== 'Unknown' && v.referrer !== 'Direct') ? new URL(v.referrer).hostname : 'Direct';
    } catch(e) {}
    referrerData[ref] = (referrerData[ref] || 0) + 1;
    
    pageData[v.path] = (pageData[v.path] || 0) + 1;

    if (v.device === 'mobile') deviceData.mobile++;
    else if (v.device === 'tablet') deviceData.tablet++;
    else deviceData.desktop++;
  });

  const chartData = Object.keys(dailyData).map(date => ({
    date,
    visits: dailyData[date]
  }));
  
  const hourChartData = Object.keys(hourData).map(hour => ({
    hour,
    visits: hourData[hour]
  }));

  const topCountries = Object.entries(countryData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));
    
  const topPages = Object.entries(pageData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));

  const topReferrers = Object.entries(referrerData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));
    
  const osList = Object.entries(osData)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-serif text-white tracking-tight">Advanced Analytics</h1>
        <p className="text-slate-400 mt-2">Executive dashboard with traffic sources, device profiling, and conversions (Last 30 days).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0095f6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-sm font-medium text-slate-400 mb-1">Total Visits</p>
          <p className="text-4xl font-bold text-white font-serif">{totalVisits.toLocaleString()}</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-sm font-medium text-slate-400 mb-1">Unique Visitors</p>
          <p className="text-4xl font-bold text-white font-serif">{uniqueIPs.toLocaleString()}</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-sm font-medium text-slate-400 mb-1">Mobile Traffic</p>
          <p className="text-4xl font-bold text-white font-serif">{mobilePercent}%</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-sm font-medium text-slate-400 mb-1">CTA Conversions</p>
          <p className="text-4xl font-bold text-white font-serif">{conversions.toLocaleString()}</p>
        </div>
      </div>

      <AnalyticsCharts 
        chartData={chartData} 
        topCountries={topCountries} 
        deviceData={deviceData} 
        hourChartData={hourChartData}
        topPages={topPages}
        topReferrers={topReferrers}
        osList={osList}
      />
    </div>
  );
}
