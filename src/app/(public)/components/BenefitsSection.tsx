import React from "react";

const FeatureCard = ({
  icon,
  title,
  emphasize,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  emphasize?: React.ReactNode;
  description: string;
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 border rounded-2xl p-6 flex flex-col items-start gap-4 shadow-sm">
      <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-3">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          {emphasize ? (
            <div className="text-primary font-extrabold text-xl">
              {emphasize}
            </div>
          ) : null}
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function BenefitsSection() {
  return (
    <section className="py-12 container mx-auto">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">
          Tại sao hàng ngàn Phụ huynh đã tin chọn VietTutor?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-3">
          Các cam kết rõ ràng, bộ lọc thông minh và hỗ trợ 24/7 giúp bạn tìm gia
          sư phù hợp nhanh chóng.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          }
          title="Uy tín & Minh bạch"
          emphasize={null}
          description={`Hồ sơ gia sư minh bạch kèm đánh giá thực tế từ phụ huynh - giúp bạn chọn lựa có cơ sở.`}
        />

        <FeatureCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"
              />
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35"
              />
            </svg>
          }
          title="Phù hợp Tuyệt đối"
          emphasize={<span>99%</span>}
          description={`Hệ thống AI & bộ lọc thông minh cho kết quả khớp đến 99% với nhu cầu của con bạn.`}
        />

        <FeatureCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3"
              />
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z"
              />
            </svg>
          }
          title="Hỗ trợ"
          emphasize={<span>24/7</span>}
          description={`Đội ngũ chăm sóc luôn sẵn sàng - hỗ trợ đổi lịch, giải quyết vấn đề và tư vấn nhanh chóng.`}
        />

        <FeatureCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1"
              />
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v.01"
              />
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
              />
            </svg>
          }
          title="Tiết kiệm thời gian"
          emphasize={<span>24 giờ</span>}
          description={`Tìm và xác nhận gia sư phù hợp trong vòng 24 giờ - tiết kiệm thời gian cho phụ huynh bận rộn.`}
        />
      </div>
    </section>
  );
}
