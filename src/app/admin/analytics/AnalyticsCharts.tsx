"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ['#0095f6', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'];
const PIE_COLORS = { desktop: '#0095f6', mobile: '#ec4899', tablet: '#f59e0b' };

export default function AnalyticsCharts({ 
  chartData, topCountries, deviceData, hourChartData, topPages, topReferrers, osList
}: any) {
  
  const formattedDeviceData = [
    { name: 'Desktop', value: deviceData.desktop },
    { name: 'Mobile', value: deviceData.mobile },
    { name: 'Tablet', value: deviceData.tablet },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Time charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 hover:border-slate-700 transition-colors">
          <h2 className="text-lg font-bold text-white mb-6">Traffic Over Time (30 Days)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Line type="monotone" dataKey="visits" stroke="#0095f6" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#0095f6', stroke: '#0f172a', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 hover:border-slate-700 transition-colors">
          <h2 className="text-lg font-bold text-white mb-6">Peak Hours (Heatmap Avg)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Line type="step" dataKey="visits" stroke="#ec4899" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pages and Referrers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 hover:border-slate-700 transition-colors">
          <h2 className="text-lg font-bold text-white mb-6">Top Pages</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPages} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
                <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 hover:border-slate-700 transition-colors">
          <h2 className="text-lg font-bold text-white mb-6">Top Referrers (Sources)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={topReferrers} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {topReferrers.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Geos and Devices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 hover:border-slate-700 transition-colors">
          <h2 className="text-lg font-bold text-white mb-6">Device Types</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={formattedDeviceData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {formattedDeviceData.map((entry) => (
                    <Cell key={entry.name} fill={PIE_COLORS[entry.name.toLowerCase() as keyof typeof PIE_COLORS]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 hover:border-slate-700 transition-colors">
          <h2 className="text-lg font-bold text-white mb-6">Operating Systems</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={osList} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {osList.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 hover:border-slate-700 transition-colors">
          <h2 className="text-lg font-bold text-white mb-6">Top Countries</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCountries} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
                <Bar dataKey="value" fill="#0095f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
