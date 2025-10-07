// Mock data for LabelLink platform
import { TASK_CONFIGS } from '@/config/taskConfig';

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  location: string;
  joinDate: string;
  avatar?: string;
}

export interface Labeler extends User {
  level: number;
  points: number;
  balance: number;
  accuracy: number;
  tasksCompleted: number;
  badges: Badge[];
  friends: string[];
  isOnline: boolean;
}

export interface Client extends User {
  company: string;
  industry: string;
  totalSpent: number;
  projectsCreated: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  type: 'text-sentiment' | 'image-tagging' | 'chat-qa' | 'audio-classification' | 'bounding-box';
  clientId: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'qa-review';
  createdAt: string;
  deadline?: string;
  rewardPerLabel: number;
  totalItems: number;
  completedItems: number;
  demographics: boolean;
  guidelines: string;
  examples: any[];
  targetAccuracy: number;
  currentAccuracy: number;
}

export interface Task {
  id: string;
  projectId: string;
  type: 'text-sentiment' | 'image-tagging' | 'chat-qa' | 'audio-classification' | 'bounding-box';
  content: any;
  options: string[];
  reward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // in minutes
  completedBy: string[];
  labels: TaskLabel[];
}

export interface TaskLabel {
  id: string;
  taskId: string;
  labelerId: string;
  label: string;
  confidence: number;
  timeSpent: number;
  submittedAt: string;
}

export interface Community {
  events: CommunityEvent[];
  leaderboards: Leaderboard;
  messages: Message[];
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  type: 'challenge' | 'training' | 'social';
  startDate: string;
  endDate: string;
  participants: number;
  reward: number;
  isActive: boolean;
}

export interface Leaderboard {
  weekly: LeaderboardEntry[];
  monthly: LeaderboardEntry[];
  allTime: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  rank: number;
  labelerId: string;
  name: string;
  points: number;
  avatar?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'emoji';
  sentAt: string;
  read: boolean;
}

// Mock data
export const mockLabelers: Labeler[] = [
  {
    id: '1',
    name: 'สมหญิง ใจดี',
    email: 'somying@example.com',
    age: 65,
    gender: 'female',
    location: 'Bangkok, Thailand',
    joinDate: '2024-01-15',
    level: 8,
    points: 15420,
    balance: 2340.50,
    accuracy: 94.5,
    tasksCompleted: 1847,
    badges: [
      {
        id: 'b1',
        name: 'Fast Learner',
        description: 'Complete 100 tasks with 90%+ accuracy',
        icon: '🚀',
        earnedAt: '2024-02-20',
        rarity: 'rare'
      },
      {
        id: 'b2',
        name: 'Reliable Worker',
        description: 'Complete tasks for 30 consecutive days',
        icon: '⭐',
        earnedAt: '2024-03-15',
        rarity: 'epic'
      }
    ],
    friends: ['2', '3', '4'],
    isOnline: true,
    avatar: '/avatars/somying.jpg'
  },
  {
    id: '2',
    name: 'วิชัย สุขใส',
    email: 'wichai@example.com',
    age: 72,
    gender: 'male',
    location: 'Chiang Mai, Thailand',
    joinDate: '2024-02-01',
    level: 6,
    points: 8930,
    balance: 1205.75,
    accuracy: 91.2,
    tasksCompleted: 1203,
    badges: [
      {
        id: 'b3',
        name: 'Community Helper',
        description: 'Help 50 new labelers',
        icon: '🤝',
        earnedAt: '2024-04-01',
        rarity: 'rare'
      }
    ],
    friends: ['1', '3'],
    isOnline: false,
    avatar: '/avatars/wichai.jpg'
  }
];

