"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
        `Gợi ý: ${sampleTutors[0].name} — ${sampleTutors[0].subject} (${sampleTutors[0].price}). Bạn có thể bắt đầu chat để tinh chỉnh yêu cầu.`
      );
    }, 1100);
  }

  return (
    <div className="bg-linear-to-b from-white to-slate-50 min-h-screen text-slate-900">
      <main className="">
        <div className="bg-primary/20">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-28">
            <div className="md:col-span-6 space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Kết nối gia sư chất lượng. Nâng bước tương lai.
              </h1>
              <p className="text-lg text-slate-600">
                Tìm gia sư cho mọi trình độ và môn học. Chúng tôi sử dụng AI để
                gợi ý những gia sư phù hợp dựa trên nhu cầu học tập và lịch học
                của bạn.
              </p>

              <form
                onSubmit={handleSearch}
                className="bg-white shadow rounded-md p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <label className="flex flex-col">
                    <span className="text-xs text-slate-500">Môn học</span>
                    <input
                      aria-label="Môn học"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="mt-1 p-2 border rounded"
                      placeholder="Ví dụ: Toán, Tiếng Anh"
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-xs text-slate-500">Khu vực</span>
                    <input
                      aria-label="Khu vực"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="mt-1 p-2 border rounded"
                      placeholder="Thành phố hoặc "
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-xs text-slate-500">Trình độ</span>
                    <select
                      aria-label="Trình độ"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="mt-1 p-2 border rounded"
                    >
                      <option value="">Tất cả</option>
                      <option>Tiểu học</option>
                      <option>Trung học</option>
                      <option>THPT</option>
                      <option>Đại học</option>
                    </select>
                  </label>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button type="submit" className="p-6 text-lg">
                    Tìm kiếm
                  </Button>
                  <Button
                    type="button"
                    onClick={handleAiMatch}
                    className="p-6 text-lg bg-emerald-600 hover:bg-emerald-700"
                  >
                    {aiLoading ? "Đang xử lý..." : "AI gợi ý"}
                  </Button>
                  <div className="flex-1 text-base text-slate-500 flex items-center">
                    Hoặc sử dụng AI để nhanh chóng nhận gợi ý phù hợp
                  </div>
                </div>
                {aiResult && (
                  <div
                    role="status"
                    className="mt-3 p-3 bg-slate-50 border rounded text-slate-700"
                  >
                    {aiResult}
                  </div>
                )}
              </form>
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

        <section id="testimonials" className="py-12 container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Phản hồi từ phụ huynh</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <blockquote className="bg-white rounded p-4 shadow">
              <p className="text-slate-600">
                "Chúng tôi tìm được gia sư phù hợp cho con chỉ trong 2 ngày. Rất
                hài lòng!"
              </p>
              <cite className="block mt-3 text-sm text-slate-500">
                — Phụ huynh ở Hà Nội
              </cite>
            </blockquote>
            <blockquote className="bg-white rounded p-4 shadow">
              <p className="text-slate-600">
                "AI gợi ý giúp tôi tiết kiệm nhiều thời gian so với tìm thủ
                công."
              </p>
              <cite className="block mt-3 text-sm text-slate-500">
                — Phụ huynh ở TP.HCM
              </cite>
            </blockquote>
            <blockquote className="bg-white rounded p-4 shadow">
              <p className="text-slate-600">
                "Gia sư chuyên nghiệp, con tiến bộ rõ rệt sau 1 tháng."
              </p>
              <cite className="block mt-3 text-sm text-slate-500">
                — Phụ huynh ở Đà Nẵng
              </cite>
            </blockquote>
          </div>
        </section>
      </main>
    </div>
  );
}
