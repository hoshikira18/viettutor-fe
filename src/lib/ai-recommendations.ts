// AI Tutor Recommendation Engine with Gemini API
// This service provides intelligent tutor matching based on multiple factors using Google's Gemini AI

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

interface StudentProfile {
  id: string;
  grade: string;
  subjects: string[];
  learningStyle: "visual" | "auditory" | "kinesthetic" | "reading";
  difficultyAreas: string[];
  preferredSchedule: {
    days: string[];
    timeSlots: string[];
  };
  budget: {
    min: number;
    max: number;
  };
  location: {
    district: string;
    preference: "in-home" | "tutor-home" | "online" | "center" | "any";
  };
  previousTutorRatings?: number[];
  parentPreferences: {
    tutorGender?: "male" | "female" | "any";
    tutorAge?: "young" | "experienced" | "any";
    teachingStyle?: "strict" | "friendly" | "balanced";
  };
}

interface TutorProfile {
  id: string;
  name: string;
  avatar: string;
  subjects: string[];
  grades: string[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  location: string;
  teachingFormats: string[];
  availability: {
    days: string[];
    timeSlots: string[];
  };
  experience: number;
  education: string[];
  specializations: string[];
  teachingStyle: "strict" | "friendly" | "balanced";
  gender: "male" | "female";
  age: number;
  responseTime: number; // hours
  successRate: number; // percentage
  studentImprovementRate: number; // percentage
  bio: string;
  verificationStatus: "verified" | "pending" | "unverified";
}

interface RecommendationScore {
  tutorId: string;
  overallScore: number;
  factors: {
    subjectMatch: number;
    scheduleCompatibility: number;
    budgetFit: number;
    locationConvenience: number;
    ratingQuality: number;
    experienceLevel: number;
    teachingStyleMatch: number;
    availabilityScore: number;
  };
  reasoning: string[];
  pros: string[];
  cons: string[];
  confidence: number;
}

interface RecommendationResult {
  recommendations: (TutorProfile & { score: RecommendationScore })[];
  metadata: {
    totalTutors: number;
    filteredTutors: number;
    searchCriteria: StudentProfile;
    generatedAt: string;
    aiVersion: string;
    aiInsights?: {
      learningStyleInsights: string;
      recommendedTutorTraits: string[];
      priorityFactors: string[];
    };
    aiRankingExplanation?: string;
  };
}

// Mock tutors database for demonstration
const MOCK_TUTORS: TutorProfile[] = [
  {
    id: "1",
    name: "Nguyễn Thị Mai",
    avatar: "/avatars/tutor-1.jpg",
    subjects: ["Toán học", "Vật lý"],
    grades: ["THCS (Lớp 6-9)", "THPT (Lớp 10-12)"],
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 350000,
    location: "Quận 1, TP.HCM",
    teachingFormats: ["Dạy tại nhà học sinh", "Dạy online"],
    availability: {
      days: ["Thứ 2", "Thứ 4", "Thứ 6", "Chủ nhật"],
      timeSlots: ["14:00-16:00", "18:00-20:00"],
    },
    experience: 8,
    education: ["Thạc sĩ Toán học - ĐH Bách Khoa"],
    specializations: ["Toán THPT", "Luyện thi đại học"],
    teachingStyle: "balanced",
    gender: "female",
    age: 32,
    responseTime: 2,
    successRate: 94,
    studentImprovementRate: 87,
    bio: "Chuyên gia giảng dạy Toán học với 8 năm kinh nghiệm, từng làm việc tại trung tâm luyện thi hàng đầu.",
    verificationStatus: "verified",
  },
  {
    id: "2",
    name: "Trần Văn Hùng",
    avatar: "/avatars/tutor-2.jpg",
    subjects: ["Tiếng Anh", "IELTS"],
    grades: ["THCS (Lớp 6-9)", "THPT (Lớp 10-12)", "Người đi làm"],
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 400000,
    location: "Quận 3, TP.HCM",
    teachingFormats: ["Dạy tại nhà gia sư", "Dạy online"],
    availability: {
      days: ["Thứ 3", "Thứ 5", "Thứ 7", "Chủ nhật"],
      timeSlots: ["16:00-18:00", "19:00-21:00"],
    },
    experience: 12,
    education: ["Cử nhân Ngôn ngữ Anh - ĐH Ngoại ngữ", "Chứng chỉ TESOL"],
    specializations: ["IELTS", "Giao tiếp tiếng Anh", "Tiếng Anh học thuật"],
    teachingStyle: "friendly",
    gender: "male",
    age: 35,
    responseTime: 1,
    successRate: 91,
    studentImprovementRate: 83,
    bio: "Giảng viên tiếng Anh có 12 năm kinh nghiệm, chuyên IELTS và giao tiếp.",
    verificationStatus: "verified",
  },
  {
    id: "3",
    name: "Lê Thị Hồng",
    avatar: "/avatars/tutor-3.jpg",
    subjects: ["Hóa học", "Sinh học"],
    grades: ["THCS (Lớp 6-9)", "THPT (Lớp 10-12)"],
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 320000,
    location: "Quận 7, TP.HCM",
    teachingFormats: ["Dạy tại nhà học sinh", "Dạy tại trung tâm"],
    availability: {
      days: ["Thứ 2", "Thứ 3", "Thứ 6", "Thứ 7"],
      timeSlots: ["15:00-17:00", "18:30-20:30"],
    },
    experience: 6,
    education: ["Cử nhân Hóa học - ĐH Khoa học Tự nhiên"],
    specializations: ["Hóa hữu cơ", "Hóa vô cơ", "Sinh học phân tử"],
    teachingStyle: "strict",
    gender: "female",
    age: 28,
    responseTime: 3,
    successRate: 89,
    studentImprovementRate: 85,
    bio: "Giáo viên Hóa-Sinh với phương pháp giảng dạy logic và dễ hiểu.",
    verificationStatus: "verified",
  },
  {
    id: "4",
    name: "Phạm Minh Tuấn",
    avatar: "/avatars/tutor-4.jpg",
    subjects: ["Toán học", "Tin học"],
    grades: ["Tiểu học (Lớp 1-5)", "THCS (Lớp 6-9)"],
    rating: 4.6,
    reviewCount: 73,
    hourlyRate: 280000,
    location: "Quận 10, TP.HCM",
    teachingFormats: ["Dạy tại nhà học sinh", "Dạy online"],
    availability: {
      days: ["Thứ 2", "Thứ 4", "Thứ 5", "Thứ 7"],
      timeSlots: ["16:00-18:00", "19:00-21:00"],
    },
    experience: 4,
    education: ["Cử nhân Công nghệ thông tin - ĐH Bách Khoa"],
    specializations: ["Toán tư duy", "Lập trình cơ bản", "Tin học văn phòng"],
    teachingStyle: "friendly",
    gender: "male",
    age: 26,
    responseTime: 4,
    successRate: 86,
    studentImprovementRate: 82,
    bio: "Gia sư trẻ năng động, chuyên dạy Toán tư duy và Tin học cho học sinh nhỏ tuổi.",
    verificationStatus: "verified",
  },
  {
    id: "5",
    name: "Đỗ Thị Lan",
    avatar: "/avatars/tutor-5.jpg",
    subjects: ["Tiếng Việt", "Lịch sử"],
    grades: ["THCS (Lớp 6-9)", "THPT (Lớp 10-12)"],
    rating: 4.8,
    reviewCount: 94,
    hourlyRate: 300000,
    location: "Quận 5, TP.HCM",
    teachingFormats: ["Dạy tại nhà học sinh", "Dạy tại nhà gia sư"],
    availability: {
      days: ["Thứ 3", "Thứ 4", "Thứ 6", "Chủ nhật"],
      timeSlots: ["14:00-16:00", "17:00-19:00"],
    },
    experience: 10,
    education: ["Thạc sĩ Ngữ văn - ĐH Sư phạm"],
    specializations: ["Văn học", "Thi THPT Quốc gia", "Kỹ năng viết"],
    teachingStyle: "balanced",
    gender: "female",
    age: 34,
    responseTime: 2,
    successRate: 92,
    studentImprovementRate: 88,
    bio: "Giáo viên Ngữ văn giàu kinh nghiệm, chuyên luyện thi THPT và phát triển tư duy văn học.",
    verificationStatus: "verified",
  },
];

// AI Scoring Algorithms with Gemini AI Enhancement
class AIRecommendationEngine {
  private model: any;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  // Enhanced AI-powered analysis using Gemini
  private async analyzeStudentProfileWithAI(
    studentProfile: StudentProfile
  ): Promise<{
    learningStyleInsights: string;
    recommendedTutorTraits: string[];
    priorityFactors: string[];
  }> {
    const prompt = `
Analyze this student profile and provide educational matching insights:

Student Profile:
- Grade: ${studentProfile.grade}
- Subjects needed: ${studentProfile.subjects.join(", ")}
- Learning Style: ${studentProfile.learningStyle}
- Difficulty Areas: ${studentProfile.difficultyAreas.join(", ")}
- Budget: ${studentProfile.budget.min.toLocaleString()} - ${studentProfile.budget.max.toLocaleString()} VND
- Preferred Schedule: ${studentProfile.preferredSchedule.days.join(
      ", "
    )} at ${studentProfile.preferredSchedule.timeSlots.join(", ")}
- Location: ${studentProfile.location.district}, prefers ${
      studentProfile.location.preference
    }
- Parent Preferences: ${JSON.stringify(studentProfile.parentPreferences)}

Please provide:
1. Learning style insights (how this student learns best)
2. Recommended tutor traits (3-5 specific qualities to look for)
3. Priority matching factors (rank top 3 most important factors for this student)

Format response as JSON:
{
  "learningStyleInsights": "detailed analysis",
  "recommendedTutorTraits": ["trait1", "trait2", "trait3"],
  "priorityFactors": ["factor1", "factor2", "factor3"]
}
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse JSON response from Gemini
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error("Gemini AI analysis failed:", error);
    }

    // Fallback to rule-based analysis
    return this.getFallbackAnalysis(studentProfile);
  }

  private getFallbackAnalysis(studentProfile: StudentProfile) {
    const insights = {
      visual:
        "Student learns best through visual aids, diagrams, and written examples. Benefits from tutors who use visual teaching methods.",
      auditory:
        "Student learns through listening and verbal explanations. Needs tutors who explain concepts clearly and encourage discussion.",
      kinesthetic:
        "Student learns through hands-on activities and practical examples. Requires tutors who use interactive teaching methods.",
      reading:
        "Student learns through reading and written materials. Benefits from tutors who provide comprehensive written resources.",
    };

    return {
      learningStyleInsights: insights[studentProfile.learningStyle],
      recommendedTutorTraits: [
        "Patient and encouraging",
        "Strong communication skills",
        "Experience with similar learning styles",
        "Flexible teaching methods",
      ],
      priorityFactors: [
        "subjectMatch",
        "teachingStyleMatch",
        "scheduleCompatibility",
      ],
    };
  }

  // AI-enhanced tutor ranking
  private async rankTutorsWithAI(
    tutors: (TutorProfile & { score: RecommendationScore })[],
    studentProfile: StudentProfile,
    aiInsights: any
  ): Promise<string> {
    const tutorSummaries = tutors.slice(0, 5).map((tutor) => ({
      id: tutor.id,
      name: tutor.name,
      subjects: tutor.subjects,
      rating: tutor.rating,
      experience: tutor.experience,
      teachingStyle: tutor.teachingStyle,
      bio: tutor.bio.substring(0, 200),
      score: Math.round(tutor.score.overallScore),
    }));

    const prompt = `
As an educational AI advisor, rank these tutors for the student based on the analysis:

Student Learning Insights: ${aiInsights.learningStyleInsights}
Recommended Tutor Traits: ${aiInsights.recommendedTutorTraits.join(", ")}
Priority Factors: ${aiInsights.priorityFactors.join(", ")}

Tutors to evaluate:
${JSON.stringify(tutorSummaries, null, 2)}

Provide a brief ranking explanation focusing on why the top tutor is the best match for this specific student. Keep it under 150 words and focus on educational compatibility.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini ranking failed:", error);
      return "Các gia sư được xếp hạng dựa trên độ phù hợp với nhu cầu học tập và sở thích của học sinh.";
    }
  }
  private calculateSubjectMatch(
    studentSubjects: string[],
    tutorSubjects: string[]
  ): number {
    const matchCount = studentSubjects.filter((subject) =>
      tutorSubjects.some((tutorSubj) =>
        tutorSubj.toLowerCase().includes(subject.toLowerCase())
      )
    ).length;
    return (matchCount / studentSubjects.length) * 100;
  }

