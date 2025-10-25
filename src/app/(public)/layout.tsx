import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-white sticky top-0 z-50">
        <header className="flex items-center justify-between container mx-auto py-8">
          <div className="flex items-end space-x-10">
            <p className="text-4xl font-bold text-primary">VietTutor</p>
            <nav className="flex justify-between space-x-5 text-lg">
              <div className="hover:underline">
                <Link href="/">Giới thiệu</Link>
              </div>
              <div className="hover:underline">
                <Link href="/">Tính năng</Link>
              </div>
              <div className="hover:underline">
                <Link href="/">Liên hệ</Link>
              </div>
              <div className="hover:underline">
                <Link href="/">VietTutor Store</Link>
              </div>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button size={"lg"} variant={"outline"} className="text-base">
              Đăng nhập
            </Button>
            {/* <Button size={"lg"}>Dành cho phụ huynh</Button> */}
            <Button size={"lg"} className="text-base">
              Trở thành gia sư
            </Button>
          </div>
        </header>
      </div>
      {children}
      <footer className="py-12 text-sm text-slate-500 container mx-auto">
        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between">
          <div>
            © {new Date().getFullYear()} VietTutor — Kết nối gia sư & phụ huynh
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
