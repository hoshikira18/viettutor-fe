"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Bot,
  User,
  Star,
  MapPin,
  Clock,
  DollarSign,
  BookOpen,
  MessageSquare,
  Filter,
  Search,
  Sparkles,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import {
  StudentProfile,
  RecommendationResult,
  getAIRecommendations,
} from "@/lib/ai-recommendations";

interface ChatMessage {
  id: string;
  type: "user" | "ai" | "system";
  content: string;
  timestamp: Date;
  data?: any;
}

interface AIResponse {
  content: string;
  nextStep?: number;
  updateProfile?: Partial<StudentProfile>;
  updateTutors?: any[];
  data?: any;
}

interface AIChatTutorFinderProps {
  onRecommendationsUpdate?: (recommendations: RecommendationResult) => void;
}

// Mock tutors for immediate display
const SAMPLE_TUTORS = [
  {
    id: "1",
    name: "Nguyễn Thị Mai",
    avatar: "/avatars/tutor-1.jpg",
    subjects: ["Toán học", "Vật lý"],
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 350000,
    location: "Quận 1, TP.HCM",
    experience: 8,
    responseTime: "2 giờ",
    bio: "Chuyên gia giảng dạy Toán học với 8 năm kinh nghiệm...",
    matchScore: 95,
    isOnline: true,
  },
  {
    id: "2",
    name: "Trần Văn Hùng",
    avatar: "/avatars/tutor-2.jpg",
    subjects: ["Tiếng Anh", "IELTS"],
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 400000,
    location: "Quận 3, TP.HCM",
    experience: 12,
    responseTime: "1 giờ",
    bio: "Giảng viên tiếng Anh có 12 năm kinh nghiệm...",
    matchScore: 92,
    isOnline: true,
  },
  {
    id: "3",
    name: "Lê Thị Hồng",
    avatar: "/avatars/tutor-3.jpg",
    subjects: ["Hóa học", "Sinh học"],
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 320000,
    location: "Quận 7, TP.HCM",
    experience: 6,
    responseTime: "3 giờ",
    bio: "Giáo viên Hóa-Sinh với phương pháp giảng dạy logic...",
    matchScore: 88,
    isOnline: false,
  },
  {
    id: "4",
    name: "Phạm Minh Tuấn",
    avatar: "/avatars/tutor-4.jpg",
    subjects: ["Toán học", "Tin học"],
    rating: 4.6,
    reviewCount: 73,
    hourlyRate: 280000,
    location: "Quận 10, TP.HCM",
    experience: 4,
    responseTime: "4 giờ",
    bio: "Gia sư trẻ năng động, chuyên dạy Toán tư duy...",
    matchScore: 85,
    isOnline: true,
  },
  {
    id: "5",
    name: "Võ Thị Lan",
    avatar: "/avatars/tutor-5.jpg",
    subjects: ["Văn học", "Lịch sử"],
    rating: 4.8,
    reviewCount: 92,
    hourlyRate: 300000,
    location: "Quận 5, TP.HCM",
    experience: 7,
    responseTime: "2 giờ",
    bio: "Thạc sĩ Văn học với kinh nghiệm dạy học sinh giỏi...",
    matchScore: 90,
    isOnline: true,
  },
  {
    id: "6",
    name: "Đặng Văn Nam",
    avatar: "/avatars/tutor-6.jpg",
    subjects: ["Địa lý", "GDCD"],
    rating: 4.5,
    reviewCount: 45,
    hourlyRate: 250000,
    location: "Quận 8, TP.HCM",
    experience: 3,
    responseTime: "5 giờ",
    bio: "Gia sư chuyên các môn xã hội với phương pháp dễ hiểu...",
    matchScore: 75,
    isOnline: false,
  },
  {
    id: "7",
    name: "Bùi Thị Thu",
    avatar: "/avatars/tutor-7.jpg",
    subjects: ["Tiếng Anh", "Tiếng Pháp"],
    rating: 4.9,
    reviewCount: 134,
    hourlyRate: 450000,
    location: "Quận 2, TP.HCM",
    experience: 10,
    responseTime: "1 giờ",
    bio: "Cử nhân ngôn ngữ Anh-Pháp, từng du học tại Paris...",
    matchScore: 94,
    isOnline: true,
  },
  {
    id: "8",
    name: "Hoàng Minh Đức",
    avatar: "/avatars/tutor-8.jpg",
    subjects: ["Toán học", "Vật lý"],
    rating: 4.7,
    reviewCount: 88,
    hourlyRate: 380000,
    location: "Quận 6, TP.HCM",
    experience: 9,
    responseTime: "2 giờ",
    bio: "Kỹ sư với passion giảng dạy, chuyên luyện thi đại học...",
    matchScore: 87,
    isOnline: true,
  },
];

