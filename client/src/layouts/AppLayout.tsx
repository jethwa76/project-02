import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BarChart3, BriefcaseBusiness, LogOut, Settings, Shield, Sparkles } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/items', label: 'Records', icon: BriefcaseBusiness },
  { to: '/profile', label: 'Profile', icon: Settings }
];

export function AppLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const navLinks = user?.role === 'admin' ? [...links, { to: '/admin', label: 'Admin', icon: Shield }] : links;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:block">
        <div className="flex items-center gap-3 text-lg font-bold">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-600 text-white">
            <Sparkles size={20} />
          </span>
          Stellar CRM
        </div>
        <nav className="mt-8 grid gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn('flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800', isActive && 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-200')
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 sm:px-8">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back</p>
            <h1 className="font-semibold">{user?.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              className="h-10 w-10 bg-slate-100 p-0 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100"
              onClick={async () => {
                await signOut();
                navigate('/');
              }}
              title="Logout"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </header>
        <nav className="grid grid-cols-4 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:hidden">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => cn('grid place-items-center gap-1 py-3 text-xs text-slate-500', isActive && 'text-cyan-600')}>
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
