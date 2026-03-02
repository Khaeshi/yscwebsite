import { useState, useEffect } from 'react';

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const EMPTY_FORM = {
  studentId: '',
  className: '',
  classType: 'online' as 'online' | 'onsite',
  dayOfWeek: 1,
  time: '14:00',
  duration: 60,
  reminderMinutes: 60,
  active: true,
};

interface Student {
  _id: string;
  name: string;
  telegramChatId?: string;
  phone?: string;
}

interface Schedule {
  _id: string;
  studentId: Student;
  className: string;
  classType: 'online' | 'onsite';
  dayOfWeek: number;
  time: string;
  duration: number;
  reminderMinutes: number;
  active: boolean;
}

type ToastType = 'success' | 'error' | 'info';
interface IToast { id: number; message: string; type: ToastType; }

interface Props {
  initialSchedules?: Schedule[];
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
  const icons: Record<ToastType, string> = { success: '✓', error: '✕', info: 'i' };
  const iconColors: Record<ToastType, string> = {
    success: 'bg-emerald-100 text-emerald-600',
    error:   'bg-red-100 text-red-600',
    info:    'bg-purple-100 text-purple-600',
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium ${styles[toast.type]}`}
      style={{ animation: 'slideIn 0.25s ease' }}
    >
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${iconColors[toast.type]}`}>
        {icons[toast.type]}
      </span>
      <span className="flex-1">{toast.message}</span>
      <button onClick={onDismiss} className="opacity-40 hover:opacity-70 ml-1 text-xs">✕</button>
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all placeholder-gray-400";

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ name, size = 'sm' }: { name: string; size?: 'sm' | 'md' }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const sizeClass = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';
  return (
    <div className={`${sizeClass} rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SchedulesManager({ initialSchedules = [], initialStudents = [] }: Props) {
  const [schedules, setSchedules]       = useState<Schedule[]>(initialSchedules);
  const [students, setStudents]         = useState<Student[]>(initialStudents);
  const [loading, setLoading]           = useState(initialSchedules.length === 0);
  const [modalOpen, setModalOpen]       = useState(false);
  const [editingId, setEditingId]       = useState<string | null>(null);
  const [form, setForm]                 = useState(EMPTY_FORM);
  const [submitting, setSubmitting]     = useState(false);
  const [testingId, setTestingId]       = useState<string | null>(null);
  const [deletingId, setDeletingId]     = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Schedule | null>(null);
  const [toasts, setToasts]             = useState<IToast[]>([]);
  const [dayFilter, setDayFilter]       = useState<number | 'all'>('all');

  useEffect(() => {
    if (initialSchedules.length === 0) fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const [sr, tr] = await Promise.all([
        fetch('/api/schedules').then(r => r.json()),
        fetch('/api/students').then(r => r.json()),
      ]);
      if (sr.success) setSchedules(sr.schedules);
      if (tr.success) setStudents(tr.students);
    } catch {
      addToast('Failed to load data', 'error');
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

  function openEdit(s: Schedule) {
    setForm({
      studentId:       s.studentId._id,
      className:       s.className,
      classType:       s.classType,
      dayOfWeek:       s.dayOfWeek,
      time:            s.time,
      duration:        s.duration,
      reminderMinutes: s.reminderMinutes,
      active:          s.active,
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
      const url    = editingId ? `/api/schedules/${editingId}` : '/api/schedules';
      const method = editingId ? 'PUT' : 'POST';
      const res    = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      if (editingId) {
        setSchedules(p => p.map(s => s._id === editingId ? data.schedule : s));
        addToast('Schedule updated');
      } else {
        setSchedules(p => [data.schedule, ...p]);
        addToast('Schedule created');
      }
      closeModal();
    } catch (err: any) {
      addToast(err.message || 'Failed to save', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(schedule: Schedule) {
    setDeleteTarget(null);
    setDeletingId(schedule._id);
    try {
      const res  = await fetch(`/api/schedules/${schedule._id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setSchedules(p => p.filter(s => s._id !== schedule._id));
      addToast(`"${schedule.className}" deleted`);
    } catch (err: any) {
      addToast(err.message || 'Delete failed', 'error');
    } finally {
      setDeletingId(null);
    }
  }

  async function handleToggle(schedule: Schedule) {
    try {
      const res  = await fetch(`/api/schedules/${schedule._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !schedule.active }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setSchedules(p => p.map(s => s._id === schedule._id ? data.schedule : s));
      addToast(`${schedule.className} ${!schedule.active ? 'activated' : 'deactivated'}`, 'info');
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  }

  async function handleTest(schedule: Schedule) {
    setTestingId(schedule._id);
    try {
      const res  = await fetch(`/api/schedules/test/${schedule._id}`, { method: 'POST' });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      addToast(data.message, 'success');
    } catch (err: any) {
      addToast(err.message || 'Failed to send reminder', 'error');
    } finally {
      setTestingId(null);
    }
  }

  const filtered        = dayFilter === 'all' ? schedules : schedules.filter(s => s.dayOfWeek === dayFilter);
  const selectedStudent = students.find(s => s._id === form.studentId);
  const stats = {
    total:  schedules.length,
    active: schedules.filter(s => s.active).length,
    online: schedules.filter(s => s.classType === 'online').length,
    onsite: schedules.filter(s => s.classType === 'onsite').length,
  };

  return (
    <div className="text-gray-800 bg-gray-50 min-h-screen p-6">
      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(8px);  } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.2s ease; }
        select option { background:#ffffff; color:#111827; }
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
          <h1 className="text-2xl font-bold text-gray-900">Class Schedules</h1>
          <p className="text-gray-500 text-sm mt-1">Manage classes and automated Telegram reminders</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Schedule
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {([
          { label: 'Total',  val: stats.total,  color: 'text-blue-600',    sub: 'All schedules'    },
          { label: 'Active', val: stats.active, color: 'text-emerald-600', sub: 'Currently running' },
          { label: 'Online', val: stats.online, color: 'text-purple-600',  sub: 'Virtual classes'  },
          { label: 'Onsite', val: stats.onsite, color: 'text-amber-600',   sub: 'In-person'        },
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

      {/* Day filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(['all', ...DAYS.map((_, i) => i)] as (number | 'all')[]).map(d => (
          <button
            key={String(d)}
            onClick={() => setDayFilter(d)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
              dayFilter === d
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-600'
            }`}
          >
            {d === 'all' ? 'All Days' : DAYS[d as number].slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl mb-4">📅</div>
            <p className="text-lg font-semibold text-gray-700">No schedules found</p>
            <p className="text-sm text-gray-400 mt-1 mb-5">
              {dayFilter !== 'all' ? 'Try a different day, or ' : ''}create your first schedule.
            </p>
            <button
              onClick={openCreate}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
            >
              Create Schedule
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  {['Student', 'Class', 'Schedule', 'Reminder', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(sc => (
                  <tr key={sc._id} className="hover:bg-gray-50/60 transition-colors fade-up">

                    {/* Student */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={sc.studentId.name} />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{sc.studentId.name}</p>
                          <p className={`text-xs ${sc.studentId.telegramChatId ? 'text-emerald-500' : 'text-amber-500'}`}>
                            {sc.studentId.telegramChatId ? '✓ Telegram' : '⚠ No Telegram'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Class */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-gray-900">{sc.className}</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium mt-1 ${
                        sc.classType === 'online'
                          ? 'bg-blue-50 text-blue-600 border border-blue-100'
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {sc.classType === 'online' ? '💻' : '🏫'} {sc.classType}
                      </span>
                    </td>

                    {/* Schedule */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="text-sm font-semibold text-gray-900">{DAYS[sc.dayOfWeek]}</p>
                      <p className="text-xs text-gray-400">{sc.time} · {sc.duration}min</p>
                    </td>

                    {/* Reminder */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                        🔔 {sc.reminderMinutes >= 60 ? `${sc.reminderMinutes / 60}h` : `${sc.reminderMinutes}min`} before
                      </span>
                    </td>

                    {/* Status toggle */}
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggle(sc)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${sc.active ? 'bg-emerald-500' : 'bg-gray-200'}`}
                        title={sc.active ? 'Click to deactivate' : 'Click to activate'}
                      >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${sc.active ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
                      </button>
                      <p className={`text-xs mt-0.5 font-medium ${sc.active ? 'text-emerald-500' : 'text-gray-400'}`}>
                        {sc.active ? 'Active' : 'Paused'}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleTest(sc)}
                          disabled={!sc.studentId.telegramChatId || testingId === sc._id}
                          title={sc.studentId.telegramChatId ? 'Send test reminder' : 'No Telegram ID'}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          {testingId === sc._id ? (
                            <div className="w-4 h-4 border border-blue-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => openEdit(sc)}
                          title="Edit"
                          className="p-1.5 rounded-lg hover:bg-purple-50 text-purple-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteTarget(sc)}
                          disabled={deletingId === sc._id}
                          title="Delete"
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 disabled:opacity-30 transition-colors"
                        >
                          {deletingId === sc._id ? (
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

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-xl shadow-xl fade-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  {editingId ? 'Edit Schedule' : 'New Schedule'}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">Fill in the details below</p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
              <Field label="Student" required>
                <select
                  required
                  value={form.studentId}
                  onChange={e => setForm({ ...form, studentId: e.target.value })}
                  className={inputCls}
                >
                  <option value="">Select a student...</option>
                  {students.map(s => (
                    <option key={s._id} value={s._id}>
                      {s.name} {s.telegramChatId ? '✓' : '⚠ No Telegram'}
                    </option>
                  ))}
                </select>
                {selectedStudent && !selectedStudent.telegramChatId && (
                  <p className="text-amber-500 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span> No Telegram ID — reminders won't be sent
                  </p>
                )}
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Class Name" required>
                  <input
                    required type="text" placeholder="e.g. Piano Lesson"
                    value={form.className}
                    onChange={e => setForm({ ...form, className: e.target.value })}
                    className={inputCls}
                  />
                </Field>
                <Field label="Type">
                  <select
                    value={form.classType}
                    onChange={e => setForm({ ...form, classType: e.target.value as 'online' | 'onsite' })}
                    className={inputCls}
                  >
                    <option value="online">💻 Online</option>
                    <option value="onsite">🏫 Onsite</option>
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Day">
                  <select
                    value={form.dayOfWeek}
                    onChange={e => setForm({ ...form, dayOfWeek: +e.target.value })}
                    className={inputCls}
                  >
                    {DAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}
                  </select>
                </Field>
                <Field label="Time">
                  <input
                    type="time" value={form.time}
                    onChange={e => setForm({ ...form, time: e.target.value })}
                    className={inputCls}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Duration">
                  <select
                    value={form.duration}
                    onChange={e => setForm({ ...form, duration: +e.target.value })}
                    className={inputCls}
                  >
                    {[30, 45, 60, 90, 120].map(d => <option key={d} value={d}>{d} min</option>)}
                  </select>
                </Field>
                <Field label="Remind Before">
                  <select
                    value={form.reminderMinutes}
                    onChange={e => setForm({ ...form, reminderMinutes: +e.target.value })}
                    className={inputCls}
                  >
                    {[5, 15, 30, 60, 120, 1440].map(m => (
                      <option key={m} value={m}>{m >= 60 ? `${m / 60}h` : `${m}min`} before</option>
                    ))}
                  </select>
                </Field>
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
                  {form.active ? 'Active — reminders will be sent' : 'Paused — no reminders'}
                </span>
              </div>

              {form.studentId && form.className && (
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                  <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-3">📱 Telegram Preview</p>
                  <div className="bg-white border border-purple-100 rounded-lg p-3 text-sm text-gray-700 space-y-0.5 font-mono shadow-sm">
                    <p>{form.classType === 'online' ? '💻' : '🏫'} <b className="text-gray-900">Class Reminder</b></p>
                    <p className="mt-1">Hi <b className="text-purple-600">{selectedStudent?.name}</b>!</p>
                    <p className="mt-1">📚 <span className="text-purple-600">{form.className}</span></p>
                    <p>⏰ <span className="text-purple-600">{form.time}</span></p>
                    <p>📍 <span className="text-purple-600">{form.classType.toUpperCase()}</span></p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-1">
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
                  ) : editingId ? 'Save Changes' : 'Create Schedule'}
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
            <h3 className="text-base font-bold text-gray-900 mb-1">Delete Schedule</h3>
            <p className="text-gray-500 text-sm mb-6">
              Delete <strong className="text-gray-900">"{deleteTarget.className}"</strong> for{' '}
              <strong className="text-gray-900">{deleteTarget.studentId.name}</strong>? This cannot be undone.
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}