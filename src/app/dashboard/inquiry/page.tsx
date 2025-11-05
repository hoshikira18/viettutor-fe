"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  ArrowLeft,
  Send,
  Clock,
  MapPin,
  User,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useChildrenStore } from "@/stores/childrenStore";
import { Tutor, Child } from "@/types";
import { mockTutors } from "@/lib/mockData";
import { toast } from "sonner";

const inquirySchema = z.object({
  childId: z.string().min(1, "Vui lòng chọn con em"),
  subject: z.string().min(1, "Vui lòng chọn môn học"),
  preferredSchedule: z.string().min(1, "Vui lòng chọn lịch học"),
  sessionDuration: z.string().min(1, "Vui lòng chọn thời gian mỗi buổi"),
  budget: z.string().min(1, "Vui lòng nhập ngân sách"),
  message: z.string().min(10, "Vui lòng nhập ít nhất 10 ký tự"),
  contactPreference: z.enum(["phone", "email", "both"]),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

const SCHEDULE_OPTIONS = [
  { value: "weekday_evening", label: "Tối thứ 2-6 (18:00-21:00)" },
  { value: "weekend_morning", label: "Sáng cuối tuần (8:00-12:00)" },
  { value: "weekend_afternoon", label: "Chiều cuối tuần (14:00-18:00)" },
  { value: "flexible", label: "Linh hoạt theo lịch gia sư" },
  { value: "custom", label: "Thỏa thuận riêng" },
];

const DURATION_OPTIONS = [
  { value: "60", label: "1 giờ" },
  { value: "90", label: "1.5 giờ" },
  { value: "120", label: "2 giờ" },
  { value: "150", label: "2.5 giờ" },
  { value: "180", label: "3 giờ" },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function InquiryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tutorId = searchParams.get("tutorId");
  const { children } = useChildrenStore();

  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      childId: "",
      subject: "",
      preferredSchedule: "",
      sessionDuration: "90",
      budget: "",
      message: "",
      contactPreference: "both",
    },
  });

  useEffect(() => {
    if (tutorId) {
      // Simulate API call
      setTimeout(() => {
        const foundTutor = mockTutors.find((t) => t.id === tutorId);
        setTutor(foundTutor || null);
        setLoading(false);
      }, 300);
    } else {
      setLoading(false);
    }
  }, [tutorId]);

  useEffect(() => {
    // Auto-select if only one child
    if (children.length === 1) {
      form.setValue("childId", children[0].id);
    }
  }, [children, form]);

  const onSubmit = async (data: InquiryFormData) => {
    setSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Inquiry submitted:", {
        tutorId,
        ...data,
        timestamp: new Date().toISOString(),
      });

      toast.success("Yêu cầu đã được gửi thành công!", {
        description: "Gia sư sẽ liên hệ với bạn trong vòng 24 giờ.",
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
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
            Vui lòng quay lại và chọn gia sư khác.
          </p>
          <Button onClick={() => router.push("/dashboard/search")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tìm gia sư
          </Button>
        </div>
      </div>
    );
  }

  if (children.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Chưa có thông tin con em
          </h1>
          <p className="text-gray-600 mb-6">
            Vui lòng thêm thông tin con em trước khi gửi yêu cầu dạy học.
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => router.push("/dashboard/children")}
              className="w-full"
            >
              Thêm thông tin con em
            </Button>
            <Button variant="outline" onClick={() => router.back()}>
              Quay lại
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" onClick={() => router.back()} size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            Gửi yêu cầu dạy học
          </h1>
        </div>

        {/* Tutor Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={tutor.avatar} alt={tutor.name} />
                <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{tutor.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {tutor.district}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {tutor.experience} năm
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.map((subject, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-600">
                  {formatCurrency(tutor.hourlyRate)}/giờ
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inquiry Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Thông tin yêu cầu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Child Selection */}
                <FormField
                  control={form.control}
                  name="childId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Con em cần dạy</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn con em" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {children.map((child: Child) => (
                            <SelectItem key={child.id} value={child.id}>
                              {child.name} - Lớp {child.grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subject Selection */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Môn học cần dạy</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn môn học" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tutor.subjects.map((subject, index) => (
                            <SelectItem key={index} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Schedule Preference */}
                <FormField
                  control={form.control}
                  name="preferredSchedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lịch học mong muốn</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn lịch học" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SCHEDULE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Session Duration */}
                <FormField
                  control={form.control}
                  name="sessionDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thời gian mỗi buổi học</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn thời gian" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DURATION_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Budget */}
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngân sách (VNĐ/tháng)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ví dụ: 2400000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Contact Preference */}
                <FormField
                  control={form.control}
                  name="contactPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phương thức liên hệ</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn cách liên hệ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="phone">Điện thoại</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="both">Cả hai</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ghi chú thêm</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ví dụ: Con em đang gặp khó khăn về phần nào, mục tiêu học tập, yêu cầu đặc biệt..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Đang gửi...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Gửi yêu cầu
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
