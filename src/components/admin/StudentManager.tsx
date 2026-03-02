import { useState, useEffect } from 'react';

interface Student {
  _id: string;
  name: string;
  telegramChatId?: string;
  phone?: string;
  email?: string;
  active: boolean;
  createdAt: string;
}

type ToastType = 'success' | 'error' | 'info';
interface IToast { id: number; message: string; type: ToastType; }

const EMPTY_FORM = { name: '', phone: '', email: '', telegramChatId: '', active: true };

interface Props {
  initialStudents?: Student[];
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function ToastItem({ toast, onDismiss }: { toast: IToast; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, []);

  const styles: Record<ToastType, string> = {
    success: 'bg-white border-emerald-200 text-emerald-800 shadow-emerald-100',
    error:   'bg-white border-red-200 text-red-800 shadow-red-100',
    info:    'bg-white border-purple-200 text-purple-800 shadow-purple-100',
  };
  const iconColors: Record<ToastType, string> = {
    success: 'bg-emerald-100 text-emerald-600',
    error:   'bg-red-100 text-red-600',
    info:    'bg-purple-100 text-purple-600',
  };
  const icons: Record<ToastType, string> = { success: '✓', error: '✕', info: 'i' };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium ${styles[toast.type]}`}
      style={{ animation: 'slideIn 0.25s ease' }}
    >
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${iconColors[toast.type]}`}>
        {icons[toast.type]}
      </span>
      <span className="flex-1">{toast.message}</span>
      <button onClick={onDismiss} className="opacity-40 hover:opacity-70 text-xs">✕</button>
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
      {initials}
    </div>
  );
}