export default function AIChatTutorFinder({
  onRecommendationsUpdate,
}: AIChatTutorFinderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Chào bạn! Tôi là AI Assistant của VietTutor. Tôi sẽ giúp bạn tìm gia sư phù hợp nhất cho con bạn. Hãy cho tôi biết con bạn đang học lớp mấy và cần học môn gì?",
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tutors, setTutors] = useState(SAMPLE_TUTORS);
  const [filteredTutors, setFilteredTutors] = useState(SAMPLE_TUTORS);
  const [searchQuery, setSearchQuery] = useState("");
  const [studentProfile, setStudentProfile] = useState<Partial<StudentProfile>>(
    {}
  );
  const [conversationStep, setConversationStep] = useState(0);
  const [isUpdatingTutors, setIsUpdatingTutors] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Function to update tutors based on conversation context
  const updateTutorsBasedOnProfile = (profile: Partial<StudentProfile>) => {
    setIsUpdatingTutors(true);

    // Simulate update delay for visual feedback
    setTimeout(() => {
      let updatedTutors = [...SAMPLE_TUTORS];

      // Filter and score based on subjects
      if (profile.subjects && profile.subjects.length > 0) {
        updatedTutors = updatedTutors.map((tutor) => {
          const subjectMatch = tutor.subjects.some((subject) =>
            profile.subjects?.some(
              (reqSubject) =>
                subject.toLowerCase().includes(reqSubject.toLowerCase()) ||
                reqSubject.toLowerCase().includes(subject.toLowerCase())
            )
          );

          return {
            ...tutor,
            matchScore: subjectMatch
              ? Math.min(tutor.matchScore + 10, 98)
              : Math.max(tutor.matchScore - 15, 60),
          };
        });
      }

      // Filter by budget if specified
      if (profile.budget && profile.budget.max) {
        const maxBudget = profile.budget.max;
        updatedTutors = updatedTutors.filter(
          (tutor) => tutor.hourlyRate <= maxBudget * 1.1
        ); // 10% tolerance
      }

      // Filter by location preference
      if (profile.location && profile.location.district) {
        updatedTutors = updatedTutors.map((tutor) => {
          const locationMatch = tutor.location
            .toLowerCase()
            .includes(profile.location!.district.toLowerCase());
          return {
            ...tutor,
            matchScore: locationMatch
              ? tutor.matchScore + 5
              : Math.max(tutor.matchScore - 5, 60),
          };
        });
      }

      // Sort by match score and update state
      updatedTutors.sort((a, b) => b.matchScore - a.matchScore);
      setTutors(updatedTutors);
      setFilteredTutors(updatedTutors);
      setIsUpdatingTutors(false);
    }, 800); // Delay to show updating effect
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update tutors when student profile changes
  useEffect(() => {
    if (Object.keys(studentProfile).length > 0) {
      updateTutorsBasedOnProfile(studentProfile);
    }
  }, [studentProfile]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = tutors.filter(
        (tutor) =>
          tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tutor.subjects.some((subject) =>
            subject.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          tutor.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTutors(filtered);
    } else {
      setFilteredTutors(tutors);
    }
  }, [searchQuery, tutors]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Process the message and generate AI response
    await processUserMessage(inputMessage);
    setIsLoading(false);
  };

  const processUserMessage = async (message: string) => {
    const response = await generateAIResponse(message, conversationStep);

    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: "ai",
      content: response.content,
      timestamp: new Date(),
      data: response.data,
    };

    setMessages((prev) => [...prev, aiMessage]);

    if (response.updateProfile) {
      setStudentProfile((prev) => ({ ...prev, ...response.updateProfile }));
    }

    if (response.updateTutors) {
      setIsUpdatingTutors(true);
      setTimeout(() => {
        setFilteredTutors(response.updateTutors!);
        setIsUpdatingTutors(false);
      }, 600);
    }

    if (response.nextStep !== undefined) {
      setConversationStep(response.nextStep);
    }
  };

  const generateAIResponse = async (
    message: string,
    step: number
  ): Promise<AIResponse> => {
    // Simulate AI processing delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1000)
    );

    switch (step) {
      case 0: // Initial greeting - ask for grade and subjects
        if (
          message.toLowerCase().includes("lớp") ||
          message.toLowerCase().includes("môn")
        ) {
          const extractedInfo = extractGradeAndSubjects(message);
          return {
            content: `Tuyệt vời! Tôi hiểu con bạn ${
              extractedInfo.grade ? `đang học ${extractedInfo.grade}` : ""
            } ${
              extractedInfo.subjects.length > 0
                ? `và cần hỗ trợ ${extractedInfo.subjects.join(", ")}`
                : ""
            }. 

Bây giờ hãy cho tôi biết con bạn học tốt nhất bằng cách nào:
1. 👁️ Thị giác (qua hình ảnh, sơ đồ)
2. 👂 Thính giác (qua nghe giảng, thảo luận)  
3. ✋ Vận động (qua thực hành, hoạt động)
4. ✍️ Đọc viết (qua sách vở, ghi chép)

Vui lòng chọn số hoặc mô tả cách học của con bạn.`,
            updateProfile: extractedInfo,
            nextStep: 1,
          };
        }
        return {
          content:
            'Hãy cho tôi biết con bạn đang học lớp mấy và cần học những môn nào nhé? Ví dụ: "Con tôi lớp 10, cần học Toán và Vật lý"',
          nextStep: 0,
        };

      case 1: // Learning style
        const learningStyle = extractLearningStyle(message);
        if (learningStyle) {
          return {
            content: `Tôi hiểu con bạn là người học theo kiểu ${learningStyle}. Điều này rất quan trọng để tìm gia sư phù hợp!

Tiếp theo, bạn có thể chia sẻ:
- Ngân sách mong muốn (VNĐ/buổi)
- Thời gian học ưa thích (thứ mấy, giờ nào)
- Khu vực hoặc hình thức dạy (online/tại nhà)

Hoặc tôi có thể bắt đầu tìm kiếm với thông tin hiện tại!`,
            updateProfile: { learningStyle },
            nextStep: 2,
          };
        }
        return {
          content:
            "Hãy chọn cách học phù hợp nhất với con bạn: 1-Thị giác, 2-Thính giác, 3-Vận động, 4-Đọc viết. Hoặc mô tả cách con bạn học hiệu quả nhất.",
          nextStep: 1,
        };

      case 2: // Additional preferences or start search
        if (
          message.toLowerCase().includes("tìm") ||
          message.toLowerCase().includes("bắt đầu")
        ) {
          const aiRecommendations = await generateRecommendations();
          return {
            content: `🎯 **Tôi đã phân tích và tìm thấy ${
              aiRecommendations.length
            } gia sư phù hợp với con bạn!**

📊 **Tiêu chí AI đã xem xét:**
✅ Chuyên môn: ${studentProfile.subjects?.join(", ") || "Các môn đã chọn"}
✅ Phong cách dạy phù hợp với người học ${
              studentProfile.learningStyle || "visual/auditory/kinesthetic"
            }
✅ Đánh giá cao từ phụ huynh khác
✅ Thời gian phản hồi nhanh

👁️ **Danh sách bên phải đã được cập nhật theo độ phù hợp!** Gia sư có % cao nhất sẽ hiện ở trên cùng.

Bạn có muốn tôi lọc thêm theo tiêu chí nào khác không? (kinh nghiệm, mức phí, khu vực...)`,
            updateTutors: aiRecommendations,
            nextStep: 3,
          };
        }

        const preferences = extractPreferences(message);
        return {
          content: `Cảm ơn bạn đã cung cấp thêm thông tin! ${preferences.feedback}

🔄 **Danh sách gia sư bên phải đang được cập nhật** dựa trên thông tin mới...

Bây giờ tôi sẽ tìm kiếm gia sư phù hợp. Bạn có sẵn sàng xem kết quả không? 
Hoặc bạn muốn bổ sung thêm yêu cầu gì khác?`,
          updateProfile: preferences.data,
          nextStep: 2,
        };

      case 3: // Refinement and detailed questions
        if (
          message.toLowerCase().includes("lọc") ||
          message.toLowerCase().includes("thêm")
        ) {
          return {
            content: `Tôi có thể giúp bạn lọc thêm theo:

🎯 **Kinh nghiệm**: Gia sư mới (1-3 năm) hay giàu kinh nghiệm (5+ năm)?
💰 **Mức phí**: Trong khoảng nào? (200k-800k/buổi)
⏰ **Thời gian phản hồi**: Nhanh (trong 2 giờ) hay linh hoạt?
🎓 **Trình độ**: Sinh viên, cử nhân hay thạc sĩ?

Hãy cho tôi biết bạn quan tâm điều gì nhất!`,
            nextStep: 3,
          };
        }

        const refinedSearch = processRefinement(message);
        return {
          content: refinedSearch.content,
          updateTutors: refinedSearch.tutors,
          nextStep: 3,
        };

      default:
        return {
          content:
            "Tôi luôn ở đây để hỗ trợ bạn tìm gia sư tốt nhất! Bạn cần tôi giúp gì thêm?",
          nextStep: 3,
        };
    }
  };

  const extractGradeAndSubjects = (message: string) => {
    const grade = message.match(/lớp\s*(\d+)/i)?.[1];
    const subjects: string[] = [];

    const subjectMap = {
      toán: "Toán học",
      lý: "Vật lý",
      "vật lý": "Vật lý",
      hóa: "Hóa học",
      sinh: "Sinh học",
      anh: "Tiếng Anh",
      "tiếng anh": "Tiếng Anh",
      văn: "Tiếng Việt",
      sử: "Lịch sử",
      địa: "Địa lý",
    };

    Object.entries(subjectMap).forEach(([key, value]) => {
      if (message.toLowerCase().includes(key)) {
        subjects.push(value);
      }
    });

    return {
      grade: grade ? `Lớp ${grade}` : "",
      subjects,
    };
  };

  const extractLearningStyle = (message: string) => {
    if (
      message.includes("1") ||
      message.toLowerCase().includes("thị giác") ||
      message.toLowerCase().includes("hình ảnh")
    ) {
      return "visual";
    }
    if (
      message.includes("2") ||
      message.toLowerCase().includes("thính giác") ||
      message.toLowerCase().includes("nghe")
    ) {
      return "auditory";
    }
    if (
      message.includes("3") ||
      message.toLowerCase().includes("vận động") ||
      message.toLowerCase().includes("thực hành")
    ) {
      return "kinesthetic";
    }
    if (
      message.includes("4") ||
      message.toLowerCase().includes("đọc") ||
      message.toLowerCase().includes("viết")
    ) {
      return "reading";
    }
    return null;
  };

  const extractPreferences = (message: string) => {
    let feedback = "";
    const data: any = {};

    // Extract budget information
    const budgetMatch = message.match(/(\d+)[k,\.]?(\d*)k?/g);
    if (budgetMatch) {
      const budgetStr = budgetMatch[0];
      let budget = parseInt(budgetStr.replace(/[k,\.]/g, ""));
      if (budgetStr.includes("k")) {
        budget *= 1000;
      }
      feedback += `Đã ghi nhận ngân sách ${budget.toLocaleString()}đ. `;
      data.budget = { min: Math.max(budget * 0.8, 200000), max: budget * 1.2 };
    }

    // Extract location information
    if (message.toLowerCase().includes("online")) {
      feedback += "Ưa thích dạy online. ";
      data.location = { district: "online", preference: "online" };
    } else if (message.match(/quận\s*\d+/i)) {
      const districtMatch = message.match(/quận\s*(\d+)/i);
      if (districtMatch) {
        const district = `Quận ${districtMatch[1]}`;
        feedback += `Khu vực ${district}. `;
        data.location = { district, preference: "in-home" };
      }
    } else if (message.toLowerCase().includes("tại nhà")) {
      feedback += "Ưa thích dạy tại nhà. ";
      data.location = { district: "TP.HCM", preference: "in-home" };
    }

    // Extract schedule information
    if (
      message.toLowerCase().includes("thứ") ||
      message.toLowerCase().includes("giờ")
    ) {
      feedback += "Đã ghi nhận lịch học ưa thích. ";
      const days = [];
      if (message.includes("thứ 2")) days.push("Monday");
      if (message.includes("thứ 3")) days.push("Tuesday");
      if (message.includes("thứ 4")) days.push("Wednesday");
      if (message.includes("thứ 5")) days.push("Thursday");
      if (message.includes("thứ 6")) days.push("Friday");
      if (message.includes("thứ 7")) days.push("Saturday");
      if (message.includes("chủ nhật")) days.push("Sunday");

      if (days.length > 0) {
        data.preferredSchedule = { days, timeSlots: ["evening"] };
      }
    }

    return {
      feedback: feedback || "Tôi đã ghi nhận thông tin bổ sung.",
      data,
    };
  };

  const processRefinement = (message: string) => {
    let filteredTutors = [...tutors];
    let content = "";

    if (
      message.toLowerCase().includes("kinh nghiệm") ||
      message.toLowerCase().includes("5+") ||
      message.toLowerCase().includes("nhiều")
    ) {
      filteredTutors = tutors
        .filter((t) => t.experience >= 5)
        .map((t) => ({ ...t, matchScore: Math.min(t.matchScore + 8, 98) }));
      content = `✅ Đã lọc ${filteredTutors.length} gia sư có kinh nghiệm 5+ năm. Danh sách bên phải đã được cập nhật!`;
    } else if (
      message.toLowerCase().includes("mới") ||
      message.toLowerCase().includes("trẻ")
    ) {
      filteredTutors = tutors
        .filter((t) => t.experience <= 3)
        .map((t) => ({ ...t, matchScore: Math.min(t.matchScore + 5, 95) }));
      content = `✅ Đã lọc ${filteredTutors.length} gia sư trẻ, nhiệt huyết. Danh sách bên phải đã được cập nhật!`;
    } else if (
      message.toLowerCase().includes("phí") ||
      message.toLowerCase().includes("rẻ") ||
      message.toLowerCase().includes("300")
    ) {
      filteredTutors = tutors
        .filter((t) => t.hourlyRate <= 350000)
        .map((t) => ({ ...t, matchScore: Math.min(t.matchScore + 3, 95) }));
      content = `💰 Đã lọc ${filteredTutors.length} gia sư với mức phí ≤ 350k/buổi. Danh sách bên phải đã được cập nhật!`;
    } else if (message.toLowerCase().includes("online")) {
      // For online tutors, boost match score for those with online experience
      filteredTutors = tutors.map((t) => ({
        ...t,
        matchScore: t.isOnline
          ? Math.min(t.matchScore + 10, 98)
          : Math.max(t.matchScore - 5, 70),
      }));
      content = `🌐 Đã ưu tiên gia sư dạy online. Danh sách bên phải đã được cập nhật!`;
    } else if (
      message.toLowerCase().includes("rating") ||
      message.toLowerCase().includes("đánh giá") ||
      message.toLowerCase().includes("4.8")
    ) {
      filteredTutors = tutors
        .filter((t) => t.rating >= 4.7)
        .map((t) => ({ ...t, matchScore: Math.min(t.matchScore + 5, 98) }));
      content = `⭐ Đã lọc ${filteredTutors.length} gia sư có đánh giá cao (≥4.7⭐). Danh sách bên phải đã được cập nhật!`;
    } else {
      content =
        "📋 Danh sách đã được cập nhật theo yêu cầu của bạn. Bạn có muốn lọc thêm theo tiêu chí khác không?";
    }

    // Sort by match score
    filteredTutors.sort((a, b) => b.matchScore - a.matchScore);

    return { content, tutors: filteredTutors };
  };

  const generateRecommendations = async () => {
    // AI-enhanced sorting based on conversation
    return tutors
      .map((tutor) => ({
        ...tutor,
        matchScore: Math.max(75, tutor.matchScore + Math.random() * 10),
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const TutorCard = ({ tutor }: { tutor: any }) => (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
              {tutor.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                {tutor.name}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{tutor.rating}/5</span>
                <span>({tutor.reviewCount} đánh giá)</span>
                {tutor.isOnline && (
                  <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Online
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-semibold text-blue-600">
                {tutor.matchScore}% phù hợp
              </span>
            </div>
            <p className="text-xl font-bold text-green-600">
              {tutor.hourlyRate.toLocaleString()}đ
            </p>
            <p className="text-xs text-gray-500">/ buổi</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {tutor.subjects.map((subject: string) => (
            <Badge
              key={subject}
              variant="secondary"
              className="text-xs bg-blue-50 text-blue-700 border-blue-200"
            >
              {subject}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-red-500" />
            <span>{tutor.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <span>Phản hồi trong {tutor.responseTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-purple-500" />
            <span>{tutor.experience} năm kinh nghiệm</span>
          </div>
        </div>

        <p
          className="text-sm text-gray-700 mb-4 leading-relaxed"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {tutor.bio}
        </p>

        <div className="flex space-x-2">
          <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium">
            Xem chi tiết
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            className="px-3 border-green-600 text-green-600 hover:bg-green-50"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Chat Panel */}
      <div className="w-1/2 flex flex-col border-r bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b bg-blue-600 text-white shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">AI Tư vấn gia sư</h2>
              <p className="text-sm opacity-90">
                Trợ lý thông minh của VietTutor
              </p>
            </div>
            <div className="ml-auto">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4" ref={chatContainerRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === "ai" && (
                      <Bot className="h-5 w-5 mt-0.5 text-blue-600" />
                    )}
                    {message.type === "user" && (
                      <User className="h-5 w-5 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.type === "user"
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5 text-blue-600" />
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-gray-600">AI đang suy nghĩ...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t shrink-0">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn để tìm gia sư..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tutors List Panel */}
      <div className="w-1/2 flex flex-col bg-gray-50 overflow-hidden">
        {/* Tutors Header */}
        <div className="p-4 bg-white border-b shadow-sm shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                Gia sư được đề xuất
                {Object.keys(studentProfile).length > 0 && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    AI đã phân tích
                  </span>
                )}
              </h2>
              <p className="text-sm text-gray-600">
                {filteredTutors.length} gia sư phù hợp với yêu cầu
                {Object.keys(studentProfile).length > 0 && (
                  <span className="text-blue-600">
                    {" "}
                    • Được cập nhật theo cuộc trò chuyện
                  </span>
                )}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
          </div>

          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm theo tên, môn học, khu vực..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Tutors List */}
        <div className="flex-1 overflow-y-auto p-4">
          {isUpdatingTutors && (
            <div className="flex items-center justify-center py-8 bg-blue-50 rounded-lg mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-blue-700 font-medium">
                Đang cập nhật danh sách theo yêu cầu của bạn...
              </span>
            </div>
          )}

          <div
            className={`space-y-4 transition-opacity duration-300 ${
              isUpdatingTutors ? "opacity-50" : "opacity-100"
            }`}
          >
            {filteredTutors.length > 0 ? (
              filteredTutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Không tìm thấy gia sư phù hợp
                </h3>
                <p className="text-gray-600 mb-4 max-w-sm mx-auto">
                  Hãy thử điều chỉnh tiêu chí tìm kiếm hoặc chat với AI để được
                  hỗ trợ tốt hơn.
                </p>
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  Làm mới tìm kiếm
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
