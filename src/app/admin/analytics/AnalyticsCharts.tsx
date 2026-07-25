"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ['#0095f6', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'];
const PIE_COLORS = { desktop: '#0095f6', mobile: '#ec4899', tablet: '#f59e0b' };

export default function AnalyticsCharts({ 
  chartData, topCountries, topRegions, topCities, deviceData, hourChartData, topPages, topReferrers, osList
}: any) {
  
  const formattedDeviceData = [
    { name: 'Desktop', value: deviceData.desktop },
    { name: 'Mobile', value: deviceData.mobile },
    { name: 'Tablet', value: deviceData.tablet },
  ].filter(d => d.value > 0);

  // Custom premium tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f172a]/90 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <p className="text-slate-300 font-medium text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
              <span className="text-white font-bold">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* SVG Definitions for Gradients */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0095f6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#0095f6" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="barGradientBlue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0095f6" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
          <linearGradient id="barGradientPink" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="barGradientGreen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>

      {/* Time charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-[2rem] p-8 shadow-2xl hover:border-slate-700 transition-colors relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0095f6] to-transparent opacity-50"></div>
          <h2 className="text-xl font-serif font-bold text-white mb-8">Traffic Over Time (30 Days)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Line type="monotone" dataKey="visits" stroke="#0095f6" strokeWidth={4} dot={false} activeDot={{ r: 8, fill: '#0095f6', stroke: '#0f172a', strokeWidth: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-[2rem] p-8 shadow-2xl hover:border-slate-700 transition-colors relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ec4899] to-transparent opacity-50"></div>
          <h2 className="text-xl font-serif font-bold text-white mb-8">Peak Hours (Average)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Line type="step" dataKey="visits" stroke="#ec4899" strokeWidth={4} dot={false} activeDot={{ r: 8, fill: '#ec4899', stroke: '#0f172a', strokeWidth: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Geo Location Data (NEW) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-[2rem] p-8 shadow-2xl hover:border-slate-700 transition-colors">
          <h2 className="text-xl font-serif font-bold text-white mb-8">Top Countries</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCountries} layout="vertical" margin={{ left: -10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip cursor={{fill: '#1e293b'}} content={<CustomTooltip />} />
                <Bar dataKey="value" fill="url(#barGradientBlue)" radius={[0, 8, 8, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-[2rem] p-8 shadow-2xl hover:border-slate-700 transition-colors">
          <h2 className="text-xl font-serif font-bold text-white mb-8">Top States / Regions</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topRegions} layout="vertical" margin={{ left: -10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip cursor={{fill: '#1e293b'}} content={<CustomTooltip />} />
                <Bar dataKey="value" fill="url(#barGradientPink)" radius={[0, 8, 8, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-[2rem] p-8 shadow-2xl hover:border-slate-700 transition-colors">
          <h2 className="text-xl font-serif font-bold text-white mb-8">Top Cities</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCities} layout="vertical" margin={{ left: -10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip cursor={{fill: '#1e293b'}} content={<CustomTooltip />} />
                <Bar dataKey="value" fill="url(#barGradientGreen)" radius={[0, 8, 8, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pages and Referrers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-[2rem] p-8 shadow-2xl hover:border-slate-700 transition-colors">
          <h2 className="text-xl font-serif font-bold text-white mb-8">Top Landing Pages</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPages} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={120} />
                <Tooltip cursor={{fill: '#1e293b'}} content={<CustomTooltip />} />
                <Bar dataKey="value" fill="url(#barGradientBlue)" radius={[0, 8, 8, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-[2rem] p-8 shadow-2xl hover:border-slate-700 transition-colors">
          <h2 className="text-xl font-serif font-bold text-white mb-8">Top Referrers (Sources)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={topReferrers} cx="50%" cy="45%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                  {topReferrers.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Devices and OS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-[2rem] p-8 shadow-2xl hover:border-slate-700 transition-colors">
          <h2 className="text-xl font-serif font-bold text-white mb-8">Device Types</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={formattedDeviceData} cx="50%" cy="45%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                  {formattedDeviceData.map((entry) => (
                    <Cell key={entry.name} fill={PIE_COLORS[entry.name.toLowerCase() as keyof typeof PIE_COLORS]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-[2rem] p-8 shadow-2xl hover:border-slate-700 transition-colors">
          <h2 className="text-xl font-serif font-bold text-white mb-8">Operating Systems</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={osList} cx="50%" cy="45%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                  {osList.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
