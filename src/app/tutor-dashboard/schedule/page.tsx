"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  Settings,
  User,
  BookOpen,
  MapPin,
  Edit,
  Trash2,
  Copy,
  Save,
} from "lucide-react";

// Mock schedule data
const mockSchedule = {
  availability: {
    monday: { enabled: true, slots: [{ start: "18:00", end: "21:00" }] },
    tuesday: { enabled: true, slots: [{ start: "18:00", end: "21:00" }] },
    wednesday: { enabled: true, slots: [{ start: "18:00", end: "21:00" }] },
    thursday: { enabled: true, slots: [{ start: "18:00", end: "21:00" }] },
    friday: { enabled: true, slots: [{ start: "18:00", end: "21:00" }] },
    saturday: {
      enabled: true,
      slots: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],
    },
    sunday: {
      enabled: true,
      slots: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],
    },
  },
  sessions: [
    {
      id: "1",
      studentName: "Nguyễn Minh An",
      subject: "Toán học",
      date: "2024-11-07",
      time: "19:00-20:30",
      duration: 90,
      type: "regular",
      location: "Tại nhà học sinh",
      status: "confirmed",
      notes: "Ôn tập chương hàm số",
    },
    {
      id: "2",
      studentName: "Trần Thu Hà",
      subject: "Tiếng Anh",
      date: "2024-11-09",
      time: "14:00-16:00",
      duration: 120,
      type: "trial",
      location: "Online",
      status: "pending",
      notes: "Buổi học thử - Đánh giá trình độ",
    },
    {
      id: "3",
      studentName: "Lê Minh Đức",
      subject: "Vật lý",
      date: "2024-11-10",
      time: "20:00-21:30",
      duration: 90,
      type: "regular",
      location: "Tại nhà gia sư",
      status: "confirmed",
      notes: "Luyện đề thi đại học",
    },
  ],
};

const DAYS_OF_WEEK = [
  { key: "monday", label: "Thứ 2" },
  { key: "tuesday", label: "Thứ 3" },
  { key: "wednesday", label: "Thứ 4" },
  { key: "thursday", label: "Thứ 5" },
  { key: "friday", label: "Thứ 6" },
  { key: "saturday", label: "Thứ 7" },
  { key: "sunday", label: "Chủ nhật" },
];

