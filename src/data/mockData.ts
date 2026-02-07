import type { 
  Project, 
  Message, 
  Notification,
  EntrepreneurProfile,
  InvestorProfile,
  MatchRecommendation,
  ChatRoom
} from '../types';

// Mock Users
export const mockEntrepreneur: EntrepreneurProfile = {
  id: 'e1',
  email: 'ahmed@techstart.com',
  firstName: 'Ahmed',
  lastName: 'Hassan',
  role: 'entrepreneur',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  company: 'TechStart Egypt',
  bio: 'Serial entrepreneur with 10+ years experience in tech startups',
  experience: 'Founded 3 successful startups in MENA region',
  linkedIn: 'https://linkedin.com/in/ahmedhassan',
  projects: [],
  investments: [],
  createdAt: '2024-01-15T10:00:00Z'
};

export const mockInvestor: InvestorProfile = {
  id: 'i1',
  email: 'mariam@investments.com',
  firstName: 'Mariam',
  lastName: 'Ahmed',
  role: 'investor',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  company: 'Cairo Ventures',
  investmentRange: { min: 50000, max: 500000 },
  preferredIndustries: ['technology', 'fintech', 'healthcare'],
  riskTolerance: 'medium',
  preferredStages: ['mvp', 'early-stage'],
  portfolio: [],
  subscriptionTier: 'professional',
  projects: [],
  investments: [],
  createdAt: '2023-11-20T10:00:00Z'
};

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: 'p1',
    userId: 'e1',
    name: 'EcoTrack',
    description: 'AI-powered sustainability tracking platform for businesses. Monitor carbon footprint, optimize resources, and achieve ESG compliance with real-time analytics and actionable insights.',
    industry: 'technology',
    stage: 'mvp',
    status: 'approved',
    fundingGoal: 250000,
    fundingRaised: 75000,
    equityOffered: 15,
    riskLevel: 'medium',
    marketGrowthPrediction: 23.5,
    targetMarket: 'B2B - Medium to Large Enterprises in MENA',
    marketSize: 5000000000,
    founders: [
      { name: 'Ahmed Hassan', role: 'CEO', background: '10+ years in tech leadership' , avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
      { name: 'Mona Salem', role: 'CTO', background: 'Ex-Google engineer', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150' }
    ],
    financials: {
      revenue: [
        { month: 'Jan', value: 15000 }, { month: 'Feb', value: 22000 },
        { month: 'Mar', value: 28000 }, { month: 'Apr', value: 35000 },
        { month: 'May', value: 42000 }, { month: 'Jun', value: 55000 }
      ],
      expenses: [
        { month: 'Jan', value: 20000 }, { month: 'Feb', value: 25000 },
        { month: 'Mar', value: 28000 }, { month: 'Apr', value: 30000 },
        { month: 'May', value: 32000 }, { month: 'Jun', value: 35000 }
      ],
      profit: [
        { month: 'Jan', value: -5000 }, { month: 'Feb', value: -3000 },
        { month: 'Mar', value: 0 }, { month: 'Apr', value: 5000 },
        { month: 'May', value: 10000 }, { month: 'Jun', value: 20000 }
      ],
      cashFlow: [
        { month: 'Jan', value: 50000 }, { month: 'Feb', value: 47000 },
        { month: 'Mar', value: 47000 }, { month: 'Apr', value: 52000 },
        { month: 'May', value: 62000 }, { month: 'Jun', value: 82000 }
      ],
      projectedRevenue: [
        { month: 'Jul', value: 70000 }, { month: 'Aug', value: 85000 },
        { month: 'Sep', value: 100000 }, { month: 'Oct', value: 120000 },
        { month: 'Nov', value: 140000 }, { month: 'Dec', value: 165000 }
      ]
    },
    documents: [
      { id: 'd1', name: 'Pitch Deck', type: 'pitch-deck', url: '#', uploadedAt: '2024-01-20' },
      { id: 'd2', name: 'Financial Projections', type: 'financial-statement', url: '#', uploadedAt: '2024-01-22' }
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-06-15T10:00:00Z',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'
  },
  {
    id: 'p2',
    userId: 'e2',
    name: 'HealthLink',
    description: 'Telemedicine platform connecting patients with specialists across Egypt. Features include video consultations, e-prescriptions, and health record management.',
    industry: 'healthcare',
    stage: 'early-stage',
    status: 'approved',
    fundingGoal: 500000,
    fundingRaised: 200000,
    equityOffered: 20,
    riskLevel: 'low',
    marketGrowthPrediction: 31.2,
    targetMarket: 'B2C - Healthcare consumers in Egypt',
    marketSize: 8000000000,
    founders: [
      { name: 'Dr. Fatima El-Sayed', role: 'CEO', background: 'Physician with MBA', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
      { name: 'Omar Khaled', role: 'CTO', background: 'Health-tech veteran', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' }
    ],
    financials: {
      revenue: [
        { month: 'Jan', value: 45000 }, { month: 'Feb', value: 52000 },
        { month: 'Mar', value: 61000 }, { month: 'Apr', value: 72000 },
        { month: 'May', value: 85000 }, { month: 'Jun', value: 98000 }
      ],
      expenses: [
        { month: 'Jan', value: 35000 }, { month: 'Feb', value: 38000 },
        { month: 'Mar', value: 42000 }, { month: 'Apr', value: 48000 },
        { month: 'May', value: 52000 }, { month: 'Jun', value: 58000 }
      ],
      profit: [
        { month: 'Jan', value: 10000 }, { month: 'Feb', value: 14000 },
        { month: 'Mar', value: 19000 }, { month: 'Apr', value: 24000 },
        { month: 'May', value: 33000 }, { month: 'Jun', value: 40000 }
      ],
      cashFlow: [
        { month: 'Jan', value: 120000 }, { month: 'Feb', value: 134000 },
        { month: 'Mar', value: 153000 }, { month: 'Apr', value: 177000 },
        { month: 'May', value: 210000 }, { month: 'Jun', value: 250000 }
      ],
      projectedRevenue: [
        { month: 'Jul', value: 115000 }, { month: 'Aug', value: 135000 },
        { month: 'Sep', value: 158000 }, { month: 'Oct', value: 185000 },
        { month: 'Nov', value: 215000 }, { month: 'Dec', value: 250000 }
      ]
    },
    documents: [],
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-06-10T10:00:00Z',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800'
  },
  {
    id: 'p3',
    userId: 'e3',
    name: 'PayFlow',
    description: 'Digital payment infrastructure for SMEs in emerging markets. Simplify payments, invoicing, and financial operations with one integrated platform.',
    industry: 'fintech',
    stage: 'growth',
    status: 'approved',
    fundingGoal: 1000000,
    fundingRaised: 650000,
    equityOffered: 12,
    riskLevel: 'low',
    marketGrowthPrediction: 28.7,
    targetMarket: 'B2B - SMEs across MENA region',
    marketSize: 15000000000,
    founders: [
      { name: 'Karim Nasser', role: 'CEO', background: 'Ex-Stripe, 8 years fintech', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
      { name: 'Layla Ibrahim', role: 'COO', background: 'Banking operations expert', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150' }
    ],
    financials: {
      revenue: [
        { month: 'Jan', value: 150000 }, { month: 'Feb', value: 175000 },
        { month: 'Mar', value: 205000 }, { month: 'Apr', value: 240000 },
        { month: 'May', value: 280000 }, { month: 'Jun', value: 325000 }
      ],
      expenses: [
        { month: 'Jan', value: 100000 }, { month: 'Feb', value: 110000 },
        { month: 'Mar', value: 125000 }, { month: 'Apr', value: 140000 },
        { month: 'May', value: 155000 }, { month: 'Jun', value: 175000 }
      ],
      profit: [
        { month: 'Jan', value: 50000 }, { month: 'Feb', value: 65000 },
        { month: 'Mar', value: 80000 }, { month: 'Apr', value: 100000 },
        { month: 'May', value: 125000 }, { month: 'Jun', value: 150000 }
      ],
      cashFlow: [
        { month: 'Jan', value: 400000 }, { month: 'Feb', value: 465000 },
        { month: 'Mar', value: 545000 }, { month: 'Apr', value: 645000 },
        { month: 'May', value: 770000 }, { month: 'Jun', value: 920000 }
      ],
      projectedRevenue: [
        { month: 'Jul', value: 380000 }, { month: 'Aug', value: 440000 },
        { month: 'Sep', value: 510000 }, { month: 'Oct', value: 590000 },
        { month: 'Nov', value: 680000 }, { month: 'Dec', value: 785000 }
      ]
    },
    documents: [],
    createdAt: '2023-08-15T10:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
    thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800'
  },
  {
    id: 'p4',
    userId: 'e4',
    name: 'AgriSmart',
    description: 'IoT-based precision agriculture platform. Smart sensors, drone monitoring, and AI analytics to optimize crop yields and reduce water consumption.',
    industry: 'agriculture',
    stage: 'mvp',
    status: 'approved',
    fundingGoal: 350000,
    fundingRaised: 50000,
    equityOffered: 18,
    riskLevel: 'high',
    marketGrowthPrediction: 18.5,
    targetMarket: 'B2B - Large agricultural operations in Egypt',
    marketSize: 3000000000,
    founders: [
      { name: 'Youssef Mansour', role: 'CEO', background: 'Agricultural engineer', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' }
    ],
    financials: {
      revenue: [
        { month: 'Jan', value: 5000 }, { month: 'Feb', value: 8000 },
        { month: 'Mar', value: 12000 }, { month: 'Apr', value: 15000 },
        { month: 'May', value: 20000 }, { month: 'Jun', value: 28000 }
      ],
      expenses: [
        { month: 'Jan', value: 25000 }, { month: 'Feb', value: 28000 },
        { month: 'Mar', value: 30000 }, { month: 'Apr', value: 32000 },
        { month: 'May', value: 35000 }, { month: 'Jun', value: 38000 }
      ],
      profit: [
        { month: 'Jan', value: -20000 }, { month: 'Feb', value: -20000 },
        { month: 'Mar', value: -18000 }, { month: 'Apr', value: -17000 },
        { month: 'May', value: -15000 }, { month: 'Jun', value: -10000 }
      ],
      cashFlow: [
        { month: 'Jan', value: 80000 }, { month: 'Feb', value: 60000 },
        { month: 'Mar', value: 42000 }, { month: 'Apr', value: 25000 },
        { month: 'May', value: 10000 }, { month: 'Jun', value: 0 }
      ],
      projectedRevenue: [
        { month: 'Jul', value: 35000 }, { month: 'Aug', value: 45000 },
        { month: 'Sep', value: 58000 }, { month: 'Oct', value: 75000 },
        { month: 'Nov', value: 95000 }, { month: 'Dec', value: 120000 }
      ]
    },
    documents: [],
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-05-20T10:00:00Z',
    thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800'
  },
  {
    id: 'p5',
    userId: 'e5',
    name: 'EduTech Pro',
    description: 'Adaptive learning platform using AI to personalize education. Features include intelligent tutoring, progress tracking, and curriculum optimization.',
    industry: 'education',
    stage: 'early-stage',
    status: 'approved',
    fundingGoal: 400000,
    fundingRaised: 120000,
    equityOffered: 22,
    riskLevel: 'medium',
    marketGrowthPrediction: 25.3,
    targetMarket: 'B2C/B2B - Students and educational institutions',
    marketSize: 6000000000,
    founders: [
      { name: 'Nadia Mahmoud', role: 'CEO', background: 'EdTech entrepreneur', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150' },
      { name: 'Tarek Ali', role: 'CTO', background: 'AI/ML specialist', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150' }
    ],
    financials: {
      revenue: [
        { month: 'Jan', value: 25000 }, { month: 'Feb', value: 32000 },
        { month: 'Mar', value: 40000 }, { month: 'Apr', value: 48000 },
        { month: 'May', value: 58000 }, { month: 'Jun', value: 70000 }
      ],
      expenses: [
        { month: 'Jan', value: 30000 }, { month: 'Feb', value: 33000 },
        { month: 'Mar', value: 36000 }, { month: 'Apr', value: 40000 },
        { month: 'May', value: 44000 }, { month: 'Jun', value: 48000 }
      ],
      profit: [
        { month: 'Jan', value: -5000 }, { month: 'Feb', value: -1000 },
        { month: 'Mar', value: 4000 }, { month: 'Apr', value: 8000 },
        { month: 'May', value: 14000 }, { month: 'Jun', value: 22000 }
      ],
      cashFlow: [
        { month: 'Jan', value: 95000 }, { month: 'Feb', value: 94000 },
        { month: 'Mar', value: 98000 }, { month: 'Apr', value: 106000 },
        { month: 'May', value: 120000 }, { month: 'Jun', value: 142000 }
      ],
      projectedRevenue: [
        { month: 'Jul', value: 85000 }, { month: 'Aug', value: 102000 },
        { month: 'Sep', value: 122000 }, { month: 'Oct', value: 145000 },
        { month: 'Nov', value: 170000 }, { month: 'Dec', value: 200000 }
      ]
    },
    documents: [],
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-06-05T10:00:00Z',
    thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800'
  }
];

// Mock Chat Rooms
export const mockChatRooms: ChatRoom[] = [
  {
    id: 'c1',
    projectId: 'p1',
    project: mockProjects[0],
    participants: [mockEntrepreneur, mockInvestor],
    lastMessage: {
      id: 'm1',
      chatRoomId: 'c1',
      senderId: 'i1',
      content: 'I\'m very interested in your sustainability metrics. Can we schedule a call?',
      type: 'text',
      createdAt: '2024-06-15T14:30:00Z',
      read: false
    },
    unreadCount: 2,
    createdAt: '2024-06-10T10:00:00Z'
  },
  {
    id: 'c2',
    projectId: 'p2',
    project: mockProjects[1],
    participants: [mockEntrepreneur, mockInvestor],
    lastMessage: {
      id: 'm2',
      chatRoomId: 'c2',
      senderId: 'e2',
      content: 'Thank you for your interest! I\'ve attached the detailed financials.',
      type: 'text',
      createdAt: '2024-06-14T09:15:00Z',
      read: true
    },
    unreadCount: 0,
    createdAt: '2024-06-08T10:00:00Z'
  }
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'm1',
    chatRoomId: 'c1',
    senderId: 'i1',
    content: 'Hello! I\'ve reviewed your project and I\'m impressed with the growth metrics.',
    type: 'text',
    createdAt: '2024-06-15T10:00:00Z',
    read: true
  },
  {
    id: 'm2',
    chatRoomId: 'c1',
    senderId: 'e1',
    content: 'Thank you for reaching out! I\'d be happy to discuss the opportunity further.',
    type: 'text',
    createdAt: '2024-06-15T10:30:00Z',
    read: true
  },
  {
    id: 'm3',
    chatRoomId: 'c1',
    senderId: 'i1',
    content: 'Could you share more details about your customer acquisition strategy?',
    type: 'text',
    createdAt: '2024-06-15T11:00:00Z',
    read: true
  },
  {
    id: 'm4',
    chatRoomId: 'c1',
    senderId: 'e1',
    content: 'Of course! We focus on B2B partnerships with enterprise clients. Our CAC is around $500 with an LTV of $15,000.',
    type: 'text',
    createdAt: '2024-06-15T12:00:00Z',
    read: true
  },
  {
    id: 'm5',
    chatRoomId: 'c1',
    senderId: 'i1',
    content: 'I\'m very interested in your sustainability metrics. Can we schedule a call?',
    type: 'text',
    createdAt: '2024-06-15T14:30:00Z',
    read: false
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: 'e1',
    type: 'match',
    title: 'New Investor Match',
    message: 'Sarah Ahmed from Cairo Ventures matches 92% with your project EcoTrack',
    read: false,
    link: '/projects/p1',
    createdAt: '2024-06-15T16:00:00Z'
  },
  {
    id: 'n2',
    userId: 'e1',
    type: 'message',
    title: 'New Message',
    message: 'You have a new message from Sarah Ahmed regarding EcoTrack',
    read: false,
    link: '/chat/c1',
    createdAt: '2024-06-15T14:30:00Z'
  },
  {
    id: 'n3',
    userId: 'e1',
    type: 'project-status',
    title: 'Project Approved',
    message: 'Your project EcoTrack has been approved and is now visible to investors',
    read: true,
    link: '/projects/p1',
    createdAt: '2024-06-14T10:00:00Z'
  },
  {
    id: 'n4',
    userId: 'i1',
    type: 'match',
    title: 'New Project Match',
    message: 'EcoTrack matches your investment criteria with 92% compatibility',
    read: false,
    link: '/projects/p1',
    createdAt: '2024-06-15T12:00:00Z'
  }
];

// Mock Match Recommendations
export const mockMatchRecommendations: MatchRecommendation[] = [
  {
    id: 'r1',
    project: mockProjects[0],
    matchScore: 92,
    reasons: [
      'Industry alignment: Technology',
      'Investment range matches funding goal',
      'Risk tolerance: Medium matches project risk',
      'Stage preference: MVP'
    ]
  },
  {
    id: 'r2',
    project: mockProjects[1],
    matchScore: 88,
    reasons: [
      'Industry alignment: Healthcare',
      'Low risk project matches conservative preference',
      'Strong growth metrics'
    ]
  },
  {
    id: 'r3',
    project: mockProjects[2],
    matchScore: 85,
    reasons: [
      'Industry alignment: Fintech',
      'Growth stage with proven traction',
      'Low risk classification'
    ]
  }
];

// Utility functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getIndustryLabel = (industry: string): string => {
  const labels: Record<string, string> = {
    'technology': 'Technology',
    'healthcare': 'Healthcare',
    'fintech': 'FinTech',
    'e-commerce': 'E-Commerce',
    'education': 'Education',
    'real-estate': 'Real Estate',
    'manufacturing': 'Manufacturing',
    'agriculture': 'Agriculture',
    'energy': 'Energy',
    'entertainment': 'Entertainment'
  };
  return labels[industry] || industry;
};

export const getRiskLevelColor = (risk: string): string => {
  const colors: Record<string, string> = {
    'low': '#10b981',
    'medium': '#f59e0b',
    'high': '#ef4444'
  };
  return colors[risk] || '#6b7280';
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    'draft': '#6b7280',
    'pending': '#f59e0b',
    'approved': '#10b981',
    'rejected': '#ef4444',
    'funded': '#8b5cf6'
  };
  return colors[status] || '#6b7280';
};
