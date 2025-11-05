"use client";

import { useState } from "react";

// Type definitions
interface Education {
  id: string;
  degree: string;
  major: string;
  school: string;
  year: string;
  gpa: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Subject {
  id: string;
  subject: string;
  levels: string[];
  formats: string[];
  rate: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  idNumber: string;
  education: Education[];
  experience: Experience[];
  certifications: any[];
  subjects: Subject[];
  bio: string;
  profileImage: File | null;
  idCardImages: File[];
  diplomaImages: File[];
  agreeToTerms: boolean;
  agreeToBackground: boolean;
  preferredContact: string;
}

interface FormErrors {
  [key: string]: string;
}
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
import {
  User,
  GraduationCap,
  BookOpen,
  DollarSign,
  FileText,
  CheckCircle,
  Upload,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  Award,
  Clock,
} from "lucide-react";

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

const TEACHING_LEVELS = [
  "Tiểu học (Lớp 1-5)",
  "THCS (Lớp 6-9)",
  "THPT (Lớp 10-12)",
  "Đại học",
  "Người đi làm",
];

const TEACHING_FORMATS = [
  "Dạy tại nhà học sinh",
  "Dạy tại nhà gia sư",
  "Dạy online",
  "Dạy tại trung tâm",
];

export default function TutorRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Step 1: Personal Information
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    idNumber: "",

    // Step 2: Education & Experience
    education: [],
    experience: [],
    certifications: [],

    // Step 3: Teaching Subjects & Rates
    subjects: [],

    // Step 4: Profile & Documents
    bio: "",
    profileImage: null,
    idCardImages: [],
    diplomaImages: [],

    // Step 5: Terms & Verification
    agreeToTerms: false,
    agreeToBackground: false,
    preferredContact: "both",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const validateStep = (step: number) => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 1:
        if (!formData.fullName) newErrors.fullName = "Vui lòng nhập họ tên";
        if (!formData.email) newErrors.email = "Vui lòng nhập email";
        if (!formData.phone) newErrors.phone = "Vui lòng nhập số điện thoại";
        if (!formData.dateOfBirth)
          newErrors.dateOfBirth = "Vui lòng nhập ngày sinh";
        if (!formData.address) newErrors.address = "Vui lòng nhập địa chỉ";
        if (!formData.idNumber) newErrors.idNumber = "Vui lòng nhập CCCD/CMND";
        break;
      case 2:
        if (formData.education.length === 0)
          newErrors.education = "Vui lòng thêm ít nhất một học vấn";
        break;
      case 3:
        if (formData.subjects.length === 0)
          newErrors.subjects = "Vui lòng chọn ít nhất một môn dạy";
        break;
      case 4:
        if (!formData.bio) newErrors.bio = "Vui lòng viết giới thiệu bản thân";
        if (formData.bio.length < 100)
          newErrors.bio = "Giới thiệu phải có ít nhất 100 ký tự";
        break;
      case 5:
        if (!formData.agreeToTerms)
          newErrors.agreeToTerms = "Vui lòng đồng ý với điều khoản";
        if (!formData.agreeToBackground)
          newErrors.agreeToBackground = "Vui lòng đồng ý kiểm tra lý lịch";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      try {
        // Show loading state
        const submitButton = document.querySelector(
          "[data-submit-button]"
        ) as HTMLButtonElement;
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Đang xử lý...";
        }

        // Prepare registration data
        const registrationData = {
          ...formData,
          submittedAt: new Date().toISOString(),
          registrationId: `VT${Date.now().toString().slice(-8)}`,
          status: "submitted",
        };

        console.log("Submitting registration:", registrationData);

        // TODO: Replace with actual API call
        // const response = await fetch('/api/tutor-registration', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(registrationData),
        // });

        // if (!response.ok) {
        //   throw new Error('Registration failed');
        // }

        // Simulate API call with delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Store registration ID in localStorage for the success page
        localStorage.setItem(
          "tutorRegistrationId",
          registrationData.registrationId
        );
        localStorage.setItem(
          "tutorRegistrationData",
          JSON.stringify(registrationData)
        );