export default function TutorSchedulePage() {
  const [activeTab, setActiveTab] = useState("calendar");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availability, setAvailability] = useState(mockSchedule.availability);
  const [sessions, setSessions] = useState(mockSchedule.sessions);

  // Get current week dates
  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startOfWeek);
      weekDate.setDate(startOfWeek.getDate() + i);
      week.push(weekDate);
    }
    return week;
  };

  const weekDates = getWeekDates(currentDate);

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getSessionsForDate = (date: string) => {
    return sessions.filter((session) => session.date === date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="default">Đã xác nhận</Badge>;
      case "pending":
        return <Badge variant="secondary">Chờ xác nhận</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Đã hủy</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "trial":
        return "bg-blue-100 border-blue-300 text-blue-800";
      case "regular":
        return "bg-green-100 border-green-300 text-green-800";
      case "makeup":
        return "bg-orange-100 border-orange-300 text-orange-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const updateAvailability = (day: string, enabled: boolean) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        enabled,
      },
    }));
  };

  const addTimeSlot = (day: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        slots: [
          ...prev[day as keyof typeof prev].slots,
          { start: "09:00", end: "10:00" },
        ],
      },
    }));
  };

  const removeTimeSlot = (day: string, index: number) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        slots: prev[day as keyof typeof prev].slots.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const updateTimeSlot = (
    day: string,
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        slots: prev[day as keyof typeof prev].slots.map((slot, i) =>
          i === index ? { ...slot, [field]: value } : slot
        ),
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lịch dạy học</h1>
          <p className="text-gray-600 mt-1">
            Quản lý lịch trình và thời gian rảnh
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={goToToday}>
            Hôm nay
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Thêm buổi học
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Thêm buổi học mới</DialogTitle>
                <DialogDescription>
                  Tạo buổi học mới cho học sinh
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
                      <SelectItem value="student1">Nguyễn Minh An</SelectItem>
                      <SelectItem value="student2">Trần Thu Hà</SelectItem>
                      <SelectItem value="student3">Lê Minh Đức</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ngày</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Giờ</Label>
                    <Input type="time" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Thời lượng (phút)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thời lượng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60 phút</SelectItem>
                      <SelectItem value="90">90 phút</SelectItem>
                      <SelectItem value="120">120 phút</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Ghi chú</Label>
                  <Textarea placeholder="Nội dung buổi học..." rows={3} />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline">Hủy</Button>
                <Button>Tạo buổi học</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar">Lịch dạy học</TabsTrigger>
          <TabsTrigger value="availability">Thời gian rảnh</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt lịch</TabsTrigger>
        </TabsList>

        {/* Calendar View */}
        <TabsContent value="calendar" className="space-y-6">
          {/* Week Navigation */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateWeek("prev")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-lg font-semibold">
                    {weekDates[0].toLocaleDateString("vi-VN", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateWeek("next")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-200 border border-green-300 rounded"></div>
                    <span>Đã xác nhận</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-200 border border-blue-300 rounded"></div>
                    <span>Học thử</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-orange-200 border border-orange-300 rounded"></div>
                    <span>Bù học</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Week Calendar */}
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-7 border-b border-gray-200">
                {DAYS_OF_WEEK.map((day, index) => {
                  const date = weekDates[index];
                  const isToday = formatDate(date) === formatDate(new Date());
                  const dateStr = formatDate(date);
                  const dayAvailability =
                    availability[day.key as keyof typeof availability];

                  return (
                    <div
                      key={day.key}
                      className="border-r border-gray-200 last:border-r-0"
                    >
                      <div
                        className={`p-3 text-center border-b border-gray-200 ${
                          isToday ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {day.label}
                        </div>
                        <div
                          className={`text-sm ${
                            isToday
                              ? "text-blue-600 font-semibold"
                              : "text-gray-600"
                          }`}
                        >
                          {date.getDate()}
                        </div>
                        {dayAvailability.enabled && (
                          <div className="text-xs text-green-600 mt-1">
                            {dayAvailability.slots.length} khung giờ
                          </div>
                        )}
                      </div>

                      {/* Sessions for this day */}
                      <div className="p-2 min-h-40 space-y-2">
                        {getSessionsForDate(dateStr).map((session) => (
                          <div
                            key={session.id}
                            className={`p-2 rounded border text-xs cursor-pointer hover:shadow-sm transition-shadow ${getTypeColor(
                              session.type
                            )}`}
                            onClick={() => setSelectedDate(dateStr)}
                          >
                            <div className="font-medium">{session.time}</div>
                            <div className="truncate">
                              {session.studentName}
                            </div>
                            <div className="text-xs opacity-75">
                              {session.subject}
                            </div>
                            {getStatusBadge(session.status)}
                          </div>
                        ))}

                        {/* Available slots */}
                        {dayAvailability.enabled &&
                          dayAvailability.slots.map((slot, slotIndex) => {
                            const hasSession = getSessionsForDate(dateStr).some(
                              (session) => session.time.includes(slot.start)
                            );

                            if (!hasSession) {
                              return (
                                <div
                                  key={slotIndex}
                                  className="p-2 rounded border-2 border-dashed border-gray-300 text-xs text-gray-500 hover:border-blue-300 hover:text-blue-600 cursor-pointer transition-colors"
                                >
                                  <div>
                                    {slot.start}-{slot.end}
                                  </div>
                                  <div>Còn trống</div>
                                </div>
                              );
                            }
                            return null;
                          })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Session Details */}
          {selectedDate && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Chi tiết buổi học -{" "}
                  {new Date(selectedDate).toLocaleDateString("vi-VN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getSessionsForDate(selectedDate).map((session) => (
                    <div
                      key={session.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium text-lg">
                              {session.studentName}
                            </h4>
                            {getStatusBadge(session.status)}
                            <Badge variant="outline">
                              {session.type === "trial"
                                ? "Học thử"
                                : session.type === "regular"
                                ? "Thường xuyên"
                                : "Bù học"}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span>
                                {session.time} ({session.duration} phút)
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-4 w-4 text-gray-400" />
                              <span>{session.subject}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span>{session.location}</span>
                            </div>
                          </div>

                          {session.notes && (
                            <div className="mt-2">
                              <span className="text-sm font-medium text-gray-600">
                                Ghi chú:{" "}
                              </span>
                              <span className="text-sm text-gray-700">
                                {session.notes}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {getSessionsForDate(selectedDate).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p>Không có buổi học nào trong ngày này</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Availability Settings */}
        <TabsContent value="availability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thiết lập thời gian rảnh</CardTitle>
              <p className="text-sm text-gray-600">
                Cấu hình những khung giờ bạn có thể dạy học trong tuần
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {DAYS_OF_WEEK.map((day) => {
                const dayAvailability =
                  availability[day.key as keyof typeof availability];

                return (
                  <div key={day.key} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{day.label}</h4>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={dayAvailability.enabled}
                          onChange={(e) =>
                            updateAvailability(day.key, e.target.checked)
                          }
                          className="rounded"
                        />
                        <span className="text-sm">Có thể dạy</span>
                      </label>
                    </div>

                    {dayAvailability.enabled && (
                      <div className="space-y-3 pl-4 border-l-2 border-blue-200">
                        {dayAvailability.slots.map((slot, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <Input
                              type="time"
                              value={slot.start}
                              onChange={(e) =>
                                updateTimeSlot(
                                  day.key,
                                  index,
                                  "start",
                                  e.target.value
                                )
                              }
                              className="w-24"
                            />
                            <span className="text-gray-400">đến</span>
                            <Input
                              type="time"
                              value={slot.end}
                              onChange={(e) =>
                                updateTimeSlot(
                                  day.key,
                                  index,
                                  "end",
                                  e.target.value
                                )
                              }
                              className="w-24"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeTimeSlot(day.key, index)}
                              disabled={dayAvailability.slots.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addTimeSlot(day.key)}
                          className="w-full"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Thêm khung giờ
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Cài đặt lịch dạy học
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Thời gian mặc định cho buổi học (phút)</Label>
                  <Select defaultValue="90">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60 phút</SelectItem>
                      <SelectItem value="90">90 phút</SelectItem>
                      <SelectItem value="120">120 phút</SelectItem>
                      <SelectItem value="180">180 phút</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Thời gian nghỉ giữa các buổi học (phút)</Label>
                  <Select defaultValue="15">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Không nghỉ</SelectItem>
                      <SelectItem value="15">15 phút</SelectItem>
                      <SelectItem value="30">30 phút</SelectItem>
                      <SelectItem value="60">60 phút</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Cho phép đặt lịch trước (ngày)</Label>
                  <Select defaultValue="7">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 ngày</SelectItem>
                      <SelectItem value="3">3 ngày</SelectItem>
                      <SelectItem value="7">7 ngày</SelectItem>
                      <SelectItem value="14">14 ngày</SelectItem>
                      <SelectItem value="30">30 ngày</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Cho phép hủy lịch trước (giờ)</Label>
                  <Select defaultValue="24">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 giờ</SelectItem>
                      <SelectItem value="6">6 giờ</SelectItem>
                      <SelectItem value="12">12 giờ</SelectItem>
                      <SelectItem value="24">24 giờ</SelectItem>
                      <SelectItem value="48">48 giờ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Tùy chọn thông báo</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">
                      Nhắc nhở trước buổi học 30 phút
                    </span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">
                      Thông báo khi có yêu cầu đặt lịch mới
                    </span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">
                      Thông báo khi học sinh hủy lịch
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Lưu cài đặt
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
