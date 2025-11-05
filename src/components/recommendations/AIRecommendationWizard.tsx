"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Sparkles,
  User,
  BookOpen,
  Clock,
  MapPin,
  DollarSign,
  Settings,
  Star,
  TrendingUp,
  CheckCircle,
  Lightbulb,
  Target,
  ArrowRight,
  Loader2,
} from "lucide-react";
import {
  StudentProfile,
  RecommendationResult,
  getAIRecommendations,
} from "@/lib/ai-recommendations";

const SUBJECTS = [
  "Toán học",
  "Vật lý",
  "Hóa học",
  "Sinh học",
  "Tiếng Anh",
  "Tiếng Việt",
  "Lịch sử",
  "Địa lý",
  "GDCD",
  "Tin học",
  "Tiếng Pháp",
  "Tiếng Trung",
  "Tiếng Nhật",
];

const GRADES = [
  "Tiểu học (Lớp 1-5)",
  "THCS (Lớp 6-9)",
  "THPT (Lớp 10-12)",
  "Đại học",
  "Người đi làm",
];

const LEARNING_STYLES = [
  {
    value: "visual",
    label: "Thị giác",
    description: "Học tốt qua hình ảnh, sơ đồ, biểu đồ",
  },
  {
    value: "auditory",
    label: "Thính giác",
    description: "Học tốt qua nghe giảng, thảo luận",
  },
  {
    value: "kinesthetic",
    label: "Vận động",
    description: "Học tốt qua thực hành, hoạt động",
  },
  {
    value: "reading",
    label: "Đọc viết",
    description: "Học tốt qua đọc sách, ghi chép",
  },
];

const DISTRICTS = [
  "Quận 1",
  "Quận 2",
  "Quận 3",
  "Quận 4",
  "Quận 5",
  "Quận 6",
  "Quận 7",
  "Quận 8",
  "Quận 9",
  "Quận 10",
  "Quận 11",
  "Quận 12",
  "Quận Bình Tân",
  "Quận Bình Thạnh",
  "Quận Gò Vấp",
  "Quận Phú Nhuận",
  "Quận Tân Bình",
  "Quận Tân Phú",
  "Quận Thủ Đức",
];

const TEACHING_FORMATS = [
  { value: "in-home", label: "Tại nhà học sinh" },
  { value: "tutor-home", label: "Tại nhà gia sư" },
  { value: "online", label: "Online" },
  { value: "center", label: "Tại trung tâm" },
  { value: "any", label: "Linh hoạt" },
];

const DAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
const TIME_SLOTS = [
  "06:00-08:00",
  "08:00-10:00",
  "10:00-12:00",
  "12:00-14:00",
  "14:00-16:00",
  "16:00-18:00",
  "18:00-20:00",
  "20:00-22:00",
];

