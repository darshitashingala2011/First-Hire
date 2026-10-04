import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  User,
  GraduationCap,
  Layers,
  Code2,
  Briefcase,
  Plus,
  Trash2,
  Edit2,
  Check,
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  Sparkles
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const {
    education,
    addEducation,
    deleteEducation,
    skills,
    addSkill,
    deleteSkill,
    projects,
    addProject,
    deleteProject,
    experience,
    addExperience,
    deleteExperience
  } = useApp();

  // Active section tab
  const [activeTab, setActiveTab] = useState<'general' | 'education' | 'skills' | 'projects' | 'experience'>('general');

  // New Skill Modal/Form
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'Frontend' | 'Backend' | 'DSA' | 'Cloud/DevOps' | 'Database' | 'Soft Skills'>('Frontend');
  const [newSkillLevel, setNewSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Proficient' | 'Advanced'>('Proficient');

  // New Project Form
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectSubtitle, setNewProjectSubtitle] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectTech, setNewProjectTech] = useState('');
  const [newProjectGithub, setNewProjectGithub] = useState('');
  const [newProjectLive, setNewProjectLive] = useState('');
  const [newProjectMetrics, setNewProjectMetrics] = useState('');

  // New Education Form
  const [newEduSchool, setNewEduSchool] = useState('');
  const [newEduDegree, setNewEduDegree] = useState('');
  const [newEduField, setNewEduField] = useState('');
  const [newEduStart, setNewEduStart] = useState('');
  const [newEduEnd, setNewEduEnd] = useState('');
  const [newEduGpa, setNewEduGpa] = useState('');

  // New Experience Form
  const [newExpCompany, setNewExpCompany] = useState('');
  const [newExpRole, setNewExpRole] = useState('');
  const [newExpLocation, setNewExpLocation] = useState('');
  const [newExpDates, setNewExpDates] = useState('');
  const [newExpBullet1, setNewExpBullet1] = useState('');
  const [newExpBullet2, setNewExpBullet2] = useState('');

  // Save general info
  const [name, setName] = useState(user?.name || '');
  const [headline, setHeadline] = useState(user?.headline || '');
  const [targetRole, setTargetRole] = useState(user?.targetRole || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      headline,
      targetRole,
      bio
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill({
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: newSkillLevel,
      verified: true
    });
    setNewSkillName('');
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;
    addProject({
      title: newProjectTitle.trim(),
      subtitle: newProjectSubtitle.trim(),
      description: newProjectDesc.trim(),
      technologies: newProjectTech.split(',').map(s => s.trim()).filter(Boolean),
      githubUrl: newProjectGithub.trim() || undefined,
      liveUrl: newProjectLive.trim() || undefined,
      metrics: newProjectMetrics.trim() || undefined,
      featured: true
    });
    setNewProjectTitle('');
    setNewProjectSubtitle('');
    setNewProjectDesc('');
    setNewProjectTech('');
    setNewProjectGithub('');
    setNewProjectLive('');
    setNewProjectMetrics('');
  };

  const handleAddEducationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEduSchool.trim()) return;
    addEducation({
      school: newEduSchool.trim(),
      degree: newEduDegree.trim(),
      fieldOfStudy: newEduField.trim(),
      startDate: newEduStart.trim(),
      endDate: newEduEnd.trim(),
      gpa: newEduGpa.trim() || undefined
    });
    setNewEduSchool('');
    setNewEduDegree('');
    setNewEduField('');
    setNewEduStart('');
    setNewEduEnd('');
    setNewEduGpa('');
  };

  const handleAddExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpCompany.trim()) return;
    const bullets = [newExpBullet1, newExpBullet2].filter(b => b.trim().length > 0);
    addExperience({
      company: newExpCompany.trim(),
      role: newExpRole.trim(),
      location: newExpLocation.trim(),
      startDate: newExpDates.split('-')[0]?.trim() || '2025',
      endDate: newExpDates.split('-')[1]?.trim() || 'Present',
      type: 'Internship',
      isCurrent: false,
      bullets: bullets.length > 0 ? bullets : ['Developed and deployed core features using modern engineering workflows.']
    });
    setNewExpCompany('');
    setNewExpRole('');
    setNewExpLocation('');
    setNewExpDates('');
    setNewExpBullet1('');
    setNewExpBullet2('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Profile Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {user?.name}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {user?.headline}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span>{user?.college}</span>
              <span>·</span>
              <span>Class of {user?.graduationYear}</span>
              <span>·</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{user?.targetRole}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-800">
        {[
          { id: 'general', label: 'Overview & Bio', icon: User },
          { id: 'skills', label: `Skills (${skills.length})`, icon: Layers },
          { id: 'projects', label: `Projects (${projects.length})`, icon: Code2 },
          { id: 'experience', label: `Experience (${experience.length})`, icon: Briefcase },
          { id: 'education', label: `Education (${education.length})`, icon: GraduationCap }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: General Info */}
      {activeTab === 'general' && (
        <form onSubmit={handleSaveGeneral} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Personal & Career Persona
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Role
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={e => setHeadline(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              About / Bio
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {savedSuccess ? (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> Changes saved to your profile!
              </span>
            ) : <div />}
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              Save Profile Details
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Skills */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          {/* Add Skill Card */}
          <form onSubmit={handleAddSkillSubmit} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[180px]">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Skill Name
              </label>
              <input
                type="text"
                placeholder="e.g. GraphQL, Kubernetes, Redis"
                value={newSkillName}
                onChange={e => setNewSkillName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="w-40">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={newSkillCategory}
                onChange={e => setNewSkillCategory(e.target.value as any)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Cloud/DevOps">Cloud/DevOps</option>
                <option value="DSA">DSA</option>
                <option value="Soft Skills">Soft Skills</option>
              </select>
            </div>
            <div className="w-36">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Proficiency
              </label>
              <select
                value={newSkillLevel}
                onChange={e => setNewSkillLevel(e.target.value as any)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Proficient">Proficient</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </form>

          {/* Skill List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {skills.map(sk => (
              <div
                key={sk.id}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shadow-sm"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{sk.name}</p>
                  <p className="text-[11px] text-slate-500">
                    {sk.category} · <span className="text-indigo-600 dark:text-indigo-400 font-medium">{sk.level}</span>
                  </p>
                </div>
                <button
                  onClick={() => deleteSkill(sk.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/30"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          {/* Add Project Form */}
          <form onSubmit={handleAddProjectSubmit} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Add New Project
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Project Title (e.g. Real-Time Distributed Engine)"
                value={newProjectTitle}
                onChange={e => setNewProjectTitle(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Subtitle or One-liner"
                value={newProjectSubtitle}
                onChange={e => setNewProjectSubtitle(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <textarea
              rows={2}
              placeholder="What did you build? What architectural challenges did you solve?"
              value={newProjectDesc}
              onChange={e => setNewProjectDesc(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Technologies (comma separated: React, Node, Redis)"
                value={newProjectTech}
                onChange={e => setNewProjectTech(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="GitHub Repo URL"
                value={newProjectGithub}
                onChange={e => setNewProjectGithub(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Measurable Metrics (e.g. 500+ active users)"
                value={newProjectMetrics}
                onChange={e => setNewProjectMetrics(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save Project</span>
              </button>
            </div>
          </form>

          {/* Project Cards */}
          <div className="space-y-3">
            {projects.map(proj => (
              <div
                key={proj.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{proj.title}</h4>
                    {proj.subtitle && <span className="text-xs text-slate-500 italic">— {proj.subtitle}</span>}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                  {proj.metrics && (
                    <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                      ★ {proj.metrics}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => deleteProject(proj.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Experience */}
      {activeTab === 'experience' && (
        <div className="space-y-6">
          <form onSubmit={handleAddExperienceSubmit} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Add Internship / Campus Experience
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Company / Organization (e.g. Vercel, Meta)"
                value={newExpCompany}
                onChange={e => setNewExpCompany(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Role Title (e.g. Software Engineering Intern)"
                value={newExpRole}
                onChange={e => setNewExpRole(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Dates (e.g. May 2025 – Aug 2025)"
                value={newExpDates}
                onChange={e => setNewExpDates(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Location (e.g. San Francisco, CA / Hybrid)"
                value={newExpLocation}
                onChange={e => setNewExpLocation(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <input
              type="text"
              placeholder="Quantified accomplishment bullet 1 (e.g. Scaled API throughput by 35%...)"
              value={newExpBullet1}
              onChange={e => setNewExpBullet1(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Accomplishment bullet 2..."
              value={newExpBullet2}
              onChange={e => setNewExpBullet2(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Experience</span>
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {experience.map(exp => (
              <div
                key={exp.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{exp.role}</h4>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">@ {exp.company}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">{exp.startDate} – {exp.endDate} · {exp.location}</p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => deleteExperience(exp.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Education */}
      {activeTab === 'education' && (
        <div className="space-y-6">
          <form onSubmit={handleAddEducationSubmit} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Add Degree / Institution
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="School / University"
                value={newEduSchool}
                onChange={e => setNewEduSchool(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Degree (e.g. B.S., M.S.)"
                value={newEduDegree}
                onChange={e => setNewEduDegree(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Field of Study (e.g. Computer Science)"
                value={newEduField}
                onChange={e => setNewEduField(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Graduation Date (e.g. May 2026)"
                value={newEduEnd}
                onChange={e => setNewEduEnd(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="GPA (e.g. 3.88 / 4.0)"
                value={newEduGpa}
                onChange={e => setNewEduGpa(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save Education</span>
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {education.map(edu => (
              <div
                key={edu.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-start justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{edu.school}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {edu.degree} in {edu.fieldOfStudy} · {edu.startDate} – {edu.endDate}
                  </p>
                  {edu.gpa && <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1">GPA: {edu.gpa}</p>}
                </div>
                <button
                  onClick={() => deleteEducation(edu.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
