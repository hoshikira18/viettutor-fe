// User roles
export type UserRole = "parent" | "tutor" | "admin";

// Base user interface
export interface BaseUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Parent specific interface
export interface Parent extends BaseUser {
  role: "parent";
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    timezone: string;
    language: string;
    currency: string;
  };
  favoriteTutors: string[]; // Array of tutor IDs
}

// Child interface
export interface Child {
  id: string;
  parentId: string;
  name: string;
  age: number;
  grade: number;
  avatar?: string;
  subjects: string[];
  learningGoals?: string;
  personality?: string;
  strugglingWith?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tutor interface
export interface Tutor extends BaseUser {
  role: "tutor";
  bio: string;
  subjects: string[];
  hourlyRate: number;
  district: string;
  availability: {
    [key: string]: {
      // day of week
      startTime: string;
      endTime: string;
      isAvailable: boolean;
    };
  };
  qualifications: Qualification[];
  experience: number; // years
  rating: number;
  reviewCount: number;
  verificationStatus: VerificationStatus;
  isOnline: boolean;
  languages: string[];
  teachingStyle?: string;
  specializations?: string[];
}

// Qualification interface
export interface Qualification {
  id: string;
  type: "degree" | "certificate" | "award" | "other";
  title: string;
  institution: string;
  year: number;
  description?: string;
  verificationStatus: "pending" | "verified" | "rejected";
  document?: string; // URL to uploaded document
}

// Verification status
export interface VerificationStatus {
  identity: "pending" | "verified" | "rejected";
  qualifications: "pending" | "verified" | "rejected";
  background: "pending" | "verified" | "rejected";
  overall: "pending" | "verified" | "rejected";
}

// Inquiry interface (P-4, P-5)
export interface Inquiry {
  id: string;
  parentId: string;
  tutorId: string;
  childId: string;
  message: string;
  status: "sent" | "viewed" | "responded" | "archived";
  createdAt: Date;
  viewedAt?: Date;
  respondedAt?: Date;
  tutorResponse?: string;
}

// Session interface
export interface Session {
  id: string;
  parentId: string;
  tutorId: string;
  childId: string;
  subject: string;
  dateTime: Date;
  duration: number; // minutes
  type: "online" | "in-person";
  location?: string; // for in-person sessions
  status:
    | "scheduled"
    | "confirmed"
    | "in-progress"
    | "completed"
    | "cancelled"
    | "no-show";
  notes?: string;
  feedback?: SessionFeedback;
  meetingLink?: string; // for online sessions
  materials?: string[]; // URLs to shared materials
  price: number;
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: Date;
  updatedAt: Date;
}

// Session feedback
export interface SessionFeedback {
  parentRating: number;
  parentComment: string;
  tutorRating: number;
  tutorComment: string;
  childProgress: {
    understanding: number; // 1-5 scale
    engagement: number;
    homework: boolean;
    areasToImprove: string[];
  };
  submittedAt: Date;
}

// Conversation and messaging
export interface Conversation {
  id: string; // format: parentId_tutorId
  participants: string[]; // [parentId, tutorId]
  lastMessage: string;
  lastMessageAt: Date;
  unreadCount: {
    [userId: string]: number;
  };
  createdAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  type: "image" | "document" | "audio";
  url: string;
  fileName: string;
  fileSize: number;
}

// Search and filter interfaces
export interface SearchFilters {
  subjects: string[];
  maxHourlyRate: number;
  minRating: number;
  districts: string[];
  availability: {
    days: string[];
    timeRange: {
      start: string;
      end: string;
    };
  };
  verificationStatus: boolean;
  isOnline: boolean;
  experience: {
    min: number;
    max: number;
  };
  gender?: "male" | "female";
  languages: string[];
}

export interface SearchResult {
  tutors: Tutor[];
  totalCount: number;
  hasMore: boolean;
  nextCursor?: string;
}

// Notification interface
export interface Notification {
  id: string;
  userId: string;
  type:
    | "inquiry_response"
    | "session_reminder"
    | "new_message"
    | "session_confirmed"
    | "session_cancelled"
    | "payment_success"
    | "system_announcement";
  title: string;
  message: string;
  data?: any; // Additional data for the notification
  read: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

// Payment and transaction interfaces
export interface PaymentMethod {
  id: string;
  userId: string;
  type: "card" | "bank_account";
  cardLast4?: string;
  cardBrand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  stripePaymentMethodId: string;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  parentId: string;
  sessionId: string;
  tutorId: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethodId: string;
  stripePaymentIntentId: string;
  platformFee: number;
  tutorEarnings: number;
  createdAt: Date;
  completedAt?: Date;
  failureReason?: string;
}

// Form interfaces for UI
export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  agreeToTerms: boolean;
}

export interface ChildForm {
  name: string;
  age: number;
  grade: number;
  subjects: string[];
  learningGoals?: string;
  personality?: string;
  strugglingWith?: string;
}

export interface InquiryForm {
  childId: string;
  message: string;
}

export interface SessionBookingForm {
  childId: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  type: "online" | "in-person";
  location?: string;
  notes?: string;
}

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
  hasMore: boolean;
  nextCursor?: string;
}

// Constants
export const SUBJECTS = [
  "Toán học",
  "Tiếng Anh",
  "Vật lý",
  "Hóa học",
  "Sinh học",
  "Tiếng Việt",
  "Lịch sử",
  "Địa lý",
  "Tin học",
  "Lập trình",
  "Khoa học máy tính",
  "Tiếng Trung",
  "Tiếng Nhật",
  "Tiếng Hàn",
  "Âm nhạc",
  "Mỹ thuật",
  "Thể dục",
] as const;

export const DISTRICTS = [
  "Ba Đình",
  "Hoàn Kiếm",
  "Tây Hồ",
  "Long Biên",
  "Cầu Giấy",
  "Đống Đa",
  "Hai Bà Trưng",
  "Hoàng Mai",
  "Thanh Xuân",
  "Quận 1",
  "Quận 3",
  "Quận 4",
  "Quận 5",
  "Quận 6",
  "Quận 7",
  "Quận 8",
  "Quận 10",
  "Quận 11",
  "Quận 12",
  "Gò Vấp",
  "Tân Bình",
  "Tân Phú",
  "Bình Thạnh",
  "Phú Nhuận",
  "Thủ Đức",
] as const;

export const GRADE_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export type Subject = (typeof SUBJECTS)[number];
export type District = (typeof DISTRICTS)[number];
export type GradeLevel = (typeof GRADE_LEVELS)[number];