  private calculateScheduleCompatibility(
    studentSchedule: StudentProfile["preferredSchedule"],
    tutorAvailability: TutorProfile["availability"]
  ): number {
    const dayMatches = studentSchedule.days.filter((day) =>
      tutorAvailability.days.includes(day)
    ).length;
    const timeMatches = studentSchedule.timeSlots.filter((time) =>
      tutorAvailability.timeSlots.some((tutorTime) =>
        this.timeOverlap(time, tutorTime)
      )
    ).length;

    const dayScore =
      (dayMatches / Math.max(studentSchedule.days.length, 1)) * 50;
    const timeScore =
      (timeMatches / Math.max(studentSchedule.timeSlots.length, 1)) * 50;

    return dayScore + timeScore;
  }

  private timeOverlap(studentTime: string, tutorTime: string): boolean {
    // Simple time overlap logic - can be enhanced
    return studentTime === tutorTime;
  }

  private calculateBudgetFit(
    studentBudget: StudentProfile["budget"],
    tutorRate: number
  ): number {
    if (tutorRate < studentBudget.min) return 60; // Too cheap might indicate quality issues
    if (tutorRate > studentBudget.max) return 0; // Too expensive

    const budgetRange = studentBudget.max - studentBudget.min;
    const optimalRate = studentBudget.min + budgetRange * 0.7; // 70% of budget range is optimal

    if (tutorRate <= optimalRate) {
      return 100;
    } else {
      const overOptimal = tutorRate - optimalRate;
      const maxOver = studentBudget.max - optimalRate;
      return Math.max(70, 100 - (overOptimal / maxOver) * 30);
    }
  }

