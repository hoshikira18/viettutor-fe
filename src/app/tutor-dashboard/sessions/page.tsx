"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  BookOpen,
  Calendar,
  FileText,
  Star,
  TrendingUp,
  Plus,
  Edit,
  Save,
  Filter,
  Search,
  Download,
  Eye,
} from "lucide-react";

// Mock sessions data
const mockSessions = [
  {
    id: "1",
    studentName: "Nguyễn Minh An",
    studentId: "student1",
    subject: "Toán học",
    date: "2024-11-05",
    startTime: "19:00",
    endTime: "20:30",
    duration: 90,
    status: "completed",
    attendance: "present",
    rating: 5,
    topicsStudied: ["Hàm số bậc nhất", "Đồ thị hàm số"],
    homework: "Bài tập SGK trang 45-47",
    notes:
      "Em đã hiểu rõ về hàm số bậc nhất. Cần luyện thêm dạng bài về đồ thị.",
    nextTopics: "Hàm số bậc hai",
    progress: 8,
  },
  {
    id: "2",
    studentName: "Trần Thu Hà",
    studentId: "student2",
    subject: "Tiếng Anh",
    date: "2024-11-04",
    startTime: "14:00",
    endTime: "16:00",
    duration: 120,
    status: "completed",
    attendance: "present",
    rating: 4,
    topicsStudied: ["Present Perfect Tense", "Vocabulary Unit 5"],
    homework: "Workbook Unit 5, exercises 1-5",
    notes: "Em đã nắm được thì hiện tại hoàn thành. Cần cải thiện phát âm.",
    nextTopics: "Past Perfect Tense",
    progress: 7,
  },
  {
    id: "3",
    studentName: "Lê Minh Đức",
    studentId: "student3",
    subject: "Vật lý",
    date: "2024-11-03",
    startTime: "20:00",
    endTime: "21:30",
    duration: 90,
    status: "completed",
    attendance: "late",
    rating: 5,
    topicsStudied: ["Dao động điều hòa", "Chu kỳ và tần số"],
    homework: "Luyện đề số 15",
    notes: "Em đến muộn 15 phút nhưng rất tập trung học. Hiểu tốt về dao động.",
    nextTopics: "Sóng cơ học",
    progress: 9,
  },
  {
    id: "4",
    studentName: "Nguyễn Minh An",
    studentId: "student1",
    subject: "Toán học",
    date: "2024-11-06",
    startTime: "19:00",
    endTime: "20:30",
    duration: 90,
    status: "scheduled",
    attendance: null,
    rating: null,
    topicsStudied: [],
    homework: "",
    notes: "",
    nextTopics: "Hàm số bậc hai",
    progress: null,
  },
  {
    id: "5",
    studentName: "Trần Thu Hà",
    studentId: "student2",
    subject: "Tiếng Anh",
    date: "2024-11-02",
    startTime: "14:00",
    endTime: "16:00",
    duration: 120,
    status: "completed",
    attendance: "absent",
    rating: null,
    topicsStudied: [],
    homework: "Workbook Unit 4 (makeup)",
    notes: "Em vắng mặt có lý do. Sẽ bù vào thứ 7.",
    nextTopics: "Present Perfect Tense",
    progress: null,
  },
];

// Mock students data
const mockStudents = [
  { id: "student1", name: "Nguyễn Minh An" },
  { id: "student2", name: "Trần Thu Hà" },
  { id: "student3", name: "Lê Minh Đức" },
];

