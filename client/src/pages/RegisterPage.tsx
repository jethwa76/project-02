import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useAuth } from '../hooks/useAuth';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  role: z.enum(['user', 'admin'])
});
type Values = z.infer<typeof schema>;

export function RegisterPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { role: 'user' } });

  return (
    <div className="gradient-page grid min-h-screen place-items-center px-4">
      <Card className="w-full max-w-md">
        <div className="mb-6">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-cyan-600 text-white"><UserPlus /></div>
          <h1 className="mt-4 text-2xl font-bold dark:text-white">Create account</h1>
          <p className="mt-1 text-sm text-slate-500">Choose admin to review the admin dashboard.</p>
        </div>
        <form
          className="grid gap-4"
          onSubmit={handleSubmit(async (values) => {
            try {
              await signUp(values);
              navigate('/dashboard');
            } catch (error) {
              setError('root', { message: error instanceof Error ? error.message : 'Registration failed' });
            }
          })}
        >
          <Input placeholder="Full name" {...register('name')} />
          <Input placeholder="Email" {...register('email')} />
          <Input type="password" placeholder="Password" {...register('password')} />
          <Select {...register('role')}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Select>
          {formState.errors.root && <p className="text-sm text-rose-500">{formState.errors.root.message}</p>}
          <Button disabled={formState.isSubmitting}>Register</Button>
        </form>
        <p className="mt-5 text-sm text-slate-500">Already registered? <Link className="font-semibold text-cyan-600" to="/login">Login</Link></p>
      </Card>
    </div>
  );
}
