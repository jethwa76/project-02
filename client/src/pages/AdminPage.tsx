import { useQuery } from '@tanstack/react-query';
import { Activity, Database, UserRoundCog, Users } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/ui/Card';
import { fetchActivity, fetchAnalytics, fetchUsers } from '../services/admin';

export function AdminPage() {
  const analytics = useQuery({ queryKey: ['admin-analytics'], queryFn: fetchAnalytics });
  const users = useQuery({ queryKey: ['admin-users'], queryFn: () => fetchUsers() });
  const activity = useQuery({ queryKey: ['admin-activity'], queryFn: fetchActivity });

  return (
    <div className="grid gap-6">
      <section>
        <h2 className="text-2xl font-bold dark:text-white">Admin Dashboard</h2>
        <p className="text-sm text-slate-500">Manage users, records, and platform activity.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Users" value={analytics.data?.users || 0} icon={Users} tone="bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-200" />
        <StatCard label="Records" value={analytics.data?.records || 0} icon={Database} tone="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200" />
        <StatCard label="Activities" value={activity.data?.length || 0} icon={Activity} tone="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200" />
      </section>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 font-bold dark:text-white">Users</h3>
          <div className="grid gap-3">
            {users.data?.map((user) => (
              <div key={user._id} className="flex items-center justify-between rounded-lg border border-slate-100 p-3 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 font-bold dark:bg-slate-800">{user.name.slice(0, 2).toUpperCase()}</div>
                  <div>
                    <p className="font-semibold dark:text-white">{user.name}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-slate-800"><UserRoundCog size={14} /> {user.role}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="mb-4 font-bold dark:text-white">Recent Activity</h3>
          <div className="grid gap-3">
            {activity.data?.map((entry) => (
              <div key={entry._id} className="rounded-lg border border-slate-100 p-3 dark:border-slate-800">
                <p className="font-semibold dark:text-white">{entry.actor?.name || 'System'} {entry.action}</p>
                <p className="text-sm text-slate-500">{new Date(entry.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
