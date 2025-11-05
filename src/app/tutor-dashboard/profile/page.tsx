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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  User,
  Camera,
  Award,
  BookOpen,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Save,
  Plus,
  Trash2,
  Star,
  Upload,
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

export default function TutorProfilePage() {
  const [activeTab, setActiveTab] = useState("basic");
  const [profileData, setProfileData] = useState({
    // Basic Info
    fullName: "Nguyễn Văn An",
    email: "nguyen.van.an@email.com",
    phone: "+84901234567",
    dateOfBirth: "1990-05-15",
    gender: "male",
    address: "Quận 1, TP. Hồ Chí Minh",
    bio: "Tôi là giáo viên Toán học với 8 năm kinh nghiệm giảng dạy. Tôi đã từng giảng dạy tại nhiều trường THPT và có kinh nghiệm gia sư cho học sinh từ lớp 6 đến lớp 12. Tôi luôn tận tâm với nghề và mong muốn giúp các em học sinh đạt được kết quả tốt nhất.",

    // Education
    education: [
      {
        id: "1",
        degree: "Cử nhân",
        major: "Toán học",
        school: "Đại học Khoa học Tự nhiên",
        year: "2012",
        gpa: "3.8",
      },
      {
        id: "2",
        degree: "Thạc sĩ",
        major: "Phương pháp dạy Toán",
        school: "Đại học Sư phạm TP.HCM",
        year: "2015",
        gpa: "3.9",
      },
    ],

    // Experience
    experience: [
      {
        id: "1",
        position: "Giáo viên Toán",
        company: "THPT Nguyễn Du",
        startDate: "2016-09",
        endDate: "2020-06",
        description:
          "Giảng dạy Toán học cho các lớp 10, 11, 12. Phụ trách bồi dưỡng học sinh giỏi.",
      },
      {
        id: "2",
        position: "Gia sư tự do",
        company: "Tự do",
        startDate: "2020-07",
        endDate: "present",
        description:
          "Dạy kèm Toán học cho học sinh THCS và THPT. Đã giúp hơn 50 học sinh cải thiện điểm số đáng kể.",
      },
    ],

    // Subjects & Rates
    subjects: [
      {
        id: "1",
        subject: "Toán học",
        levels: ["THCS (Lớp 6-9)", "THPT (Lớp 10-12)"],
        formats: ["Dạy tại nhà học sinh", "Dạy tại nhà gia sư", "Dạy online"],
        rate: "300000",
      },
      {
        id: "2",
        subject: "Vật lý",
        levels: ["THPT (Lớp 10-12)"],
        formats: ["Dạy tại nhà học sinh", "Dạy online"],
        rate: "250000",
      },
    ],

    // Settings
    isActive: true,
    isVerified: true,
    autoAcceptInquiries: false,
    maxStudents: "10",
    responseTime: "24",
  });

  const [newEducation, setNewEducation] = useState({
    degree: "",
    major: "",
    school: "",
    year: "",
    gpa: "",
  });

  const [newExperience, setNewExperience] = useState({
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [newSubject, setNewSubject] = useState({
    subject: "",
    levels: [] as string[],
    formats: [] as string[],
    rate: "",
  });

  const handleSave = () => {
    // TODO: Save profile data to store/database
    console.log("Saving profile data:", profileData);
  };

  const handleAddEducation = () => {
    if (!newEducation.degree || !newEducation.major || !newEducation.school)
      return;

    const education = {
      ...newEducation,
      id: Date.now().toString(),
    };

    setProfileData((prev) => ({
      ...prev,
      education: [...prev.education, education],
    }));

    setNewEducation({
      degree: "",
      major: "",
      school: "",
      year: "",
      gpa: "",
    });
  };

  const handleRemoveEducation = (id: string) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const handleAddExperience = () => {
    if (
      !newExperience.position ||
      !newExperience.company ||
      !newExperience.startDate
    )
      return;

    const experience = {
      ...newExperience,
      id: Date.now().toString(),
    };

    setProfileData((prev) => ({
      ...prev,
      experience: [...prev.experience, experience],
    }));

    setNewExperience({
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleRemoveExperience = (id: string) => {
    setProfileData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const handleAddSubject = () => {
    if (
      !newSubject.subject ||
      newSubject.levels.length === 0 ||
      !newSubject.rate
    )
      return;

    const subject = {
      ...newSubject,
      id: Date.now().toString(),
    };

    setProfileData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, subject],
    }));

    setNewSubject({
      subject: "",
      levels: [],
      formats: [],
      rate: "",
    });
  };

  const handleRemoveSubject = (id: string) => {
    setProfileData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((sub) => sub.id !== id),
    }));
  };

  const formatCurrency = (amount: string) => {
    if (!amount) return "";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(parseInt(amount));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hồ sơ gia sư</h1>
          <p className="text-gray-600 mt-1">
            Quản lý thông tin cá nhân và hồ sơ nghề nghiệp
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Badge variant={profileData.isVerified ? "default" : "secondary"}>
            {profileData.isVerified ? "Đã xác thực" : "Chưa xác thực"}
          </Badge>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value="education">Học vấn & Kinh nghiệm</TabsTrigger>
          <TabsTrigger value="subjects">Môn học & Giá</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h3 className="font-medium">Ảnh đại diện</h3>
                  <p className="text-sm text-gray-600">
                    Tải lên ảnh đại diện chất lượng cao
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Chọn ảnh
                  </Button>
                </div>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên *</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        dateOfBirth: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Giới tính</Label>
                  <Select
                    value={profileData.gender}
                    onValueChange={(value) =>
                      setProfileData((prev) => ({ ...prev, gender: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Giới thiệu bản thân *</Label>
                <Textarea
                  id="bio"
                  placeholder="Viết giới thiệu về bản thân, kinh nghiệm, phương pháp dạy học..."
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  rows={5}
                />
                <p className="text-sm text-gray-600">
                  {profileData.bio.length}/500 ký tự
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education & Experience */}
        <TabsContent value="education" className="space-y-6">
          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Học vấn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.education.map((edu) => (
                <div key={edu.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">
                        {edu.degree} - {edu.major}
                      </h4>
                      <p className="text-gray-600">{edu.school}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>Năm tốt nghiệp: {edu.year}</span>
                        {edu.gpa && <span>GPA: {edu.gpa}/4.0</span>}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveEducation(edu.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Add Education Form */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <h4 className="font-medium mb-4">Thêm học vấn mới</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    value={newEducation.degree}
                    onValueChange={(value) =>
                      setNewEducation((prev) => ({ ...prev, degree: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn bằng cấp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Trung cấp">Trung cấp</SelectItem>
                      <SelectItem value="Cao đẳng">Cao đẳng</SelectItem>
                      <SelectItem value="Cử nhân">Cử nhân</SelectItem>
                      <SelectItem value="Thạc sĩ">Thạc sĩ</SelectItem>
                      <SelectItem value="Tiến sĩ">Tiến sĩ</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Chuyên ngành"
                    value={newEducation.major}
                    onChange={(e) =>
                      setNewEducation((prev) => ({
                        ...prev,
                        major: e.target.value,
                      }))
                    }
                  />

                  <Input
                    placeholder="Tên trường"
                    value={newEducation.school}
                    onChange={(e) =>
                      setNewEducation((prev) => ({
                        ...prev,
                        school: e.target.value,
                      }))
                    }
                  />

                  <Input
                    placeholder="Năm tốt nghiệp"
                    value={newEducation.year}
                    onChange={(e) =>
                      setNewEducation((prev) => ({
                        ...prev,
                        year: e.target.value,
                      }))
                    }
                  />

                  <Input
                    placeholder="GPA (tùy chọn)"
                    value={newEducation.gpa}
                    onChange={(e) =>
                      setNewEducation((prev) => ({
                        ...prev,
                        gpa: e.target.value,
                      }))
                    }
                  />
                </div>

                <Button onClick={handleAddEducation} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm học vấn
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Kinh nghiệm làm việc
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.experience.map((exp) => (
                <div key={exp.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{exp.position}</h4>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {exp.startDate} -{" "}
                        {exp.endDate === "present" ? "Hiện tại" : exp.endDate}
                      </p>
                      {exp.description && (
                        <p className="text-sm text-gray-700 mt-2">
                          {exp.description}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveExperience(exp.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Add Experience Form */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <h4 className="font-medium mb-4">Thêm kinh nghiệm mới</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Vị trí công việc"
                    value={newExperience.position}
                    onChange={(e) =>
                      setNewExperience((prev) => ({
                        ...prev,
                        position: e.target.value,
                      }))
                    }
                  />

                  <Input
                    placeholder="Công ty/Tổ chức"
                    value={newExperience.company}
                    onChange={(e) =>
                      setNewExperience((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                  />

                  <Input
                    type="month"
                    placeholder="Từ tháng"
                    value={newExperience.startDate}
                    onChange={(e) =>
                      setNewExperience((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                  />

                  <Input
                    type="month"
                    placeholder="Đến tháng (để trống nếu hiện tại)"
                    value={newExperience.endDate}
                    onChange={(e) =>
                      setNewExperience((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                  />
                </div>

                <Textarea
                  placeholder="Mô tả công việc"
                  value={newExperience.description}
                  onChange={(e) =>
                    setNewExperience((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="mt-4"
                />

                <Button onClick={handleAddExperience} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm kinh nghiệm
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subjects & Rates */}
        <TabsContent value="subjects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Môn học & Mức giá
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-lg">
                          {subject.subject}
                        </h4>
                        <Badge variant="outline">
                          {formatCurrency(subject.rate)}/buổi
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-600">
                            Cấp độ:{" "}
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {subject.levels.map((level, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {level}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-sm font-medium text-gray-600">
                            Hình thức:{" "}
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {subject.formats.map((format, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {format}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveSubject(subject.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Add Subject Form */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <h4 className="font-medium mb-4">Thêm môn học mới</h4>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Môn học</Label>
                      <Select
                        value={newSubject.subject}
                        onValueChange={(value) =>
                          setNewSubject((prev) => ({ ...prev, subject: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn môn học" />
                        </SelectTrigger>
                        <SelectContent>
                          {SUBJECTS.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
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
                        value={newSubject.rate}
                        onChange={(e) =>
                          setNewSubject((prev) => ({
                            ...prev,
                            rate: e.target.value,
                          }))
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
                            id={level}
                            checked={newSubject.levels.includes(level)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewSubject((prev) => ({
                                  ...prev,
                                  levels: [...prev.levels, level],
                                }));
                              } else {
                                setNewSubject((prev) => ({
                                  ...prev,
                                  levels: prev.levels.filter(
                                    (l) => l !== level
                                  ),
                                }));
                              }
                            }}
                          />
                          <Label htmlFor={level} className="text-sm">
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
                            id={format}
                            checked={newSubject.formats.includes(format)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewSubject((prev) => ({
                                  ...prev,
                                  formats: [...prev.formats, format],
                                }));
                              } else {
                                setNewSubject((prev) => ({
                                  ...prev,
                                  formats: prev.formats.filter(
                                    (f) => f !== format
                                  ),
                                }));
                              }
                            }}
                          />
                          <Label htmlFor={format} className="text-sm">
                            {format}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleAddSubject}
                  className="mt-4"
                  disabled={
                    !newSubject.subject ||
                    newSubject.levels.length === 0 ||
                    !newSubject.rate
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm môn học
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt tài khoản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Kích hoạt hồ sơ</h4>
                  <p className="text-sm text-gray-600">
                    Cho phép phụ huynh tìm thấy và liên hệ với bạn
                  </p>
                </div>
                <Switch
                  checked={profileData.isActive}
                  onCheckedChange={(checked) =>
                    setProfileData((prev) => ({ ...prev, isActive: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Tự động chấp nhận yêu cầu</h4>
                  <p className="text-sm text-gray-600">
                    Tự động chấp nhận các yêu cầu phù hợp
                  </p>
                </div>
                <Switch
                  checked={profileData.autoAcceptInquiries}
                  onCheckedChange={(checked) =>
                    setProfileData((prev) => ({
                      ...prev,
                      autoAcceptInquiries: checked,
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maxStudents">Số học sinh tối đa</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={profileData.maxStudents}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        maxStudents: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responseTime">Thời gian phản hồi (giờ)</Label>
                  <Select
                    value={profileData.responseTime}
                    onValueChange={(value) =>
                      setProfileData((prev) => ({
                        ...prev,
                        responseTime: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 giờ</SelectItem>
                      <SelectItem value="2">2 giờ</SelectItem>
                      <SelectItem value="4">4 giờ</SelectItem>
                      <SelectItem value="8">8 giờ</SelectItem>
                      <SelectItem value="24">24 giờ</SelectItem>
                      <SelectItem value="48">48 giờ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
