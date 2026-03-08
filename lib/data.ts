// lib/data.ts – All data lives here. Import ONLY via lib/fetchData.ts everywhere else.

export type ImpactLevel = 'high' | 'medium' | 'low';
export type MiscStatus = 'in-progress' | 'upcoming' | 'planned' | 'completed';
export type MiscType = 'learning' | 'upcoming' | 'goal' | 'personal' | 'other';
export type ChartType = 'line' | 'bar' | 'before-after';
export type FeatureType = 'OPS' | 'IRQ' | 'SAP' | 'TPRM';

export type InnovationCategory =
  | 'Tech'
  | 'Business Logic'
  | 'Process'
  | 'Other';
export type InnovationStatus = 'Implemented' | 'Planned' | 'Proposed';

export interface InnovationIdea {
  id: string;
  title: string;
  description: string;
  category: InnovationCategory;
  status: InnovationStatus;
  date?: string; // "YYYY-MM"
  impact?: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  unit?: string;
}

export interface AchievementChart {
  type: ChartType;
  title: string;
  unit?: string;
  data: ChartDataPoint[];
  beforeLabel?: string;
  afterLabel?: string;
}

export interface SupportingDoc {
  id: string;
  title: string;
  url: string;
  type: 'doc' | 'design' | 'recording' | 'report' | 'other';
}

export interface AchievementTestimonial {
  id: string;
  name: string;
  designation: string;
  image?: string;
  comment: string;
}

export interface Achievement {
  id: string;
  title: string;
  featureType?: FeatureType;
  category: string;
  impact: ImpactLevel;
  date?: string;
  metric?: string;
  description?: string;
  tickets?: Array<{ label: string; url: string }>;
  prs?: Array<{ label: string; url: string }>;
  chart?: AchievementChart;
  supportingDocs?: SupportingDoc[];
  testimonials?: AchievementTestimonial[];
  beforeAfterImages?: { before: string; after: string };
}

export type SkillCategory = 'improved' | 'new';

export interface Skill {
  name: string;
  level: number;
  category?: SkillCategory;
  description?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  image?: string;
  comment: string;
}

export interface Badge {
  id: string;
  title: string;
  description?: string;
  earnedOn?: string; // "YYYY-MM"
  icon: string; // Emoji fallback
  color: string; // Theme color variable
  imageUrl?: string; // Optional image (e.g., shields.io)
  imageWidth?: number; // Optional custom width
  imageHeight?: number; // Optional custom height
  viewUrl?: string; // Link to credly or evidence
}

export interface Certification {
  id: string;
  title: string;
  issuer?: string;
  issuedOn?: string;
  expiresOn?: string | null;
  credentialUrl?: string;
  icon?: string;
  registered?: boolean;
}

export interface MiscItem {
  id: string;
  type: MiscType;
  title: string;
  status: MiscStatus;
  progress?: number | null;
  note?: string;
  icon?: string;
}

export interface ProfileMetrics {
  numberOfRelease: number | string;
  highImpactWork: number | string;
  techDiscussions: number | string;
}

export interface BragData {
  name: string;
  role: string;
  profileImage?: string;
  organizationName?: string;
  team?: string;
  period: string;
  years: string[];
  metrics: ProfileMetrics;
  achievements: Achievement[];
  skills: Skill[];
  testimonials: Testimonial[];
  badges: Badge[];
  certifications: Certification[];
  misc: MiscItem[];
  innovationFocus: InnovationIdea[];
}

