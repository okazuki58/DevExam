// Prismaが自動生成した型のインポート
import type {
  User as PrismaUser,
  UserProfile as PrismaUserProfile,
  Badge as PrismaBadge,
  QuizResult as PrismaQuizResult,
  Quiz as PrismaQuiz,
  Company as PrismaCompany,
  Job as PrismaJob,
  Exercise as PrismaExercise,
  ExerciseSubmission as PrismaExerciseSubmission,
  Document as PrismaDocument,
} from "@prisma/client";

// フロントエンド専用の状態管理型
export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  selectedOptionIndex: number | null;
  isAnswerEvaluated: boolean;
  questions: QuizQuestion[];
}

// Prisma型の拡張・再定義
export type User = PrismaUser & {
  profile?: UserProfile;
  badges: Badge[];
  quizResults: QuizResult[];
  jobApplications?: JobApplication[];
};

export type ExtendedUser = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  password: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: string | null;
  badges?: Badge[];
  quizResults?: QuizResult[];
};

export type UserProfile = PrismaUserProfile & {
  // ProfileTimelineコンポーネント用の拡張フィールド
  educationItems?: { id: string; text: string }[];
  jobItems?: { id: string; text: string }[];
  careerChange?: string;
  goals?: string;
  portfolio?: string;
  hobbies?: string;
  totalStudyTime?: number;

  // 詳細なデータ構造（JSONから変換後）
  experienceDetails?: {
    title: string;
    company: string;
    startDate: Date;
    endDate?: Date;
    description: string;
  }[];
  educationDetails?: {
    institution: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate?: Date;
  }[];
};

export type Badge = PrismaBadge;

export interface QuizQuestion {
  id: string;
  question: string;
  category: string;
  options: string[];
  correctAnswerIndex: number;
}

export type QuizResult = PrismaQuizResult & {
  quizName: string; // API応答用の追加フィールド
};

// テストカテゴリの型定義
export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  quizCount: number;
}

// テストコレクションの型定義
export type Quiz = PrismaQuiz & {
  questions: QuizQuestion[];
  badge: {
    name: string;
    description: string;
    imageUrl: string;
  };
};

export type Company = PrismaCompany & {
  jobCount?: number;
  employeeCount?: number;
};

// 求人の型定義
export type Job = PrismaJob & {
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  requiredQuizzes?: {
    quizId: string;
    minimumScore: number;
  }[];
};

// 応募の型定義
export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: "pending" | "reviewing" | "interviewed" | "offered" | "rejected";
  quizResults: {
    quizId: string;
    score: number;
    maxScore: number;
    completedAt: Date;
  }[];
  coverLetter?: string;
  appliedAt: Date;
  updatedAt: Date;
}

export type Exercise = PrismaExercise;

export type ExerciseSubmission = PrismaExerciseSubmission & {
  results: TestResult | null;
};

export interface TestResult {
  id: string;
  submissionId: string;
  exerciseId: string;
  userId: string;
  passed: boolean;
  score: number;
  maxScore: number;
  details: TestDetail[];
  feedback: string;
  completedAt: Date;
  createdAt: Date;
  status: string;
}

export interface TestDetail {
  testName: string;
  passed: boolean;
  message: string;
  expected?: string;
  actual?: string;
}

export type Document = PrismaDocument;

// ... existing code ...

export interface Activity {
  id: string;
  type: string;
  entityId: string;
  entityTitle: string;
  entityType?: string;
  userId: string;
  timestamp: string;
  details?: {
    score?: number;
    duration?: number;
    progress?: number;
    url?: string;
    content?: string;
    // インデックスシグネチャを削除
  };
  status?: string;
}

// ... existing code ...
