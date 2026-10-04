import {
  UserProfile,
  EducationItem,
  SkillItem,
  ProjectItem,
  ExperienceItem,
  ResumeData,
  RoadmapPhase,
  PracticeQuestion,
  Opportunity,
  JobApplication,
  NotificationItem,
  SkillGapItem
} from '../types';

export const initialUser: UserProfile = {
  id: 'usr_ananya_01',
  name: 'Ananya Sharma',
  email: 'ananya.sharma@berkeley.edu',
  headline: 'Aspiring Full-Stack Software Engineer · CS Senior · Building high-throughput systems',
  college: 'UC Berkeley',
  degree: 'Bachelor of Science',
  major: 'Computer Science & Data Science',
  graduationYear: 2026,
  targetRole: 'Full-Stack Software Engineer',
  targetCompanies: ['Google', 'Stripe', 'Figma', 'Datadog', 'Linear'],
  preferredLocations: ['San Francisco, CA', 'New York, NY', 'Remote'],
  workPreference: 'Hybrid',
  bio: 'Computer Science senior passionate about distributed web applications, type-safe full-stack architectures, and developer tooling. Looking for high-impact 2026 full-time new grad software engineering opportunities.',
  githubUrl: 'https://github.com/ananyasharma',
  linkedinUrl: 'https://linkedin.com/in/ananya-sharma-cs',
  portfolioUrl: 'https://ananyacodes.dev',
  careerReadinessScore: 84,
  onboardingCompleted: true
};

export const initialEducation: EducationItem[] = [
  {
    id: 'edu_1',
    school: 'University of California, Berkeley',
    degree: 'B.S. Computer Science & Data Science',
    fieldOfStudy: 'Computer Science',
    startDate: 'Aug 2022',
    endDate: 'May 2026',
    gpa: '3.88 / 4.00',
    honors: 'Dean\'s Honor List (6 Semesters), Upsilon Pi Epsilon CS Honor Society'
  }
];

export const initialSkills: SkillItem[] = [
  { id: 'sk_1', name: 'TypeScript', category: 'Frontend', level: 'Advanced', verified: true },
  { id: 'sk_2', name: 'React / Next.js', category: 'Frontend', level: 'Advanced', verified: true },
  { id: 'sk_3', name: 'Node.js & Express', category: 'Backend', level: 'Proficient', verified: true },
  { id: 'sk_4', name: 'Python', category: 'Backend', level: 'Proficient', verified: true },
  { id: 'sk_5', name: 'PostgreSQL & SQL', category: 'Database', level: 'Proficient', verified: true },
  { id: 'sk_6', name: 'Data Structures & Algorithms', category: 'DSA', level: 'Proficient', verified: true },
  { id: 'sk_7', name: 'Docker & Containers', category: 'Cloud/DevOps', level: 'Intermediate', verified: false },
  { id: 'sk_8', name: 'GraphQL & REST', category: 'Backend', level: 'Proficient', verified: true },
  { id: 'sk_9', name: 'Tailwind CSS', category: 'Frontend', level: 'Advanced', verified: true },
  { id: 'sk_10', name: 'AWS (S3, Lambda, EC2)', category: 'Cloud/DevOps', level: 'Intermediate', verified: false },
  { id: 'sk_11', name: 'CI/CD & GitHub Actions', category: 'Cloud/DevOps', level: 'Intermediate', verified: false },
  { id: 'sk_12', name: 'Technical Communication', category: 'Soft Skills', level: 'Advanced', verified: true }
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj_1',
    title: 'CloudSync: Real-Time Collaborative Canvas',
    subtitle: 'High-performance shared whiteboard engine with conflict-free replication',
    description: 'Designed and deployed a multiplayer collaborative canvas handling 60fps concurrent drawing sessions for 500+ student teams. Implemented WebSocket delta broadcasts and CRDT sync algorithms in TypeScript and WebGL.',
    technologies: ['TypeScript', 'React', 'WebSockets', 'Canvas API', 'Redis', 'Node.js'],
    liveUrl: 'https://cloudsync-demo.app',
    githubUrl: 'https://github.com/ananyasharma/cloudsync-canvas',
    featured: true,
    metrics: '500+ active student users · Sub-20ms broadcast sync latency'
  },
  {
    id: 'proj_2',
    title: 'PulseQuery: Automated SQL Query Visualizer & Explainer',
    subtitle: 'Developer tool analyzing query execution plans with optimization recommendations',
    description: 'Constructed an open-source query planner analysis tool that ingests PostgreSQL EXPLAIN outputs and visually diagnoses expensive sequential table scans and missing indexes.',
    technologies: ['React', 'TypeScript', 'PostgreSQL', 'D3.js', 'Express', 'Docker'],
    liveUrl: 'https://pulsequery.dev',
    githubUrl: 'https://github.com/ananyasharma/pulse-query-explainer',
    featured: true,
    metrics: '1,200+ GitHub Stars · Featured on Hacker News Front Page'
  },
  {
    id: 'proj_3',
    title: 'CampusRide: Peer-to-Peer Transit Router',
    subtitle: 'Microservice-based student carpool routing system',
    description: 'Developed an algorithmic routing engine utilizing Dijkstra and k-nearest neighbors to bundle student transit trips during campus breaks, cutting commute carbon emissions.',
    technologies: ['Python', 'FastAPI', 'PostGIS', 'Leaflet', 'Docker'],
    liveUrl: 'https://campusride.berkeley.edu',
    githubUrl: 'https://github.com/ananyasharma/campus-ride',
    featured: false,
    metrics: '350+ semester carpools coordinated across Bay Area'
  }
];

