"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-background fixed left-0 right-0 top-0 z-50 border-b">
      <header className="container mx-auto py-4 md:py-6 px-4 md:px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-2xl md:text-3xl font-bold text-primary uppercase"
            >
              VietTutor
            </Link>

            <nav className="hidden lg:flex items-center space-x-5 text-base">
              <Link href="/comming-soon" className="hover:underline">
                Giới thiệu
              </Link>
              <Link href="/comming-soon" className="hover:underline">
                Tính năng
              </Link>
              <Link href="/comming-soon" className="hover:underline">
                Liên hệ
              </Link>
              <Link href="/comming-soon" className="hover:underline">
                VietTutor Store
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                size={"lg"}
                variant={"outline"}
                className="text-base rounded-3xl"
              >
                Đăng nhập
              </Button>
              <Button size={"lg"} className="text-base rounded-3xl">
                Trở thành gia sư
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg border"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                {open ? (
                  <path
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {open ? (
          <div className="lg:hidden mt-4 space-y-4 animate-fade-down animate-duration-150">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/comming-soon"
                onClick={() => setOpen(false)}
                className="block py-2 px-3 rounded hover:bg-accent/10"
              >
                Giới thiệu
              </Link>
              <Link
                href="/comming-soon"
                onClick={() => setOpen(false)}
                className="block py-2 px-3 rounded hover:bg-accent/10"
              >
                Tính năng
              </Link>
              <Link
                href="/comming-soon"
                onClick={() => setOpen(false)}
                className="block py-2 px-3 rounded hover:bg-accent/10"
              >
                Liên hệ
              </Link>
              <Link
                href="/comming-soon"
                onClick={() => setOpen(false)}
                className="block py-2 px-3 rounded hover:bg-accent/10"
              >
                VietTutor Store
              </Link>
            </nav>

            <div className="flex flex-col gap-2">
              <Button
                size={"lg"}
                variant={"outline"}
                className="w-full text-base rounded-3xl"
              >
                Đăng nhập
              </Button>
              <Button size={"lg"} className="w-full text-base rounded-3xl">
                Trở thành gia sư
              </Button>
            </div>
          </div>
        ) : null}
      </header>
    </div>
  );
}
