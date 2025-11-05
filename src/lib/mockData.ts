import { Tutor, SUBJECTS, DISTRICTS } from "@/types";

// Mock tutor data for development and testing
export const mockTutors: Tutor[] = [
  {
    id: "tutor-1",
    email: "nguyen.van.a@email.com",
    name: "Nguyễn Văn An",
    phone: "+84901234567",
    avatar: "",
    role: "tutor",
    bio: "Giáo viên Toán với 8 năm kinh nghiệm, chuyên dạy học sinh THPT và luyện thi đại học. Phương pháp dạy sinh động, dễ hiểu.",
    subjects: ["Toán học", "Vật lý"],
    hourlyRate: 300000,
    district: "Cầu Giấy",
    availability: {
      monday: { startTime: "18:00", endTime: "21:00", isAvailable: true },
      tuesday: { startTime: "18:00", endTime: "21:00", isAvailable: true },
      wednesday: { startTime: "18:00", endTime: "21:00", isAvailable: true },
      thursday: { startTime: "18:00", endTime: "21:00", isAvailable: true },
      friday: { startTime: "18:00", endTime: "21:00", isAvailable: true },
      saturday: { startTime: "08:00", endTime: "17:00", isAvailable: true },
      sunday: { startTime: "08:00", endTime: "17:00", isAvailable: true },
    },
    qualifications: [
      {
        id: "qual-1",
        type: "degree",
        title: "Cử nhân Toán học",
        institution: "Đại học Bách khoa Hà Nội",
        year: 2016,
        verificationStatus: "verified",
      },
    ],
    experience: 8,
    rating: 4.8,
    reviewCount: 127,
    verificationStatus: {
      identity: "verified",
      qualifications: "verified",
      background: "verified",
      overall: "verified",
    },
    isOnline: true,
    languages: ["Tiếng Việt", "English"],
    teachingStyle: "Tương tác, thực hành nhiều",
    specializations: ["Luyện thi đại học", "Toán THPT"],
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "tutor-2",
    email: "tran.thi.b@email.com",
    name: "Trần Thị Bích",
    phone: "+84902345678",
    avatar: "",
    role: "tutor",
    bio: "Gia sư Tiếng Anh có kinh nghiệm 5 năm, từng sống và làm việc tại Mỹ. Chuyên cải thiện khả năng giao tiếp và luyện thi IELTS.",
    subjects: ["Tiếng Anh"],
    hourlyRate: 250000,
    district: "Ba Đình",
    availability: {
      monday: { startTime: "19:00", endTime: "22:00", isAvailable: true },
      tuesday: { startTime: "19:00", endTime: "22:00", isAvailable: true },
      wednesday: { startTime: "19:00", endTime: "22:00", isAvailable: true },
      thursday: { startTime: "19:00", endTime: "22:00", isAvailable: false },
      friday: { startTime: "19:00", endTime: "22:00", isAvailable: true },
      saturday: { startTime: "09:00", endTime: "18:00", isAvailable: true },
      sunday: { startTime: "09:00", endTime: "18:00", isAvailable: false },
    },
    qualifications: [
      {
        id: "qual-2",
        type: "certificate",
        title: "IELTS 8.5",
        institution: "British Council",
        year: 2020,
        verificationStatus: "verified",
      },
    ],
    experience: 5,
    rating: 4.9,
    reviewCount: 89,
    verificationStatus: {
      identity: "verified",
      qualifications: "verified",
      background: "verified",
      overall: "verified",
    },
    isOnline: true,
    languages: ["Tiếng Việt", "English"],
    teachingStyle: "Giao tiếp thực tế, luyện phản xạ",
    specializations: ["IELTS", "Giao tiếp"],
    createdAt: new Date("2023-03-20"),
    updatedAt: new Date("2024-11-02"),
  },
  {
    id: "tutor-3",
    email: "le.van.c@email.com",
    name: "Lê Văn Cường",
    phone: "+84903456789",
    avatar: "",
    role: "tutor",
    bio: "Sinh viên năm cuối ngành Hóa học, Đại học Quốc gia Hà Nội. Có passion với môn Hóa và kinh nghiệm dạy kèm 3 năm.",
    subjects: ["Hóa học", "Sinh học"],
    hourlyRate: 180000,
    district: "Đống Đa",
    availability: {
      monday: { startTime: "18:30", endTime: "21:30", isAvailable: true },
      tuesday: { startTime: "18:30", endTime: "21:30", isAvailable: true },
      wednesday: { startTime: "18:30", endTime: "21:30", isAvailable: false },
      thursday: { startTime: "18:30", endTime: "21:30", isAvailable: true },
      friday: { startTime: "18:30", endTime: "21:30", isAvailable: true },
      saturday: { startTime: "14:00", endTime: "18:00", isAvailable: true },
      sunday: { startTime: "14:00", endTime: "18:00", isAvailable: true },
    },
    qualifications: [
      {
        id: "qual-3",
        type: "degree",
        title: "Sinh viên Hóa học năm 4",
        institution: "Đại học Quốc gia Hà Nội",
        year: 2025,
        verificationStatus: "verified",
      },
    ],
    experience: 3,
    rating: 4.6,
    reviewCount: 42,
    verificationStatus: {
      identity: "verified",
      qualifications: "verified",
      background: "pending",
      overall: "verified",
    },
    isOnline: true,
    languages: ["Tiếng Việt"],
    teachingStyle: "Thí nghiệm thực hành, học qua ví dụ",
    specializations: ["Hóa THPT", "Hóa đại cương"],
    createdAt: new Date("2023-08-10"),
    updatedAt: new Date("2024-10-28"),
  },
  {
    id: "tutor-4",
    email: "pham.thi.d@email.com",
    name: "Phạm Thị Dung",
    phone: "+84904567890",
    avatar: "",
    role: "tutor",
    bio: "Kỹ sư phần mềm với 10 năm kinh nghiệm, hiện đang làm tại một công ty công nghệ lớn. Dạy lập trình từ cơ bản đến nâng cao.",
    subjects: ["Tin học", "Lập trình"],
    hourlyRate: 450000,
    district: "Thanh Xuân",
    availability: {
      monday: { startTime: "19:00", endTime: "22:00", isAvailable: false },
      tuesday: { startTime: "19:00", endTime: "22:00", isAvailable: true },
      wednesday: { startTime: "19:00", endTime: "22:00", isAvailable: true },
      thursday: { startTime: "19:00", endTime: "22:00", isAvailable: false },
      friday: { startTime: "19:00", endTime: "22:00", isAvailable: true },
      saturday: { startTime: "09:00", endTime: "17:00", isAvailable: true },
      sunday: { startTime: "09:00", endTime: "17:00", isAvailable: true },
    },
    qualifications: [
      {
        id: "qual-4",
        type: "degree",
        title: "Cử nhân Khoa học máy tính",
        institution: "Đại học Bách khoa Hà Nội",
        year: 2014,
        verificationStatus: "verified",
      },
    ],
    experience: 10,
    rating: 4.7,
    reviewCount: 156,
    verificationStatus: {
      identity: "verified",
      qualifications: "verified",
      background: "verified",
      overall: "verified",
    },
    isOnline: false,
    languages: ["Tiếng Việt", "English"],
    teachingStyle: "Thực hành dự án, học qua làm",
    specializations: ["Python", "Web Development", "Mobile App"],
    createdAt: new Date("2023-02-05"),
    updatedAt: new Date("2024-10-30"),
  },
  {
    id: "tutor-5",
    email: "hoang.van.e@email.com",
    name: "Hoàng Văn Ên",
    phone: "+84905678901",
    avatar: "",
    role: "tutor",
    bio: "Thạc sĩ Văn học, giảng viên tại trường Đại học Sư phạm Hà Nội. Chuyên dạy Ngữ văn các cấp và luyện thi đại học khối C.",
    subjects: ["Tiếng Việt", "Lịch sử"],
    hourlyRate: 220000,
    district: "Hoàn Kiếm",
    availability: {
      monday: { startTime: "18:00", endTime: "21:00", isAvailable: true },
      tuesday: { startTime: "18:00", endTime: "21:00", isAvailable: true },
      wednesday: { startTime: "18:00", endTime: "21:00", isAvailable: true },
      thursday: { startTime: "18:00", endTime: "21:00", isAvailable: true },
      friday: { startTime: "18:00", endTime: "21:00", isAvailable: false },
      saturday: { startTime: "08:00", endTime: "12:00", isAvailable: true },
      sunday: { startTime: "08:00", endTime: "12:00", isAvailable: true },
    },
    qualifications: [
      {
        id: "qual-5",
        type: "degree",
        title: "Thạc sĩ Văn học Việt Nam",
        institution: "Đại học Sư phạm Hà Nội",
        year: 2018,
        verificationStatus: "verified",
      },
    ],
    experience: 12,
    rating: 4.9,
    reviewCount: 203,
    verificationStatus: {
      identity: "verified",
      qualifications: "verified",
      background: "verified",
      overall: "verified",
    },
    isOnline: true,
    languages: ["Tiếng Việt"],
    teachingStyle: "Phân tích văn bản, rèn luyện tư duy",
    specializations: ["Luyện thi đại học", "Văn THPT"],
    createdAt: new Date("2022-12-01"),
    updatedAt: new Date("2024-11-03"),
  },
  {
    id: "tutor-6",
    email: "nguyen.thi.f@email.com",
    name: "Nguyễn Thị Phượng",
    phone: "+84906789012",
    avatar: "",
    role: "tutor",
    bio: "Cử nhân Địa lý, giáo viên trung học với 6 năm kinh nghiệm. Phương pháp dạy sáng tạo, kết hợp thực tế với lý thuyết.",
    subjects: ["Địa lý", "Lịch sử"],
    hourlyRate: 200000,
    district: "Long Biên",
    availability: {
      monday: { startTime: "17:30", endTime: "20:30", isAvailable: true },
      tuesday: { startTime: "17:30", endTime: "20:30", isAvailable: true },
      wednesday: { startTime: "17:30", endTime: "20:30", isAvailable: true },
      thursday: { startTime: "17:30", endTime: "20:30", isAvailable: true },
      friday: { startTime: "17:30", endTime: "20:30", isAvailable: true },
      saturday: { startTime: "08:00", endTime: "16:00", isAvailable: true },
      sunday: { startTime: "08:00", endTime: "16:00", isAvailable: false },
    },
    qualifications: [
      {
        id: "qual-6",
        type: "degree",
        title: "Cử nhân Địa lý",
        institution: "Đại học Sư phạm Hà Nội",
        year: 2019,
        verificationStatus: "verified",
      },
    ],
    experience: 6,
    rating: 4.5,
    reviewCount: 78,
    verificationStatus: {
      identity: "verified",
      qualifications: "verified",
      background: "verified",
      overall: "verified",
    },
    isOnline: true,
    languages: ["Tiếng Việt"],
    teachingStyle: "Trực quan, thực tế, có hình ảnh",
    specializations: ["Địa lý THCS", "Địa lý THPT"],
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2024-10-25"),
  },
];

