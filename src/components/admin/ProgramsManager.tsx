import { useState, useEffect } from 'react';

interface Program {
  _id: string;
  name: string;
  description: string;
  duration: string;
  type: 'online';
  price: number;
  active: boolean;
  createdAt: string;
}

type ToastType = 'success' | 'error';
interface IToast { id: number; message: string; type: ToastType; }

const EMPTY_FORM = { name: '', description: '', duration: '', type: 'online' as const, price: 0, active: true };

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors placeholder-gray-400 bg-white";
const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

const TYPE_BADGE: Record<string, string> = {
  online:  'bg-blue-50 text-blue-700 border border-blue-200',
  onsite:  'bg-green-50 text-green-700 border border-green-200',
  hybrid:  'bg-purple-50 text-purple-700 border border-purple-200',
};

function Toast({ toast, onDismiss }: { toast: IToast; onDismiss: () => void }) {
  useEffect(() => { const t = setTimeout(onDismiss, 4000); return () => clearTimeout(t); }, []);
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium border ${
      toast.type === 'success' ? 'bg-white border-green-200 text-green-800' : 'bg-white border-red-200 text-red-800'
    }`}>
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
      <span className="flex-1">{toast.message}</span>
      <button onClick={onDismiss} className="opacity-40 hover:opacity-70 text-xs">✕</button>
    </div>
  );
}

export default function ProgramsManager() {
  const [programs, setPrograms]     = useState<Program[]>([]);
  const [loading, setLoading]       = useState(true);
  const [modalOpen, setModalOpen]   = useState(false);
  const [editingId, setEditingId]   = useState<string | null>(null);
  const [form, setForm]             = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Program | null>(null);
  const [toasts, setToasts]         = useState<IToast[]>([]);
  const [search, setSearch]         = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => { fetchPrograms(); }, []);

  async function fetchPrograms() {
    setLoading(true);
    try {
      const res = await fetch('/api/programs');
      const data = await res.json();
      if (data.success) setPrograms(data.programs);
    } catch {
      addToast('Failed to load programs', 'error');
    } finally {
      setLoading(false);
    }
  }

  function addToast(message: string, type: ToastType = 'success') {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  }

  function openCreate() { setForm(EMPTY_FORM); setEditingId(null); setModalOpen(true); }
  function openEdit(p: Program) {
    setForm({ name: p.name, description: p.description, duration: p.duration, type: p.type, price: p.price, active: p.active });
    setEditingId(p._id);
    setModalOpen(true);
  }
  function closeModal() { setModalOpen(false); setEditingId(null); setForm(EMPTY_FORM); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingId ? `/api/programs/${editingId}` : '/api/programs';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      if (editingId) {
        setPrograms(p => p.map(x => x._id === editingId ? data.program : x));
        addToast('Program updated');
      } else {
        setPrograms(p => [data.program, ...p]);
        addToast('Program created');
      }
      closeModal();
    } catch (err: any) {
      addToast(err.message || 'Failed to save', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(program: Program) {
    setDeleteTarget(null);
    try {
      const res = await fetch(`/api/programs/${program._id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setPrograms(p => p.filter(x => x._id !== program._id));
      addToast(`${program.name} removed`);
    } catch (err: any) {
      addToast(err.message || 'Delete failed', 'error');
    }
  }

  const filtered = programs.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || p.type === typeFilter;
    return matchSearch && matchType;
  });

  const stats = {
    total:  programs.length,
    online: programs.filter(p => p.type === 'online').length,
    active: programs.filter(p => p.active).length,
  };

  return (
    <div className="text-gray-900">
      {/* Toasts */}
      <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 w-72">
        {toasts.map(t => <Toast key={t.id} toast={t} onDismiss={() => setToasts(p => p.filter(x => x.id !== t.id))} />)}
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Programs</h1>
          <p className="text-gray-500 text-sm mt-1">Manage courses and learning programs</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Program
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total', val: stats.total, icon: '📚', color: 'text-blue-600' },
          { label: 'Online', val: stats.online, icon: '💻', color: 'text-purple-600' },
          { label: 'Active', val: stats.active, icon: '✅', color: 'text-green-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{s.label}</p>
              <span className="text-xl">{s.icon}</span>
            </div>
            <p className={`text-3xl font-bold ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search programs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        />
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 bg-white"
        >
          <option value="all">All Types</option>
          <option value="online">Online</option>
          <option value="onsite">Onsite</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-lg font-semibold text-gray-700">{search ? 'No programs match your search' : 'No programs yet'}</p>
            {!search && (
              <button onClick={openCreate} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
                Create First Program
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Program', 'Type', 'Duration', 'Price', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(p => (
                  <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">{p.description}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${TYPE_BADGE[p.type]}`}>
                        {p.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{p.duration || '—'}</td>
                    <td className="px-5 py-4 text-sm text-gray-900 font-medium">
                      {p.price ? `₱${p.price.toLocaleString()}` : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        p.active ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {p.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-purple-50 text-purple-500 transition-colors" title="Edit">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => setDeleteTarget(p)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors" title="Delete">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">{editingId ? 'Edit Program' : 'New Program'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div>
                <label className={labelCls}>Program Name <span className="text-red-400">*</span></label>
                <input required type="text" placeholder="e.g. Basic English" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Description</label>
                <textarea placeholder="Brief description..." value={form.description} rows={3}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className={inputCls + ' resize-none'} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as any })} className={inputCls}>
                    <option value="online">Online</option>
                    <option value="onsite">Onsite</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Duration</label>
                  <input type="text" placeholder="e.g. 3 months" value={form.duration}
                    onChange={e => setForm({ ...form, duration: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Price (₱)</label>
                <input type="number" min={0} placeholder="0" value={form.price}
                  onChange={e => setForm({ ...form, price: Number(e.target.value) })} className={inputCls} />
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setForm({ ...form, active: !form.active })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.active ? 'bg-purple-600' : 'bg-gray-300'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.active ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <span className="text-sm text-gray-600">{form.active ? 'Active' : 'Inactive'}</span>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-1 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                  {submitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : editingId ? 'Save Changes' : 'Create Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-sm shadow-2xl p-6">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Delete Program</h3>
            <p className="text-gray-500 text-sm mb-6">Remove <strong className="text-gray-800">{deleteTarget.name}</strong>? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteTarget)}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}