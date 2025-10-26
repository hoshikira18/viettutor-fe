"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BenefitsSection from "./components/BenefitsSection";
import StepsSection from "./components/StepsSection";
import CTASection from "./components/CTASection";
import QnA from "./components/QnA";

const sampleTutors = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    subject: "Toán - Lớp 10-12",
    rating: 4.9,
    price: "250k/h",
    img: "/tutor.jpg",
  },
  {
    id: 2,
    name: "Trần Thị B",
    subject: "Tiếng Anh - Giao tiếp",
    rating: 4.8,
    price: "200k/h",
    img: "/tutor.jpg",
  },
  {
    id: 3,
    name: "Lê Văn C",
    subject: "Lý - Hóa - Toán",
    rating: 4.7,
    price: "220k/h",
    img: "/tutor.jpg",
  },
];

export default function HomePage() {
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    // In a real app we'd call an API here.
    setAiResult(
      `Tìm gia sư cho "${subject || "Môn học"}" ${
        level ? `- ${level}` : ""
      } ở ${location || "Toàn quốc"}`
    );
  }

  function handleAiMatch() {
    setAiLoading(true);
    setAiResult(null);
    // Simulate an AI match call
    setTimeout(() => {
      setAiLoading(false);
      setAiResult(
        `Gợi ý: ${sampleTutors[0].name} - ${sampleTutors[0].subject} (${sampleTutors[0].price}). Bạn có thể bắt đầu chat để tinh chỉnh yêu cầu.`
      );
    }, 1100);
  }

  return (
    <div className="min-h-screen text-slate-900">
      <main className="">
        <div className="relative bg-linear-to-b from-primary/60 to-background overflow-hidden">
          <svg
            className="absolute left-0 top-5 w-96 aspect-square z-0 opacity-30"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="pattern-dots"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.6" fill="#ffffff" />
              </pattern>

              <linearGradient id="hero-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
              </linearGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#pattern-dots)" />
            <rect width="100%" height="100%" fill="url(#hero-grad)" />
          </svg>

          <svg
            className="absolute right-0 top-5 w-96 hidden md:block aspect-square z-0 opacity-30"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="pattern-dots"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.6" fill="#ffffff" />
              </pattern>

              <linearGradient id="hero-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
              </linearGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#pattern-dots)" />
            <rect width="100%" height="100%" fill="url(#hero-grad)" />
          </svg>

          <div className="relative z-10 container px-4 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-32">
            <div className="md:col-span-6 space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight animate-fade">
                Kết nối gia sư chất lượng. Nâng bước tương lai.
              </h1>
              <p className="text-lg text-slate-600 animate-fade">
                Tìm gia sư cho mọi trình độ và môn học. Chúng tôi sử dụng AI để
                gợi ý những gia sư phù hợp dựa trên nhu cầu học tập và lịch học
                của bạn.
              </p>

              <div className="space-x-3 animate-fade space-y-3 lg:space-y-0">
                <Button className="text-lg p-6 md:p-8 rounded-4xl">
                  Tìm gia sư ngay
                </Button>
                <Button className="text-lg p-6 md:p-8 rounded-4xl">
                  Hỗ trợ tìm gia sư 24/7
                </Button>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="rounded-lg overflow-hidden shadow">
                <Image
                  src="/hero.jpg"
                  alt="VietTutor hero"
                  width={800}
                  height={520}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <BenefitsSection />
        <StepsSection />
        {/* <CTASection /> */}
        <QnA />
      </main>
    </div>
  );
}