export const BRAG_DATA: BragData = {
  name: 'Anagha Yawale',
  role: 'Packaged App Development Associate',
  profileImage: '/anagha/display-picture.jpg', // Option to add a profile image URL here
  organizationName: 'Accenture Solutions Private Limited',
  team: 'Supplier Platform-Sustainability',
  period: 'July 2024 – Current',
  years: ['2026', '2025', '2024'],
  metrics: {
    numberOfRelease: 5,
    highImpactWork: 8,
    techDiscussions: 4,
  },
  achievements: [
    {
      id: '1',
      title:
        'Prod Bug: Incorrect Data Displayed in Supplier Profile Sections Across MUs',
      category: 'Bug Fix',
      impact: 'high',
      date: '2026-03',
      metric: 'Prevented erroneous third-party system integration triggers',
      description:
        'Identified and resolved a production issue where irrelevant data sections were being rendered on supplier profiles across multiple market units and countries. The incorrect display was causing unintended downstream integration events in the SAP system. Conducted a cross-MU audit to validate field visibility rules and ensure consistent behavior across all regions.',
    },
    {
      id: '2',
      title:
        'Infrastructure: Base Container Image Update on Non-Production Environments',
      category: 'User Story',
      impact: 'medium',
      date: '2026-02',
      metric: 'Kept dev/test environments up-to-date and secure',
      description:
        'Updated the base container image across test and development environments as part of regular maintenance. Resolved outstanding environment stability issues. Ensured continuity of CI/CD pipelines post-update.',
    },
    {
      id: '3',
      title: 'Dependency Upgrade: Core Notification & Email Library Packages',
      category: 'User Story',
      impact: 'high',
      date: '2026-01',
      metric: 'Resolved known vulnerabilities and compatibility issues',
      description:
        'Upgraded key third-party packages related to email and notification services (nodemailer, SES client) to their latest stable versions. Ensured backward compatibility and ran regression tests to validate existing notification flows remained unaffected.',
    },
    {
      id: '4',
      title:
        'Supplier Form: Added Supplier Profile Question & Status Hold Functionality',
      category: 'User Story',
      impact: 'medium',
      date: '2026-01',
      metric: 'Extended IRQ workflow with new compliance controls',
      description:
        "Implemented new question entries on the supplier profile form within the IRQ module. Added a 'Hold' status capability on the supplier profile to support compliance review workflows. Changes were coordinated with the relevant domain team to align with questionnaire versioning.",
    },
    {
      id: '5',
      title:
        'Supplier Form: Trade Compliance Section & Duplicate Request Bug Fix',
      category: 'Bug Fix',
      impact: 'medium',
      date: '2025-12',
      metric:
        'Eliminated duplicate workflow triggers; added compliance selection UI',
      description:
        'Added a new trade compliance selection field on the supplier profile form in the IRQ module. Simultaneously resolved a production bug where duplicate approval requests were being generated after a specific workflow stage, causing incorrect status propagation. Root cause was traced to an event handling issue in the approval flow.',
    },
    {
      id: '6',
      title:
        'SAP Integration: Supplier Master Data Field Mapping for Regional MUs',
      category: 'User Story',
      impact: 'medium',
      date: '2025-12',
      metric: 'Extended SAP field mapping coverage to new regions',
      description:
        'Implemented SAP integration field mappings for additional regional market units, covering supplier master data fields including name, address, search term, and bank account holder name. Ensured data from the supplier hub was correctly transformed and synced with the SAP system for the newly onboarded regions.',
    },
    {
      id: '7',
      title:
        'TPRM: New API Design for IRQ Payload Validation & Auto-Correction (Implementation)',
      category: 'User Story',
      impact: 'medium',
      date: '2025-11',
      metric: 'Automated IRQ payload correction, reducing manual intervention',
      description:
        'Implemented a new internal API endpoint designed to validate incoming IRQ payloads and apply auto-correction logic before processing.',
    },
    {
      id: '8',
      title: 'TPRM: API Design Analysis for IRQ Payload Validation',
      category: 'Tech Story',
      impact: 'medium',
      date: '2025-11',
      metric: 'Unblocked IRQ pipeline',
      description:
        'Conducted technical analysis and designed the architecture for a new API to handle IRQ payload validation and auto-correction.',
    },
    {
      id: '9',
      title: 'TPRM: Management Level Value Standardization in Database',
      category: 'User Story',
      impact: 'medium',
      date: '2025-10',
      metric:
        'Ensured consistent numeric management level storage across risk assessment modes',
      description:
        'Implemented backend logic to correctly set and persist management level values in the database mapped to their respective risk assessment modes.',
    },
    {
      id: '10',
      title: 'TPRM Dashboard: RAI Rating Column Added to IRQ Section',
      category: 'User Story',
      impact: 'medium',
      date: '2025-10',
      metric: 'Improved risk visibility for assessment reviewers',
      description:
        'Added a new RAI (Risk Assessment Indicator) rating column to the IRQ section of the TPRM dashboard.',
    },
    {
      id: '11',
      title:
        'TPRM: Risk Rating DB Integration & IRQ Questionnaire Answer Option Update',
      category: 'User Story',
      impact: 'medium',
      date: '2025-10',
      metric:
        'Enabled accurate risk data persistence; updated questionnaire answer options',
      description:
        'Implemented database-level changes to store and associate RAI risk ratings with supplier assessment records.',
    },
    {
      id: '12',
      title: 'IRQ: Event Queue Bug Fixes for Score Sync in Report',
      category: 'Bug Fix',
      impact: 'high',
      date: '2025-09',
      metric: 'Restored score update reliability',
      description:
        'Resolved event queue issues causing score updates to fail. This functionality was not implemented and hence it was not working. Completed implementation in bug itself without creating a separate User Story',
    },
    {
      id: '13',
      title:
        'SAP Integration: Payment Terms & Multi-Bank Field Mapping for Regional MUs',
      category: 'User Story',
      impact: 'medium',
      date: '2025-09',
      metric:
        'Extended payment and banking integration coverage to 8+ regional MUs',
      description:
        'Implemented SAP integration logic for payment terms mapping and multi-bank handling across regional market units.',
    },
    {
      id: '14',
      title:
        'SAP Integration: Bank Key Lookup via Reference Data for Regional MUs',
      category: 'User Story',
      impact: 'medium',
      date: '2025-08',
      metric:
        'Automated bank key resolution for 2 regional MUs using lookup tables',
      description:
        'Implemented bank key field mapping using an Excel-based reference lookup dataset.',
    },
    {
      id: '15',
      title:
        'SAP Integration: Category-Based Payment Terms Logic with Regional Exceptions',
      category: 'User Story',
      impact: 'high',
      date: '2025-08',
      metric: 'Handled 8+ regional exception rules for payment term assignment',
      description:
        'Implemented region-specific payment terms logic where assignment depends on supplier category and sub-category.',
    },
    {
      id: '16',
      title:
        'Supplier Onboarding: Legacy Workflow Re-enablement for Migrated Suppliers',
      category: 'User Story',
      impact: 'high',
      date: '2025-07',
      metric:
        'Restored correct onboarding flow for post-migration supplier cohort',
      description:
        'Implemented logic to re-enable the legacy onboarding workflow for suppliers migrated after a major platform release.',
    },
    {
      id: '17',
      title:
        'SAP Integration: Tax ID Parsing, Address Field Validation & Frontend Wave Rollout',
      category: 'User Story',
      impact: 'high',
      date: '2025-07',
      metric:
        'Covered 3 integration stories across tax, address, and frontend enablement',
      description:
        'Implemented tax ID parsing, address validation rules, and enabled SAP integration actions for new countries in the frontend.',
    },
    {
      id: '18',
      title:
        'Async Flow Fix: Duplicate Request Generation After Approval Stage',
      category: 'Bug Fix',
      impact: 'high',
      date: '2025-12',
      metric:
        'Eliminated duplicate downstream requests caused by missing async handliing',
      description:
        'Resolved a production and hotfix bug where duplicate downstream requests were being generated following a successful approval action, resulting in incorrect propagation on the affected records. Root cause analysis identified a missing `await` keyword in an asynchronous function call, causing the execution flow to proceed before the prior operation completed - triggering the downstream action twice. Fix wasapplied and validated across production, hotfix, and staging environments.',
    },
    {
      id: '19',
      title:
        'Advanced Search Filter Fixes: Data Fetch & Response Time Optimisation',
      category: 'Bug Fix',
      impact: 'high',
      date: '2025-11',
      metric: 'Response time reduced from ~6 mins to ~3 secs (~99% faster)',
      description:
        'Resolved two bugs in the advanced search module. First, supplier data was not rendering when multiple filters (region, company code, and category) were applied simultaneously — traced to an incorrect query condition that excluded valid records when combined filters were used. Second, a specific risk-scoring filter was not being fetched correctly in the advanced search field, returning stale or empty results. Both fixes involved correcting the underlying data-fetch and filter-chaining logic. Post-fix, the combined advanced search response time dropped from approximately 6 minutes to under 3 seconds — a ~99% improvement.',
      beforeAfterImages: {
        before: '/anagha/bugs/advanced-search-api-optimization-before.jpeg',
        after: '/anagha/bugs/advanced-search-api-optimization-after.jpeg',
      },
    },
    {
      id: '20',
      title: 'IRQ: Notification Email Template Update',
      category: 'Bug Fix',
      impact: 'low',
      date: '2025-09',
      metric: 'Fixed notification formatting',
      description: 'Corrected email template formatting.',
    },
  ],
  skills: [
    { name: 'AI Agents & Workflow Integration', level: 3.5, category: 'new' },
    { name: 'Microsoft Agentic AI Architecture', level: 3.5, category: 'new' },
    { name: 'Amazon Web Services (AWS)', level: 3.5, category: 'new' },
    { name: 'AWS Compute', level: 3.5, category: 'new' },
    { name: 'AWS Storage Database', level: 3.5, category: 'new' },
    { name: 'AWS Governance', level: 3.5, category: 'new' },
    { name: 'AWS Security', level: 2, category: 'new' },
    { name: 'GitHub', level: 3.5, category: 'new' },
    { name: 'Node.js', level: 3.5, category: 'improved' },
    { name: 'JavaScript', level: 3.5, category: 'improved' },
    {
      name: 'Multiplatform Front End Development Angular',
      level: 3.5,
      category: 'improved',
    },
    { name: 'Python (Programming Language)', level: 3, category: 'improved' },
    { name: 'ML', level: 3, category: 'improved' },
    { name: 'Deep Learning', level: 1, category: 'improved' },
    { name: 'Microsoft Azure Iaas', level: 1, category: 'improved' },
    { name: 'Microsoft Azure Paas', level: 1, category: 'improved' },
    {
      name: 'Microsoft Azure Active Directory',
      level: 1,
      category: 'improved',
    },
    { name: 'Microsoft Azure Data Services', level: 1, category: 'improved' },
  ],
  testimonials: [
    {
      id: 't1',
      name: 'Parag Ved',
      designation: 'AI LLM Technology Architecture Manager',
      comment:
        'Kudos on the excellent work done on the most important of SH epics - P+ workflow and SAP Integration. Despite being among most junior team members your contribution to build, analysis remediation of bugs and getting things across the line have been significant. Your habit of understanding and dissecting requirements is a big differentiator. Looking forward to a great FY26 with opportunities for you to learn, grow and contribute to the project.',
    },
    {
      id: 't2',
      name: 'Supriti Pandey',
      designation: 'Custom Software Engineering Team Lead',
      comment:
        'Anagha has successfully completed the priority of taking on complex tasks, demonstrating her ability to tackle challenging projects with confidence. Her collaboration with the SAP team on the SAP transformation and SAP-SH migration showcases her analytical skills and strategic execution. Additionally, her work in analyzing and enabling old workflows for migrated suppliers highlights her adaptability and technical proficiency in CSNS, IRQ logic, and BI/BDA. To further her development, Anagha is encouraged to explore additional technologies that will enhance her capabilities in full stack development. This proactive approach will not only bolster her skill set but also contribute to her growth within the organization. Overall, her performance in this priority has been commendable, and I look forward to seeing her continued success in future endeavors.',
    },
    {
      id: 't3',
      name: 'Vedant Baviskar',
      designation: 'Custom Software Engineering Analyst',
      comment:
        'Anagha has strong technical foundations and consistently demonstrates solid problem-solving skills. She collaborates well in teams, contributing effectively to discussions and ensuring alignment within the group. Overall, she is a valuable team member whose contributions strengthen the team, and with continued focus on composure during unforeseen challenges, she will only increase her impact further.',
    },
  ],
  badges: [
    {
      id: 'b1',
      title: 'Reinvention with Agentic AI',
      icon: '⚡',
      description:
        'Understanding and practical expertise in applying agentic AI to real-world challenges',
      color: 'var(--secondary)',
      earnedOn: '2026-02',
      imageWidth: 100,
      imageHeight: 100,
      imageUrl: 'anagha/badges/anagha-reinvention-with-agentic-ai-badge.png',
      viewUrl:
        'https://www.credly.com/badges/1aee6038-39d5-43bb-92d1-a97f4512968f/public_url',
    },
    {
      id: 'b2',
      title: 'AWS Certified Cloud Practitioner',
      icon: '🌱',
      description:
        'Fundamental understanding of IT services and their uses in the AWS Cloud',
      color: 'var(--secondary)',
      earnedOn: '2025-10',
      imageWidth: 100,
      imageHeight: 100,
      imageUrl: 'anagha/badges/anagha-aws-cloud-practioner-badge.png',
      viewUrl:
        'https://www.credly.com/badges/5d62f167-5c3b-4a52-8869-99cb7acb4e2d/public_url',
    },
    {
      id: 'b3',
      title: 'AWS Cloud Quest: Cloud Practitioner - Training Badge',
      icon: '♿',
      description: 'Demonstrated basic solution knowledge using AWS services',
      color: 'var(--secondary)',
      earnedOn: '2025-07',
      imageWidth: 100,
      imageHeight: 100,
      imageUrl:
        'anagha/badges/anagha-aws-cloud-quest-cloud-practitioner-badge.png',
      viewUrl:
        'https://www.credly.com/badges/d014d4a0-1e27-4474-83ef-0471b7509090/public_url',
    },
    {
      id: 'b4',
      title: 'LFC131: Green Software for Practitioners',
      icon: '🏅',
      description:
        'Understanding the application of green software principles to the design and development of software applications',
      color: 'var(--secondary)',
      earnedOn: '2024-07',
      imageWidth: 100,
      imageHeight: 100,
      imageUrl:
        'anagha/badges/anagha-lfc131-green-software-for-practitioners-badge.png',
      viewUrl:
        'https://www.credly.com/badges/c8fb38d8-50c5-4c15-a464-8c0035585b0c/public_url',
    },
  ],
  certifications: [
    {
      id: 'c1',
      title: 'Microsoft Github Copilot',
      issuer: 'Microsoft',
      issuedOn: '2025-11',
      expiresOn: '2027-11',
      credentialUrl:
        'https://learn.microsoft.com/en-in/users/anaghayawale-3755/credentials/3da0fbed9c509340',
      icon: '🔄',
    },
    {
      id: 'c2',
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issuedOn: '2025-10',
      expiresOn: '2028-10',
      credentialUrl:
        'https://cp.certmetrics.com/amazon/en/public/verify/credential/c81e52b62b7243389613576570744811',
      icon: '☁️',
    },
    {
      id: 'c3',
      title: 'AWS App Developer Associate',
      issuer: 'Amazon Web Services',
      issuedOn: '',
      expiresOn: '',
      credentialUrl: '',
      registered: true,
      icon: '☁️',
    },
  ],
  misc: [
    {
      id: 'm1',
      type: 'learning',
      title: 'Learning German',
      status: 'in-progress',
      progress: 42,
      note: 'Training under Accenture LKM Language Trainings',
      icon: '🇩🇪',
    },
    {
      id: 'm2',
      type: 'learning',
      title: 'Udacity Cloud Developer Nanodegree Program',
      status: 'in-progress',
      progress: 82,
      note: 'Learning path for AWS App Developer Associate certification',
      icon: '🛠️',
    },
    {
      id: 'm3',
      type: 'learning',
      title: 'Agentic AI Ecosystem Tools Level 3A',
      status: 'completed',
      progress: 100,
      note: 'Accenture Assets in conjunction with Ecosystem tools, Agentic AI Ecosystem tools (with hands-on labs) - Amazon Q Developer.',
      icon: '✍️',
    },
    {
      id: 'm4',
      type: 'learning',
      title: 'Agentic AI Frameworks Level 3B',
      status: 'completed',
      progress: 100,
      note: 'Exploring the Fundamentals, Developing Multi AI Agent Systems Using CrewAI, Multi AI Agents and Advanced Use Cases with CrewAI, Building AI Agents with LangGraph,Develop Context AI Apps with Anthropic, Agent Communication Protocol, Vibe Coding Overview with Repli',
      icon: '✍️',
    },
    {
      id: 'm5',
      type: 'learning',
      title: 'TQ at Accenture',
      status: 'completed',
      progress: 100,
      note: 'TQ (Technology Quotient) builds understanding of how key technologies are changing the world',
      icon: '🦀',
    },
    {
      id: 'm6',
      type: 'learning',
      title: 'Udacity Full Stack JavaScript Developer Nanodegree Program',
      status: 'in-progress',
      progress: 46,
      note: 'Backend Development with Node.js, Creating API with PostgresSQL and Express, Angular Fundamentals, Deployment Process',
      icon: '👩‍💻',
    },
  ],
  innovationFocus: [
    {
      id: 'i1',
      title: 'Auto Formatting - Prettier + Husky',
      description:
        'Integrate Prettier with Husky to automate code formatting entirely. Ensures consistent style across services with zero risk, eliminating unnecessary back-and-forth during code reviews.',
      category: 'Process',
      status: 'Proposed',
    },
    {
      id: 'i2',
      title: 'Modernizing Linting - TSLint to ESLint',
      description:
        'Migrating from deprecated TSLint (since 2019) to a standardized ESLint setup across all services. Provides modern tooling, better IDE support, and catches potential bugs earlier.',
      category: 'Tech',
      status: 'Proposed',
    },
    {
      id: 'i3',
      title: 'Environment-Based Conditional Code',
      description:
        'Introduce environment variables (e.g., node_env) to conditionally run or mock code locally. Solved the problem of a hectic local development setup where code had to be manually commented out, saving development time and simplifying onboarding for new hires.',
      category: 'Process',
      status: 'Proposed',
    },
    {
      id: 'i4',
      title: 'Automate Shared Library Deployment',
      description:
        'Automate the process of updating shared library package versions across all Fargate and queue repositories and running deployments. Replaces a time-consuming manual process.',
      category: 'Process',
      status: 'Proposed',
    },
  ],
};
