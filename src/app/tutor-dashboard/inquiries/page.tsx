"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  MessageSquare,
  Clock,
  User,
  MapPin,
  BookOpen,
  Send,
  Eye,
  Archive,
  Filter,
  SortDesc,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock inquiry data
const mockInquiries = [
  {
    id: "1",
    parentName: "Chị Nguyễn Thị Mai",
    parentEmail: "mai.nguyen@email.com",
    parentPhone: "+84901234567",
    childName: "Nguyễn Minh An",
    childAge: 16,
    childGrade: 10,
    subject: "Toán học",
    preferredSchedule: "Tối thứ 2-6 (18:00-21:00)",
    sessionDuration: "90",
    budget: "2400000",
    contactPreference: "both",
    message:
      "Chào thầy, con em đang học lớp 10 và gặp khó khăn về môn Toán, đặc biệt là phần hàm số và phương trình. Con cần được hướng dẫn kỹ lưỡng để chuẩn bị cho kỳ thi cuối năm. Gia đình mong muốn tìm được thầy cô nhiệt tình và có kinh nghiệm.",
    status: "sent",
    createdAt: new Date("2024-11-05T10:30:00"),
  },
  {
    id: "2",
    parentName: "Anh Trần Văn Nam",
    parentEmail: "nam.tran@email.com",
    parentPhone: "+84902345678",
    childName: "Trần Thu Hà",
    childAge: 15,
    childGrade: 9,
    subject: "Tiếng Anh",
    preferredSchedule: "Cuối tuần (14:00-18:00)",
    sessionDuration: "120",
    budget: "3000000",
    contactPreference: "phone",
    message:
      "Em cần luyện thi vào lớp 10, hiện tại điểm Tiếng Anh của em chưa được tốt lắm. Em cần tập trung vào phần speaking và writing. Gia đình có thể linh hoạt về thời gian học.",
    status: "viewed",
    createdAt: new Date("2024-11-05T09:15:00"),
    viewedAt: new Date("2024-11-05T14:20:00"),
  },
  {
    id: "3",
    parentName: "Chị Lê Thị Hương",
    parentEmail: "huong.le@email.com",
    parentPhone: "+84903456789",
    childName: "Lê Minh Đức",
    childAge: 17,
    childGrade: 11,
    subject: "Vật lý",
    preferredSchedule: "Linh hoạt theo lịch gia sư",
    sessionDuration: "90",
    budget: "2800000",
    contactPreference: "email",
    message:
      "Con đang chuẩn bị thi đại học năm sau, cần được hỗ trợ môn Vật lý để đạt điểm cao. Con có nền tảng khá tốt nhưng cần được chỉ dẫn về phương pháp giải bài tập và luyện đề.",
    status: "responded",
    createdAt: new Date("2024-11-04T16:45:00"),
    viewedAt: new Date("2024-11-04T18:30:00"),
    respondedAt: new Date("2024-11-04T19:15:00"),
    tutorResponse:
      "Chào chị Hương, cảm ơn chị đã tin tưởng. Em rất sẵn lòng hỗ trợ bé Đức chuẩn bị thi đại học. Em có kinh nghiệm 8 năm dạy Vật lý và đã giúp nhiều em đạt điểm cao trong kỳ thi đại học. Em có thể linh hoạt về thời gian và sẽ tập trung vào phương pháp giải bài tập hiệu quả. Chị có thể liên hệ với em qua số điện thoại để trao đổi chi tiết hơn không ạ?",
  },
];

type InquiryStatus = "sent" | "viewed" | "responded" | "archived";

