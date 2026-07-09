import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Download, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ItemForm } from '../components/ItemForm';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { createItem, deleteItem, exportItemsCsv, fetchItems, updateItem } from '../services/items';
import type { Item } from '../types';

export function ItemsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [editing, setEditing] = useState<Item | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const filters = useMemo(() => ({ search, status: status || undefined }), [search, status]);
  const items = useQuery({ queryKey: ['items', filters], queryFn: () => fetchItems(filters) });

  const saveMutation = useMutation({
    mutationFn: (values: Partial<Item>) => (editing ? updateItem(editing._id, values) : createItem(values)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['item-stats'] });
      setEditing(null);
      setFormOpen(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] })
  });

  return (
    <div className="grid gap-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">CRM Records</h2>
          <p className="text-sm text-slate-500">Create, update, delete, search, filter, sort, and export records.</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={exportItemsCsv} className="bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-100"><Download size={18} /> CSV</Button>
          <Button onClick={() => setFormOpen(true)}><Plus size={18} /> New</Button>
        </div>
      </section>
      <Card className="grid gap-4">
        <div className="grid gap-3 md:grid-cols-[1fr_220px]">
          <label className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <Input className="pl-10" placeholder="Search by title, company, or tags" value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
          <Select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">All statuses</option>
            <option value="lead">Lead</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </Select>
        </div>
        {formOpen && (
          <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
            <ItemForm
              item={editing}
              onCancel={() => {
                setFormOpen(false);
                setEditing(null);
              }}
              onSubmit={async (values) => {
                await saveMutation.mutateAsync(values);
              }}
            />
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-slate-500">
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="py-3">Deal</th>
                <th>Company</th>
                <th>Value</th>
                <th>Status</th>
                <th>Priority</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.data?.items.map((item) => (
                <tr key={item._id} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-4 font-semibold dark:text-white">{item.title}</td>
                  <td>{item.company}</td>
                  <td>${item.value.toLocaleString()}</td>
                  <td><span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-950 dark:text-cyan-200">{item.status}</span></td>
                  <td>{item.priority}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <Button className="h-9 w-9 bg-slate-100 p-0 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100" onClick={() => { setEditing(item); setFormOpen(true); }}><Pencil size={16} /></Button>
                      <Button className="h-9 w-9 bg-rose-50 p-0 text-rose-600 hover:bg-rose-100" onClick={() => deleteMutation.mutate(item._id)}><Trash2 size={16} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!items.data?.items.length && (
                <tr><td className="py-10 text-center text-slate-500" colSpan={6}>No records yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
