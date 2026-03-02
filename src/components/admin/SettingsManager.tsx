import { useState } from 'react';

type ToastType = 'success' | 'error';
interface IToast { id: number; message: string; type: ToastType; }

function Toast({ toast, onDismiss }: { toast: IToast; onDismiss: () => void }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-sm font-medium backdrop-blur-sm ${
      toast.type === 'success'
        ? 'bg-white border border-emerald-100 text-emerald-800'
        : 'bg-white border border-red-100 text-red-800'
    }`}>
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${toast.type === 'success' ? 'bg-emerald-400' : 'bg-red-400'}`} />
      <span className="flex-1">{toast.message}</span>
      <button onClick={onDismiss} className="opacity-30 hover:opacity-60 transition-opacity ml-1">✕</button>
    </div>
  );
}

const inputCls = "w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-300 bg-white";
const labelCls = "block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5";

type Tab = 'general' | 'telegram' | 'notifications' | 'danger';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: 'general',
    label: 'General',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'telegram',
    label: 'Telegram Bot',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
      </svg>
    ),
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    id: 'danger',
    label: 'Danger Zone',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
];

function SaveButton({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-60 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm shadow-violet-200 hover:shadow-md hover:shadow-violet-200"
    >
      {saving ? (
        <>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Saving…
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Save Changes
        </>
      )}
    </button>
  );
}