// Function to seed mock data to Firestore (for development)
export async function seedMockTutors() {
  // This would be implemented to add mock data to Firestore
  // For now, it's just a placeholder
  console.log("Mock tutors ready for seeding:", mockTutors.length);
}

// Function to get random tutors for testing
export function getRandomTutors(count: number = 10): Tutor[] {
  const shuffled = [...mockTutors].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, mockTutors.length));
}

// Function to filter tutors by criteria (for testing search functionality)
export function filterMockTutors(filters: {
  subjects?: string[];
  districts?: string[];
  maxRate?: number;
  minRating?: number;
  query?: string;
}): Tutor[] {
  let filtered = [...mockTutors];

  if (filters.subjects && filters.subjects.length > 0) {
    filtered = filtered.filter((tutor) =>
      tutor.subjects.some((subject) => filters.subjects!.includes(subject))
    );
  }

  if (filters.districts && filters.districts.length > 0) {
    filtered = filtered.filter((tutor) =>
      filters.districts!.includes(tutor.district)
    );
  }

  if (filters.maxRate) {
    filtered = filtered.filter((tutor) => tutor.hourlyRate <= filters.maxRate!);
  }

  if (filters.minRating) {
    filtered = filtered.filter((tutor) => tutor.rating >= filters.minRating!);
  }

  if (filters.query) {
    const query = filters.query.toLowerCase();
    filtered = filtered.filter(
      (tutor) =>
        tutor.name.toLowerCase().includes(query) ||
        tutor.bio.toLowerCase().includes(query) ||
        tutor.subjects.some((subject) =>
          subject.toLowerCase().includes(query)
        ) ||
        tutor.specializations?.some((spec) =>
          spec.toLowerCase().includes(query)
        )
    );
  }

  return filtered;
}
