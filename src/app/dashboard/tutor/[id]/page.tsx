"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  MessageCircle,
  Heart,
  Share2,
  Calendar,
  User,
  GraduationCap,
  Languages,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tutor } from "@/types";
import { mockTutors } from "@/lib/mockData";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDay = (day: string) => {
  const dayMap: Record<string, string> = {
    monday: "Thứ 2",
    tuesday: "Thứ 3",
    wednesday: "Thứ 4",
    thursday: "Thứ 5",
    friday: "Thứ 6",
    saturday: "Thứ 7",
    sunday: "Chủ nhật",
  };
  return dayMap[day] || day;
};

const getVerificationStatusColor = (status: string) => {
  switch (status) {
    case "verified":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getVerificationStatusText = (status: string) => {
  switch (status) {
    case "verified":
      return "Đã xác thực";
    case "pending":
      return "Đang xử lý";
    case "rejected":
      return "Bị từ chối";
    default:
      return "Chưa xác thực";
  }
};

export default function TutorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const tutorId = params.id as string;

    // Simulate API call delay
    setTimeout(() => {
      const foundTutor = mockTutors.find((t) => t.id === tutorId);
      setTutor(foundTutor || null);
      setLoading(false);
    }, 300);
  }, [params.id]);

  const handleInquiry = () => {
    // Navigate to inquiry form or open inquiry modal
    router.push(`/dashboard/inquiry?tutorId=${tutor?.id}`);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite functionality
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    navigator.share?.({
      title: `Gia sư ${tutor?.name}`,
      text: `Xem hồ sơ gia sư ${tutor?.name} trên VietTutor`,
      url: window.location.href,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6"></div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Không tìm thấy gia sư
          </h1>
          <p className="text-gray-600 mb-4">
            Gia sư này có thể đã bị xóa hoặc không tồn tại.
          </p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFavorite}
              className={
                isFavorite ? "bg-red-50 border-red-200 text-red-600" : ""
              }
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
              />
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Profile Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar and Basic Info */}
              <div className="shrink-0">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={tutor.avatar} alt={tutor.name} />
                  <AvatarFallback className="text-2xl">
                    {tutor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{tutor.rating}</span>
                    <span className="text-sm text-gray-600">
                      ({tutor.reviewCount} đánh giá)
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        tutor.isOnline ? "bg-green-400" : "bg-gray-400"
                      }`}
                    />
                    {tutor.isOnline ? "Đang online" : "Offline"}
                  </div>
                </div>
              </div>

              {/* Main Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                      {tutor.name}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {tutor.district}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tutor.experience} năm kinh nghiệm
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      {tutor.verificationStatus.overall === "verified" && (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Đã xác thực
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {formatCurrency(tutor.hourlyRate)}/giờ
                    </div>
                  </div>
                </div>

                {/* Subjects */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-700 mb-6">{tutor.bio}</p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleInquiry} className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Gửi yêu cầu dạy học
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Xem lịch trống
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">Thông tin</TabsTrigger>
            <TabsTrigger value="schedule">Lịch dạy</TabsTrigger>
            <TabsTrigger value="qualifications">Bằng cấp</TabsTrigger>
            <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Thông tin cơ bản
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kinh nghiệm:</span>
                    <span className="font-medium">{tutor.experience} năm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phong cách dạy:</span>
                    <span className="font-medium">{tutor.teachingStyle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Khu vực:</span>
                    <span className="font-medium">{tutor.district}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Học phí:</span>
                    <span className="font-medium text-blue-600">
                      {formatCurrency(tutor.hourlyRate)}/giờ
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Languages & Specializations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Languages className="w-5 h-5" />
                    Ngôn ngữ & Chuyên môn
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-gray-600 block mb-2">Ngôn ngữ:</span>
                    <div className="flex flex-wrap gap-2">
                      {tutor.languages.map((lang, index) => (
                        <Badge key={index} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {tutor.specializations && (
                    <div>
                      <span className="text-gray-600 block mb-2">
                        Chuyên môn:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {tutor.specializations.map((spec, index) => (
                          <Badge key={index} variant="outline">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Trạng thái xác thực
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getVerificationStatusColor(
                        tutor.verificationStatus.identity
                      )}`}
                    >
                      {getVerificationStatusText(
                        tutor.verificationStatus.identity
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Danh tính</p>
                  </div>
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getVerificationStatusColor(
                        tutor.verificationStatus.qualifications
                      )}`}
                    >
                      {getVerificationStatusText(
                        tutor.verificationStatus.qualifications
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Bằng cấp</p>
                  </div>
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getVerificationStatusColor(
                        tutor.verificationStatus.background
                      )}`}
                    >
                      {getVerificationStatusText(
                        tutor.verificationStatus.background
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Lý lịch</p>
                  </div>
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getVerificationStatusColor(
                        tutor.verificationStatus.overall
                      )}`}
                    >
                      {getVerificationStatusText(
                        tutor.verificationStatus.overall
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Tổng thể</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Lịch trống trong tuần</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(tutor.availability).map(([day, schedule]) => (
                    <div
                      key={day}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="font-medium w-20">{formatDay(day)}</span>
                      {schedule.isAvailable ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">Không có lịch</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Qualifications Tab */}
          <TabsContent value="qualifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Bằng cấp & Chứng chỉ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tutor.qualifications.map((qual) => (
                    <div
                      key={qual.id}
                      className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Award className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {qual.title}
                        </h4>
                        <p className="text-gray-600">{qual.institution}</p>
                        <p className="text-sm text-gray-500">Năm {qual.year}</p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getVerificationStatusColor(
                          qual.verificationStatus
                        )}`}
                      >
                        {getVerificationStatusText(qual.verificationStatus)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Đánh giá từ học sinh</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">⭐</div>
                  <h3 className="text-xl font-semibold mb-2">
                    Chức năng đang phát triển
                  </h3>
                  <p className="text-gray-600">
                    Hệ thống đánh giá sẽ sớm được ra mắt.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
