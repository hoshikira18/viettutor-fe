"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  FileText,
  Phone,
  Mail,
  Calendar,
  User,
  Shield,
  Award,
} from "lucide-react";

// Mock status data
const mockStatusData = {
  VT12345678: {
    id: "VT12345678",
    fullName: "Nguyễn Văn An",
    email: "nguyen.van.an@email.com",
    phone: "+84901234567",
    submittedAt: "2024-11-03T10:30:00",
    status: "under_review",
    currentStep: "document_verification",
    timeline: [
      {
        step: "application_submitted",
        title: "Hồ sơ đã được gửi",
        description: "Hồ sơ đăng ký của bạn đã được tiếp nhận",
        completedAt: "2024-11-03T10:30:00",
        status: "completed",
      },
      {
        step: "initial_review",
        title: "Xem xét ban đầu",
        description: "Kiểm tra tính đầy đủ của hồ sơ",
        completedAt: "2024-11-03T14:20:00",
        status: "completed",
      },
      {
        step: "document_verification",
        title: "Xác thực tài liệu",
        description: "Đang xác thực các tài liệu đính kèm",
        completedAt: null,
        status: "in_progress",
        estimatedCompletion: "2024-11-05T17:00:00",
      },
      {
        step: "background_check",
        title: "Kiểm tra lý lịch",
        description: "Kiểm tra thông tin cá nhân và lý lịch",
        completedAt: null,
        status: "pending",
      },
      {
        step: "final_approval",
        title: "Phê duyệt cuối cùng",
        description: "Xem xét cuối cùng và kích hoạt tài khoản",
        completedAt: null,
        status: "pending",
      },
    ],
    notes: [
      {
        id: "1",
        message:
          "Hồ sơ của bạn đang được xem xét. Chúng tôi sẽ cập nhật trong 24 giờ tới.",
        createdAt: "2024-11-04T09:15:00",
        type: "info",
      },
    ],
    requiredActions: [],
  },
  VT87654321: {
    id: "VT87654321",
    fullName: "Trần Thị Mai",
    email: "tran.thi.mai@email.com",
    phone: "+84912345678",
    submittedAt: "2024-11-01T15:45:00",
    status: "approved",
    currentStep: "final_approval",
    timeline: [
      {
        step: "application_submitted",
        title: "Hồ sơ đã được gửi",
        description: "Hồ sơ đăng ký của bạn đã được tiếp nhận",
        completedAt: "2024-11-01T15:45:00",
        status: "completed",
      },
      {
        step: "initial_review",
        title: "Xem xét ban đầu",
        description: "Kiểm tra tính đầy đủ của hồ sơ",
        completedAt: "2024-11-02T10:30:00",
        status: "completed",
      },
      {
        step: "document_verification",
        title: "Xác thực tài liệu",
        description: "Đã xác thực các tài liệu đính kèm",
        completedAt: "2024-11-03T16:20:00",
        status: "completed",
      },
      {
        step: "background_check",
        title: "Kiểm tra lý lịch",
        description: "Đã hoàn thành kiểm tra lý lịch",
        completedAt: "2024-11-04T11:00:00",
        status: "completed",
      },
      {
        step: "final_approval",
        title: "Phê duyệt cuối cùng",
        description: "Hồ sơ đã được phê duyệt",
        completedAt: "2024-11-04T16:30:00",
        status: "completed",
      },
    ],
    notes: [
      {
        id: "1",
        message:
          "Chúc mừng! Hồ sơ của bạn đã được phê duyệt. Thông tin đăng nhập đã được gửi qua email.",
        createdAt: "2024-11-04T16:35:00",
        type: "success",
      },
    ],
    requiredActions: [],
  },
  VT11111111: {
    id: "VT11111111",
    fullName: "Lê Văn Bình",
    email: "le.van.binh@email.com",
    phone: "+84923456789",
    submittedAt: "2024-10-30T09:20:00",
    status: "action_required",
    currentStep: "document_verification",
    timeline: [
      {
        step: "application_submitted",
        title: "Hồ sơ đã được gửi",
        description: "Hồ sơ đăng ký của bạn đã được tiếp nhận",
        completedAt: "2024-10-30T09:20:00",
        status: "completed",
      },
      {
        step: "initial_review",
        title: "Xem xét ban đầu",
        description: "Kiểm tra tính đầy đủ của hồ sơ",
        completedAt: "2024-10-31T14:15:00",
        status: "completed",
      },
      {
        step: "document_verification",
        title: "Xác thực tài liệu",
        description: "Cần bổ sung tài liệu",
        completedAt: null,
        status: "action_required",
      },
    ],
    notes: [
      {
        id: "1",
        message:
          "Chúng tôi cần bạn cung cấp thêm bản sao bằng tốt nghiệp có công chứng.",
        createdAt: "2024-11-01T10:30:00",
        type: "warning",
      },
    ],
    requiredActions: [
      {
        id: "1",
        title: "Bổ sung bằng tốt nghiệp",
        description: "Vui lòng tải lên bản sao bằng tốt nghiệp có công chứng",
        dueDate: "2024-11-08T23:59:59",
        type: "document",
      },
    ],
  },
};

