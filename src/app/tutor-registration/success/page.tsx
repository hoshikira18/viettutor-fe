"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  Shield,
  Award,
  Mail,
  Phone,
  Home,
  ArrowRight,
  Star,
  Users,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export default function TutorRegistrationSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Đăng ký thành công!
          </h1>
          <p className="text-lg text-gray-600">
            Cảm ơn bạn đã đăng ký trở thành gia sư trên VietTutor
          </p>
        </div>

        {/* Registration ID */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-blue-900 mb-2">
              Mã đăng ký của bạn
            </h3>
            <div className="text-2xl font-mono font-bold text-blue-700 bg-white rounded-lg py-3 px-6 inline-block">
              #VT{Date.now().toString().slice(-8)}
            </div>
            <p className="text-sm text-blue-700 mt-2">
              Vui lòng lưu lại mã này để tra cứu trạng thái đăng ký
            </p>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Các bước tiếp theo
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    1. Xem xét hồ sơ
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Chúng tôi sẽ xem xét hồ sơ của bạn trong vòng{" "}
                    <strong>1-2 ngày làm việc</strong>. Bạn sẽ nhận được email
                    thông báo về kết quả.
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    Đang xử lý
                  </Badge>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    2. Xác thực thông tin
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Chúng tôi sẽ liên hệ để xác thực thông tin cá nhân và kiểm
                    tra các tài liệu bạn đã tải lên.
                  </p>
                  <Badge variant="outline" className="mt-2">
                    Sắp diễn ra
                  </Badge>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                  <Award className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    3. Kích hoạt tài khoản
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Sau khi được duyệt, tài khoản của bạn sẽ được kích hoạt và
                    bạn có thể bắt đầu nhận yêu cầu dạy học.
                  </p>
                  <Badge variant="outline" className="mt-2">
                    Chờ duyệt
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Thông tin liên hệ
            </h2>
            <p className="text-gray-600 mb-4">
              Nếu bạn có bất kỳ câu hỏi nào về quá trình đăng ký, vui lòng liên
              hệ với chúng tôi:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Email hỗ trợ</p>
                  <a
                    href="mailto:support@viettutor.vn"
                    className="text-blue-600 hover:underline"
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
                    className="text-blue-600 hover:underline"
                  >
                    +84 901 234 567
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips for Success */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Mẹo để thành công
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Hoàn thiện hồ sơ</h4>
                    <p className="text-sm text-gray-600">
                      Hồ sơ chi tiết giúp phụ huynh tin tưởng và chọn bạn
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Phản hồi nhanh chóng</h4>
                    <p className="text-sm text-gray-600">
                      Trả lời yêu cầu trong vòng 24 giờ để tăng cơ hội được chọn
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <BookOpen className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Chuẩn bị bài giảng</h4>
                    <p className="text-sm text-gray-600">
                      Đầu tư vào chất lượng giảng dạy để nhận đánh giá tốt
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Tuân thủ quy định</h4>
                    <p className="text-sm text-gray-600">
                      Đọc kỹ và tuân thủ các quy định của nền tảng
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              <Home className="h-4 w-4 mr-2" />
              Về trang chủ
            </Button>
          </Link>

          <Link href="/tutor-registration/status">
            <Button className="w-full sm:w-auto">
              Kiểm tra trạng thái
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Gia nhập cộng đồng <strong>1,500+</strong> gia sư chuyên nghiệp trên
            VietTutor
          </p>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1,500+</div>
              <div>Gia sư</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">5,000+</div>
              <div>Học sinh</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4.8</div>
              <div>Đánh giá TB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
