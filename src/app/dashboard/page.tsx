"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/authStore";
import { useChildrenStore } from "@/stores/childrenStore";
import { useSessionStore } from "@/stores/sessionStore";
import {
  Users,
  Calendar,
  MessageSquare,
  TrendingUp,
  Plus,
  Clock,
  Star,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthStore();
  const { children } = useChildrenStore();
  const { upcomingSessions, inquiries } = useSessionStore();

  const stats = [
    {
      title: "Con em",
      value: children.length,
      description: "Số lượng con em đã đăng ký",
      icon: Users,
      href: "/dashboard/children",
      color: "text-blue-600",
    },
    {
      title: "Lịch học sắp tới",
      value: upcomingSessions.length,
      description: "Buổi học trong tuần này",
      icon: Calendar,
      href: "/dashboard/sessions",
      color: "text-green-600",
    },
    {
      title: "Tin nhắn mới",
      value: 2, // Placeholder
      description: "Tin nhắn chưa đọc",
      icon: MessageSquare,
      href: "/dashboard/messages",
      color: "text-purple-600",
    },
    {
      title: "Tỷ lệ hoàn thành",
      value: "85%",
      description: "Tỷ lệ hoàn thành bài tập",
      icon: TrendingUp,
      href: "/dashboard/reports",
      color: "text-orange-600",
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full">
            <DashboardSidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 space-y-6">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">
                {getGreeting()}, {user?.name}! 👋
              </h1>
              <p className="text-muted-foreground">
                Chào mừng bạn quay trở lại. Hãy xem những cập nhật mới nhất.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Link key={stat.title} href={stat.href}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className={cn("h-4 w-4", stat.color)} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>Hành động nhanh</span>
                  </CardTitle>
                  <CardDescription>
                    Những tác vụ thông dụng nhất
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/dashboard/search">
                    <Button variant="outline" className="w-full justify-start">
                      <Star className="mr-2 h-4 w-4" />
                      Tìm gia sư mới
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/dashboard/children">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Quản lý con em
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/dashboard/sessions">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Xem lịch học
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/dashboard/reports">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Xem báo cáo tiến độ
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Upcoming Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Lịch học sắp tới</span>
                  </CardTitle>
                  <CardDescription>
                    Những buổi học trong tuần này
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingSessions.length > 0 ? (
                    <div className="space-y-3">
                      {upcomingSessions.slice(0, 3).map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center space-x-3 p-3 border rounded-lg"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>GS</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {session.subject}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(session.dateTime).toLocaleDateString(
                                "vi-VN"
                              )}{" "}
                              -{" "}
                              {new Date(session.dateTime).toLocaleTimeString(
                                "vi-VN",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                          <Badge
                            variant={
                              session.status === "confirmed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {session.status === "confirmed"
                              ? "Đã xác nhận"
                              : "Chờ xác nhận"}
                          </Badge>
                        </div>
                      ))}
                      {upcomingSessions.length > 3 && (
                        <Link href="/dashboard/sessions">
                          <Button variant="ghost" className="w-full">
                            Xem tất cả ({upcomingSessions.length - 3} lịch học
                            khác)
                          </Button>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">Chưa có lịch học nào</p>
                      <Link href="/dashboard/search">
                        <Button variant="outline" className="mt-2">
                          Tìm gia sư ngay
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Children Overview */}
            {children.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Con em của bạn</span>
                    </div>
                    <Link href="/dashboard/children">
                      <Button variant="outline" size="sm">
                        Quản lý
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {children.map((child) => (
                      <div
                        key={child.id}
                        className="flex items-center space-x-3 p-4 border rounded-lg"
                      >
                        <Avatar>
                          <AvatarImage src={child.avatar} />
                          <AvatarFallback>
                            {child.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{child.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Lớp {child.grade} • {child.age} tuổi
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {child.subjects.slice(0, 2).map((subject) => (
                              <Badge
                                key={subject}
                                variant="secondary"
                                className="text-xs"
                              >
                                {subject}
                              </Badge>
                            ))}
                            {child.subjects.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{child.subjects.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Empty State - No Children */}
            {children.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">
                    Chưa có thông tin con em
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Hãy thêm thông tin con em để bắt đầu tìm kiếm gia sư phù hợp
                  </p>
                  <Link href="/dashboard/children">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Thêm con em đầu tiên
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
