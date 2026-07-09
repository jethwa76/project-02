import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

const schema = z.object({ email: z.string().email(), password: z.string().min(1) });
type Values = z.infer<typeof schema>;

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState } = useForm<Values>({ resolver: zodResolver(schema) });

  return (
    <div className="gradient-page grid min-h-screen place-items-center px-4">
      <Card className="w-full max-w-md">
        <div className="mb-6">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-cyan-600 text-white"><LogIn /></div>
          <h1 className="mt-4 text-2xl font-bold dark:text-white">Login</h1>
          <p className="mt-1 text-sm text-slate-500">Use your account to enter the dashboard.</p>
        </div>
        <form
          className="grid gap-4"
          onSubmit={handleSubmit(async (values) => {
            try {
              await signIn(values);
              navigate('/dashboard');
            } catch (error) {
              setError('root', { message: error instanceof Error ? error.message : 'Login failed' });
            }
          })}
        >
          <Input placeholder="Email" {...register('email')} />
          <Input type="password" placeholder="Password" {...register('password')} />
          {formState.errors.root && <p className="text-sm text-rose-500">{formState.errors.root.message}</p>}
          <Button disabled={formState.isSubmitting}>Login</Button>
        </form>
        <p className="mt-5 text-sm text-slate-500">No account? <Link className="font-semibold text-cyan-600" to="/register">Register</Link></p>
      </Card>
    </div>
  );
}
