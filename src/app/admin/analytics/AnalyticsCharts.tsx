"use client";

import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from "recharts";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { useState, useEffect } from "react";

const COLORS = ['#0095f6', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'];
const PIE_COLORS = { desktop: '#0095f6', mobile: '#ec4899', tablet: '#f59e0b' };

// Simplified geojson URL for maps
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function AnalyticsCharts({ 
  chartData, topCountries, landingPages, exitPages, deviceData, topReferrers, kpis
}: any) {
  
  const formattedDeviceData = [
    { name: 'Desktop', value: deviceData.desktop },
    { name: 'Mobile', value: deviceData.mobile },
    { name: 'Tablet', value: deviceData.tablet },
  ].filter(d => d.value > 0);

  // Custom tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f172a]/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl z-50">
          <p className="text-slate-300 font-medium text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
              <span className="text-slate-400 capitalize">{entry.name}:</span>
              <span className="text-white font-bold">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Map Color Scale
  const maxSessions = Math.max(...topCountries.map((c: any) => c.sessions), 1);
  const colorScale = scaleLinear<string>()
    .domain([0, maxSessions])
    .range(["#1e293b", "#0095f6"]); // Dark slate to bright blue

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      
      {/* SVG Definitions for Gradients */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="areaSessions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="areaViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
      </svg>

      {/* Overview Block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Composed Chart (2/3 width) */}
        <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500 opacity-50"></div>
          
          <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
            <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider">Overview <span className="text-slate-500 text-sm normal-case block mt-1">Last 30 days, daily</span></h2>
            <div className="flex space-x-6 text-center">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Sessions</p>
                <p className="text-2xl font-bold text-[#0095f6]">{kpis.sessions.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Users</p>
                <p className="text-2xl font-bold text-[#f59e0b]">{kpis.users.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Pageviews</p>
                <p className="text-2xl font-bold text-[#10b981]">{kpis.pageviews.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                
                <Bar dataKey="pageviews" name="Pageviews" fill="#1e293b" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#0095f6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="users" name="Users" stroke="#f59e0b" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Landing Pages Donut */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#ec4899] opacity-50"></div>
          <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider">Landing Pages</h2>
          
          <div className="h-48 mt-4 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={landingPages.slice(0, 5)} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={2} dataKey="sessions" stroke="none">
                  {landingPages.slice(0, 5).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-400">Total</span>
              <span className="text-2xl font-bold text-white">{kpis.sessions}</span>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            {landingPages.slice(0, 5).map((lp: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <div className="flex items-center truncate max-w-[150px]">
                  <div className="w-2 h-2 rounded-full mr-2 shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="text-slate-300 truncate">{lp.path}</span>
                </div>
                <div className="text-slate-400">
                  <span className="text-white font-medium">{lp.sessions}</span> / {kpis.sessions > 0 ? Math.round((lp.sessions / kpis.sessions) * 100) : 0}%
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Time on site Area */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl">
           <div className="flex justify-between items-end mb-4">
             <h2 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Time on Site <span className="block text-slate-500 normal-case mt-1 font-sans font-normal text-xs">Last 30 days</span></h2>
             <p className="text-xl font-bold text-[#10b981]">{kpis.timeOnSite}</p>
           </div>
           <div className="h-24">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData}>
                 <Area type="monotone" dataKey="timeOnSite" name="Time (seconds)" stroke="#10b981" fill="url(#areaViews)" strokeWidth={2} />
                 <Tooltip content={<CustomTooltip />} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Bounce Rate Area */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl">
           <div className="flex justify-between items-end mb-4">
             <h2 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Bounce Rate <span className="block text-slate-500 normal-case mt-1 font-sans font-normal text-xs">Last 30 days</span></h2>
             <p className="text-xl font-bold text-[#ec4899]">{kpis.bounceRate}%</p>
           </div>
           <div className="h-24">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData}>
                 <Area type="monotone" dataKey="bounceRate" name="Bounce Rate %" stroke="#ec4899" fill="url(#areaSessions)" strokeWidth={2} />
                 <Tooltip content={<CustomTooltip />} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
        
        {/* Devices Donut */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between">
           <div className="mb-4 sm:mb-0">
             <h2 className="text-sm font-serif font-bold text-white uppercase tracking-wider mb-4">Devices</h2>
             <div className="space-y-2">
               {formattedDeviceData.map((d: any) => (
                  <div key={d.name} className="flex items-center text-sm">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: PIE_COLORS[d.name.toLowerCase() as keyof typeof PIE_COLORS] }} />
                    <span className="text-slate-300 w-16">{d.name}</span>
                    <span className="text-white font-medium">{d.value}</span>
                  </div>
               ))}
             </div>
           </div>
           <div className="h-32 w-32 relative">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={formattedDeviceData} cx="50%" cy="50%" innerRadius={35} outerRadius={50} paddingAngle={2} dataKey="value" stroke="none">
                    {formattedDeviceData.map((entry) => (
                      <Cell key={entry.name} fill={PIE_COLORS[entry.name.toLowerCase() as keyof typeof PIE_COLORS]} />
                    ))}
                 </Pie>
                 <Tooltip content={<CustomTooltip />} />
               </PieChart>
             </ResponsiveContainer>
           </div>
        </div>

      </div>

      {/* Geolocation & Data Table Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Map */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col">
          <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider mb-6">Countries by Sessions</h2>
          <div className="h-[300px] w-full border border-slate-800/50 rounded-xl overflow-hidden bg-[#0a0f1c] flex-grow">
            <ComposableMap projectionConfig={{ scale: 120 }}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryName = geo.properties.name;
                    const d = topCountries.find((s: any) => s.name === countryName || s.name.includes(countryName));
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={d ? colorScale(d.sessions) : "#1e293b"}
                        stroke="#0f172a"
                        strokeWidth={0.5}
                        style={{
                          hover: { fill: "#3b82f6", outline: "none" },
                          pressed: { fill: "#2563eb", outline: "none" },
                          default: { outline: "none" }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>
        </div>

        {/* Landing Performance Table */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl overflow-x-auto">
          <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider mb-6">Landing Performance</h2>
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">
                <th className="pb-3 font-medium">Landing Page</th>
                <th className="pb-3 font-medium text-right">Sessions</th>
                <th className="pb-3 font-medium text-right">Users</th>
                <th className="pb-3 font-medium text-right">Bounce Rate</th>
                <th className="pb-3 font-medium text-right">Time on Site</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {landingPages.slice(0, 10).map((lp: any, idx: number) => (
                <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 text-slate-300 font-medium truncate max-w-[200px]">{lp.path}</td>
                  <td className="py-3 text-right text-white font-semibold">{lp.sessions.toLocaleString()}</td>
                  <td className="py-3 text-right text-slate-400">{lp.users.toLocaleString()}</td>
                  <td className="py-3 text-right text-slate-400">{lp.bounceRate}%</td>
                  <td className="py-3 text-right text-slate-400">{lp.timeOnSite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
