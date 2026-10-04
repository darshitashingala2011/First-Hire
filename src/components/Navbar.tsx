import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { ActivePage } from '../types';
import {
  Briefcase,
  FileText,
  MapPin,
  HelpCircle,
  Video,
  Bell,
  Sun,
  Moon,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Target,
  BarChart3,
  Layers,
  Sparkles,
  Compass,
  CheckCircle2,
  Wand2
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, switchDemoUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { activePage, setActivePage, notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read);

  const navLinks: { id: ActivePage; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'resume-builder', label: 'Resume', icon: FileText },
    { id: 'career-analysis', label: 'Career AI', icon: Sparkles },
    { id: 'skill-gap', label: 'Skill Gap', icon: Layers },
    { id: 'roadmap', label: 'Roadmap', icon: Target },
    { id: 'practice', label: 'Practice', icon: HelpCircle },
    { id: 'mock-interview', label: 'AI Interview', icon: Video },
    { id: 'ai-studio', label: 'AI Studio', icon: Wand2 },
    { id: 'opportunities', label: 'Jobs', icon: Briefcase },
    { id: 'application-tracker', label: 'Tracker', icon: Compass }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActivePage(isAuthenticated ? 'dashboard' : 'landing')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  FirstHire
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    AI
                  </span>
                </span>
                <span className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                  Career Launchpad
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            {isAuthenticated && (
              <nav className="hidden xl:flex items-center gap-1">
                {navLinks.map(link => {
                  const Icon = link.icon;
                  const isActive = activePage === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => setActivePage(link.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {link.label}
                    </button>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Right Action Icons & User Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Animated Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle light and dark theme"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 rotate-0 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300" />
              )}
            </button>

            {isAuthenticated ? (
              <>
                {/* Notifications Bell */}
                <div className="relative">
                  <button
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                    aria-label="Notifications"
                    className="relative p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadNotifs.length > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
                    )}
                  </button>

                  {/* Notifications Popover */}
                  {isNotifOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            Notifications
                          </span>
                          {unreadNotifs.length > 0 && (
                            <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-medium">
                              {unreadNotifs.length} new
                            </span>
                          )}
                        </div>
                        {unreadNotifs.length > 0 && (
                          <button
                            onClick={markAllNotificationsRead}
                            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>

                      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-xs text-slate-500">
                            No notifications at this time
                          </div>
                        ) : (
                          notifications.map(n => (
                            <div
                              key={n.id}
                              onClick={() => {
                                markNotificationRead(n.id);
                                if (n.actionRoute) {
                                  setActivePage(n.actionRoute);
                                  setIsNotifOpen(false);
                                }
                              }}
                              className={`p-3.5 text-left cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                                !n.read ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                  {n.title}
                                </p>
                                <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                {n.message}
                              </p>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="p-2 border-t border-slate-100 dark:border-slate-800 text-center bg-slate-50 dark:bg-slate-900/60">
                        <button
                          onClick={() => {
                            setActivePage('notifications');
                            setIsNotifOpen(false);
                          }}
                          className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1 pl-2 pr-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xs font-semibold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="hidden md:inline-block text-xs font-medium text-slate-800 dark:text-slate-200 max-w-[110px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50 p-2">
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                        <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {user?.name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {user?.email}
                        </p>
                        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-indigo-600 dark:text-indigo-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Readiness: {user?.careerReadinessScore}%</span>
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <button
                          onClick={() => {
                            setActivePage('profile');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                        >
                          <User className="w-3.5 h-3.5" />
                          <span>Student Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            setActivePage('portfolio-builder');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Live Portfolio Preview</span>
                        </button>
                        <button
                          onClick={() => {
                            setActivePage('settings');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>Settings & Preferences</span>
                        </button>
                      </div>

                      {/* Demo Profile Quick Switcher */}
                      <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                          Switch Student Demo
                        </p>
                        <div className="grid grid-cols-3 gap-1 px-1">
                          <button
                            onClick={() => {
                              switchDemoUser('ananya');
                              setIsUserMenuOpen(false);
                            }}
                            className="px-2 py-1 text-[11px] rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
                          >
                            Ananya
                          </button>
                          <button
                            onClick={() => {
                              switchDemoUser('alex');
                              setIsUserMenuOpen(false);
                            }}
                            className="px-2 py-1 text-[11px] rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
                          >
                            Alex
                          </button>
                          <button
                            onClick={() => {
                              switchDemoUser('marcus');
                              setIsUserMenuOpen(false);
                            }}
                            className="px-2 py-1 text-[11px] rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
                          >
                            Marcus
                          </button>
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => {
                            logout();
                            setActivePage('landing');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePage('login')}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => setActivePage('login')}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-all shadow-indigo-500/20"
                >
                  Get Started Free
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            {isAuthenticated && (
              <button
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                className="xl:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileNavOpen && isAuthenticated && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  setIsMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
