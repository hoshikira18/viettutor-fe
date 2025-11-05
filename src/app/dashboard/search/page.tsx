"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTutorSearchStore } from "@/stores/tutorSearchStore";
import { useChildrenStore } from "@/stores/childrenStore";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  Shield,
  MessageSquare,
  Heart,
  Eye,
  SlidersHorizontal,
  Users,
  BookOpen,
  DollarSign,
} from "lucide-react";
import { TutorFilters } from "@/components/search/TutorFilters";
import { TutorCard } from "@/components/search/TutorCard";
import { EmptyState } from "@/components/search/EmptyState";
import { Tutor } from "@/types";
import { toast } from "sonner";

export default function SearchPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const {
    tutors,
    loading,
    hasMore,
    searchTutors,
    loadMoreTutors,
    filters,
    clearResults,
    setSearchQuery: setStoreSearchQuery,
  } = useTutorSearchStore();

  const { children } = useChildrenStore();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Trigger search when debounced query or filters change
  useEffect(() => {
    setStoreSearchQuery(debouncedQuery);
    searchTutors(debouncedQuery, true);
  }, [debouncedQuery, filters, searchTutors, setStoreSearchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleSendMessage = (tutor: Tutor) => {
    if (children.length === 0) {
      toast.error("Vui lòng thêm thông tin con em trước khi liên hệ gia sư");
      router.push("/dashboard/children");
      return;
    }
    router.push(`/dashboard/inquiry?tutorId=${tutor.id}`);
  };

  const handleToggleFavorite = (tutor: Tutor) => {
    // TODO: Implement favorite functionality
    toast.success(
      `Đã ${Math.random() > 0.5 ? "thêm" : "xóa"} ${
        tutor.name
      } khỏi danh sách yêu thích`
    );
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.subjects.length > 0) count++;
    if (filters.districts.length > 0) count++;
    if (filters.maxHourlyRate < 1000000) count++;
    if (filters.minRating > 0) count++;
    if (filters.verificationStatus) count++;
    if (filters.isOnline) count++;
    if (filters.experience.min > 0 || filters.experience.max < 50) count++;
    if (filters.languages.length > 0) count++;
    return count;
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
            {/* Search Header */}
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold">Tìm gia sư</h1>
                <p className="text-muted-foreground">
                  Tìm kiếm gia sư phù hợp với nhu cầu học tập của con em bạn
                </p>
              </div>

              {/* Search Bar */}
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm theo tên gia sư, môn học, kỹ năng..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Mobile Filters Button */}
                <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="shrink-0 md:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Lọc
                      {getActiveFiltersCount() > 0 && (
                        <Badge
                          variant="secondary"
                          className="ml-2 h-5 w-5 p-0 flex items-center justify-center"
                        >
                          {getActiveFiltersCount()}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Bộ lọc tìm kiếm</SheetTitle>
                      <SheetDescription>
                        Sử dụng bộ lọc để tìm gia sư phù hợp
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <TutorFilters />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Search Stats */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {loading
                    ? "Đang tìm kiếm..."
                    : `Tìm thấy ${tutors.length} gia sư${
                        searchQuery ? ` cho "${searchQuery}"` : ""
                      }`}
                </div>
                {getActiveFiltersCount() > 0 && (
                  <div className="text-sm text-muted-foreground">
                    {getActiveFiltersCount()} bộ lọc đang áp dụng
                  </div>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              {/* Desktop Filters Sidebar */}
              <div className="hidden md:block lg:col-span-1">
                <div className="sticky top-24">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Filter className="h-5 w-5 mr-2" />
                        Bộ lọc tìm kiếm
                      </CardTitle>
                      {getActiveFiltersCount() > 0 && (
                        <CardDescription>
                          {getActiveFiltersCount()} bộ lọc đang áp dụng
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <TutorFilters />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Tutors Grid */}
              <div className="lg:col-span-3">
                {loading && tutors.length === 0 ? (
                  /* Loading Skeletons */
                  <div className="grid gap-6 md:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Card key={i}>
                        <CardHeader>
                          <div className="flex items-start space-x-4">
                            <Skeleton className="h-16 w-16 rounded-full" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-32" />
                              <Skeleton className="h-3 w-24" />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex gap-1">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-14" />
                          </div>
                          <Skeleton className="h-12 w-full" />
                          <div className="flex gap-2">
                            <Skeleton className="h-9 flex-1" />
                            <Skeleton className="h-9 flex-1" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : tutors.length > 0 ? (
                  <div className="space-y-6">
                    {/* Tutors Grid */}
                    <div className="grid gap-6 md:grid-cols-2">
                      {tutors.map((tutor) => (
                        <TutorCard
                          key={tutor.id}
                          tutor={tutor}
                          onSendMessage={() => handleSendMessage(tutor)}
                          onToggleFavorite={() => handleToggleFavorite(tutor)}
                        />
                      ))}
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                      <div className="text-center">
                        <Button
                          variant="outline"
                          onClick={loadMoreTutors}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              Đang tải...
                            </>
                          ) : (
                            "Xem thêm gia sư"
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Empty State */
                  <EmptyState
                    searchQuery={searchQuery}
                    hasFilters={getActiveFiltersCount() > 0}
                    onClearFilters={() => {
                      clearResults();
                      setSearchQuery("");
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