export const initialExperience: ExperienceItem[] = [
  {
    id: 'exp_1',
    company: 'Vercel',
    role: 'Software Engineering Intern',
    type: 'Internship',
    location: 'San Francisco, CA (Hybrid)',
    startDate: 'May 2025',
    endDate: 'Aug 2025',
    isCurrent: false,
    bullets: [
      'Engineered edge routing telemetry dashboard used by 18,000+ enterprise engineering teams, reducing p99 latency render times by 38%.',
      'Refactored caching layer using TypeScript and Redis pipelines, saving an estimated 1.4 TB of egress bandwidth monthly.',
      'Authored 45+ comprehensive end-to-end integration tests in Playwright, boosting regression detection coverage by 24% across deployment pipelines.'
    ]
  },
  {
    id: 'exp_2',
    company: 'UC Berkeley Division of Computing',
    role: 'Head Undergraduate Teaching Assistant (CS 61B)',
    type: 'Campus Lead',
    location: 'Berkeley, CA',
    startDate: 'Jan 2024',
    endDate: 'Present',
    isCurrent: true,
    bullets: [
      'Led weekly discussion sections and code review labs on Data Structures & Advanced Java for 60+ undergraduate students.',
      'Created autograded coding assignments analyzing graph traversal algorithms and red-black tree balancing heuristics.',
      'Ranked in top 5% of all engineering department teaching assistants across course evaluations.'
    ]
  }
];

export const initialResume: ResumeData = {
  personalInfo: {
    fullName: 'Ananya Sharma',
    email: 'ananya.sharma@berkeley.edu',
    phone: '+1 (510) 555-0192',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/ananya-sharma-cs',
    github: 'github.com/ananyasharma',
    portfolio: 'ananyacodes.dev'
  },
  summary: 'Full-stack software engineering senior at UC Berkeley with experience in high-performance web systems, distributed synchronization, and developer tooling. Proven track record at Vercel optimizing telemetry dashboards. Passionate about solving complex architectural problems at scale.',
  education: initialEducation,
  experience: initialExperience,
  projects: initialProjects,
  skills: {
    languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'C/C++'],
    frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'FastAPI', 'Tailwind CSS'],
    developerTools: ['Git', 'Docker', 'PostgreSQL', 'Redis', 'AWS (S3/Lambda)', 'Linux', 'Vite'],
    libraries: ['Three.js', 'D3.js', 'Prisma', 'Jest', 'Playwright', 'Zod']
  },
  certifications: [
    'AWS Certified Cloud Practitioner',
    'Meta Full-Stack Professional Certificate'
  ],
  template: 'modern'
};

