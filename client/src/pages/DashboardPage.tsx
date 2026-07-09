import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BriefcaseBusiness, DollarSign, Trophy, Users } from 'lucide-react';
import { fetchAnalytics } from '../services/admin';
import { fetchItemStats } from '../services/items';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';

export function DashboardPage() {
  const stats = useQuery({ queryKey: ['item-stats'], queryFn: fetchItemStats });
  const analytics = useQuery({ queryKey: ['analytics'], queryFn: fetchAnalytics });
  const summary = stats.data?.summary;
  const chartData = analytics.data?.statusBreakdown?.map((entry) => ({ status: entry._id, value: entry.value, count: entry.count })) || [];

  if (stats.isLoading) {
    return <div className="grid gap-4 md:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-32" />)}</div>;
  }

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Records" value={summary?.total || 0} icon={BriefcaseBusiness} tone="bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-200" />
        <StatCard label="Pipeline value" value={`$${Number(summary?.pipelineValue || 0).toLocaleString()}`} icon={DollarSign} tone="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200" />
        <StatCard label="Open deals" value={summary?.open || 0} icon={Users} tone="bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200" />
        <StatCard label="Won" value={summary?.won || 0} icon={Trophy} tone="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200" />
      </section>
      <Card>
        <div className="mb-4">
          <h2 className="text-lg font-bold dark:text-white">Pipeline by status</h2>
          <p className="text-sm text-slate-500">Aggregation data from the backend analytics API.</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
