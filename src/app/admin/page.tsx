import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import News from "@/models/News";
import Testimonial from "@/models/Testimonial";
import User from "@/models/User";
import { Briefcase, Newspaper, MessageSquareQuote, Users, LineChart, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Overview | Workspace",
};

export default async function AdminDashboard() {
  await dbConnect();
  
  const [
    servicesCount, 
    newsCount, 
    testimonialsCount, 
    usersCount,
  ] = await Promise.all([
    Service.countDocuments(),
    News.countDocuments(),
    Testimonial.countDocuments(),
    User.countDocuments(),
  ]);

  const stats = [
    { name: 'Total Services', value: servicesCount, icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', href: '/admin/services' },
    { name: 'Active Testimonials', value: testimonialsCount, icon: MessageSquareQuote, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', href: '/admin/testimonials' },
    { name: 'Published News', value: newsCount, icon: Newspaper, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', href: '/admin/news' },
    { name: 'System Users', value: usersCount, icon: Users, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20', href: '/admin/users' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold text-white font-serif tracking-tight">Overview</h1>
        <p className="mt-2 text-slate-400 text-sm">Welcome back to the Tidy & Klean Workspace. Manage your business data.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <Link key={item.name} href={item.href} className="bg-slate-900/50 backdrop-blur-sm overflow-hidden rounded-2xl border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-all duration-300 group shadow-lg shadow-black/20 hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`${item.bg} ${item.border} border rounded-xl p-3`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.name}</dt>
                    <dd>
                      <div className="text-3xl font-black text-white mt-1 font-serif">{item.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/80 px-6 py-4 border-t border-slate-800/50 group-hover:bg-slate-800/80 transition-colors">
              <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
                <span>Manage Module</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-white transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800 p-8 shadow-lg shadow-black/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#0095f6]/10 rounded-full blur-3xl group-hover:bg-[#0095f6]/20 transition-colors duration-500"></div>
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center">
              <div className="bg-[#0095f6]/10 p-2.5 rounded-lg border border-[#0095f6]/20 mr-4">
                <LineChart className="w-5 h-5 text-[#0095f6]" />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">Executive Analytics</h2>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-8 relative z-10">
            Monitor real-time traffic, identify top performing regions, and gain actionable insights for your marketing and financial strategies.
          </p>
          <Link 
            href="/admin/analytics" 
            className="inline-flex items-center justify-center w-full px-4 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-all shadow-sm"
          >
            View Full Report
          </Link>
        </div>
      </div>
    </div>
  );
}
