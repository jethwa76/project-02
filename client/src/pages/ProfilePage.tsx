import { Camera, KeyRound, UserRound } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <Card>
        <div className="flex items-center gap-4">
          <div className="grid h-20 w-20 place-items-center rounded-lg bg-cyan-600 text-2xl font-black text-white">{user?.name.slice(0, 2).toUpperCase()}</div>
          <div>
            <h2 className="text-2xl font-bold dark:text-white">{user?.name}</h2>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <span className="mt-2 inline-block rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-950 dark:text-cyan-200">{user?.role}</span>
          </div>
        </div>
        <Button className="mt-6 w-full bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100"><Camera size={18} /> Upload avatar</Button>
      </Card>
      <Card className="grid gap-6">
        <section>
          <div className="mb-4 flex items-center gap-2 font-bold dark:text-white"><UserRound size={18} /> Profile settings</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input defaultValue={user?.name} placeholder="Name" />
            <Input defaultValue={user?.email} placeholder="Email" />
          </div>
          <Button className="mt-4">Save profile</Button>
        </section>
        <section className="border-t border-slate-200 pt-6 dark:border-slate-800">
          <div className="mb-4 flex items-center gap-2 font-bold dark:text-white"><KeyRound size={18} /> Change password</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input type="password" placeholder="Current password" />
            <Input type="password" placeholder="New password" />
          </div>
          <Button className="mt-4">Update password</Button>
        </section>
      </Card>
    </div>
  );
}
