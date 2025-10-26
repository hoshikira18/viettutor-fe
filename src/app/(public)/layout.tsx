import React from "react";
import Header from "@/components/ui/Header";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="mt-16 md:mt-20">{children}</main>
      <footer className="py-12 text-sm text-slate-500 container mx-auto">
        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between">
          <div>
            © {new Date().getFullYear()} VietTutor - Kết nối gia sư & phụ huynh
          </div>
          <div className="space-x-4 mt-3 md:mt-0">
            <a href="#">Chính sách</a>
            <a href="#">Liên hệ</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