const inputCls = "w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all placeholder-gray-400";

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function StudentsManager({ initialStudents = [] }: Props) {
  const [students, setStudents]         = useState<Student[]>(initialStudents);
  const [loading, setLoading]           = useState(initialStudents.length === 0);
  const [modalOpen, setModalOpen]       = useState(false);
  const [editingId, setEditingId]       = useState<string | null>(null);
  const [form, setForm]                 = useState(EMPTY_FORM);
  const [submitting, setSubmitting]     = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);
  const [deletingId, setDeletingId]     = useState<string | null>(null);
  const [toasts, setToasts]             = useState<IToast[]>([]);
  const [search, setSearch]             = useState('');

  useEffect(() => {
    if (initialStudents.length === 0) fetchStudents();
  }, []);

  async function fetchStudents() {
    setLoading(true);
    try {
      const res  = await fetch('/api/students');
      const data = await res.json();
      if (data.success) setStudents(data.students);
    } catch {
      addToast('Failed to load students', 'error');
    } finally {
      setLoading(false);
    }
  }

  function addToast(message: string, type: ToastType = 'success') {
    setToasts(p => [...p, { id: Date.now(), message, type }]);
  }

  function openCreate() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(s: Student) {
    setForm({
      name:           s.name,
      phone:          s.phone          || '',
      email:          s.email          || '',
      telegramChatId: s.telegramChatId || '',
      active:         s.active,
    });
    setEditingId(s._id);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url    = editingId ? `/api/students/${editingId}` : '/api/students';
      const method = editingId ? 'PUT' : 'POST';
      const res    = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      if (editingId) {
        setStudents(p => p.map(s => s._id === editingId ? data.student : s));
        addToast('Student updated');
      } else {
        setStudents(p => [data.student, ...p]);
        addToast('Student added');
      }
      closeModal();
    } catch (err: any) {
      addToast(err.message || 'Failed to save', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(student: Student) {
    setDeleteTarget(null);
    setDeletingId(student._id);
    try {
      const res  = await fetch(`/api/students/${student._id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStudents(p => p.filter(s => s._id !== student._id));
      addToast(`${student.name} removed`);
    } catch (err: any) {
      addToast(err.message || 'Delete failed', 'error');
    } finally {
      setDeletingId(null);
    }
  }

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.phone?.includes(search) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total:     students.length,
    connected: students.filter(s => s.telegramChatId).length,
    active:    students.filter(s => s.active).length,
  };

  return (
    <div className="text-gray-800 bg-gray-50 min-h-screen p-6">
      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(8px);  } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.2s ease; }
      `}</style>

      {/* Toasts */}
      <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 w-72">
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onDismiss={() => setToasts(p => p.filter(x => x.id !== t.id))} />
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500 text-sm mt-1">Manage students and their Telegram connections</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Student
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {([
          { label: 'Total Students', val: stats.total,  color: 'text-blue-600',    sub: 'Registered'       },
          { label: 'Telegram',       val: stats.connected, color: 'text-emerald-600', sub: 'Connected'        },
          { label: 'Active',         val: stats.active,  color: 'text-purple-600',  sub: '1 Active'         },
        ] as const).map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{s.label}</p>
            </div>
            <p className={`text-3xl font-bold ${s.color}`}>{s.val}</p>
            <p className="text-gray-400 text-xs mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by name, phone, or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all placeholder-gray-400 shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl mb-4">👥</div>
            <p className="text-lg font-semibold text-gray-700">
              {search ? 'No students match your search' : 'No students yet'}
            </p>
            {!search && (
              <button
                onClick={openCreate}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                Add First Student
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  {['Student', 'Contact', 'Telegram', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(s => (
                  <tr key={s._id} className="hover:bg-gray-50/60 transition-colors fade-up">

                    {/* Student */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={s.name} />
                        <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-700">{s.phone || '—'}</p>
                      {s.email && <p className="text-xs text-gray-400">{s.email}</p>}
                    </td>

                    {/* Telegram */}
                    <td className="px-5 py-4">
                      {s.telegramChatId ? (
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                            ✓ Connected
                          </span>
                          <p className="text-xs text-gray-400 mt-1 font-mono">{s.telegramChatId}</p>
                        </div>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100">
                          ⚠ Not set
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        s.active
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : 'bg-gray-100 text-gray-500 border-gray-200'
                      }`}>
                        {s.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEdit(s)}
                          title="Edit"
                          className="p-1.5 rounded-lg hover:bg-purple-50 text-purple-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteTarget(s)}
                          disabled={deletingId === s._id}
                          title="Delete"
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 disabled:opacity-30 transition-colors"
                        >
                          {deletingId === s._id ? (
                            <div className="w-4 h-4 border border-red-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
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

      {/* Telegram help */}
      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <span className="text-blue-500 text-lg flex-shrink-0">📱</span>
        <div>
          <h3 className="text-sm font-semibold text-blue-700 mb-1">How students get their Telegram Chat ID</h3>
          <p className="text-blue-600/80 text-xs leading-relaxed">
            Student opens Telegram → finds your bot → sends{' '}
            <code className="bg-blue-100 px-1.5 py-0.5 rounded font-mono">/start</code> → bot replies with their Chat ID → student shares it with you → add it here.
          </p>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-xl fade-up">

            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  {editingId ? 'Edit Student' : 'Add Student'}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">Fill in the student's details</p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Maria Santos"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone</label>
                  <input
                    type="tel"
                    placeholder="0917-123-4567"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="maria@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Telegram Chat ID
                </label>
                <input
                  type="text"
                  placeholder="123456789"
                  value={form.telegramChatId}
                  onChange={e => setForm({ ...form, telegramChatId: e.target.value })}
                  className={inputCls}
                />
                <p className="text-gray-400 text-xs mt-1">Student gets this by sending /start to your bot</p>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, active: !form.active })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.active ? 'bg-emerald-500' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.active ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <span className="text-sm text-gray-600">
                  {form.active ? 'Active student' : 'Inactive'}
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                  ) : editingId ? 'Save Changes' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-sm shadow-xl fade-up p-6">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Remove Student</h3>
            <p className="text-gray-500 text-sm mb-6">
              Remove <strong className="text-gray-900">{deleteTarget.name}</strong>? This will also affect their schedules.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteTarget)}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}