export default function TutorSessionsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [sessions, setSessions] = useState(mockSessions);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [isRecordingSession, setIsRecordingSession] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStudent, setFilterStudent] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Hoàn thành</Badge>;
      case "scheduled":
        return <Badge variant="secondary">Đã lên lịch</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Đã hủy</Badge>;
      case "ongoing":
        return <Badge variant="outline">Đang diễn ra</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAttendanceBadge = (attendance: string | null) => {
    if (!attendance) return null;

    switch (attendance) {
      case "present":
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 border-green-300"
          >
            Có mặt
          </Badge>
        );
      case "late":
        return (
          <Badge
            variant="default"
            className="bg-yellow-100 text-yellow-800 border-yellow-300"
          >
            Muộn
          </Badge>
        );
      case "absent":
        return <Badge variant="destructive">Vắng mặt</Badge>;
      default:
        return null;
    }
  };

  const getProgressColor = (progress: number | null) => {
    if (!progress) return "bg-gray-200";
    if (progress >= 8) return "bg-green-500";
    if (progress >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  const filterSessions = () => {
    return sessions.filter((session) => {
      const matchesSearch =
        session.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStudent =
        filterStudent === "all" || session.studentId === filterStudent;
      const matchesStatus =
        filterStatus === "all" || session.status === filterStatus;

      return matchesSearch && matchesStudent && matchesStatus;
    });
  };

  const getTabSessions = (tabType: string) => {
    const filtered = filterSessions();

    switch (tabType) {
      case "completed":
        return filtered.filter((s) => s.status === "completed");
      case "scheduled":
        return filtered.filter((s) => s.status === "scheduled");
      case "cancelled":
        return filtered.filter((s) => s.status === "cancelled");
      default:
        return filtered;
    }
  };

  const handleRecordSession = (session: any) => {
    setSelectedSession(session);
    setIsRecordingSession(true);
  };

  const handleSaveSessionRecord = () => {
    // TODO: Save session record to store/database
    console.log("Saving session record:", selectedSession);
    setIsRecordingSession(false);
    setSelectedSession(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getSessionStats = () => {
    const completed = sessions.filter((s) => s.status === "completed").length;
    const scheduled = sessions.filter((s) => s.status === "scheduled").length;
    const totalHours =
      sessions
        .filter((s) => s.status === "completed")
        .reduce((sum, s) => sum + s.duration, 0) / 60;
    const avgRating = sessions
      .filter((s) => s.rating)
      .reduce((sum, s, _, arr) => sum + (s.rating || 0) / arr.length, 0);

    return { completed, scheduled, totalHours, avgRating };
  };

  const stats = getSessionStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý buổi học</h1>
          <p className="text-gray-600 mt-1">
            Theo dõi tiến độ và ghi chú của từng buổi học
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ghi nhận buổi học
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Ghi nhận buổi học mới</DialogTitle>
                <DialogDescription>
                  Thêm thông tin cho buổi học vừa kết thúc
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Học sinh</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn học sinh" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ngày học</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Thời lượng (phút)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="60">60 phút</SelectItem>
                        <SelectItem value="90">90 phút</SelectItem>
                        <SelectItem value="120">120 phút</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline">Hủy</Button>
                <Button>Tiếp tục</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completed}
                </p>
                <p className="text-gray-600">Buổi hoàn thành</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.scheduled}
                </p>
                <p className="text-gray-600">Buổi đã lên lịch</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalHours.toFixed(1)}
                </p>
                <p className="text-gray-600">Giờ dạy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.avgRating.toFixed(1)}
                </p>
                <p className="text-gray-600">Đánh giá TB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo tên học sinh hoặc môn học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filterStudent} onValueChange={setFilterStudent}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo học sinh" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả học sinh</SelectItem>
                {mockStudents.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="scheduled">Đã lên lịch</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Sessions Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            Tất cả ({getTabSessions("all").length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Hoàn thành ({getTabSessions("completed").length})
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            Đã lên lịch ({getTabSessions("scheduled").length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Đã hủy ({getTabSessions("cancelled").length})
          </TabsTrigger>
        </TabsList>

        {["all", "completed", "scheduled", "cancelled"].map((tabType) => (
          <TabsContent key={tabType} value={tabType} className="space-y-4">
            {getTabSessions(tabType).length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không có buổi học nào
                  </h3>
                  <p className="text-gray-600 text-center">
                    {tabType === "all" && "Chưa có buổi học nào được ghi nhận."}
                    {tabType === "completed" &&
                      "Chưa có buổi học nào hoàn thành."}
                    {tabType === "scheduled" &&
                      "Chưa có buổi học nào được lên lịch."}
                    {tabType === "cancelled" && "Chưa có buổi học nào bị hủy."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {getTabSessions(tabType).map((session) => (
                  <Card
                    key={session.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          {/* Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {session.studentName}
                              </h3>
                              {getStatusBadge(session.status)}
                              {getAttendanceBadge(session.attendance)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDate(session.date)}
                            </div>
                          </div>

                          {/* Session Info */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-4 w-4 text-gray-400" />
                              <span>{session.subject}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span>
                                {session.startTime}-{session.endTime} (
                                {session.duration} phút)
                              </span>
                            </div>
                            {session.rating && (
                              <div className="flex items-center space-x-2">
                                <Star className="h-4 w-4 text-yellow-400" />
                                <span>{session.rating}/5</span>
                              </div>
                            )}
                            {session.progress && (
                              <div className="flex items-center space-x-2">
                                <TrendingUp className="h-4 w-4 text-gray-400" />
                                <div className="flex items-center space-x-1">
                                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                                    <div
                                      className={`h-2 rounded-full ${getProgressColor(
                                        session.progress
                                      )}`}
                                      style={{
                                        width: `${
                                          (session.progress / 10) * 100
                                        }%`,
                                      }}
                                    />
                                  </div>
                                  <span className="text-xs">
                                    {session.progress}/10
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Topics and Notes */}
                          {session.status === "completed" && (
                            <div className="space-y-2">
                              {session.topicsStudied.length > 0 && (
                                <div>
                                  <span className="text-sm font-medium text-gray-600">
                                    Nội dung đã học:{" "}
                                  </span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {session.topicsStudied.map(
                                      (topic, index) => (
                                        <Badge
                                          key={index}
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {topic}
                                        </Badge>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}

                              {session.homework && (
                                <div>
                                  <span className="text-sm font-medium text-gray-600">
                                    Bài tập về nhà:{" "}
                                  </span>
                                  <span className="text-sm text-gray-700">
                                    {session.homework}
                                  </span>
                                </div>
                              )}

                              {session.notes && (
                                <div>
                                  <span className="text-sm font-medium text-gray-600">
                                    Ghi chú:{" "}
                                  </span>
                                  <span className="text-sm text-gray-700">
                                    {session.notes}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                          {session.nextTopics && (
                            <span>
                              Chủ đề tiếp theo:{" "}
                              <strong>{session.nextTopics}</strong>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedSession(session)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Chi tiết
                          </Button>

                          {session.status === "scheduled" && (
                            <Button
                              size="sm"
                              onClick={() => handleRecordSession(session)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Ghi nhận
                            </Button>
                          )}

                          {session.status === "completed" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRecordSession(session)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Chỉnh sửa
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Session Detail/Recording Dialog */}
      {selectedSession && (
        <Dialog
          open={!!selectedSession}
          onOpenChange={() => setSelectedSession(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {isRecordingSession ? "Ghi nhận buổi học" : "Chi tiết buổi học"}
              </DialogTitle>
              <DialogDescription>
                {selectedSession.studentName} - {selectedSession.subject} -{" "}
                {formatDate(selectedSession.date)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Thời gian
                  </label>
                  <p className="text-sm">
                    {selectedSession.startTime}-{selectedSession.endTime}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Thời lượng
                  </label>
                  <p className="text-sm">{selectedSession.duration} phút</p>
                </div>
              </div>

              {isRecordingSession ? (
                // Recording Form
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tình trạng tham gia</Label>
                    <Select
                      defaultValue={selectedSession.attendance || "present"}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Có mặt</SelectItem>
                        <SelectItem value="late">Muộn</SelectItem>
                        <SelectItem value="absent">Vắng mặt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Nội dung đã học</Label>
                    <Input
                      placeholder="Nhập các chủ đề đã học, cách nhau bởi dấu phẩy"
                      defaultValue={selectedSession.topicsStudied.join(", ")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Bài tập về nhà</Label>
                    <Input
                      placeholder="Bài tập được giao cho buổi tới"
                      defaultValue={selectedSession.homework}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Đánh giá mức độ hiểu bài (1-10)</Label>
                    <Select
                      defaultValue={selectedSession.progress?.toString() || "8"}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}/10{" "}
                            {num >= 8
                              ? "(Tốt)"
                              : num >= 6
                              ? "(Khá)"
                              : "(Cần cải thiện)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Ghi chú buổi học</Label>
                    <Textarea
                      placeholder="Ghi chú về tiến độ, thái độ học tập, cần cải thiện..."
                      defaultValue={selectedSession.notes}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Chủ đề buổi tới</Label>
                    <Input
                      placeholder="Nội dung dự kiến cho buổi học tiếp theo"
                      defaultValue={selectedSession.nextTopics}
                    />
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="space-y-4">
                  {selectedSession.topicsStudied.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Nội dung đã học</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedSession.topicsStudied.map(
                          (topic: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {topic}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {selectedSession.homework && (
                    <div>
                      <h4 className="font-medium mb-2">Bài tập về nhà</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {selectedSession.homework}
                      </p>
                    </div>
                  )}

                  {selectedSession.notes && (
                    <div>
                      <h4 className="font-medium mb-2">Ghi chú</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {selectedSession.notes}
                      </p>
                    </div>
                  )}

                  {selectedSession.progress && (
                    <div>
                      <h4 className="font-medium mb-2">Mức độ hiểu bài</h4>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 h-3 bg-gray-200 rounded-full">
                          <div
                            className={`h-3 rounded-full ${getProgressColor(
                              selectedSession.progress
                            )}`}
                            style={{
                              width: `${
                                (selectedSession.progress / 10) * 100
                              }%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {selectedSession.progress}/10
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedSession(null)}
              >
                {isRecordingSession ? "Hủy" : "Đóng"}
              </Button>
              {isRecordingSession && (
                <Button onClick={handleSaveSessionRecord}>
                  <Save className="h-4 w-4 mr-2" />
                  Lưu ghi nhận
                </Button>
              )}
              {!isRecordingSession &&
                selectedSession.status === "completed" && (
                  <Button onClick={() => setIsRecordingSession(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
