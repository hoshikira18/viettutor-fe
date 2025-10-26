import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VietTutor - Nền tảng kết nối phụ huynh với gia sư số một Việt Nam.",
  description:
    "Website kết nối phụ huynh với gia sư chất lượng cao, sử dụng AI để gợi ý gia sư phù hợp dựa trên nhu cầu học tập và lịch học của học sinh.",
  openGraph: {
    images: [
      {
        url: "https://www.viettutors.cloud/og_image.jpg",
        width: 1200,
        height: 630,
        alt: "VietTutor - Gia sư Việt",
      },
    ],
    description:
      "Website kết nối phụ huynh với gia sư chất lượng cao, sử dụng AI để gợi ý gia sư phù hợp dựa trên nhu cầu học tập và lịch học của học sinh.",
    title: "VietTutor - Nền tảng kết nối phụ huynh với gia sư số một Việt Nam.",
    countryName: "Vietnam",
    locale: "vi_VN",
    siteName: "VietTutor",
    tags: [
      "gia sư",
      "tìm gia sư",
      "kết nối gia sư",
      "gia sư chất lượng",
      "học tập",
      "giáo dục",
      "phụ huynh",
      "học sinh",
      "AI trong giáo dục",
      "nền tảng gia sư",
      "gia sư Hà Nội",
      "gia sư TP.HCM",
      "gia sư online",
      "gia sư toán",
      "gia sư tiếng Anh",
      "gia sư vật lý",
      "gia sư hóa học",
      "gia sư sinh học",
      "gia sư tiếng Việt",
      "gia sư lập trình",
      "gia sư khoa học máy tính",
      "dạy học",
      "giáo viên dạy kèm",
      "học thêm",
      "gia sư trực tuyến",
      "gia sư tại nhà",
      "gia sư uy tín",
      "tìm gia sư nhanh",
      "dịch vụ gia sư",
      "gia sư cho trẻ em",
      "gia sư cho người lớn",
      "học tập hiệu quả",
      "giải pháp học tập",
      "nền tảng giáo dục",
      "gia sư chất lượng",
      "học tập cá nhân hóa",
      "gia sư chuyên nghiệp",
      "gia sư đáng tin cậy",
      "gia sư phù hợp",
      "gia sư theo yêu cầu",
      "gia sư mọi trình độ",
      "gia sư mọi môn học",
      "đăng ký làm gia sư",
      "kiếm tiền từ việc dạy học",
      "cộng đồng gia sư",
      "hỗ trợ học tập",
      "phát triển kỹ năng",
      "gia sư trực tuyến Việt Nam",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
      <Analytics />
    </html>
  );
}
