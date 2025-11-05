"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Search,
  Users,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  CreditCard,
  Star,
  FileText,
  Bell,
  Plus,
  ChevronDown,
} from "lucide-react";
import { useChildrenStore } from "@/stores/childrenStore";
import { useSessionStore } from "@/stores/sessionStore";

interface SidebarProps {
  className?: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  children?: NavItem[];
}

export function DashboardSidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { children } = useChildrenStore();
  const { upcomingSessions, inquiries } = useSessionStore();
  const [expandedSections, setExpandedSections] = useState<string[]>(["main"]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const navItems: NavItem[] = [
    {
      title: "Trang chủ",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Tìm gia sư",
      href: "/dashboard/search",
      icon: Search,
    },
    {
      title: "Con em",
      href: "/dashboard/children",
      icon: Users,
      badge: children.length,
    },
    {
      title: "Lịch học",
      href: "/dashboard/sessions",
      icon: Calendar,
      badge: upcomingSessions.length,
    },
    {
      title: "Tin nhắn",
      href: "/dashboard/messages",
      icon: MessageSquare,
    },
    {
      title: "Liên hệ",
      href: "/dashboard/inquiries",
      icon: FileText,
      badge: inquiries.filter((i) => i.status === "responded").length,
    },
  ];

  const secondaryItems: NavItem[] = [
    {
      title: "Báo cáo & Tiến độ",
      href: "/dashboard/reports",
      icon: BarChart3,
    },
    {
      title: "Gia sư yêu thích",
      href: "/dashboard/favorites",
      icon: Star,
    },
    {
      title: "Thanh toán",
      href: "/dashboard/billing",
      icon: CreditCard,
    },
    {
      title: "Thông báo",
      href: "/dashboard/notifications",
      icon: Bell,
    },
  ];

  const settingsItems: NavItem[] = [
    {
      title: "Cài đặt",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const NavSection = ({
    title,
    items,
    sectionKey,
  }: {
    title: string;
    items: NavItem[];
    sectionKey: string;
  }) => (
    <div className="space-y-1">
      <Button
        variant="ghost"
        className="w-full justify-between h-8 px-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
        onClick={() => toggleSection(sectionKey)}
      >
        {title}
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform",
            expandedSections.includes(sectionKey) ? "rotate-180" : ""
          )}
        />
      </Button>
      {expandedSections.includes(sectionKey) && (
        <div className="space-y-1">
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive(item.href) ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-9 px-3",
                  isActive(item.href) && "bg-secondary/80 font-medium"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                <span className="flex-1 text-left">{item.title}</span>
                {item.badge && item.badge > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-auto h-5 px-1.5 text-xs"
                  >
                    {item.badge > 99 ? "99+" : item.badge}
                  </Badge>
                )}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={cn(
        "flex h-full w-64 flex-col border-r bg-background",
        className
      )}
    >
      <div className="p-4">
        <Button className="w-full" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Thêm con em
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4 py-2">
          <NavSection title="CHÍNH" items={navItems} sectionKey="main" />
          <NavSection
            title="TIỆN ÍCH"
            items={secondaryItems}
            sectionKey="utilities"
          />
          <NavSection
            title="TÀI KHOẢN"
            items={settingsItems}
            sectionKey="account"
          />
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="text-xs text-muted-foreground">
          <p className="font-semibold">VietTutor</p>
          <p>Phiên bản 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
