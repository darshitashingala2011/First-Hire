import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ActivePage,
  EducationItem,
  SkillItem,
  ProjectItem,
  ExperienceItem,
  ResumeData,
  RoadmapPhase,
  Opportunity,
  JobApplication,
  NotificationItem,
  SkillGapItem,
  PortfolioSettings
} from '../types';
import {
  initialEducation,
  initialSkills,
  initialProjects,
  initialExperience,
  initialResume,
  initialRoadmap,
  initialOpportunities,
  initialApplications,
  initialNotifications,
  initialSkillGaps
} from '../data/mockData';

interface AppContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;

  // Education
  education: EducationItem[];
  addEducation: (item: Omit<EducationItem, 'id'>) => void;
  updateEducation: (id: string, item: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;

  // Skills
  skills: SkillItem[];
  addSkill: (item: Omit<SkillItem, 'id'>) => void;
  updateSkill: (id: string, item: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;

  // Projects
  projects: ProjectItem[];
  addProject: (item: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, item: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  // Experience
  experience: ExperienceItem[];
  addExperience: (item: Omit<ExperienceItem, 'id'>) => void;
  updateExperience: (id: string, item: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;

  // Resume
  resume: ResumeData;
  updateResume: (updates: Partial<ResumeData>) => void;
  setResumeTemplate: (template: 'modern' | 'minimal' | 'ivy') => void;

  // Skill Gaps
  skillGaps: SkillGapItem[];
  addMissingSkillToRoadmap: (skillName: string) => void;

  // Roadmap
  roadmap: RoadmapPhase[];
  toggleRoadmapMilestone: (phaseId: string, milestoneId: string) => void;
  addRoadmapMilestone: (phaseId: string, milestone: { title: string; description: string; priority: 'Core' | 'Recommended' | 'Bonus'; estHours: number }) => void;
  setRoadmap: (phases: RoadmapPhase[]) => void;

  // Opportunities
  opportunities: Opportunity[];
  toggleSaveOpportunity: (id: string) => void;
  applyToOpportunity: (oppId: string, customNote?: string) => void;

  // Applications
  applications: JobApplication[];
  addApplication: (app: Omit<JobApplication, 'id' | 'appliedDate'>) => void;
  updateApplicationStatus: (id: string, status: JobApplication['status']) => void;
  deleteApplication: (id: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;

  // Portfolio
  portfolioSettings: PortfolioSettings;
  updatePortfolioSettings: (settings: Partial<PortfolioSettings>) => void;

  // Global Actions
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('landing');

  // Load / Store States
  const [education, setEducation] = useState<EducationItem[]>(() => {
    const s = localStorage.getItem('fh_education');
    return s ? JSON.parse(s) : initialEducation;
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    const s = localStorage.getItem('fh_skills');
    return s ? JSON.parse(s) : initialSkills;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const s = localStorage.getItem('fh_projects');
    return s ? JSON.parse(s) : initialProjects;
  });

  const [experience, setExperience] = useState<ExperienceItem[]>(() => {
    const s = localStorage.getItem('fh_experience');
    return s ? JSON.parse(s) : initialExperience;
  });

  const [resume, setResume] = useState<ResumeData>(() => {
    const s = localStorage.getItem('fh_resume');
    return s ? JSON.parse(s) : initialResume;
  });

  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>(() => {
    const s = localStorage.getItem('fh_skill_gaps');
    return s ? JSON.parse(s) : initialSkillGaps;
  });

  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>(() => {
    const s = localStorage.getItem('fh_roadmap');
    return s ? JSON.parse(s) : initialRoadmap;
  });

  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const s = localStorage.getItem('fh_opportunities');
    return s ? JSON.parse(s) : initialOpportunities;
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const s = localStorage.getItem('fh_applications');
    return s ? JSON.parse(s) : initialApplications;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const s = localStorage.getItem('fh_notifications');
    return s ? JSON.parse(s) : initialNotifications;
  });

  const [portfolioSettings, setPortfolioSettings] = useState<PortfolioSettings>(() => {
    const s = localStorage.getItem('fh_portfolio_settings');
    return s
      ? JSON.parse(s)
      : {
          template: 'developer',
          accentColor: '#4f46e5',
          showContactForm: true,
          highlightedProjectIds: ['proj_1', 'proj_2'],
          customBio: 'Crafting reliable distributed web apps & developer tools with modern TypeScript and React.'
        };
  });

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('fh_education', JSON.stringify(education)); }, [education]);
  useEffect(() => { localStorage.setItem('fh_skills', JSON.stringify(skills)); }, [skills]);
  useEffect(() => { localStorage.setItem('fh_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('fh_experience', JSON.stringify(experience)); }, [experience]);
  useEffect(() => { localStorage.setItem('fh_resume', JSON.stringify(resume)); }, [resume]);
  useEffect(() => { localStorage.setItem('fh_skill_gaps', JSON.stringify(skillGaps)); }, [skillGaps]);
  useEffect(() => { localStorage.setItem('fh_roadmap', JSON.stringify(roadmap)); }, [roadmap]);
  useEffect(() => { localStorage.setItem('fh_opportunities', JSON.stringify(opportunities)); }, [opportunities]);
  useEffect(() => { localStorage.setItem('fh_applications', JSON.stringify(applications)); }, [applications]);
  useEffect(() => { localStorage.setItem('fh_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('fh_portfolio_settings', JSON.stringify(portfolioSettings)); }, [portfolioSettings]);

  // Sync resume with updated profile entities
  useEffect(() => {
    setResume(prev => ({
      ...prev,
      education,
      experience,
      projects
    }));
  }, [education, experience, projects]);

  // Education CRUD
  const addEducation = (item: Omit<EducationItem, 'id'>) => {
    const newItem: EducationItem = { ...item, id: 'edu_' + Date.now() };
    setEducation(prev => [...prev, newItem]);
  };
  const updateEducation = (id: string, item: Partial<EducationItem>) => {
    setEducation(prev => prev.map(e => (e.id === id ? { ...e, ...item } : e)));
  };
  const deleteEducation = (id: string) => {
    setEducation(prev => prev.filter(e => e.id !== id));
  };

  // Skills CRUD
  const addSkill = (item: Omit<SkillItem, 'id'>) => {
    const newItem: SkillItem = { ...item, id: 'sk_' + Date.now() };
    setSkills(prev => [...prev, newItem]);
  };
  const updateSkill = (id: string, item: Partial<SkillItem>) => {
    setSkills(prev => prev.map(s => (s.id === id ? { ...s, ...item } : s)));
  };
  const deleteSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
  };

  // Projects CRUD
  const addProject = (item: Omit<ProjectItem, 'id'>) => {
    const newItem: ProjectItem = { ...item, id: 'proj_' + Date.now() };
    setProjects(prev => [newItem, ...prev]);
  };
  const updateProject = (id: string, item: Partial<ProjectItem>) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...item } : p)));
  };
  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Experience CRUD
  const addExperience = (item: Omit<ExperienceItem, 'id'>) => {
    const newItem: ExperienceItem = { ...item, id: 'exp_' + Date.now() };
    setExperience(prev => [newItem, ...prev]);
  };
  const updateExperience = (id: string, item: Partial<ExperienceItem>) => {
    setExperience(prev => prev.map(e => (e.id === id ? { ...e, ...item } : e)));
  };
  const deleteExperience = (id: string) => {
    setExperience(prev => prev.filter(e => e.id !== id));
  };

  // Resume
  const updateResume = (updates: Partial<ResumeData>) => {
    setResume(prev => ({ ...prev, ...updates }));
  };
  const setResumeTemplate = (template: 'modern' | 'minimal' | 'ivy') => {
    setResume(prev => ({ ...prev, template }));
  };

  // Skill Gap to Roadmap action
  const addMissingSkillToRoadmap = (skillName: string) => {
    const newMilestone = {
      id: 'm_custom_' + Date.now(),
      title: `Master ${skillName}`,
      description: `Complete foundational tutorials, build mini-project, and practice code drills.`,
      completed: false,
      priority: 'Core' as const,
      estHours: 12
    };
    setRoadmap(prev => {
      const copy = [...prev];
      if (copy.length > 1) {
        copy[1] = {
          ...copy[1],
          milestones: [...copy[1].milestones, newMilestone]
        };
      }
      return copy;
    });

    addNotification({
      title: 'Skill Added to Roadmap',
      message: `"${skillName}" has been appended to Phase 2 of your career preparation roadmap.`,
      type: 'roadmap',
      actionRoute: 'roadmap'
    });
  };

  // Roadmap
  const toggleRoadmapMilestone = (phaseId: string, milestoneId: string) => {
    setRoadmap(prev =>
      prev.map(phase => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          milestones: phase.milestones.map(m =>
            m.id === milestoneId ? { ...m, completed: !m.completed } : m
          )
        };
      })
    );
  };

  const addRoadmapMilestone = (
    phaseId: string,
    milestone: { title: string; description: string; priority: 'Core' | 'Recommended' | 'Bonus'; estHours: number }
  ) => {
    setRoadmap(prev =>
      prev.map(phase => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          milestones: [
            ...phase.milestones,
            { ...milestone, id: 'm_' + Date.now(), completed: false }
          ]
        };
      })
    );
  };

  // Opportunities & Applications
  const toggleSaveOpportunity = (id: string) => {
    setOpportunities(prev =>
      prev.map(opp => (opp.id === id ? { ...opp, saved: !opp.saved } : opp))
    );
  };

  const applyToOpportunity = (oppId: string, customNote?: string) => {
    const opp = opportunities.find(o => o.id === oppId);
    if (!opp) return;

    // Check if already applied
    const existing = applications.find(a => a.opportunityId === oppId);
    if (existing) return;

    const newApp: JobApplication = {
      id: 'app_' + Date.now(),
      opportunityId: opp.id,
      company: opp.company,
      role: opp.title,
      location: opp.location,
      status: 'applied',
      appliedDate: new Date().toISOString().split('T')[0],
      compensation: opp.compensation,
      notes: customNote || 'Applied through FirstHire quick-apply matching engine.'
    };

    setApplications(prev => [newApp, ...prev]);

    addNotification({
      title: 'Application Submitted',
      message: `Your application for ${opp.title} at ${opp.company} is recorded in your Application Tracker.`,
      type: 'job',
      actionRoute: 'application-tracker'
    });
  };

  const addApplication = (app: Omit<JobApplication, 'id' | 'appliedDate'>) => {
    const newApp: JobApplication = {
      ...app,
      id: 'app_' + Date.now(),
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setApplications(prev => [newApp, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: JobApplication['status']) => {
    setApplications(prev =>
      prev.map(a => (a.id === id ? { ...a, status, nextStepDate: status === 'interview' ? new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0] : a.nextStepDate } : a))
    );
  };

  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(a => a.id !== id));
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: 'notif_' + Date.now(),
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updatePortfolioSettings = (settings: Partial<PortfolioSettings>) => {
    setPortfolioSettings(prev => ({ ...prev, ...settings }));
  };

  const resetAllData = () => {
    setEducation(initialEducation);
    setSkills(initialSkills);
    setProjects(initialProjects);
    setExperience(initialExperience);
    setResume(initialResume);
    setSkillGaps(initialSkillGaps);
    setRoadmap(initialRoadmap);
    setOpportunities(initialOpportunities);
    setApplications(initialApplications);
    setNotifications(initialNotifications);
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        education,
        addEducation,
        updateEducation,
        deleteEducation,
        skills,
        addSkill,
        updateSkill,
        deleteSkill,
        projects,
        addProject,
        updateProject,
        deleteProject,
        experience,
        addExperience,
        updateExperience,
        deleteExperience,
        resume,
        updateResume,
        setResumeTemplate,
        skillGaps,
        addMissingSkillToRoadmap,
        roadmap,
        toggleRoadmapMilestone,
        addRoadmapMilestone,
        setRoadmap,
        opportunities,
        toggleSaveOpportunity,
        applyToOpportunity,
        applications,
        addApplication,
        updateApplicationStatus,
        deleteApplication,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
        portfolioSettings,
        updatePortfolioSettings,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