export default function TutorInquiriesPage() {
  const [selectedTab, setSelectedTab] = useState<InquiryStatus>("sent");
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [response, setResponse] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(parseInt(amount));
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

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case "sent":
        return <Badge variant="destructive">Mới</Badge>;
      case "viewed":
        return <Badge variant="secondary">Đã xem</Badge>;
      case "responded":
        return <Badge variant="default">Đã phản hồi</Badge>;
      case "archived":
        return <Badge variant="outline">Đã lưu trữ</Badge>;
    }
  };

  const getScheduleText = (schedule: string) => {
    const scheduleMap: Record<string, string> = {
      weekday_evening: "Tối thứ 2-6 (18:00-21:00)",
      weekend_morning: "Sáng cuối tuần (8:00-12:00)",
      weekend_afternoon: "Chiều cuối tuần (14:00-18:00)",
      flexible: "Linh hoạt theo lịch gia sư",
      custom: "Thỏa thuận riêng",
    };
    return scheduleMap[schedule] || schedule;
  };

  const getDurationText = (duration: string) => {
    const hours = parseInt(duration) / 60;
    return `${hours} giờ`;
  };

  const filterInquiries = (status: InquiryStatus) => {
    return mockInquiries.filter((inquiry) => inquiry.status === status);
  };

  const handleMarkAsViewed = (inquiryId: string) => {
    // TODO: Update inquiry status in store/database
    console.log("Mark as viewed:", inquiryId);
  };

  const handleSendResponse = () => {
    if (!selectedInquiry || !response.trim()) return;

    // TODO: Send response to parent
    console.log("Sending response:", {
      inquiryId: selectedInquiry.id,
      response: response,
    });

    setResponse("");
    setSelectedInquiry(null);
  };

  const handleArchive = (inquiryId: string) => {
    // TODO: Archive inquiry
    console.log("Archive inquiry:", inquiryId);
  };

  const getTabCount = (status: InquiryStatus) => {
    return filterInquiries(status).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Yêu cầu dạy học</h1>
          <p className="text-gray-600 mt-1">
            Quản lý và phản hồi các yêu cầu từ phụ huynh
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sắp xếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="oldest">Cũ nhất</SelectItem>
              <SelectItem value="budget-high">Ngân sách cao</SelectItem>
              <SelectItem value="budget-low">Ngân sách thấp</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Lọc
          </Button>
        </div>
      </div>

      {/* Inquiry Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value as InquiryStatus)}
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sent" className="relative">
            Yêu cầu mới
            {getTabCount("sent") > 0 && (
              <Badge
                variant="destructive"
                className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
              >
                {getTabCount("sent")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="viewed">
            Đã xem ({getTabCount("viewed")})
          </TabsTrigger>
          <TabsTrigger value="responded">
            Đã phản hồi ({getTabCount("responded")})
          </TabsTrigger>
          <TabsTrigger value="archived">
            Lưu trữ ({getTabCount("archived")})
          </TabsTrigger>
        </TabsList>

        {["sent", "viewed", "responded", "archived"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {filterInquiries(status as InquiryStatus).length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không có yêu cầu nào
                  </h3>
                  <p className="text-gray-600 text-center">
                    {status === "sent" && "Chưa có yêu cầu dạy học mới nào."}
                    {status === "viewed" && "Chưa có yêu cầu nào đã xem."}
                    {status === "responded" &&
                      "Chưa có yêu cầu nào đã phản hồi."}
                    {status === "archived" &&
                      "Chưa có yêu cầu nào được lưu trữ."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filterInquiries(status as InquiryStatus).map((inquiry) => (
                  <Card
                    key={inquiry.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          {/* Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {inquiry.parentName}
                              </h3>
                              {getStatusBadge(inquiry.status as InquiryStatus)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {getTimeAgo(inquiry.createdAt)}
                            </div>
                          </div>

                          {/* Student Info */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span>
                                {inquiry.childName} - Lớp {inquiry.childGrade}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-4 w-4 text-gray-400" />
                              <span>{inquiry.subject}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span>
                                {getDurationText(inquiry.sessionDuration)}/buổi
                              </span>
                            </div>
                          </div>

                          {/* Budget and Schedule */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Ngân sách: </span>
                              <span className="font-medium text-green-600">
                                {formatCurrency(inquiry.budget)}/tháng
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Lịch học: </span>
                              <span className="font-medium">
                                {getScheduleText(inquiry.preferredSchedule)}
                              </span>
                            </div>
                          </div>

                          {/* Message */}
                          <div>
                            <p className="text-gray-700 line-clamp-3">
                              {inquiry.message}
                            </p>
                          </div>

                          {/* Response (if any) */}
                          {inquiry.tutorResponse && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="text-sm font-medium text-blue-900 mb-2">
                                Phản hồi của bạn:
                              </h4>
                              <p className="text-sm text-blue-800">
                                {inquiry.tutorResponse}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                          Liên hệ: {inquiry.parentPhone} | {inquiry.parentEmail}
                        </div>

                        <div className="flex items-center space-x-2">
                          {inquiry.status === "sent" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkAsViewed(inquiry.id)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Đánh dấu đã xem
                            </Button>
                          )}

                          {(inquiry.status === "sent" ||
                            inquiry.status === "viewed") && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  onClick={() => setSelectedInquiry(inquiry)}
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  Phản hồi
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Phản hồi yêu cầu</DialogTitle>
                                  <DialogDescription>
                                    Gửi phản hồi cho {inquiry.parentName} về yêu
                                    cầu dạy {inquiry.subject} cho{" "}
                                    {inquiry.childName}
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-4">
                                  <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-medium mb-2">
                                      Thông tin yêu cầu:
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                      <div>Học sinh: {inquiry.childName}</div>
                                      <div>Môn học: {inquiry.subject}</div>
                                      <div>
                                        Lịch học:{" "}
                                        {getScheduleText(
                                          inquiry.preferredSchedule
                                        )}
                                      </div>
                                      <div>
                                        Ngân sách:{" "}
                                        {formatCurrency(inquiry.budget)}/tháng
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium mb-2">
                                      Tin nhắn phản hồi:
                                    </label>
                                    <Textarea
                                      placeholder="Viết phản hồi của bạn..."
                                      value={response}
                                      onChange={(e) =>
                                        setResponse(e.target.value)
                                      }
                                      rows={5}
                                    />
                                  </div>
                                </div>

                                <DialogFooter>
                                  <Button
                                    variant="outline"
                                    onClick={() => setSelectedInquiry(null)}
                                  >
                                    Hủy
                                  </Button>
                                  <Button
                                    onClick={handleSendResponse}
                                    disabled={!response.trim()}
                                  >
                                    <Send className="h-4 w-4 mr-2" />
                                    Gửi phản hồi
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleArchive(inquiry.id)}
                          >
                            <Archive className="h-4 w-4 mr-2" />
                            Lưu trữ
                          </Button>
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
    </div>
  );
}
