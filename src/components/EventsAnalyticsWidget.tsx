import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface EventStat {
  _id: string;
  title: string;
  instrument: string;
  status: string;
  registrationCounts: { total: number; pending: number; approved: number; rejected: number };
}

const COLORS = { approved: '#059669', pending: '#f59e0b', rejected: '#ef4444' };

export default function EventsAnalyticsWidget() {
  const [events, setEvents]   = useState<EventStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events?admin=true')
      .then(r => r.json())
      .then(d => { setEvents(d.events ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center h-48">
      <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (events.length === 0) return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
      <p className="text-gray-400 text-sm">No events yet. <a href="/admin/events" className="text-purple-600 font-medium hover:underline">Create one →</a></p>
    </div>
  );

  // Bar chart data — registrations per event
  const barData = events.map(e => ({
    name: e.instrument || e.title.split(':')[0].trim(),
    Approved: e.registrationCounts.approved,
    Pending:  e.registrationCounts.pending,
    Rejected: e.registrationCounts.rejected,
    total:    e.registrationCounts.total,
  }));

  // Pie chart — overall breakdown
  const totalApproved = events.reduce((s, e) => s + e.registrationCounts.approved, 0);
  const totalPending  = events.reduce((s, e) => s + e.registrationCounts.pending,  0);
  const totalRejected = events.reduce((s, e) => s + e.registrationCounts.rejected, 0);
  const pieData = [
    { name: 'Approved', value: totalApproved, color: COLORS.approved },
    { name: 'Pending',  value: totalPending,  color: COLORS.pending  },
    { name: 'Rejected', value: totalRejected, color: COLORS.rejected  },
  ].filter(d => d.value > 0);

  const grandTotal = totalApproved + totalPending + totalRejected;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-900">Event Registrations</h2>
          <p className="text-xs text-gray-400 mt-0.5">{grandTotal} total across {events.length} event{events.length !== 1 ? 's' : ''}</p>
        </div>
        <a href="/admin/events" className="text-xs font-semibold text-purple-600 hover:text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg transition-colors">
          Manage Events →
        </a>
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Bar chart */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">By Event</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData} barSize={22} barGap={2}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                cursor={{ fill: '#f5f3ff' }}
              />
              <Bar dataKey="Approved" stackId="a" fill={COLORS.approved} radius={[0,0,0,0]} />
              <Bar dataKey="Pending"  stackId="a" fill={COLORS.pending}  radius={[0,0,0,0]} />
              <Bar dataKey="Rejected" stackId="a" fill={COLORS.rejected} radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart + totals */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Overall Breakdown</p>
          {grandTotal === 0 ? (
            <div className="h-[180px] flex items-center justify-center text-sm text-gray-400">No registrations yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                  dataKey="value" paddingAngle={3}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Event rows */}
      <div className="border-t border-gray-100">
        {events.map(e => (
          <a key={e._id} href={`/admin/events/${e._id}/registrants`}
            className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-sm flex-shrink-0">🎵</div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{e.title}</p>
                <p className="text-xs text-gray-400">{e.registrationCounts.total} registered</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-3">
              {e.registrationCounts.pending > 0 && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">
                  {e.registrationCounts.pending} pending
                </span>
              )}
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${
                e.status === 'published' ? 'bg-green-100 text-green-700'
                : e.status === 'closed'  ? 'bg-gray-100 text-gray-500'
                : 'bg-amber-100 text-amber-700'
              }`}>{e.status}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}