export const mockClients: Client[] = [
  {
    id: 'c1',
    name: 'David Chen',
    email: 'david@aitech.com',
    age: 34,
    gender: 'male',
    location: 'Singapore',
    joinDate: '2024-01-10',
    company: 'AI Tech Solutions',
    industry: 'Technology',
    totalSpent: 45000,
    projectsCreated: 12
  },
  {
    id: 'c2',
    name: 'Sarah Johnson',
    email: 'sarah@chatbot.io',
    age: 29,
    gender: 'female',
    location: 'San Francisco, USA',
    joinDate: '2024-02-15',
    company: 'ChatBot.io',
    industry: 'Software',
    totalSpent: 28000,
    projectsCreated: 8
  }
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'การวิเคราะห์ความรู้สึกรีวิวอาหาร',
    description: 'วิเคราะห์ความรู้สึกจากรีวิวร้านอาหารเพื่อปรับปรุงการแนะนำ',
    type: 'text-sentiment',
    clientId: 'c1',
    status: 'active',
    createdAt: '2024-09-15',
    deadline: '2024-11-15',
    rewardPerLabel: TASK_CONFIGS.t1.rate,
    totalItems: 5000,
    completedItems: 3247,
    demographics: true,
    guidelines: 'อ่านรีวิวอาหารแต่ละข้อและระบุความรู้สึกที่แสดงออก เน้นประสบการณ์โดยรวม',
    examples: [
      {
        text: 'อาหารอร่อยมาก บริการดี จัดส่งรวดเร็ว',
        label: 'positive'
      },
      {
        text: 'อาหารเย็นเกินไป เสียเวลารอนาน ไม่ค่อยประทับใจ',
        label: 'negative'
      }
    ],
    targetAccuracy: 85,
    currentAccuracy: 92.3
  },
  {
    id: 'p2',
    title: 'การติดป้ายสินค้าแฟชั่น',
    description: 'ติดป้ายรูปภาพเสื้อผ้าในร้านออนไลน์เพื่อปรับปรุงการค้นหา',
    type: 'image-tagging',
    clientId: 'c2',
    status: 'active',
    createdAt: '2024-09-20',
    rewardPerLabel: TASK_CONFIGS.t2.rate,
    totalItems: 8000,
    completedItems: 1240,
    demographics: true,
    guidelines: 'ดูรูปเสื้อผ้าแต่ละชิ้นและเลือกป้ายที่อธิบายประเภท สี และสไตล์',
    examples: [],
    targetAccuracy: 90,
    currentAccuracy: 89.7
  },
  {
    id: 'p3',
    title: 'การประเมินการสนทนา AI',
    description: 'ประเมินคุณภาพการตอบของ AI ในการสนทนาภาษาไทย',
    type: 'chat-qa',
    clientId: 'c1',
    status: 'active',
    createdAt: '2024-09-25',
    rewardPerLabel: TASK_CONFIGS.t3.rate,
    totalItems: 2000,
    completedItems: 456,
    demographics: true,
    guidelines: 'อ่านบทสนทนาและประเมินความเหมาะสมของคำตอบ AI',
    examples: [],
    targetAccuracy: 88,
    currentAccuracy: 90.1
  },
  {
    id: 'p4',
    title: 'การวาดกรอบวัตถุในภาพ',
    description: 'วาดกรอบรอบวัตถุต่างๆ ในรูปภาพเพื่อฝึก AI มองเห็น',
    type: 'bounding-box',
    clientId: 'c2',
    status: 'active',
    createdAt: '2024-10-01',
    rewardPerLabel: TASK_CONFIGS.t10.rate,
    totalItems: 3000,
    completedItems: 234,
    demographics: true,
    guidelines: 'วาดกรอบสี่เหลี่ยมรอบวัตถุที่ระบุในรูปภาพ',
    examples: [],
    targetAccuracy: 92,
    currentAccuracy: 88.5
  },
  {
    id: 'p5',
    title: 'การบันทึกเสียงภาษาไทย',
    description: 'บันทึกเสียงตามประโยคที่กำหนดเพื่อฝึก AI รู้จักเสียงภาษาไทย',
    type: 'audio-classification',
    clientId: 'c1',
    status: 'active',
    createdAt: '2024-10-05',
    rewardPerLabel: TASK_CONFIGS.t11.rate,
    totalItems: 1500,
    completedItems: 89,
    demographics: true,
    guidelines: 'อ่านประโยคที่กำหนดและบันทึกเสียงให้ชัดเจน',
    examples: [],
    targetAccuracy: 87,
    currentAccuracy: 91.2
  }
];

