import type { LucideIcon } from 'lucide-react';
import { Card } from './ui/Card';

export function StatCard({ label, value, icon: Icon, tone }: { label: string; value: string | number; icon: LucideIcon; tone: string }) {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{value}</p>
      </div>
      <div className={`grid h-11 w-11 place-items-center rounded-lg ${tone}`}>
        <Icon size={20} />
      </div>
    </Card>
  );
}