export default function TutorRegistrationStatusPage() {
  const [searchId, setSearchId] = useState("");
  const [statusData, setStatusData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setError("Vui lòng nhập mã đăng ký");
      return;
    }

    setIsSearching(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      const data = mockStatusData[searchId as keyof typeof mockStatusData];
      if (data) {
        setStatusData(data);
        setError("");
      } else {
        setStatusData(null);
        setError("Không tìm thấy thông tin với mã đăng ký này");
      }
      setIsSearching(false);
    }, 1000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "under_review":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 border-yellow-300"
          >
            Đang xem xét
          </Badge>
        );
      case "approved":
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 border-green-300"
          >
            Đã phê duyệt
          </Badge>
        );
      case "rejected":
        return <Badge variant="destructive">Bị từ chối</Badge>;
      case "action_required":
        return (
          <Badge
            variant="destructive"
            className="bg-orange-100 text-orange-800 border-orange-300"
          >
            Cần hành động
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-600" />;
      case "action_required":
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      default:
        return (
          <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
        );
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-500";
      case "in_progress":
        return "border-blue-500";
      case "action_required":
        return "border-orange-500";
      default:
        return "border-gray-300";
    }
  };

  const getNoteIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <FileText className="h-5 w-5 text-blue-600" />;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeAgo = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Kiểm tra trạng thái đăng ký
          </h1>
          <p className="text-gray-600 mt-2">
            Nhập mã đăng ký để xem tiến độ xét duyệt hồ sơ gia sư
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="searchId" className="sr-only">
                  Mã đăng ký
                </Label>
                <Input
                  id="searchId"
                  placeholder="Nhập mã đăng ký (VD: VT12345678)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching}>
                <Search className="h-4 w-4 mr-2" />
                {isSearching ? "Đang tìm..." : "Kiểm tra"}
              </Button>
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </CardContent>
        </Card>

        {/* Demo IDs */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-medium text-blue-900 mb-2">
              Mã demo để thử nghiệm:
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSearchId("VT12345678")}
                className="text-sm bg-white text-blue-700 px-3 py-1 rounded border hover:bg-blue-50"
              >
                VT12345678 (Đang xem xét)
              </button>
              <button
                onClick={() => setSearchId("VT87654321")}
                className="text-sm bg-white text-blue-700 px-3 py-1 rounded border hover:bg-blue-50"
              >
                VT87654321 (Đã phê duyệt)
              </button>
              <button
                onClick={() => setSearchId("VT11111111")}
                className="text-sm bg-white text-blue-700 px-3 py-1 rounded border hover:bg-blue-50"
              >
                VT11111111 (Cần hành động)
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Status Results */}
        {statusData && (
          <div className="space-y-6">
            {/* Application Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Thông tin đăng ký
                  </CardTitle>
                  {getStatusBadge(statusData.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Mã đăng ký:
                    </span>
                    <p className="font-mono">{statusData.id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Họ tên:
                    </span>
                    <p>{statusData.fullName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Email:
                    </span>
                    <p>{statusData.email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Ngày nộp:
                    </span>
                    <p>{formatDate(statusData.submittedAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Required Actions */}
            {statusData.requiredActions.length > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-900">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Cần thực hiện
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {statusData.requiredActions.map((action: any) => (
                      <div
                        key={action.id}
                        className="bg-white rounded-lg p-4 border border-orange-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-orange-900">
                              {action.title}
                            </h4>
                            <p className="text-sm text-orange-700 mt-1">
                              {action.description}
                            </p>
                            <div className="flex items-center space-x-2 mt-2 text-sm text-orange-600">
                              <Calendar className="h-4 w-4" />
                              <span>Hạn: {formatDate(action.dueDate)}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Thực hiện
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Tiến độ xét duyệt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {statusData.timeline.map((step: any, index: number) => (
                    <div key={step.step} className="relative">
                      {index < statusData.timeline.length - 1 && (
                        <div
                          className={`absolute left-2.5 top-10 w-0.5 h-16 ${getStepColor(
                            step.status
                          )}`}
                        />
                      )}

                      <div className="flex items-start space-x-4">
                        <div className="shrink-0">
                          {getStepIcon(step.status)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">
                              {step.title}
                            </h4>
                            {step.completedAt && (
                              <span className="text-sm text-gray-500">
                                {getTimeAgo(step.completedAt)}
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-gray-600 mt-1">
                            {step.description}
                          </p>

                          {step.status === "in_progress" &&
                            step.estimatedCompletion && (
                              <div className="flex items-center space-x-2 mt-2 text-sm text-blue-600">
                                <Clock className="h-4 w-4" />
                                <span>
                                  Dự kiến hoàn thành:{" "}
                                  {formatDate(step.estimatedCompletion)}
                                </span>
                              </div>
                            )}

                          {step.completedAt && (
                            <p className="text-sm text-gray-500 mt-1">
                              Hoàn thành: {formatDate(step.completedAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes and Updates */}
            {statusData.notes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Ghi chú và cập nhật
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {statusData.notes.map((note: any) => (
                      <div
                        key={note.id}
                        className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="shrink-0">{getNoteIcon(note.type)}</div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">
                            {note.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(note.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Support */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Cần hỗ trợ?
                </h3>
                <p className="text-gray-600 mb-4">
                  Nếu bạn có thắc mắc về quá trình đăng ký, vui lòng liên hệ với
                  chúng tôi:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Email hỗ trợ</p>
                      <a
                        href="mailto:support@viettutor.vn"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        support@viettutor.vn
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Hotline</p>
                      <a
                        href="tel:+84901234567"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        +84 901 234 567
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