export const mockTasks: Task[] = [
  {
    id: 't1',
    projectId: 'p1',
    type: 'text-sentiment',
    content: {
      text: 'อาหารอร่อยมาก บริการดี จัดส่งรวดเร็ว ประทับใจค่ะ ⭐⭐⭐⭐⭐'
    },
    options: ['Positive', 'Neutral', 'Negative'],
    reward: TASK_CONFIGS.t1.rate,
    difficulty: 'easy',
    estimatedTime: 3,
    completedBy: [],
    labels: []
  },
  {
    id: 't2',
    projectId: 'p2',
    type: 'image-tagging',
    content: {
      imageUrl: '/images/fashion-shirt.jpg',
      description: 'ติดป้ายเสื้อผ้าแฟชั่น'
    },
    options: ['เสื้อเชิ้ต', 'เสื้อยืด', 'เดรส', 'กางเกง', 'สีแดง', 'สีน้ำเงิน', 'สีดำ', 'สีขาว', 'ลำลอง', 'ทางการ'],
    reward: TASK_CONFIGS.t2.rate,
    difficulty: 'medium',
    estimatedTime: 3,
    completedBy: [],
    labels: []
  },
  {
    id: 't3',
    projectId: 'p3',
    type: 'chat-qa',
    content: {
      conversation: [
        { role: 'user', text: 'สวัสดีครับ ช่วยแนะนำเมนูอาหารไทยดีๆ หน่อยครับ' },
        { role: 'assistant', text: 'สวัสดีครับ! แนะนำเมนูไทยยอดนิยม เช่น ผะแกงกะหรี่ไก่ ต้มยำกุ้ง หรือส้มตำไทย อยากทานแบบไหนครับ เผ็ดหรือไม่เผ็ด?' },
        { role: 'user', text: 'ชอบเผ็ดๆ ครับ' },
        { role: 'assistant', text: 'งั้นแนะนำลาบหมู ส้มตำ และแกงเขียวหวานไก่ครับ อร่อยและเผ็ดจัดจ้าน!' }
      ],
      question: 'ประเมินคุณภาพการตอบของ AI ในการแนะนำอาหาร'
    },
    options: ['ดีมาก', 'ดี', 'ปานกลาง', 'ต้องปรับปรุง'],
    reward: TASK_CONFIGS.t3.rate,
    difficulty: 'medium',
    estimatedTime: 5,
    completedBy: [],
    labels: []
  },
  {
    id: 't10',
    projectId: 'p4',
    type: 'bounding-box',
    content: {
      imageUrl: '/images/street-objects.jpg',
      description: 'วาดกรอบรอบวัตถุในภาพถนน',
      objects: ['รถยนต์', 'คน', 'สัญญาณไฟ', 'ป้ายร้าน', 'ต้นไม้']
    },
    options: [],
    reward: TASK_CONFIGS.t10.rate,
    difficulty: 'hard',
    estimatedTime: 12,
    completedBy: [],
    labels: []
  },
  {
    id: 't11',
    projectId: 'p5',
    type: 'audio-classification',
    content: {
      sentences: [
        'สวัสดีครับ ยินดีที่ได้รู้จักครับ',
        'วันนี้อากาศเป็นอย่างไรบ้างครับ',
        'กรุณาเปิดหน้าต่างด้วยครับ',
        'กาลครั้งหนึ่งมีเจ้าหญิงคนหนึ่งอาศัยอยู่ในปราสาท',
        'คุณชอบกินอาหารประเภทไหนครับ'
      ],
      description: 'บันทึกเสียงตามประโยคที่กำหนด'
    },
    options: [],
    reward: TASK_CONFIGS.t11.rate,
    difficulty: 'medium',
    estimatedTime: 15,
    completedBy: [],
    labels: []
  }
];

