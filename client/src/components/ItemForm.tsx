import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import type { Item } from '../types';

const schema = z.object({
  title: z.string().min(2),
  company: z.string().min(2),
  value: z.number().min(0),
  status: z.enum(['lead', 'qualified', 'proposal', 'won', 'lost']),
  priority: z.enum(['low', 'medium', 'high'])
});

type FormValues = z.infer<typeof schema>;

export function ItemForm({ item, onSubmit, onCancel }: { item?: Item | null; onSubmit: (values: FormValues) => Promise<void>; onCancel: () => void }) {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: item || { title: '', company: '', value: 0, status: 'lead', priority: 'medium' }
  });

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Deal title" {...register('title')} />
      <Input placeholder="Company" {...register('company')} />
      <Input type="number" min={0} placeholder="Value" {...register('value', { valueAsNumber: true })} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Select {...register('status')}>
          <option value="lead">Lead</option>
          <option value="qualified">Qualified</option>
          <option value="proposal">Proposal</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </Select>
        <Select {...register('priority')}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
      </div>
      {formState.errors.title && <p className="text-sm text-rose-500">Title must contain at least two characters.</p>}
      <div className="flex justify-end gap-3">
        <Button type="button" onClick={onCancel} className="bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100">
          Cancel
        </Button>
        <Button type="submit" disabled={formState.isSubmitting}>
          Save record
        </Button>
      </div>
    </form>
  );
}
