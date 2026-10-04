import { ResumeAnalysisResult, InterviewFeedback, RoadmapPhase } from '../types';

export const fallbackResumeAnalysis = (role: string = 'Full-Stack Software Engineer'): ResumeAnalysisResult => ({
  atsScore: 84,
  keywordMatchScore: 80,
  formattingScore: 90,
  impactScore: 82,
  summary: `Solid technical foundation for an entry-level ${role}. Projects demonstrate practical engineering ability with modern web technologies, but need more quantifiable business/performance metrics in the experience section to pass competitive FAANG and Tier-1 ATS filters.`,
  strengths: [
    'Clear project descriptions with modern tech stacks (React, TypeScript, Node.js)',
    'Logical reverse-chronological structure with clean standard headings',
    'Demonstrates end-to-end full-stack development experience from coursework and side projects'
  ],
  missingKeywords: [
    'CI/CD Pipelines (GitHub Actions)',
    'Unit & Integration Testing (Jest/Vitest)',
    'Cloud Deployment (AWS/Docker)',
    'System Design & Microservices'
  ],
  suggestedImprovements: [
    {
      category: 'Action Verbs & Impact',
      issue: 'Several bullet points start with passive phrases like "Assisted with" or "Responsible for".',
      suggestion: 'Lead with strong engineering verbs: "Architected", "Engineered", "Optimized", "Refactored".'
    },
    {
      category: 'Quantifiable Metrics',
      issue: 'Project accomplishments lack concrete numbers on speed, test coverage, or user count.',
      suggestion: 'Apply the Google XYZ formula: "Accomplished [X] as measured by [Y] by doing [Z]".'
    },
    {
      category: 'Target Role Alignment',
      issue: `Missing specific architectural keywords recruiters search for in ${role} openings.`,
      suggestion: 'Explicitly highlight state management, relational schema modeling, and API security.'
    }
  ],
  bulletAnalysis: [
    {
      original: 'Built a web application for student task management using React and Express.',
      improved: 'Architected responsive full-stack task management platform serving 400+ campus peers using React, TypeScript, and Express, cutting task synchronization delay by 45%.',
      reason: 'Adds measurable scope, user metrics, and specific technical keywords.'
    },
    {
      original: 'Helped optimize database queries for better performance.',
      improved: 'Indexed PostgreSQL database schemas and optimized complex JOIN queries, improving API endpoint response times by 32% under load.',
      reason: 'Highlights technical specificity and concrete performance gains.'
    }
  ]
});

export const fallbackInterviewQuestions = [
  {
    question: `Tell me about a technical project you built recently. What architectural decisions did you make, and what was the hardest engineering trade-off you encountered?`,
    category: 'Technical Architecture & Trade-offs',
    hint: 'Use the STAR method: Situation, Task, Action (specific tech stack & design decisions), and Result.'
  },
  {
    question: `Suppose an API endpoint you developed suddenly experiences high latency during peak college registration hours. Walk me through how you would isolate and debug the bottleneck.`,
    category: 'System Diagnostics & Performance',
    hint: 'Consider checking client latency, network logs, application profiling, and slow database queries.'
  },
  {
    question: `Tell me about a time when you disagreed with a teammate or project partner on how to build a feature. How did you resolve it?`,
    category: 'Behavioral & Teamwork (STAR)',
    hint: 'Focus on empathy, data-driven reasoning, and how you arrived at a mutual consensus.'
  },
  {
    question: `How do you approach writing clean, maintainable code when facing tight hackathon or semester project deadlines?`,
    category: 'Engineering Discipline & Quality',
    hint: 'Discuss automated testing, modular abstractions, and progressive enhancement.'
  }
];

export const fallbackInterviewEvaluation: InterviewFeedback = {
  overallScore: 85,
  clarityScore: 88,
  technicalScore: 84,
  starMethodScore: 83,
  keyStrengths: [
    'Communicated technical rationale with structured problem decomposition',
    'Articulated trade-offs between speed of execution and architectural scalability',
    'Maintained composure and demonstrated a strong growth mindset'
  ],
  improvementAreas: [
    'Deepen depth on distributed edge cases and data validation checks',
    'Structure behavioral answers more tightly around measurable business outcomes'
  ],
  verdict: 'Strong candidate with clear readiness for Associate and Entry-level engineering roles. Recommended next step: Practice 2-3 more mock system design drills.'
};
