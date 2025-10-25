export default function StepsSection() {
  return (
    <section className="relative pt-6 md:pt-40 pb-20 md:-mt-8 container mx-auto">
      <div className="max-w-4xl mx-auto text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          3 Bước Đơn giản để tìm Gia sư Chất lượng cho con.
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-3">
          Quy trình ngắn gọn, minh bạch và thân thiện — dành cho phụ huynh bận
          rộn.
        </p>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 mt-2 md:mt-6">
        {/* Step 1 */}
        <div className="flex-1 bg-white dark:bg-slate-800 border rounded-2xl p-6 flex items-start gap-4">
          <div className="shrink-0 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
            1
          </div>
          <div>
            <h3 className="text-lg font-semibold">Chia sẻ nhu cầu</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Phụ huynh điền form hoặc liên hệ, mô tả môn học, trình độ và tính
              cách của con — càng chi tiết càng tốt.
            </p>
          </div>
        </div>

        {/* Arrow for md+ */}
        <div className="hidden md:flex items-center justify-center w-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        {/* Step 2 */}
        <div className="flex-1 bg-white dark:bg-slate-800 border rounded-2xl p-6 flex items-start gap-4">
          <div className="shrink-0 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
            2
          </div>
          <div>
            <h3 className="text-lg font-semibold">VietTutor đề xuất</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Hệ thống lọc + AI chọn lọc & đề xuất 2-3 hồ sơ phù hợp nhất, kèm
              hồ sơ chi tiết và đánh giá thực tế.
            </p>
          </div>
        </div>

        {/* Arrow for md+ */}
        <div className="hidden md:flex items-center justify-center w-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        {/* Step 3 */}
        <div className="flex-1 bg-white dark:bg-slate-800 border rounded-2xl p-6 flex items-start gap-4">
          <div className="shrink-0 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
            3
          </div>
          <div>
            <h3 className="text-lg font-semibold">Bắt đầu học & Theo dõi</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Chọn gia sư, sắp xếp buổi học thử, và theo dõi tiến độ của con
              trực tiếp qua ứng dụng VietTutor.
            </p>
          </div>
        </div>
      </div>
      <iframe
        className="w-3/4 mx-auto aspect-video rounded-2xl mt-10"
        src="https://www.youtube.com/embed/ALJyAjs6fqg?si=p74TkUjcBkTk68vQ&amp;controls=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </section>
  );
}
