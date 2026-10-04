import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JobApplication } from '../types';
import {
  Compass,
  Plus,
  Calendar,
  Building2,
  DollarSign,
  ChevronRight,
  Trash2,
  CheckCircle2,
  ArrowRight,
  MoreVertical,
  Briefcase
} from 'lucide-react';

const COLUMNS: { id: JobApplication['status']; label: string; color: string }[] = [
  { id: 'wishlist', label: 'Wishlist & To Apply', color: 'border-slate-300 dark:border-slate-700' },
  { id: 'applied', label: 'Applied', color: 'border-indigo-500' },
  { id: 'screening', label: 'Screening / Assessment', color: 'border-cyan-500' },
  { id: 'interview', label: 'Interview Scheduled', color: 'border-purple-500' },
  { id: 'offer', label: 'Offer Received', color: 'border-emerald-500' }
];

export const ApplicationTrackerPage: React.FC = () => {
  const { applications, updateApplicationStatus, deleteApplication, addApplication } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newLocation, setNewLocation] = useState('Remote');
  const [newCompensation, setNewCompensation] = useState('');
  const [newStatus, setNewStatus] = useState<JobApplication['status']>('applied');
  const [newNotes, setNewNotes] = useState('');

  const handleCreateApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newRole.trim()) return;

    addApplication({
      company: newCompany.trim(),
      role: newRole.trim(),
      location: newLocation.trim(),
      status: newStatus,
      compensation: newCompensation.trim() || undefined,
      notes: newNotes.trim() || 'Applied via campus portal.'
    });

    setNewCompany('');
    setNewRole('');
    setNewCompensation('');
    setNewNotes('');
    setShowAddModal(false);
  };

  const advanceStatus = (app: JobApplication) => {
    const statuses: JobApplication['status'][] = ['wishlist', 'applied', 'screening', 'interview', 'offer'];
    const currentIdx = statuses.indexOf(app.status);
    if (currentIdx < statuses.length - 1) {
      updateApplicationStatus(app.id, statuses[currentIdx + 1]);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Recruiting Application Pipeline</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                Kanban Board
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track your status across screening, technical rounds, and offer packages.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Application</span>
        </button>
      </div>

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
        {COLUMNS.map(col => {
          const colApps = applications.filter(a => a.status === col.id);

          return (
            <div
              key={col.id}
              className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 min-h-[400px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {col.label}
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-400 px-1.5 py-0.5 rounded bg-white dark:bg-slate-800">
                  {colApps.length}
                </span>
              </div>

              {/* Application Cards */}
              <div className="space-y-3">
                {colApps.map(app => (
                  <div
                    key={app.id}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-2 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {app.company}
                        </h4>
                        <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium line-clamp-1">
                          {app.role}
                        </p>
                      </div>

                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-500 space-y-0.5">
                      <p>{app.location}</p>
                      {app.compensation && (
                        <p className="text-slate-700 dark:text-slate-300 font-semibold">{app.compensation}</p>
                      )}
                      {app.nextStepDate && (
                        <p className="text-purple-600 dark:text-purple-400 font-medium">
                          Next Round: {app.nextStepDate}
                        </p>
                      )}
                    </div>

                    {app.notes && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg line-clamp-2">
                        {app.notes}
                      </p>
                    )}

                    {/* Move forward button */}
                    {col.id !== 'offer' && (
                      <button
                        onClick={() => advanceStatus(app)}
                        className="w-full mt-2 py-1 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>Advance Stage</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}

                {colApps.length === 0 && (
                  <div className="py-8 text-center text-[11px] text-slate-400">
                    No roles in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateApp}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Track New Application
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Company Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Datadog, Stripe"
                value={newCompany}
                onChange={e => setNewCompany(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Role Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Software Engineer — New Grad"
                value={newRole}
                onChange={e => setNewRole(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Remote / SF"
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Stage
                </label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value="wishlist">Wishlist</option>
                  <option value="applied">Applied</option>
                  <option value="screening">Screening</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Recruiter Notes / Interview Date
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Passed initial coding screen, final scheduled for Friday..."
                value={newNotes}
                onChange={e => setNewNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
              >
                Save Application
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