// Dynamic task generation from config
export const generateAvailableTasks = () => {
  return Object.keys(TASK_CONFIGS).map(taskId => {
    const config = TASK_CONFIGS[taskId as keyof typeof TASK_CONFIGS];
    const correspondingMockTask = mockTasks.find(task => task.id === taskId);
    
    return {
      id: taskId,
      projectId: correspondingMockTask?.projectId || 'p1',
      type: correspondingMockTask?.type || 'text-sentiment',
      content: correspondingMockTask?.content || { text: 'Sample content' },
      options: correspondingMockTask?.options || ['Option 1', 'Option 2', 'Option 3'],
      reward: config.rate,
      difficulty: correspondingMockTask?.difficulty || 'medium',
      estimatedTime: correspondingMockTask?.estimatedTime || 5,
      completedBy: [],
      labels: [],
      // Add config data for easy access
      taskConfig: config
    };
  });
};

export const mockCommunity: Community = {
  events: [
    {
      id: 'e1',
      title: 'October Labeling Challenge',
      description: 'Complete 500 labels this week to win bonus points!',
      type: 'challenge',
      startDate: '2024-10-01',
      endDate: '2024-10-31',
      participants: 234,
      reward: 100,
      isActive: true
    },
    {
      id: 'e2',
      title: 'New Labeler Training Session',
      description: 'Learn tips and tricks for better accuracy',
      type: 'training',
      startDate: '2024-10-10',
      endDate: '2024-10-10',
      participants: 45,
      reward: 0,
      isActive: false
    }
  ],
  leaderboards: {
    weekly: [
      { rank: 1, labelerId: '1', name: 'สมหญิง ใจดี', points: 450 },
      { rank: 2, labelerId: '2', name: 'วิชัย สุขใส', points: 390 },
      { rank: 3, labelerId: '3', name: 'มาลี รักสุข', points: 320 }
    ],
    monthly: [
      { rank: 1, labelerId: '1', name: 'สมหญิง ใจดี', points: 1850 },
      { rank: 2, labelerId: '4', name: 'สมชาย ดีใจ', points: 1640 },
      { rank: 3, labelerId: '2', name: 'วิชัย สุขใส', points: 1520 }
    ],
    allTime: [
      { rank: 1, labelerId: '1', name: 'สมหญิง ใจดี', points: 15420 },
      { rank: 2, labelerId: '5', name: 'อุมา ใจซื่อ', points: 12840 },
      { rank: 3, labelerId: '2', name: 'วิชัย สุขใส', points: 8930 }
    ]
  },
  messages: [
    {
      id: 'm1',
      senderId: '2',
      receiverId: '1',
      content: 'สวัสดีครับ วันนี้ทำงานเท่าไหร่แล้วครับ?',
      type: 'text',
      sentAt: '2024-10-06T08:30:00Z',
      read: true
    },
    {
      id: 'm2',
      senderId: '1',
      receiverId: '2',
      content: '😊',
      type: 'emoji',
      sentAt: '2024-10-06T08:35:00Z',
      read: false
    }
  ]
};

// Demographic insights data
export const mockDemographicInsights = {
  ageGroups: {
    '50-59': { count: 124, averageAccuracy: 88.5, sentiment: { positive: 45, neutral: 35, negative: 20 } },
    '60-69': { count: 298, averageAccuracy: 91.2, sentiment: { positive: 52, neutral: 32, negative: 16 } },
    '70-79': { count: 156, averageAccuracy: 89.8, sentiment: { positive: 48, neutral: 38, negative: 14 } },
    '80+': { count: 43, averageAccuracy: 86.3, sentiment: { positive: 41, neutral: 42, negative: 17 } }
  },
  genderDistribution: {
    male: 45,
    female: 52,
    other: 3
  },
  locationDistribution: {
    'Bangkok': 156,
    'Chiang Mai': 89,
    'Phuket': 67,
    'Khon Kaen': 54,
    'Others': 255
  }
};