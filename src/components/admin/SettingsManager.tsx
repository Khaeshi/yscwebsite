import { useState } from 'react';

type ToastType = 'success' | 'error';
interface IToast { id: number; message: string; type: ToastType; }

function Toast({ toast, onDismiss }: { toast: IToast; onDismiss: () => void }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium border bg-white ${
      toast.type === 'success' ? 'border-green-200 text-green-800' : 'border-red-200 text-red-800'
    }`}>
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
      <span className="flex-1">{toast.message}</span>
      <button onClick={onDismiss} className="opacity-40 hover:opacity-70 text-xs">✕</button>
    </div>
  );
}

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors placeholder-gray-400 bg-white";
const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

type Tab = 'general' | 'telegram' | 'notifications' | 'danger';

export default function SettingsManager() {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [saving, setSaving]       = useState(false);
  const [toasts, setToasts]       = useState<IToast[]>([]);

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
      // POST to /api/settings when ready
      await new Promise(r => setTimeout(r, 800)); // simulate save
      addToast(`${section} settings saved`);
    } catch {
      addToast('Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  }

  const tabs: { id: Tab; label: string;}[] = [
    { id: 'general',       label: 'General' },
    { id: 'telegram',      label: 'Telegram Bot' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'danger',        label: 'Danger Zone', },
  ];

  return (
    <div className="text-gray-900">
      {/* Toasts */}
      <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 w-72">
        {toasts.map(t => <Toast key={t.id} toast={t} onDismiss={() => setToasts(p => p.filter(x => x.id !== t.id))} />)}
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure your school and system preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                  activeTab === tab.id
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* General */}
          {activeTab === 'general' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-base font-bold text-gray-900 mb-5">General Settings</h2>
              <div className="space-y-4 max-w-lg">
                <div>
                  <label className={labelCls}>School Name</label>
                  <input type="text" value={general.schoolName}
                    onChange={e => setGeneral({ ...general, schoolName: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Admin Email</label>
                  <input type="email" value={general.schoolEmail}
                    onChange={e => setGeneral({ ...general, schoolEmail: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Phone</label>
                  <input type="tel" placeholder="+63 917 123 4567" value={general.schoolPhone}
                    onChange={e => setGeneral({ ...general, schoolPhone: e.target.value })} className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Timezone</label>
                    <select value={general.timezone} onChange={e => setGeneral({ ...general, timezone: e.target.value })} className={inputCls}>
                      <option value="Asia/Manila">Asia/Manila (PHT)</option>
                      <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Currency</label>
                    <select value={general.currency} onChange={e => setGeneral({ ...general, currency: e.target.value })} className={inputCls}>
                      <option value="PHP">PHP (₱)</option>
                      <option value="USD">USD ($)</option>
                      <option value="SGD">SGD (S$)</option>
                    </select>
                  </div>
                </div>
                <div className="pt-2">
                  <button onClick={() => handleSave('General')} disabled={saving}
                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                    {saving ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Telegram */}
          {activeTab === 'telegram' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-base font-bold text-gray-900 mb-1">Telegram Bot Settings</h2>
              <p className="text-sm text-gray-500 mb-5">Configure your Telegram bot for automated class reminders.</p>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 text-sm text-blue-700">
                <strong>Setup:</strong> Create a bot via <code className="bg-blue-100 px-1 rounded">@BotFather</code> on Telegram → get your token → paste below.
              </div>

              <div className="space-y-4 max-w-lg">
                <div>
                  <label className={labelCls}>Bot Token</label>
                  <input type="password" placeholder="123456789:ABCdefGHI..." value={telegram.botToken}
                    onChange={e => setTelegram({ ...telegram, botToken: e.target.value })} className={inputCls} />
                  <p className="text-xs text-gray-400 mt-1">Keep this secret. Never share it publicly.</p>
                </div>
                <div>
                  <label className={labelCls}>Bot Username</label>
                  <input type="text" placeholder="@YSCReminderBot" value={telegram.botUsername}
                    onChange={e => setTelegram({ ...telegram, botUsername: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Default Reminder (minutes before class)</label>
                  <select value={telegram.defaultReminderMinutes}
                    onChange={e => setTelegram({ ...telegram, defaultReminderMinutes: e.target.value })} className={inputCls}>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="1440">1 day before</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Reminder Message Template</label>
                  <textarea rows={3} value={telegram.reminderMessage}
                    onChange={e => setTelegram({ ...telegram, reminderMessage: e.target.value })}
                    className={inputCls + ' resize-none font-mono text-xs'} />
                  <p className="text-xs text-gray-400 mt-1">
                    Variables: <code className="bg-gray-100 px-1 rounded">{'{name}'}</code>{' '}
                    <code className="bg-gray-100 px-1 rounded">{'{class}'}</code>{' '}
                    <code className="bg-gray-100 px-1 rounded">{'{minutes}'}</code>
                  </p>
                </div>
                <div className="pt-2 flex gap-3">
                  <button onClick={() => handleSave('Telegram')} disabled={saving}
                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                    {saving ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : 'Save Changes'}
                  </button>
                  <button onClick={() => addToast('Test message sent! Check your Telegram.')}
                    className="border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
                    Send Test Message
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-base font-bold text-gray-900 mb-5">Notification Preferences</h2>
              <div className="space-y-4 max-w-lg">
                {([
                  { key: 'emailOnNewStudent',     label: 'Email when a new student is added',    desc: 'Receive an email notification for new student registrations' },
                  { key: 'emailOnScheduleChange', label: 'Email on schedule changes',             desc: 'Get notified when schedules are created or modified' },
                  { key: 'telegramReminders',     label: 'Send Telegram reminders to students',  desc: 'Automatically send class reminders via Telegram bot' },
                  { key: 'reminderBeforeClass',   label: 'Pre-class reminder',                   desc: 'Send reminder at the configured time before each class' },
                ] as const).map(item => (
                  <div key={item.key} className="flex items-start justify-between gap-4 py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications(p => ({ ...p, [item.key]: !p[item.key] }))}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${notifications[item.key] ? 'bg-purple-600' : 'bg-gray-200'}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
                <div className="pt-2">
                  <button onClick={() => handleSave('Notifications')} disabled={saving}
                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                    {saving ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Danger Zone */}
          {activeTab === 'danger' && (
            <div className="space-y-4">
              <div className="bg-white border border-red-200 rounded-2xl p-6">
                <h2 className="text-base font-bold text-red-600 mb-1">Danger Zone</h2>
                <p className="text-sm text-gray-500 mb-5">These actions are irreversible. Please proceed with caution.</p>
                <div className="space-y-4">
                  {[
                    { label: 'Clear All Schedules', desc: 'Permanently delete all class schedules. Students will not be affected.', action: 'Clear Schedules' },
                    { label: 'Reset Student Data', desc: 'Remove all students and their associated data from the system.', action: 'Reset Students' },
                    { label: 'Factory Reset', desc: 'Wipe all data and reset the system to its initial state.', action: 'Factory Reset' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between gap-4 p-4 border border-red-100 rounded-xl bg-red-50/30">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => addToast(`⚠️ "${item.action}" requires confirmation — not yet implemented`, 'error')}
                        className="flex-shrink-0 border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                        {item.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}