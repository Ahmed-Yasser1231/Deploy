// User Types
export type UserRole = 'entrepreneur' | 'investor' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  bio?: string;
  experience?: string;
  linkedIn?: string;
  phone?: string;
  investmentRange?: {
    min: number;
    max: number;
  };
  preferredIndustries?: Industry[];
  riskTolerance?: RiskLevel;
  preferredStages?: ProjectStage[];
  subscriptionTier?: SubscriptionTier;
  projects: Project[];
  investments: Investment[];
  createdAt: string;
}

// Project Types
export type ProjectStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'funded';
export type ProjectStage = 'idea' | 'mvp' | 'early-stage' | 'growth' | 'expansion';
export type RiskLevel = 'low' | 'medium' | 'high';
export type Industry = 
  | 'technology' 
  | 'healthcare' 
  | 'fintech' 
  | 'e-commerce' 
  | 'education' 
  | 'real-estate' 
  | 'manufacturing' 
  | 'agriculture'
  | 'energy'
  | 'entertainment';

export type SubscriptionTier = 'basic' | 'professional' | 'enterprise';

export interface Project {
  id: string;
  userId: string;
  user?: User;
  name: string;
  description: string;
  industry: Industry;
  stage: ProjectStage;
  status: ProjectStatus;
  fundingGoal: number;
  fundingRaised: number;
  equityOffered: number;
  riskLevel: RiskLevel;
  marketGrowthPrediction: number;
  targetMarket: string;
  marketSize: number;
  founders: Founder[];
  financials: FinancialData;
  documents: Document[];
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
}

export interface Founder {
  name: string;
  role: string;
  background: string;
  linkedIn?: string;
  avatar?: string;
}

export interface FinancialData {
  revenue: MonthlyData[];
  expenses: MonthlyData[];
  profit: MonthlyData[];
  cashFlow: MonthlyData[];
  projectedRevenue: MonthlyData[];
}

export interface MonthlyData {
  month: string;
  value: number;
}

export interface Document {
  id: string;
  name: string;
  type: 'pitch-deck' | 'financial-statement' | 'business-plan' | 'legal' | 'other';
  url: string;
  uploadedAt: string;
}

// Investment Types
export interface Investment {
  id: string;
  projectId: string;
  project?: Project;
  userId: string;
  amount: number;
  equityReceived: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

// Chat Types
export interface Message {
  id: string;
  chatRoomId: string;
  senderId: string;
  sender?: User;
  content: string;
  type: 'text' | 'file' | 'image';
  fileUrl?: string;
  createdAt: string;
  read: boolean;
}

export interface ChatRoom {
  id: string;
  projectId: string;
  project?: Project;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
}

// Notification Types
export type NotificationType = 
  | 'project-status' 
  | 'investment' 
  | 'message' 
  | 'match' 
  | 'system';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

// Dashboard Types
export interface DashboardStats {
  totalProjects: number;
  totalFunding: number;
  activeUsers: number;
  successRate: number;
}

export interface MatchRecommendation {
  id: string;
  project?: Project;
  user?: User;
  matchScore: number;
  reasons: string[];
}