  private calculateLocationConvenience(
    studentLocation: StudentProfile["location"],
    tutor: TutorProfile
  ): number {
    const formatMatch =
      tutor.teachingFormats.includes(studentLocation.preference) ||
      studentLocation.preference === "any";

    if (!formatMatch) return 0;

    // Simple district matching - can be enhanced with actual distance calculation
    const sameDistrict = tutor.location.includes(studentLocation.district);
    const baseScore = formatMatch ? 70 : 0;
    const locationBonus = sameDistrict ? 30 : 0;

    return baseScore + locationBonus;
  }

  private calculateTeachingStyleMatch(
    studentPrefs: StudentProfile["parentPreferences"],
    tutor: TutorProfile
  ): number {
    let score = 50; // Base score

    if (studentPrefs.tutorGender && studentPrefs.tutorGender !== "any") {
      score += tutor.gender === studentPrefs.tutorGender ? 25 : -25;
    }

    if (
      studentPrefs.teachingStyle &&
      studentPrefs.teachingStyle !== tutor.teachingStyle
    ) {
      score -= 20;
    }

    if (studentPrefs.tutorAge) {
      const ageMatch = this.matchAgePreference(
        studentPrefs.tutorAge,
        tutor.age
      );
      score += ageMatch ? 25 : -15;
    }

    return Math.max(0, Math.min(100, score));
  }

