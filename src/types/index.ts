export type ActivePage =
  | 'landing'
  | 'login'
  | 'onboarding'
  | 'dashboard'
  | 'profile'
  | 'resume-builder'
  | 'resume-analysis'
  | 'portfolio-builder'
  | 'career-analysis'
  | 'skill-gap'
  | 'roadmap'
  | 'practice'
  | 'mock-interview'
  | 'opportunities'
  | 'application-tracker'
  | 'notifications'
  | 'ai-studio'
  | 'settings';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  headline: string;
  college: string;
  degree: string;
  major: string;
  graduationYear: number;
  targetRole: string;
  targetCompanies: string[];
  preferredLocations: string[];
  workPreference: 'Remote' | 'Hybrid' | 'Onsite' | 'Any';
  bio: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  careerReadinessScore: number;
  onboardingCompleted: boolean;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'DSA' | 'Cloud/DevOps' | 'Database' | 'Soft Skills';
  level: 'Beginner' | 'Intermediate' | 'Proficient' | 'Advanced';
  verified?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  type: 'Internship' | 'Full-time' | 'Contract' | 'Research' | 'Campus Lead';
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bullets: string[];
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  summary: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: {
    languages: string[];
    frameworks: string[];
    developerTools: string[];
    libraries: string[];
  };
  certifications: string[];
  template: 'modern' | 'minimal' | 'ivy';
}

export interface ResumeAnalysisResult {
  atsScore: number;
  keywordMatchScore: number;
  formattingScore: number;
  impactScore: number;
  summary: string;
  strengths: string[];
  missingKeywords: string[];
  suggestedImprovements: {
    category: string;
    issue: string;
    suggestion: string;
  }[];
  bulletAnalysis: {
    original: string;
    improved: string;
    reason: string;
  }[];
}

export interface SkillGapItem {
  name: string;
  category: string;
  currentProficiency: number; // 0-100
  requiredProficiency: number; // 0-100
  status: 'mastered' | 'in-progress' | 'missing';
  priority: 'High' | 'Medium' | 'Low';
  learningResource: {
    title: string;
    type: 'docs' | 'course' | 'practice' | 'project';
    url: string;
    estHours: number;
  };
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'Core' | 'Recommended' | 'Bonus';
  estHours: number;
  resourceTitle?: string;
  resourceUrl?: string;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  durationWeeks: number;
  milestones: RoadmapMilestone[];
}

export type PracticeTrack = 'aptitude' | 'dsa' | 'technical' | 'hr';

export interface PracticeQuestion {
  id: string;
  track: PracticeTrack;
  title: string;
  prompt: string;
  codeSnippet?: string;
  options: string[];
  correctOptionIndex: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  explanation: string;
}

export interface InterviewMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: number;
}

export interface InterviewFeedback {
  overallScore: number;
  clarityScore: number;
  technicalScore: number;
  starMethodScore: number;
  keyStrengths: string[];
  improvementAreas: string[];
  verdict: string;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogoColor: string;
  location: string;
  workModel: 'Remote' | 'Hybrid' | 'Onsite';
  type: 'Internship' | 'Full-time' | 'New Grad';
  compensation: string;
  postedAgo: string;
  deadline: string;
  description: string;
  requirements: string[];
  requiredSkills: string[];
  matchScore: number;
  saved?: boolean;
}

export interface JobApplication {
  id: string;
  opportunityId?: string;
  company: string;
  role: string;
  location: string;
  status: 'wishlist' | 'applied' | 'screening' | 'interview' | 'offer' | 'rejected';
  appliedDate: string;
  nextStepDate?: string;
  compensation?: string;
  notes: string;
  contactName?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'job' | 'roadmap' | 'interview' | 'resume' | 'system';
  read: boolean;
  timestamp: string;
  actionRoute?: ActivePage;
}

export interface PortfolioSettings {
  template: 'minimal' | 'developer' | 'executive';
  accentColor: string;
  showContactForm: boolean;
  highlightedProjectIds: string[];
  customBio: string;
}