export const initialSkillGaps: SkillGapItem[] = [
  {
    name: 'Distributed Systems & Microservices',
    category: 'Backend',
    currentProficiency: 55,
    requiredProficiency: 85,
    status: 'in-progress',
    priority: 'High',
    learningResource: {
      title: 'Designing Data-Intensive Applications (Kleppmann)',
      type: 'course',
      url: 'https://dataintensive.net',
      estHours: 24
    }
  },
  {
    name: 'Kubernetes & Container Orchestration',
    category: 'Cloud/DevOps',
    currentProficiency: 30,
    requiredProficiency: 75,
    status: 'missing',
    priority: 'High',
    learningResource: {
      title: 'Kubernetes Up & Running Practical Lab',
      type: 'project',
      url: 'https://kubernetes.io/docs/tutorials',
      estHours: 16
    }
  },
  {
    name: 'Dynamic Programming & Advanced Graphs',
    category: 'DSA',
    currentProficiency: 70,
    requiredProficiency: 90,
    status: 'in-progress',
    priority: 'High',
    learningResource: {
      title: 'NeetCode Advanced Graphs & DP Patterns',
      type: 'practice',
      url: 'https://neetcode.io',
      estHours: 20
    }
  },
  {
    name: 'CI/CD & GitHub Actions Automation',
    category: 'Cloud/DevOps',
    currentProficiency: 65,
    requiredProficiency: 80,
    status: 'in-progress',
    priority: 'Medium',
    learningResource: {
      title: 'Automated Testing & Deployment Workflows',
      type: 'docs',
      url: 'https://docs.github.com/actions',
      estHours: 8
    }
  },
  {
    name: 'PostgreSQL Query Optimization & Indexing',
    category: 'Database',
    currentProficiency: 82,
    requiredProficiency: 85,
    status: 'mastered',
    priority: 'Low',
    learningResource: {
      title: 'Use The Index Luke Deep Guide',
      type: 'docs',
      url: 'https://use-the-index-luke.com',
      estHours: 5
    }
  }
];

