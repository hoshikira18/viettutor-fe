"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Star,
  Clock,
  BookOpen,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

// Mock data for demonstration
const stats = {
  totalStudents: 24,
  monthlyEarnings: 15500000,
  completedSessions: 142,
  rating: 4.8,
  pendingInquiries: 5,
  thisWeekSessions: 8,
  upcomingSessions: 3,
  responseRate: 95,
};

const recentInquiries = [
  {
    id: "1",
    parentName: "Chị Nguyễn Thị Mai",
    childName: "Nguyễn Minh An",
    subject: "Toán lớp 10",
    message:
      "Cần gia sư dạy Toán cho con, con đang gặp khó khăn về phần hàm số...",
    createdAt: new Date("2024-11-05T10:30:00"),
    status: "sent" as const,
  },
  {
    id: "2",
    parentName: "Anh Trần Văn Nam",
    childName: "Trần Thu Hà",
    subject: "Tiếng Anh lớp 9",
    message:
      "Con cần luyện thi vào lớp 10, đặc biệt là phần speaking và writing...",
    createdAt: new Date("2024-11-05T09:15:00"),
    status: "viewed" as const,
  },
];

const upcomingSessions = [
  {
    id: "1",
    studentName: "Lê Minh Đức",
    subject: "Vật lý",
    time: "14:00 - 16:00",
    date: "Hôm nay",
    type: "online" as const,
  },
  {
    id: "2",
    studentName: "Phạm Thị Lan",
    subject: "Hóa học",
    time: "18:00 - 19:30",
    date: "Ngày mai",
    type: "in-person" as const,
  },
];

export default function TutorDashboardPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Vừa xong";
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else {
      return `${Math.floor(diffInHours / 24)} ngày trước`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Tổng quan Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Chào mừng bạn trở lại! Đây là tình hình hoạt động gần đây.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Học sinh</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalStudents}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">+2 tháng này</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Thu nhập tháng
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.monthlyEarnings)}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">+12% so với tháng trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Buổi dạy</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.completedSessions}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Clock className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-blue-600">
                {stats.thisWeekSessions} buổi tuần này
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đánh giá</p>
                <div className="flex items-center space-x-1">
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.rating}
                  </p>
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">
                {stats.responseRate}% tỷ lệ phản hồi
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">
              Yêu cầu dạy học mới
            </CardTitle>
            <Button variant="outline" size="sm">
              Xem tất cả
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">
                        {inquiry.parentName}
                      </h4>
                      <Badge
                        variant={
                          inquiry.status === "sent"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {inquiry.status === "sent" ? "Mới" : "Đã xem"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {inquiry.childName} - {inquiry.subject}
                    </p>
                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                      {inquiry.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {getTimeAgo(inquiry.createdAt)}
                    </p>
                  </div>
                  <MessageSquare className="h-5 w-5 text-gray-400 mt-1" />
                </div>
              </div>
            ))}

            {stats.pendingInquiries > recentInquiries.length && (
              <div className="text-center py-2">
                <p className="text-sm text-gray-600">
                  Và {stats.pendingInquiries - recentInquiries.length} yêu cầu
                  khác...
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">
              Lịch dạy sắp tới
            </CardTitle>
            <Button variant="outline" size="sm">
              Xem lịch
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {session.studentName}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {session.subject}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {session.time}
                        </span>
                      </div>
                      <Badge variant="outline">
                        {session.type === "online" ? "Online" : "Trực tiếp"}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {session.date}
                    </p>
                    <Calendar className="h-4 w-4 text-gray-400 mt-1 ml-auto" />
                  </div>
                </div>
              </div>
            ))}

            {stats.upcomingSessions > upcomingSessions.length && (
              <div className="text-center py-2">
                <p className="text-sm text-gray-600">
                  Và {stats.upcomingSessions - upcomingSessions.length} buổi học
                  khác...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Hành động nhanh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <MessageSquare className="h-6 w-6" />
              <span>Xem yêu cầu mới</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <Calendar className="h-6 w-6" />
              <span>Cập nhật lịch trống</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <BookOpen className="h-6 w-6" />
              <span>Ghi nhận buổi học</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