  private matchAgePreference(preference: string, age: number): boolean {
    switch (preference) {
      case "young":
        return age <= 30;
      case "experienced":
        return age >= 35;
      default:
        return true;
    }
  }

  private generateRecommendationReasons(
    score: RecommendationScore,
    tutor: TutorProfile,
    student: StudentProfile
  ): string[] {
    const reasons: string[] = [];

    if (score.factors.subjectMatch > 80) {
      reasons.push(`Chuyên môn cao về ${student.subjects.join(", ")}`);
    }

    if (score.factors.ratingQuality > 85) {
      reasons.push(
        `Đánh giá xuất sắc ${tutor.rating}/5 từ ${tutor.reviewCount} phụ huynh`
      );
    }

    if (score.factors.scheduleCompatibility > 75) {
      reasons.push("Lịch dạy phù hợp với yêu cầu của bạn");
    }

    if (score.factors.experienceLevel > 80) {
      reasons.push(`${tutor.experience} năm kinh nghiệm giảng dạy`);
    }

    if (tutor.successRate > 90) {
      reasons.push(`Tỷ lệ thành công ${tutor.successRate}% với học sinh`);
    }

    if (tutor.responseTime <= 2) {
      reasons.push("Phản hồi nhanh chóng trong vòng 2 giờ");
    }

    return reasons;
  }

  private generateProsAndCons(
    tutor: TutorProfile,
    student: StudentProfile
  ): { pros: string[]; cons: string[] } {
    const pros: string[] = [];
    const cons: string[] = [];

    // Pros
    if (tutor.rating >= 4.7) pros.push("Đánh giá rất cao từ phụ huynh");
    if (tutor.experience >= 8) pros.push("Kinh nghiệm giảng dạy phong phú");
    if (tutor.verificationStatus === "verified")
      pros.push("Đã xác thực thông tin cá nhân");
    if (tutor.successRate >= 90) pros.push("Tỷ lệ thành công cao");
    if (tutor.responseTime <= 2) pros.push("Phản hồi nhanh");

    // Cons
    if (tutor.hourlyRate > student.budget.max) {
      cons.push(
        `Mức phí ${tutor.hourlyRate.toLocaleString()}đ/buổi vượt ngân sách`
      );
    }
    if (tutor.responseTime > 4) cons.push("Thời gian phản hồi chậm");
    if (tutor.reviewCount < 20) cons.push("Ít đánh giá từ phụ huynh");

    return { pros, cons };
  }