export const initialRoadmap: RoadmapPhase[] = [
  {
    id: 'phase_1',
    title: '01. CS Fundamentals & Algorithmic Problem Solving',
    description: 'Master core LeetCode medium patterns, time/space complexities, and recursion trees.',
    durationWeeks: 3,
    milestones: [
      {
        id: 'm_1_1',
        title: 'Arrays, Two-Pointers & Sliding Window Sprints',
        description: 'Solve 20 core problems on NeetCode 150 with zero hints under 25 minutes each.',
        completed: true,
        priority: 'Core',
        estHours: 14,
        resourceTitle: 'NeetCode 150 Core List',
        resourceUrl: 'https://neetcode.io'
      },
      {
        id: 'm_1_2',
        title: 'Binary Trees & Graph Traversals (DFS/BFS)',
        description: 'Implement connected components, cycle detection, and topological sorting from memory.',
        completed: true,
        priority: 'Core',
        estHours: 18,
        resourceTitle: 'VisualAlgo Graph Visualizer',
        resourceUrl: 'https://visualgo.net'
      },
      {
        id: 'm_1_3',
        title: 'Dynamic Programming 1D & 2D Memoization',
        description: 'Understand state transitions, knapsack variations, and longest common subsequence.',
        completed: false,
        priority: 'Core',
        estHours: 22,
        resourceTitle: 'MIT 6.006 Dynamic Programming',
        resourceUrl: 'https://ocw.mit.edu'
      }
    ]
  },
  {
    id: 'phase_2',
    title: '02. Production Architecture & Capstone Systems',
    description: 'Develop enterprise-grade portfolio applications with automated tests and CI/CD.',
    durationWeeks: 4,
    milestones: [
      {
        id: 'm_2_1',
        title: 'Architect Secure API with Rate Limiting & Auth',
        description: 'Deploy stateless JWT authentication, CSRF defense, and Redis token bucket rate limiting.',
        completed: true,
        priority: 'Core',
        estHours: 12,
        resourceTitle: 'OWASP Top 10 API Security',
        resourceUrl: 'https://owasp.org'
      },
      {
        id: 'm_2_2',
        title: 'Database Schema Sharding & Replication Lab',
        description: 'Set up PostgreSQL read-replicas and benchmark query latency improvements under simulated load.',
        completed: false,
        priority: 'Recommended',
        estHours: 16,
        resourceTitle: 'Postgres High Availability Guide',
        resourceUrl: 'https://postgresql.org'
      },
      {
        id: 'm_2_3',
        title: 'End-to-End Automated Testing Matrix',
        description: 'Write unit tests in Vitest and browser integration tests in Playwright across major user journeys.',
        completed: false,
        priority: 'Recommended',
        estHours: 10,
        resourceTitle: 'Testing JavaScript & Full-Stack',
        resourceUrl: 'https://kentcdodds.com'
      }
    ]
  },
  {
    id: 'phase_3',
    title: '03. ATS Resume Perfection & Portfolio Showcase',
    description: 'Translate engineering accomplishments into high-converting metrics and live web showcases.',
    durationWeeks: 2,
    milestones: [
      {
        id: 'm_3_1',
        title: 'FirstHire Resume ATS Score Optimization to 85+',
        description: 'Integrate target role keywords and rewrite project bullets using the XYZ impact framework.',
        completed: true,
        priority: 'Core',
        estHours: 6,
        resourceTitle: 'FirstHire ATS Resume Builder',
        resourceUrl: '#resume-builder'
      },
      {
        id: 'm_3_2',
        title: 'Publish Live Portfolio with Interactive Demos',
        description: 'Host portfolio with custom domain, clean architecture diagrams, and GitHub repository links.',
        completed: false,
        priority: 'Recommended',
        estHours: 8,
        resourceTitle: 'FirstHire Portfolio Generator',
        resourceUrl: '#portfolio'
      }
    ]
  },
  {
    id: 'phase_4',
    title: '04. AI Mock Interviews & Application Pipeline',
    description: 'Execute focused technical screening drills and maintain an active 30+ opportunity pipeline.',
    durationWeeks: 3,
    milestones: [
      {
        id: 'm_4_1',
        title: 'Complete 3 Full AI Mock Technical Interviews',
        description: 'Score above 85% on Problem Decomposition and Communication metrics.',
        completed: false,
        priority: 'Core',
        estHours: 6,
        resourceTitle: 'FirstHire AI Interview Room',
        resourceUrl: '#mock-interview'
      },
      {
        id: 'm_4_2',
        title: 'Submit 25 Targeted Applications on FirstHire Radar',
        description: 'Apply with customized resume versions matching each company tech stack.',
        completed: false,
        priority: 'Core',
        estHours: 15,
        resourceTitle: 'FirstHire Opportunity Radar',
        resourceUrl: '#opportunities'
      }
    ]
  }
];

