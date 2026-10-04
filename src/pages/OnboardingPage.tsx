import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  Target,
  Sparkles,
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plus,
  X
} from 'lucide-react';

const popularSkills = [
  'TypeScript', 'JavaScript', 'Python', 'React', 'Node.js',
  'PostgreSQL', 'Docker', 'AWS', 'Data Structures & Algorithms',
  'Next.js', 'System Design', 'Git', 'FastAPI', 'GraphQL', 'Tailwind CSS'
];

export const OnboardingPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { setActivePage, addSkill } = useApp();

  const [step, setStep] = useState(1);

  // Form states
  const [college, setCollege] = useState(user?.college || 'UC Berkeley');
  const [degree, setDegree] = useState(user?.degree || 'Bachelor of Science');
  const [major, setMajor] = useState(user?.major || 'Computer Science');
  const [graduationYear, setGraduationYear] = useState<number>(user?.graduationYear || 2026);

  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Full-Stack Software Engineer');
  const [targetCompaniesInput, setTargetCompaniesInput] = useState(user?.targetCompanies?.join(', ') || 'Google, Stripe, Figma');
  const [preferredLocations, setPreferredLocations] = useState(user?.preferredLocations?.join(', ') || 'San Francisco, CA, Remote');
  const [workPreference, setWorkPreference] = useState<'Remote' | 'Hybrid' | 'Onsite' | 'Any'>('Hybrid');

  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Data Structures & Algorithms'
  ]);
  const [customSkillInput, setCustomSkillInput] = useState('');

  const [bio, setBio] = useState(
    user?.bio || 'CS senior passionate about distributed web applications and developer tools. Looking for 2026 new grad software engineering opportunities.'
  );

  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkillInput.trim() && !selectedSkills.includes(customSkillInput.trim())) {
      setSelectedSkills([...selectedSkills, customSkillInput.trim()]);
      setCustomSkillInput('');
    }
  };

  const handleComplete = () => {
    const companies = targetCompaniesInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const locations = preferredLocations
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    updateUser({
      college,
      degree,
      major,
      graduationYear,
      targetRole,
      targetCompanies: companies,
      preferredLocations: locations,
      workPreference,
      bio,
      headline: `Aspiring ${targetRole} · ${major} @ ${college} '26`,
      careerReadinessScore: 82,
      onboardingCompleted: true
    });

    // Add selected skills to App context
    selectedSkills.forEach(s => {
      addSkill({
        name: s,
        category: 'Frontend',
        level: 'Proficient',
        verified: true
      });
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setActivePage('dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-10 px-4 sm:px-6 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-2xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Step {step} of 4</span>
            <span>
              {step === 1 && 'Academic Profile'}
              {step === 2 && 'Target Career Goals'}
              {step === 3 && 'Skill Inventory'}
              {step === 4 && 'Profile Statement'}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-6 sm:p-8">
          {/* Step 1 */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    College & Academic Credentials
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Let's configure your university and graduation timeline.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    College / University
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={e => setCollege(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. University of California, Berkeley"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={degree}
                      onChange={e => setDegree(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g. Bachelor of Science"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Major / Field of Study
                    </label>
                    <input
                      type="text"
                      value={major}
                      onChange={e => setMajor(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g. Computer Science"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Graduation Year
                  </label>
                  <select
                    value={graduationYear}
                    onChange={e => setGraduationYear(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={2025}>2025 (Immediate New Grad)</option>
                    <option value={2026}>2026 (College Senior)</option>
                    <option value={2027}>2027 (College Junior)</option>
                    <option value={2028}>2028 (Underclassman)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Target Role & Dream Companies
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    What positions and teams are you aiming for?
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Target Role
                  </label>
                  <select
                    value={targetRole}
                    onChange={e => setTargetRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Full-Stack Software Engineer">Full-Stack Software Engineer</option>
                    <option value="Frontend Engineer">Frontend Engineer</option>
                    <option value="Backend Engineer">Backend Engineer</option>
                    <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                    <option value="DevOps / Cloud Engineer">DevOps / Cloud Engineer</option>
                    <option value="Product Manager (Early Career)">Product Manager (Early Career)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Target Companies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={targetCompaniesInput}
                    onChange={e => setTargetCompaniesInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Google, Stripe, Figma, Datadog"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Locations
                  </label>
                  <input
                    type="text"
                    value={preferredLocations}
                    onChange={e => setPreferredLocations(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. San Francisco, CA, New York, NY, Remote"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Work Model Preference
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['Hybrid', 'Remote', 'Onsite', 'Any'] as const).map(model => (
                      <button
                        key={model}
                        type="button"
                        onClick={() => setWorkPreference(model)}
                        className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                          workPreference === model
                            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                        }`}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Current Technical Skills
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Select the technologies you have used in coursework, labs, or personal projects.
                  </p>
                </div>
              </div>

              {/* Tag Selector */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Popular Technologies (Click to toggle)
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSkills.map(skill => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleToggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add Custom Skill */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <form onSubmit={handleAddCustomSkill} className="flex gap-2">
                  <input
                    type="text"
                    value={customSkillInput}
                    onChange={e => setCustomSkillInput(e.target.value)}
                    placeholder="Add custom skill (e.g. Redux, Kubernetes)..."
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    Add
                  </button>
                </form>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
                <span>Selected:</span>
                <strong className="text-indigo-600 dark:text-indigo-400">{selectedSkills.length} skills</strong>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Bio & Personal Headline
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    A short summary used in your portfolio and resume header.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Student Bio / Objective
                  </label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tell recruiters about your key passions and what kind of technical challenges excite you..."
                  />
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Calculated Initial Career Readiness: 82%</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-relaxed">
                    Based on your university coursework, graduation year, and technical skills stack. FirstHire will now unlock your personalized Roadmap, ATS Resume Builder, and AI Mock Interview Room.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Footer Controls */}
          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <span>Enter FirstHire Dashboard</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