  public async generateRecommendations(
    studentProfile: StudentProfile
  ): Promise<RecommendationResult> {
    // Get AI insights about the student
    const aiInsights = await this.analyzeStudentProfileWithAI(studentProfile);

    const scoredTutors = MOCK_TUTORS.map((tutor) => {
      const factors = {
        subjectMatch: this.calculateSubjectMatch(
          studentProfile.subjects,
          tutor.subjects
        ),
        scheduleCompatibility: this.calculateScheduleCompatibility(
          studentProfile.preferredSchedule,
          tutor.availability
        ),
        budgetFit: this.calculateBudgetFit(
          studentProfile.budget,
          tutor.hourlyRate
        ),
        locationConvenience: this.calculateLocationConvenience(
          studentProfile.location,
          tutor
        ),
        ratingQuality: (tutor.rating / 5) * 100,
        experienceLevel: Math.min(100, (tutor.experience / 15) * 100), // Max 15 years for 100%
        teachingStyleMatch: this.calculateTeachingStyleMatch(
          studentProfile.parentPreferences,
          tutor
        ),
        availabilityScore:
          tutor.responseTime <= 3
            ? 100
            : Math.max(0, 100 - (tutor.responseTime - 3) * 20),
      };

      // AI-enhanced weighted scoring based on priority factors
      const baseWeights = {
        subjectMatch: 0.25,
        scheduleCompatibility: 0.2,
        budgetFit: 0.15,
        locationConvenience: 0.15,
        ratingQuality: 0.1,
        experienceLevel: 0.08,
        teachingStyleMatch: 0.05,
        availabilityScore: 0.02,
      };

      // Adjust weights based on AI insights
      const adjustedWeights = { ...baseWeights };
      if (aiInsights.priorityFactors.includes("teachingStyleMatch")) {
        adjustedWeights.teachingStyleMatch += 0.05;
        adjustedWeights.subjectMatch -= 0.03;
        adjustedWeights.experienceLevel -= 0.02;
      }
      if (aiInsights.priorityFactors.includes("scheduleCompatibility")) {
        adjustedWeights.scheduleCompatibility += 0.05;
        adjustedWeights.budgetFit -= 0.03;
        adjustedWeights.locationConvenience -= 0.02;
      }

      const overallScore = Object.entries(factors).reduce(
        (sum, [key, value]) => {
          return (
            sum + value * adjustedWeights[key as keyof typeof adjustedWeights]
          );
        },
        0
      );

      const score: RecommendationScore = {
        tutorId: tutor.id,
        overallScore,
        factors,
        reasoning: [],
        pros: [],
        cons: [],
        confidence: this.calculateConfidence(factors),
      };

      score.reasoning = this.generateRecommendationReasons(
        score,
        tutor,
        studentProfile
      );
      const prosAndCons = this.generateProsAndCons(tutor, studentProfile);
      score.pros = prosAndCons.pros;
      score.cons = prosAndCons.cons;

      return {
        ...tutor,
        score,
      };
    });

    // Filter out tutors with very low scores and sort by overall score
    const filteredAndSorted = scoredTutors
      .filter((tutor) => tutor.score.overallScore >= 30) // Minimum threshold
      .sort((a, b) => b.score.overallScore - a.score.overallScore)
      .slice(0, 10); // Top 10 recommendations

    // Get AI ranking explanation
    const aiRankingExplanation = await this.rankTutorsWithAI(
      filteredAndSorted,
      studentProfile,
      aiInsights
    );

    return {
      recommendations: filteredAndSorted,
      metadata: {
        totalTutors: MOCK_TUTORS.length,
        filteredTutors: filteredAndSorted.length,
        searchCriteria: studentProfile,
        generatedAt: new Date().toISOString(),
        aiVersion: "v2.0.0-gemini",
        aiInsights,
        aiRankingExplanation,
      },
    };
  }

  private calculateConfidence(factors: RecommendationScore["factors"]): number {
    const scores = Object.values(factors);
    const average =
      scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const variance =
      scores.reduce((sum, score) => sum + Math.pow(score - average, 2), 0) /
      scores.length;
    const standardDeviation = Math.sqrt(variance);

    // Lower deviation means higher confidence
    const confidence = Math.max(0, 100 - standardDeviation * 2);
    return confidence;
  }
}

// Export the recommendation engine
export const aiRecommendationEngine = new AIRecommendationEngine();

// Utility function for easy integration
export async function getAIRecommendations(
  studentProfile: StudentProfile
): Promise<RecommendationResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return aiRecommendationEngine.generateRecommendations(studentProfile);
}

// Export types for use in components
export type {
  StudentProfile,
  TutorProfile,
  RecommendationResult,
  RecommendationScore,
};