export const initialPracticeQuestions: PracticeQuestion[] = [
  // Aptitude
  {
    id: 'apt_1',
    track: 'aptitude',
    title: 'Work and Time Efficiency',
    prompt: 'A can complete a software sprint task in 12 days, while B can complete the same task in 18 days. If they work together with C, they finish the task in 4 days. In how many days can C complete the entire task alone?',
    options: ['8 days', '9 days', '10 days', '12 days'],
    correctOptionIndex: 1,
    difficulty: 'Medium',
    tags: ['Work & Time', 'Ratio', 'Quantitative'],
    explanation: '1/A + 1/B + 1/C = 1/4. Here, 1/12 + 1/18 = (3+2)/36 = 5/36. Thus 1/C = 1/4 - 5/36 = 9/36 - 5/36 = 4/36 = 1/9. Therefore, C takes 9 days alone.'
  },
  {
    id: 'apt_2',
    track: 'aptitude',
    title: 'Probability & Server Availability',
    prompt: 'Two independent microservice servers A and B have 99% and 98% uptime probabilities during peak hours, respectively. What is the probability that at least one of the servers is operational during any given minute?',
    options: ['99.98%', '99.02%', '97.02%', '98.50%'],
    correctOptionIndex: 0,
    difficulty: 'Easy',
    tags: ['Probability', 'Reliability', 'Aptitude'],
    explanation: 'P(at least one up) = 1 - P(both down) = 1 - (1 - 0.99) * (1 - 0.98) = 1 - (0.01 * 0.02) = 1 - 0.0002 = 0.9998 or 99.98%.'
  },
  // DSA
  {
    id: 'dsa_1',
    track: 'dsa',
    title: 'Two Sum II - Input Array Is Sorted',
    prompt: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. What is the optimal time and auxiliary space complexity?',
    codeSnippet: `function twoSumSorted(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    else right--;
  }
  return [];
}`,
    options: [
      'O(N) time and O(1) space using two pointers',
      'O(N log N) time and O(N) space using hash map',
      'O(N^2) time and O(1) space with nested loops',
      'O(log N) time and O(log N) space using binary search'
    ],
    correctOptionIndex: 0,
    difficulty: 'Easy',
    tags: ['Two Pointers', 'Array', 'Binary Search'],
    explanation: 'Since the array is already sorted, the two-pointer approach starts at both ends, converging in a single O(N) pass with O(1) auxiliary space.'
  },
  {
    id: 'dsa_2',
    track: 'dsa',
    title: 'Longest Substring Without Repeating Characters',
    prompt: 'Given a string s, find the length of the longest substring without repeating characters. What technique achieves O(N) single-pass runtime?',
    codeSnippet: `function lengthOfLongestSubstring(s: string): number {
  const map = new Map<string, number>();
  let maxLen = 0, left = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (map.has(char) && map.get(char)! >= left) {
      left = map.get(char)! + 1;
    }
    map.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    options: [
      'Dynamic Programming with Memoization',
      'Sliding Window with a Hash Map / Index Cache',
      'Divide and Conquer recursion',
      'Prefix Sum Array'
    ],
    correctOptionIndex: 1,
    difficulty: 'Medium',
    tags: ['Sliding Window', 'Hash Map', 'Strings'],
    explanation: 'The sliding window approach maintains a dynamic boundary [left, right], updating the left pointer whenever a duplicate character is observed inside the current window.'
  },
  // Technical
  {
    id: 'tech_1',
    track: 'technical',
    title: 'React Rendering & Event Loop Batching',
    prompt: 'In modern React 18 / 19, what happens when multiple state updates are triggered inside a Promise or setTimeout callback?',
    options: [
      'Each state setter causes an immediate separate synchronous DOM re-render',
      'React automatically batches all updates together into a single render pass',
      'React ignores subsequent setters and only commits the first one',
      'An unhandled render exception is thrown unless wrapped in flushSync'
    ],
    correctOptionIndex: 1,
    difficulty: 'Medium',
    tags: ['React', 'Performance', 'Concurrency'],
    explanation: 'React 18 introduced Automatic Batching across all execution contexts including promises, timeouts, and native event handlers, consolidating multiple state setters into a single re-render.'
  },
  {
    id: 'tech_2',
    track: 'technical',
    title: 'Database Indexing Trade-offs',
    prompt: 'Adding a B-Tree index on a high-cardinality column in PostgreSQL significantly accelerates SELECT queries with equality or range filters. What is the primary operational trade-off?',
    options: [
      'Reduces the total table disk storage requirement',
      'Slows down INSERT, UPDATE, and DELETE operations due to index maintenance',
      'Forces all queries on that table to execute single-threaded',
      'Prevents the database from utilizing foreign keys'
    ],
    correctOptionIndex: 1,
    difficulty: 'Medium',
    tags: ['PostgreSQL', 'Indexing', 'Databases'],
    explanation: 'Every write (INSERT/UPDATE/DELETE) must also update and rebalance the B-Tree index structure on disk, incurring I/O overhead proportional to the number of active indexes.'
  },
  // HR / Behavioral
  {
    id: 'hr_1',
    track: 'hr',
    title: 'Handling Unexpected Project Scope Creep',
    prompt: 'During a final team engineering sprint, your product manager asks to add an urgent AI recommendation feature 3 days before campus demo day. How do you respond following the STAR framework?',
    options: [
      'Refuse immediately and tell them it is impossible so late in the cycle',
      'Assess technical feasibility, quantify risks, present a scoped MVP or post-launch phase proposal, and align on mutual priorities',
      'Quietly work 20 hours overnight without informing teammates to try and hack it in',
      'Agree to everything unconditionally and hope the bugs are not discovered during the demo'
    ],
    correctOptionIndex: 1,
    difficulty: 'Medium',
    tags: ['STAR Method', 'Prioritization', 'Communication'],
    explanation: 'Top tech companies look for mature engineering judgment: objectively evaluating trade-offs, communicating constraints proactively with data, and proposing alternative solutions (like an MVP or Phase 2 fast-follow).'
  }
];

export const initialOpportunities: Opportunity[] = [
  {
    id: 'opp_1',
    title: 'Full-Stack Software Engineer — New Grad 2026',
    company: 'Stripe',
    companyLogoColor: 'bg-indigo-600',
    location: 'San Francisco, CA (Hybrid)',
    workModel: 'Hybrid',
    type: 'New Grad',
    compensation: '$155,000 - $185,000 + Equity',
    postedAgo: '2 days ago',
    deadline: 'Rolling Admission',
    description: 'Join our Developer Infrastructure and Core Payments team. You will build high-throughput financial pipelines, author robust TypeScript and Ruby services, and design developer-friendly APIs utilized by millions of businesses globally.',
    requirements: [
      'Graduating between Dec 2025 and June 2026 with a degree in CS, SE, or equivalent',
      'Proficiency in modern TypeScript/JavaScript, Python, or Go',
      'Solid intuition for relational databases (PostgreSQL) and distributed systems',
      'Excitement for developer velocity, automated testing, and reliability'
    ],
    requiredSkills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Distributed Systems'],
    matchScore: 92,
    saved: true
  },
  {
    id: 'opp_2',
    title: 'Frontend Software Engineering Intern (Summer 2026)',
    company: 'Figma',
    companyLogoColor: 'bg-emerald-600',
    location: 'San Francisco, CA / New York, NY',
    workModel: 'Hybrid',
    type: 'Internship',
    compensation: '$58 - $65 / hour ($10,000/mo)',
    postedAgo: '3 days ago',
    deadline: 'Oct 31, 2026',
    description: 'Work directly on the collaborative canvas, design systems, or developer mode at Figma. Help push the boundaries of WebGL, WebAssembly, and modern browser rendering architectures.',
    requirements: [
      'Currently enrolled in an undergraduate or graduate degree in Computer Science',
      'Demonstrated experience with React, WebGL/Three.js, or complex canvas applications',
      'Strong problem-solving foundation in data structures and algorithmic efficiency'
    ],
    requiredSkills: ['TypeScript', 'React', 'Canvas API', 'Data Structures & Algorithms'],
    matchScore: 88,
    saved: false
  },
  {
    id: 'opp_3',
    title: 'Junior Software Engineer — Cloud Platform',
    company: 'Datadog',
    companyLogoColor: 'bg-purple-600',
    location: 'New York, NY',
    workModel: 'Hybrid',
    type: 'New Grad',
    compensation: '$140,000 - $165,000 + RSUs',
    postedAgo: '5 days ago',
    deadline: 'Nov 15, 2026',
    description: 'Build observability pipelines processing billions of telemetry events per second. Collaborate with distributed systems engineers to ship real-time querying engines.',
    requirements: [
      'Degree in Computer Science or related STEM discipline graduating 2026',
      'Experience in Go, Python, or Java with familiarity in Docker and Linux environments',
      'Understanding of networking protocols (TCP/HTTP/gRPC) and concurrency'
    ],
    requiredSkills: ['Python', 'Docker', 'AWS', 'Data Structures & Algorithms'],
    matchScore: 78,
    saved: false
  },
  {
    id: 'opp_4',
    title: 'Software Engineer — Early Career',
    company: 'Linear',
    companyLogoColor: 'bg-slate-900',
    location: 'San Francisco, CA or Remote',
    workModel: 'Remote',
    type: 'New Grad',
    compensation: '$150,000 - $175,000 + Equity',
    postedAgo: '1 week ago',
    deadline: 'Rolling',
    description: 'Linear creates software tools for high-performing engineering teams. You will work across the full stack with TypeScript, React, GraphQL, and client-side SQLite sync engines.',
    requirements: [
      'Passionate about UI craftsmanship, micro-interactions, and keyboard-first workflows',
      'Strong knowledge of TypeScript, state management, and modern web APIs',
      'Eye for design details and obsessive focus on client-side latency'
    ],
    requiredSkills: ['TypeScript', 'React', 'GraphQL', 'Tailwind CSS'],
    matchScore: 94,
    saved: true
  }
];

export const initialApplications: JobApplication[] = [
  {
    id: 'app_1',
    opportunityId: 'opp_1',
    company: 'Stripe',
    role: 'Full-Stack Software Engineer — New Grad 2026',
    location: 'San Francisco, CA',
    status: 'interview',
    appliedDate: '2026-09-12',
    nextStepDate: '2026-09-28',
    compensation: '$165,000 base',
    notes: 'Passed technical screen with flying colors! Final round interview scheduled for next Monday with the Core Payments team.',
    contactName: 'Sarah Jenkins (Recruiter)'
  },
  {
    id: 'app_2',
    opportunityId: 'opp_4',
    company: 'Linear',
    role: 'Software Engineer — Early Career',
    location: 'Remote',
    status: 'screening',
    appliedDate: '2026-09-18',
    nextStepDate: '2026-09-30',
    compensation: '$160,000 + Equity',
    notes: 'Submitted customized portfolio case study showing CloudSync canvas project. Awaiting recruiter email.',
    contactName: 'Tuomas Artman'
  },
  {
    id: 'app_3',
    opportunityId: 'opp_2',
    company: 'Figma',
    role: 'Frontend Engineering Intern',
    location: 'San Francisco, CA',
    status: 'applied',
    appliedDate: '2026-09-20',
    notes: 'Applied via college campus career fair referral link.',
    contactName: 'University Recruiting Team'
  },
  {
    id: 'app_4',
    company: 'Datadog',
    role: 'Junior Platform Engineer',
    location: 'New York, NY',
    status: 'wishlist',
    appliedDate: '2026-09-24',
    notes: 'Need to review Docker & Kubernetes notes from Roadmap before submitting application.',
    contactName: 'Datadog Careers'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Stripe Technical Interview Scheduled',
    message: 'Your final round technical & architecture interview is set for Sep 28 at 2:00 PM PST. Review your practice questions!',
    type: 'interview',
    read: false,
    timestamp: '2 hours ago',
    actionRoute: 'mock-interview'
  },
  {
    id: 'notif_2',
    title: 'New High-Match Job Alert (94% Match)',
    message: 'Linear posted "Software Engineer — Early Career" which strongly matches your TypeScript & React skills.',
    type: 'job',
    read: false,
    timestamp: '1 day ago',
    actionRoute: 'opportunities'
  },
  {
    id: 'notif_3',
    title: 'Roadmap Milestone Reminder',
    message: 'You have 1 pending milestone in Phase 1: Dynamic Programming 1D & 2D Memoization.',
    type: 'roadmap',
    read: true,
    timestamp: '3 days ago',
    actionRoute: 'roadmap'
  }
];
