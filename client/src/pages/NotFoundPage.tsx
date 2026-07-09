import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 px-4 text-center dark:bg-slate-950 dark:text-white">
      <div>
        <p className="text-sm font-bold text-cyan-600">404</p>
        <h1 className="mt-2 text-4xl font-black">Page not found</h1>
        <p className="mt-3 text-slate-500">The route you opened does not exist.</p>
        <Link to="/dashboard"><Button className="mt-6">Back to dashboard</Button></Link>
      </div>
    </div>
  );
}
