"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  MessageSquare,
  Calendar,
  Users,
  User,
  DollarSign,
  BookOpen,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    name: "Tổng quan",
    href: "/tutor-dashboard",
    icon: Home,
  },
  {
    name: "Yêu cầu dạy học",
    href: "/tutor-dashboard/inquiries",
    icon: MessageSquare,
    badge: 5, // TODO: Get from store
  },
  {
    name: "Lịch dạy",
    href: "/tutor-dashboard/schedule",
    icon: Calendar,
  },
  {
    name: "Học sinh",
    href: "/tutor-dashboard/students",
    icon: Users,
  },
  {
    name: "Buổi học",
    href: "/tutor-dashboard/sessions",
    icon: BookOpen,
  },
  {
    name: "Thu nhập",
    href: "/tutor-dashboard/earnings",
    icon: DollarSign,
  },
  {
    name: "Thống kê",
    href: "/tutor-dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "Hồ sơ",
    href: "/tutor-dashboard/profile",
    icon: User,
  },
  {
    name: "Cài đặt",
    href: "/tutor-dashboard/settings",
    icon: Settings,
  },
];

export function TutorDashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 h-[calc(100vh-4rem)] transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Toggle button */}
      <div className="flex justify-end p-2 border-b border-gray-100">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors relative",
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive ? "text-blue-700" : "text-gray-400"
                )}
              />
              {!collapsed && (
                <>
                  <span className="ml-3 truncate">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && item.badge && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick stats - only when expanded */}
      {!collapsed && (
        <div className="absolute bottom-4 left-2 right-2">
          <div className="bg-linear-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="text-sm font-medium">Tháng này</div>
            <div className="text-2xl font-bold">15.5M VNĐ</div>
            <div className="text-xs opacity-90">32 buổi dạy</div>
          </div>
        </div>
      )}
    </div>
  );
}