export default function AIRecommendationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] =
    useState<RecommendationResult | null>(null);

  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    id: "",
    grade: "",
    subjects: [],
    learningStyle: "visual",
    difficultyAreas: [],
    preferredSchedule: {
      days: [],
      timeSlots: [],
    },
    budget: {
      min: 200000,
      max: 500000,
    },
    location: {
      district: "",
      preference: "any",
    },
    parentPreferences: {
      tutorGender: "any",
      tutorAge: "any",
      teachingStyle: "balanced",
    },
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateRecommendations = async () => {
    setIsLoading(true);
    try {
      const result = await getAIRecommendations({
        ...studentProfile,
        id: Date.now().toString(),
      });
      setRecommendations(result);
      setCurrentStep(6); // Results step
    } catch (error) {
      console.error("Error generating recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Thông tin học sinh
              </h2>
              <p className="text-gray-600">
                Cung cấp thông tin cơ bản về học sinh
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="grade">Cấp học hiện tại</Label>
                <Select
                  value={studentProfile.grade}
                  onValueChange={(value) =>
                    setStudentProfile((prev) => ({ ...prev, grade: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn cấp học" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADES.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Môn học cần hỗ trợ</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {SUBJECTS.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox
                        id={subject}
                        checked={studentProfile.subjects.includes(subject)}
                        onCheckedChange={(checked) => {
                          const newSubjects = checked
                            ? [...studentProfile.subjects, subject]
                            : studentProfile.subjects.filter(
                                (s) => s !== subject
                              );
                          setStudentProfile((prev) => ({
                            ...prev,
                            subjects: newSubjects,
                          }));
                        }}
                      />
                      <Label htmlFor={subject} className="text-sm">
                        {subject}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="difficultyAreas">
                  Những khó khăn cụ thể (tùy chọn)
                </Label>
                <Textarea
                  id="difficultyAreas"
                  placeholder="Ví dụ: Khó hiểu phương trình bậc 2, ngữ pháp tiếng Anh..."
                  value={studentProfile.difficultyAreas.join(", ")}
                  onChange={(e) => {
                    const areas = e.target.value
                      .split(",")
                      .map((area) => area.trim())
                      .filter(Boolean);
                    setStudentProfile((prev) => ({
                      ...prev,
                      difficultyAreas: areas,
                    }));
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Phong cách học tập
              </h2>
              <p className="text-gray-600">
                Giúp AI hiểu cách con bạn học hiệu quả nhất
              </p>
            </div>

            <div className="space-y-4">
              <Label>Con bạn học tốt nhất bằng cách nào?</Label>
              <div className="grid gap-4">
                {LEARNING_STYLES.map((style) => (
                  <Card
                    key={style.value}
                    className={`cursor-pointer transition-all ${
                      studentProfile.learningStyle === style.value
                        ? "ring-2 ring-purple-500 bg-purple-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      setStudentProfile((prev) => ({
                        ...prev,
                        learningStyle: style.value as any,
                      }))
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            studentProfile.learningStyle === style.value
                              ? "bg-purple-500 border-purple-500"
                              : "border-gray-300"
                          }`}
                        />
                        <div>
                          <h3 className="font-semibold">{style.label}</h3>
                          <p className="text-sm text-gray-600">
                            {style.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Lịch học lý tưởng
              </h2>
              <p className="text-gray-600">
                Thời gian nào thuận tiện nhất cho gia đình bạn?
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Ngày trong tuần</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {DAYS.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={day}
                        checked={studentProfile.preferredSchedule.days.includes(
                          day
                        )}
                        onCheckedChange={(checked) => {
                          const newDays = checked
                            ? [...studentProfile.preferredSchedule.days, day]
                            : studentProfile.preferredSchedule.days.filter(
                                (d) => d !== day
                              );
                          setStudentProfile((prev) => ({
                            ...prev,
                            preferredSchedule: {
                              ...prev.preferredSchedule,
                              days: newDays,
                            },
                          }));
                        }}
                      />
                      <Label htmlFor={day} className="text-sm">
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Khung giờ ưa thích</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {TIME_SLOTS.map((slot) => (
                    <div key={slot} className="flex items-center space-x-2">
                      <Checkbox
                        id={slot}
                        checked={studentProfile.preferredSchedule.timeSlots.includes(
                          slot
                        )}
                        onCheckedChange={(checked) => {
                          const newSlots = checked
                            ? [
                                ...studentProfile.preferredSchedule.timeSlots,
                                slot,
                              ]
                            : studentProfile.preferredSchedule.timeSlots.filter(
                                (s) => s !== slot
                              );
                          setStudentProfile((prev) => ({
                            ...prev,
                            preferredSchedule: {
                              ...prev.preferredSchedule,
                              timeSlots: newSlots,
                            },
                          }));
                        }}
                      />
                      <Label htmlFor={slot} className="text-sm">
                        {slot}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <MapPin className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Vị trí & Ngân sách
              </h2>
              <p className="text-gray-600">
                Thông tin về địa điểm và chi phí mong muốn
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="district">Quận/Huyện</Label>
                  <Select
                    value={studentProfile.location.district}
                    onValueChange={(value) =>
                      setStudentProfile((prev) => ({
                        ...prev,
                        location: { ...prev.location, district: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn quận/huyện" />
                    </SelectTrigger>
                    <SelectContent>
                      {DISTRICTS.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="format">Hình thức dạy học</Label>
                  <Select
                    value={studentProfile.location.preference}
                    onValueChange={(value) =>
                      setStudentProfile((prev) => ({
                        ...prev,
                        location: {
                          ...prev.location,
                          preference: value as any,
                        },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn hình thức" />
                    </SelectTrigger>
                    <SelectContent>
                      {TEACHING_FORMATS.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Ngân sách mong muốn (VNĐ/buổi)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label
                      htmlFor="minBudget"
                      className="text-sm text-gray-600"
                    >
                      Tối thiểu
                    </Label>
                    <Input
                      id="minBudget"
                      type="number"
                      value={studentProfile.budget.min}
                      onChange={(e) =>
                        setStudentProfile((prev) => ({
                          ...prev,
                          budget: {
                            ...prev.budget,
                            min: Number(e.target.value),
                          },
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="maxBudget"
                      className="text-sm text-gray-600"
                    >
                      Tối đa
                    </Label>
                    <Input
                      id="maxBudget"
                      type="number"
                      value={studentProfile.budget.max}
                      onChange={(e) =>
                        setStudentProfile((prev) => ({
                          ...prev,
                          budget: {
                            ...prev.budget,
                            max: Number(e.target.value),
                          },
                        }))
                      }
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Khoảng: {studentProfile.budget.min.toLocaleString()} -{" "}
                  {studentProfile.budget.max.toLocaleString()} VNĐ
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Settings className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Sở thích cá nhân
              </h2>
              <p className="text-gray-600">
                Những yêu cầu đặc biệt về gia sư (tùy chọn)
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Giới tính gia sư ưa thích</Label>
                <Select
                  value={studentProfile.parentPreferences.tutorGender}
                  onValueChange={(value) =>
                    setStudentProfile((prev) => ({
                      ...prev,
                      parentPreferences: {
                        ...prev.parentPreferences,
                        tutorGender: value as any,
                      },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Không quan trọng</SelectItem>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Độ tuổi gia sư ưa thích</Label>
                <Select
                  value={studentProfile.parentPreferences.tutorAge}
                  onValueChange={(value) =>
                    setStudentProfile((prev) => ({
                      ...prev,
                      parentPreferences: {
                        ...prev.parentPreferences,
                        tutorAge: value as any,
                      },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Không quan trọng</SelectItem>
                    <SelectItem value="young">Trẻ tuổi (dưới 30)</SelectItem>
                    <SelectItem value="experienced">
                      Có kinh nghiệm (trên 35)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Phong cách giảng dạy</Label>
                <Select
                  value={studentProfile.parentPreferences.teachingStyle}
                  onValueChange={(value) =>
                    setStudentProfile((prev) => ({
                      ...prev,
                      parentPreferences: {
                        ...prev.parentPreferences,
                        teachingStyle: value as any,
                      },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanced">Cân bằng</SelectItem>
                    <SelectItem value="strict">Nghiêm khắc</SelectItem>
                    <SelectItem value="friendly">Thân thiện</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          recommendations && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Sparkles className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Gợi ý AI cho bạn
                </h2>
                <p className="text-gray-600">
                  Tìm thấy {recommendations.recommendations.length} gia sư phù
                  hợp
                </p>
              </div>

              {/* AI Insights */}
              {recommendations.metadata.aiInsights && (
                <Card className="bg-blue-50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Lightbulb className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-900">
                        Phân tích AI về phong cách học tập
                      </h3>
                    </div>
                    <p className="text-blue-800 mb-4">
                      {
                        recommendations.metadata.aiInsights
                          .learningStyleInsights
                      }
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-blue-900 mb-2">
                          Đặc điểm gia sư lý tưởng:
                        </h4>
                        <ul className="space-y-1">
                          {recommendations.metadata.aiInsights.recommendedTutorTraits.map(
                            (trait, index) => (
                              <li
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-blue-800">
                                  {trait}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-blue-900 mb-2">
                          Yếu tố ưu tiên:
                        </h4>
                        <ul className="space-y-1">
                          {recommendations.metadata.aiInsights.priorityFactors.map(
                            (factor, index) => (
                              <li
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <Target className="h-4 w-4 text-orange-600" />
                                <span className="text-sm text-blue-800">
                                  {factor}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* AI Ranking Explanation */}
              {recommendations.metadata.aiRankingExplanation && (
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Brain className="h-5 w-5 text-yellow-600" />
                      <h3 className="font-semibold text-yellow-900">
                        Giải thích xếp hạng AI
                      </h3>
                    </div>
                    <p className="text-yellow-800">
                      {recommendations.metadata.aiRankingExplanation}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Tutor Recommendations */}
              <div className="space-y-4">
                {recommendations.recommendations
                  .slice(0, 3)
                  .map((tutor, index) => (
                    <Card
                      key={tutor.id}
                      className={`${
                        index === 0 ? "ring-2 ring-gold-400 bg-yellow-50" : ""
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            {index === 0 && (
                              <Badge className="bg-gold-500 text-white">
                                Gợi ý tốt nhất
                              </Badge>
                            )}
                            <div>
                              <h3 className="text-lg font-semibold">
                                {tutor.name}
                              </h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span>
                                  {tutor.rating}/5 ({tutor.reviewCount} đánh
                                  giá)
                                </span>
                                <span>•</span>
                                <span>{tutor.experience} năm kinh nghiệm</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-green-600">
                              {tutor.hourlyRate.toLocaleString()}đ/buổi
                            </p>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="h-4 w-4 text-blue-500" />
                              <span className="text-sm font-medium text-blue-600">
                                {Math.round(tutor.score.overallScore)}% phù hợp
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium text-green-800 mb-2">
                              Ưu điểm:
                            </h4>
                            <ul className="space-y-1">
                              {tutor.score.pros.slice(0, 3).map((pro, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center space-x-2"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  <span className="text-sm text-green-700">
                                    {pro}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {tutor.score.cons.length > 0 && (
                            <div>
                              <h4 className="font-medium text-orange-800 mb-2">
                                Lưu ý:
                              </h4>
                              <ul className="space-y-1">
                                {tutor.score.cons
                                  .slice(0, 2)
                                  .map((con, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-center space-x-2"
                                    >
                                      <span className="w-4 h-4 text-orange-600">
                                        !
                                      </span>
                                      <span className="text-sm text-orange-700">
                                        {con}
                                      </span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {tutor.subjects.map((subject) => (
                            <Badge key={subject} variant="outline">
                              {subject}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            <p>
                              {tutor.location} •{" "}
                              {tutor.teachingFormats.join(", ")}
                            </p>
                          </div>
                          <Button>
                            Xem chi tiết
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              <div className="text-center pt-4">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Tìm kiếm lại với tiêu chí khác
                </Button>
              </div>
            </div>
          )
        );

      default:
        return null;
    }
  };

  if (currentStep === 6) {
    return <div className="max-w-4xl mx-auto p-6">{renderStepContent()}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Brain className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Tìm Gia Sư</h1>
          <Sparkles className="h-8 w-8 text-yellow-500" />
        </div>
        <p className="text-gray-600">
          Trí tuệ nhân tạo sẽ phân tích nhu cầu của con bạn và gợi ý những gia
          sư phù hợp nhất
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>
            Bước {currentStep} / {totalSteps}
          </span>
          <span>{Math.round(progress)}% hoàn thành</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Content */}
      <Card className="mb-8">
        <CardContent className="p-8">{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 1}
        >
          Quay lại
        </Button>

        <div className="flex space-x-3">
          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 &&
                  (!studentProfile.grade ||
                    studentProfile.subjects.length === 0)) ||
                (currentStep === 3 &&
                  studentProfile.preferredSchedule.days.length === 0) ||
                (currentStep === 4 && !studentProfile.location.district)
              }
            >
              Tiếp theo
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleGenerateRecommendations}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  AI đang phân tích...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Tìm gia sư với AI
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
