import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  Globe,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Layers,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  ArrowRight
} from 'lucide-react';

export const PortfolioBuilderPage: React.FC = () => {
  const { user } = useAuth();
  const { projects, skills, portfolioSettings, updatePortfolioSettings } = useApp();

  const [copied, setCopied] = useState(false);
  const publicUrl = `https://firsthire.dev/@${user?.name?.toLowerCase().replace(/\s+/g, '-') || 'student'}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedProjects = projects.filter(p =>
    portfolioSettings.highlightedProjectIds.includes(p.id) || p.featured
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Personal Portfolio Generator</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                Live URL
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Host your projects, code samples, and architecture notes in a clean recruiter-friendly portfolio.
            </p>
          </div>
        </div>

        {/* Share Link Actions */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 max-w-[200px] truncate">
            {publicUrl}
          </div>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>

      {/* Portfolio Config Controls */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Theme:</span>
          {(['developer', 'minimal', 'executive'] as const).map(tmpl => (
            <button
              key={tmpl}
              onClick={() => updatePortfolioSettings({ template: tmpl })}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all capitalize ${
                portfolioSettings.template === tmpl
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {tmpl}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={portfolioSettings.showContactForm}
              onChange={e => updatePortfolioSettings({ showContactForm: e.target.checked })}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Include Direct Recruiter Message Form</span>
          </label>
        </div>
      </div>

      {/* Live Interactive Portfolio Webpage Preview Frame */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden bg-slate-950 text-slate-100">
        {/* Browser Mock Chrome Bar */}
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="px-4 py-1 rounded-md bg-slate-950 text-slate-400 text-[11px] font-mono border border-slate-800">
            {publicUrl}
          </div>
          <div className="text-[11px] text-slate-500">Live Preview</div>
        </div>

        {/* Portfolio Content */}
        <div className="p-8 sm:p-14 space-y-12 max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for 2026 Full-Time & Internship Roles</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {user?.name || 'Ananya Sharma'}
            </h1>

            <p className="text-base text-slate-300 leading-relaxed font-light">
              {user?.headline || 'Aspiring Software Engineer · UC Berkeley CS Senior'}
            </p>

            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              {user?.bio || portfolioSettings.customBio}
            </p>

            <div className="flex items-center gap-3 pt-2">
              {user?.githubUrl && (
                <a
                  href={user.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {user?.linkedinUrl && (
                <a
                  href={user.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              <a
                href={`mailto:${user?.email}`}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          {/* Featured Projects Grid */}
          <div className="space-y-6 pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
                Selected Engineering Work
              </h2>
              <span className="text-xs text-slate-500 font-mono">01 // PROJECTS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedProjects.map(proj => (
                <div
                  key={proj.id}
                  className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm font-bold text-white">{proj.title}</h3>
                      {proj.githubUrl && (
                        <ExternalLink className="w-4 h-4 text-slate-500 hover:text-white" />
                      )}
                    </div>
                    {proj.subtitle && (
                      <p className="text-xs text-indigo-300 font-mono mb-2">{proj.subtitle}</p>
                    )}
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {proj.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {proj.technologies.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                    {proj.metrics && (
                      <p className="text-[11px] text-emerald-400 font-mono">
                        → {proj.metrics}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technologies Constellation */}
          <div className="space-y-4 pt-6 border-t border-slate-800/80">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              Technical Stack & Competencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(sk => (
                <span
                  key={sk.id}
                  className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{sk.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Recruiter Contact Form */}
          {portfolioSettings.showContactForm && (
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>Get in touch directly</span>
              </h3>
              <p className="text-xs text-slate-400">
                Are you a recruiter or hiring manager? Send an interview invite or message to {user?.email}.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Recruiter at Stripe)"
                  className="px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
                <input
                  type="email"
                  placeholder="Your Work Email"
                  className="px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Hi, we would love to connect about an early career engineering opportunity..."
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white"
              />
              <button
                type="button"
                onClick={() => alert('Message dispatch simulated! In production, this forwards directly to the student email.')}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500"
              >
                Send Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