        // Redirect to success page
        window.location.href = "/tutor-registration/success";
      } catch (error) {
        console.error("Registration error:", error);

        // Reset button state
        const submitButton = document.querySelector(
          "[data-submit-button]"
        ) as HTMLButtonElement;
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML =
            '<svg class="h-4 w-4 mr-2"><use href="#check-circle"/></svg>Hoàn tất đăng ký';
        }

        // Show error message
        alert("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.");
      }
    }
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now().toString(),
          degree: "",
          major: "",
          school: "",
          year: "",
          gpa: "",
        },
      ],
    }));
  };

  const removeEducation = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((edu: any) => edu.id !== id),
    }));
  };

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const addSubject = () => {
    setFormData((prev) => ({
      ...prev,
      subjects: [
        ...prev.subjects,
        {
          id: Date.now().toString(),
          subject: "",
          levels: [],
          formats: [],
          rate: "",
        },
      ],
    }));
  };

  const removeSubject = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((sub: any) => sub.id !== id),
    }));
  };

  const updateSubject = (id: string, field: keyof Subject, value: any) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.map((sub) =>
        sub.id === id ? { ...sub, [field]: value } : sub
      ),
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Thông tin cá nhân
              </h2>
              <p className="text-gray-600">
                Vui lòng cung cấp thông tin chính xác để chúng tôi có thể xác
                thực
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Họ và tên *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  placeholder="Nguyễn Văn An"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="nguyen.van.an@email.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+84901234567"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Ngày sinh *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dateOfBirth: e.target.value,
                    }))
                  }
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-600">{errors.dateOfBirth}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Giới tính</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, gender: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber">Số CCCD/CMND *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      idNumber: e.target.value,
                    }))
                  }
                  placeholder="123456789012"
                />
                {errors.idNumber && (
                  <p className="text-sm text-red-600">{errors.idNumber}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
                placeholder="123 Đường ABC, Quận 1, TP. Hồ Chí Minh"
              />
              {errors.address && (
                <p className="text-sm text-red-600">{errors.address}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Học vấn & Kinh nghiệm
              </h2>
              <p className="text-gray-600">
                Thêm thông tin về trình độ học vấn và kinh nghiệm giảng dạy
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Học vấn *</h3>
                  <Button onClick={addEducation} variant="outline">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Thêm học vấn
                  </Button>
                </div>

                {formData.education.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <GraduationCap className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Chưa có thông tin học vấn</p>
                    <Button onClick={addEducation} className="mt-3">
                      Thêm học vấn đầu tiên
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.education.map((edu) => (
                      <Card key={edu.id}>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select
                              value={edu.degree}
                              onValueChange={(value) =>
                                updateEducation(edu.id, "degree", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn bằng cấp" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Trung cấp">
                                  Trung cấp
                                </SelectItem>
                                <SelectItem value="Cao đẳng">
                                  Cao đẳng
                                </SelectItem>
                                <SelectItem value="Cử nhân">Cử nhân</SelectItem>
                                <SelectItem value="Thạc sĩ">Thạc sĩ</SelectItem>
                                <SelectItem value="Tiến sĩ">Tiến sĩ</SelectItem>
                              </SelectContent>
                            </Select>

                            <Input
                              placeholder="Chuyên ngành"
                              value={edu.major}
                              onChange={(e) =>
                                updateEducation(edu.id, "major", e.target.value)
                              }
                            />

                            <Input
                              placeholder="Tên trường"
                              value={edu.school}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  "school",
                                  e.target.value
                                )
                              }
                            />

                            <Input
                              placeholder="Năm tốt nghiệp"
                              value={edu.year}
                              onChange={(e) =>
                                updateEducation(edu.id, "year", e.target.value)
                              }
                            />
                          </div>

                          <div className="flex justify-end mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeEducation(edu.id)}
                            >
                              Xóa
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {errors.education && (
                  <p className="text-sm text-red-600">{errors.education}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Môn học & Mức giá
              </h2>
              <p className="text-gray-600">
                Chọn những môn bạn có thể dạy và mức giá cho từng môn
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Môn học dạy *</h3>
                <Button onClick={addSubject} variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Thêm môn học
                </Button>
              </div>

              {formData.subjects.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Chưa có môn học nào</p>
                  <Button onClick={addSubject} className="mt-3">
                    Thêm môn học đầu tiên
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.subjects.map((subject) => (
                    <Card key={subject.id}>
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Môn học</Label>
                            <Select
                              value={subject.subject}
                              onValueChange={(value) =>
                                updateSubject(subject.id, "subject", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn môn học" />
                              </SelectTrigger>
                              <SelectContent>
                                {SUBJECTS.map((subj) => (
                                  <SelectItem key={subj} value={subj}>
                                    {subj}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Mức giá (VNĐ/buổi)</Label>
                            <Input
                              type="number"
                              placeholder="200000"
                              value={subject.rate}
                              onChange={(e) =>
                                updateSubject(
                                  subject.id,
                                  "rate",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Cấp độ dạy học</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {TEACHING_LEVELS.map((level) => (
                              <div
                                key={level}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`${subject.id}-${level}`}
                                  checked={subject.levels.includes(level)}
                                  onCheckedChange={(checked) => {
                                    const newLevels = checked
                                      ? [...subject.levels, level]
                                      : subject.levels.filter(
                                          (l) => l !== level
                                        );
                                    updateSubject(
                                      subject.id,
                                      "levels",
                                      newLevels
                                    );
                                  }}
                                />
                                <Label
                                  htmlFor={`${subject.id}-${level}`}
                                  className="text-sm"
                                >
                                  {level}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Hình thức dạy học</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {TEACHING_FORMATS.map((format) => (
                              <div
                                key={format}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`${subject.id}-${format}`}
                                  checked={subject.formats.includes(format)}
                                  onCheckedChange={(checked) => {
                                    const newFormats = checked
                                      ? [...subject.formats, format]
                                      : subject.formats.filter(
                                          (f) => f !== format
                                        );
                                    updateSubject(
                                      subject.id,
                                      "formats",
                                      newFormats
                                    );
                                  }}
                                />
                                <Label
                                  htmlFor={`${subject.id}-${format}`}
                                  className="text-sm"
                                >
                                  {format}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeSubject(subject.id)}
                          >
                            Xóa môn học
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {errors.subjects && (
                <p className="text-sm text-red-600">{errors.subjects}</p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Hồ sơ & Tài liệu
              </h2>
              <p className="text-gray-600">
                Tạo hồ sơ cá nhân và tải lên các tài liệu xác thực
              </p>
            </div>

            <div className="space-y-6">
              {/* Profile Image */}
              <div className="space-y-4">
                <Label>Ảnh đại diện</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Chọn ảnh
                    </Button>
                    <p className="text-sm text-gray-600 mt-1">
                      Ảnh chân dung, kích thước tối đa 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Giới thiệu bản thân *</Label>
                <Textarea
                  id="bio"
                  placeholder="Hãy viết về bản thân, kinh nghiệm giảng dạy, phương pháp dạy học và những thành tựu đáng tự hào..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  rows={6}
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{formData.bio.length}/1000 ký tự</span>
                  <span>Tối thiểu 100 ký tự</span>
                </div>
                {errors.bio && (
                  <p className="text-sm text-red-600">{errors.bio}</p>
                )}
              </div>

              {/* Document Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Ảnh CCCD/CMND</h4>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Tải lên ảnh 2 mặt CCCD
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Chọn file
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Bằng cấp</h4>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Tải lên bằng tốt nghiệp
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Chọn file
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Xác nhận & Hoàn tất
              </h2>
              <p className="text-gray-600">
                Xem lại thông tin và hoàn tất đăng ký
              </p>
            </div>

            {/* Registration Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Tóm tắt đăng ký</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Họ tên:
                    </span>
                    <p className="text-sm">{formData.fullName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Email:
                    </span>
                    <p className="text-sm">{formData.email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Số điện thoại:
                    </span>
                    <p className="text-sm">{formData.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Số môn dạy:
                    </span>
                    <p className="text-sm">{formData.subjects.length} môn</p>
                  </div>
                </div>

                {formData.subjects.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Môn học:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {formData.subjects.map((subject, index) => (
                        <Badge key={index} variant="outline">
                          {subject.subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        agreeToTerms: !!checked,
                      }))
                    }
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="agreeToTerms"
                      className="text-sm font-medium cursor-pointer"
                    >
                      Tôi đồng ý với{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Điều khoản sử dụng
                      </a>{" "}
                      và{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Chính sách bảo mật
                      </a>
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToBackground"
                    checked={formData.agreeToBackground}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        agreeToBackground: !!checked,
                      }))
                    }
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="agreeToBackground"
                      className="text-sm font-medium cursor-pointer"
                    >
                      Tôi đồng ý cho VietTutor kiểm tra lý lịch và xác thực
                      thông tin cá nhân
                    </Label>
                  </div>
                </div>

                {(errors.agreeToTerms || errors.agreeToBackground) && (
                  <div className="space-y-1">
                    {errors.agreeToTerms && (
                      <p className="text-sm text-red-600">
                        {errors.agreeToTerms}
                      </p>
                    )}
                    {errors.agreeToBackground && (
                      <p className="text-sm text-red-600">
                        {errors.agreeToBackground}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-900 mb-3">
                  Các bước tiếp theo:
                </h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      Chúng tôi sẽ xem xét hồ sơ trong vòng 1-2 ngày làm việc
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Xác thực thông tin và kiểm tra lý lịch</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4" />
                    <span>
                      Kích hoạt tài khoản và bắt đầu nhận yêu cầu dạy học
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Đăng ký trở thành gia sư
          </h1>
          <p className="text-gray-600 mt-2">
            Gia nhập mạng lưới gia sư chuyên nghiệp của VietTutor
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>
              Bước {currentStep} / {totalSteps}
            </span>
            <span>{Math.round(progress)}% hoàn thành</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>

          <div className="flex space-x-3">
            {currentStep < totalSteps ? (
              <Button onClick={nextStep}>
                Tiếp theo
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
                data-submit-button
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Hoàn tất đăng ký
              </Button>
            )}
          </div>
        </div>

        {/* Benefits Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Xây dựng danh tiếng</h3>
            <p className="text-sm text-gray-600 mt-1">
              Nhận đánh giá từ phụ huynh và xây dựng uy tín
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Thu nhập ổn định</h3>
            <p className="text-sm text-gray-600 mt-1">
              Tự đặt giá và quản lý lịch dạy linh hoạt
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Hỗ trợ toàn diện</h3>
            <p className="text-sm text-gray-600 mt-1">
              Được hỗ trợ 24/7 và bảo vệ quyền lợi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
