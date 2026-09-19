export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export type TopicCategory = 
  | 'basics' 
  | 'technical' 
  | 'options' 
  | 'psychology' 
  | 'risk_management';

export interface InteractiveChartConfig {
  type: 'candlestick' | 'support_resistance' | 'moving_average' | 'rsi' | 'option_payoff';
  dataPoints?: { time: string; open: number; high: number; low: number; close: number }[];
  description?: string;
}

export interface Lesson {
  id: string;
  title: string;
  englishTitle: string;
  category: TopicCategory;
  level: CourseLevel;
  duration: string;
  isPremium: boolean;
  videoUrl: string;
  videoTitle: string;
  videoDescription: string;
  summary: string;
  content: {
    sectionTitle: string;
    paragraphs: string[];
    bulletPoints?: string[];
    tipsOrWarning?: string;
    formulaOrRule?: string;
    diagramType?: 'candlestick' | 'support_resistance' | 'order_type' | 'option_chain' | 'risk_reward' | 'psychology_cycle';
  }[];
  keyTakeaways: string[];
  quizId?: string;
}

export interface QuizQuestion {
  id: string;
  category: TopicCategory;
  categoryTitle: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizSet {
  id: string;
  title: string;
  category: TopicCategory;
  level: CourseLevel;
  questions: QuizQuestion[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  isPremium: boolean;
  subscriptionPlan?: 'free' | 'monthly' | 'yearly' | 'lifetime';
  subscriptionExpiryDate?: string;
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  quizResults: {
    quizId: string;
    score: number;
    total: number;
    date: string;
  }[];
  joinedDate: string;
}

export interface SubscriptionPlan {
  id: 'free' | 'monthly' | 'yearly' | 'lifetime';
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  features: string[];
  badge?: string;
  popular?: boolean;
}

export interface AuthUser {
  id: string;
  username: string;
  passwordHash: string;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'admin';
  createdAt: string;
  profile: UserProfile;
}
