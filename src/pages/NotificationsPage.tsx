import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  CheckCircle2,
  Briefcase,
  Target,
  Video,
  FileCheck2,
  Trash2,
  ArrowRight
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, setActivePage } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter(n => (filter === 'unread' ? !n.read : true));

  const getIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return <Video className="w-4 h-4 text-purple-600" />;
      case 'job':
        return <Briefcase className="w-4 h-4 text-emerald-600" />;
      case 'roadmap':
        return <Target className="w-4 h-4 text-indigo-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              Notifications & Recruiting Alerts
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live updates on interview requests, high-match roles, and roadmap milestones.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              filter === 'unread'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {filter === 'unread' ? 'Showing Unread' : 'Filter Unread'}
          </button>
          <button
            onClick={markAllNotificationsRead}
            className="px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Mark all read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            No notifications in this category.
          </div>
        ) : (
          filtered.map(notif => (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationRead(notif.id);
                if (notif.actionRoute) setActivePage(notif.actionRoute);
              }}
              className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 transition-all flex items-start justify-between gap-4 cursor-pointer ${
                !notif.read ? 'bg-indigo-50/20 dark:bg-indigo-950/20' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {notif.message}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] text-slate-400 font-mono block">
                  {notif.timestamp}
                </span>
                {notif.actionRoute && (
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center justify-end gap-1 mt-1">
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