export default function SettingsManager() {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [saving, setSaving]       = useState(false);
  const [toasts, setToasts]       = useState<IToast[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [general, setGeneral] = useState({
    schoolName: 'YSC Language School',
    schoolEmail: 'admin@ysc.com',
    schoolPhone: '',
    timezone: 'Asia/Manila',
    currency: 'PHP',
  });

  const [telegram, setTelegram] = useState({
    botToken: '',
    botUsername: '',
    defaultReminderMinutes: '60',
    reminderMessage: 'Hi {name}! Reminder: your {class} class starts in {minutes} minutes. See you soon! 📚',
  });

  const [notifications, setNotifications] = useState({
    emailOnNewStudent: true,
    emailOnScheduleChange: true,
    telegramReminders: true,
    reminderBeforeClass: true,
  });

  function addToast(message: string, type: ToastType = 'success') {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  }

  async function handleSave(section: string) {
    setSaving(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      addToast(`${section} settings saved successfully`);
    } catch {
      addToast('Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  }

  const activeTabData = TABS.find(t => t.id === activeTab)!;

  return (
    <div className="text-gray-900 max-w-4xl mx-auto">
      {/* Toasts */}
      <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 w-72 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            <Toast toast={t} onDismiss={() => setToasts(p => p.filter(x => x.id !== t.id))} />
          </div>
        ))}
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-gray-400 text-sm mt-0.5">Manage your school and system preferences</p>
      </div>

      {/* Mobile: tab selector pill row (scrollable) — hidden on sm+ */}
      <div className="flex sm:hidden gap-2 mb-4 overflow-x-auto pb-1 -mx-3 px-3">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? tab.id === 'danger'
                  ? 'bg-red-500 text-white shadow-sm'
                  : 'bg-violet-600 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            <span className="opacity-80">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* sm+: sidebar + content side by side | mobile: content only (tabs above) */}
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Sidebar — hidden on mobile, shown on sm+ */}
        <aside className="hidden sm:block w-44 flex-shrink-0">
          <div className="bg-white border border-gray-100 rounded-2xl p-2 shadow-sm">
            <nav className="space-y-0.5">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                    activeTab === tab.id
                      ? tab.id === 'danger'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-violet-50 text-violet-700'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <span className={activeTab === tab.id ? (tab.id === 'danger' ? 'text-red-500' : 'text-violet-500') : 'text-gray-400'}>
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content panel */}
        <div className="flex-1 min-w-0">

          {/* ── General ── */}
          {activeTab === 'general' && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <h2 className="font-bold text-gray-900">General</h2>
                <p className="text-xs text-gray-400 mt-0.5">Basic information about your school</p>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className={labelCls}>School Name</label>
                  <input type="text" value={general.schoolName}
                    onChange={e => setGeneral({ ...general, schoolName: e.target.value })}
                    className={inputCls} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Admin Email</label>
                    <input type="email" value={general.schoolEmail}
                      onChange={e => setGeneral({ ...general, schoolEmail: e.target.value })}
                      className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input type="tel" placeholder="+63 917 123 4567" value={general.schoolPhone}
                      onChange={e => setGeneral({ ...general, schoolPhone: e.target.value })}
                      className={inputCls} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Timezone</label>
                    <select value={general.timezone}
                      onChange={e => setGeneral({ ...general, timezone: e.target.value })}
                      className={inputCls}>
                      <option value="Asia/Manila">Asia/Manila (PHT)</option>
                      <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Currency</label>
                    <select value={general.currency}
                      onChange={e => setGeneral({ ...general, currency: e.target.value })}
                      className={inputCls}>
                      <option value="PHP">PHP (₱)</option>
                      <option value="USD">USD ($)</option>
                      <option value="SGD">SGD (S$)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="px-5 py-4 bg-gray-50/50 border-t border-gray-50 flex justify-end">
                <SaveButton saving={saving} onClick={() => handleSave('General')} />
              </div>
            </div>
          )}

          {/* ── Telegram ── */}
          {activeTab === 'telegram' && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <h2 className="font-bold text-gray-900">Telegram Bot</h2>
                <p className="text-xs text-gray-400 mt-0.5">Automated class reminders via Telegram</p>
              </div>

              {/* Info banner */}
              <div className="mx-5 mt-5 flex gap-3 bg-sky-50 border border-sky-100 rounded-xl p-3.5">
                <svg className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-sky-700 leading-relaxed">
                  Create a bot via <code className="bg-sky-100 px-1 py-0.5 rounded font-mono">@BotFather</code> on Telegram, copy your token, and paste it below.
                </p>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <label className={labelCls}>Bot Token</label>
                  <input type="password" placeholder="123456789:ABCdefGHI…"
                    value={telegram.botToken}
                    onChange={e => setTelegram({ ...telegram, botToken: e.target.value })}
                    className={inputCls} />
                  <p className="text-xs text-gray-300 mt-1">Never share this token publicly.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Bot Username</label>
                    <input type="text" placeholder="@YSCReminderBot"
                      value={telegram.botUsername}
                      onChange={e => setTelegram({ ...telegram, botUsername: e.target.value })}
                      className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Remind Before Class</label>
                    <select value={telegram.defaultReminderMinutes}
                      onChange={e => setTelegram({ ...telegram, defaultReminderMinutes: e.target.value })}
                      className={inputCls}>
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="1440">1 day before</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Message Template</label>
                  <textarea rows={3} value={telegram.reminderMessage}
                    onChange={e => setTelegram({ ...telegram, reminderMessage: e.target.value })}
                    className={inputCls + ' resize-none font-mono text-xs leading-relaxed'} />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {['{name}', '{class}', '{minutes}'].map(v => (
                      <span key={v} className="text-[11px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono">{v}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 bg-gray-50/50 border-t border-gray-50 flex flex-wrap items-center gap-3 justify-between">
                <button
                  onClick={() => addToast('Test message sent! Check your Telegram.')}
                  className="text-sm font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1.5 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Test
                </button>
                <SaveButton saving={saving} onClick={() => handleSave('Telegram')} />
              </div>
            </div>
          )}

          {/* ── Notifications ── */}
          {activeTab === 'notifications' && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <h2 className="font-bold text-gray-900">Notifications</h2>
                <p className="text-xs text-gray-400 mt-0.5">Choose what events trigger notifications</p>
              </div>
              <div className="divide-y divide-gray-50">
                {([
                  { key: 'emailOnNewStudent',     label: 'New student registered',    desc: 'Email when someone new is added to the system' },
                  { key: 'emailOnScheduleChange', label: 'Schedule changes',           desc: 'Email when classes are created or modified' },
                  { key: 'telegramReminders',     label: 'Telegram reminders',         desc: 'Send automated reminders to students via bot' },
                  { key: 'reminderBeforeClass',   label: 'Pre-class alert',            desc: 'Notify at configured time before each class' },
                ] as const).map(item => (
                  <div key={item.key} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications(p => ({ ...p, [item.key]: !p[item.key] }))}
                      className={`relative flex-shrink-0 h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-1 ${
                        notifications[item.key] ? 'bg-violet-500' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
                        notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="px-5 py-4 bg-gray-50/50 border-t border-gray-50 flex justify-end">
                <SaveButton saving={saving} onClick={() => handleSave('Notifications')} />
              </div>
            </div>
          )}

          {/* ── Danger Zone ── */}
          {activeTab === 'danger' && (
            <div className="bg-white border border-red-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-red-50 bg-red-50/40">
                <h2 className="font-bold text-red-600">Danger Zone</h2>
                <p className="text-xs text-red-400 mt-0.5">Irreversible actions — proceed carefully</p>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  {
                    label: 'Clear All Schedules',
                    desc: 'Permanently delete all class schedules.',
                    action: 'Clear',
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Reset Student Data',
                    desc: 'Remove all students and their records.',
                    action: 'Reset',
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Factory Reset',
                    desc: 'Wipe everything and return to default state.',
                    action: 'Reset All',
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    ),
                  },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4 px-5 py-4">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => addToast(`"${item.action}" requires confirmation — not yet implemented`, 'error')}
                      className="flex-shrink-0 border border-red-200 text-red-500 hover:bg-red-50 active:bg-red-100 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors"
                    >
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}