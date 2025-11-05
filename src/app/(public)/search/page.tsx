"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, Users, Star, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PublicTutorCard } from "@/components/search/PublicTutorCard";
import { PublicTutorFilters } from "@/components/search/PublicTutorFilters";
import { EmptyState } from "@/components/search/EmptyState";
import { mockTutors, filterMockTutors } from "@/lib/mockData";
import { Tutor, SearchFilters } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";

const defaultFilters: SearchFilters = {
  subjects: [],
  districts: [],
  maxHourlyRate: 1000000,
  minRating: 0,
  availability: {
    days: [],
    timeRange: { start: "", end: "" },
  },
  verificationStatus: false,
  isOnline: false,
  experience: { min: 0, max: 50 },
  languages: [],
};

export default function PublicSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="container mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="text-center space-y-4">
                <div className="h-10 bg-gray-200 rounded mx-auto w-96"></div>
                <div className="h-6 bg-gray-200 rounded mx-auto w-64"></div>
                <div className="h-12 bg-gray-200 rounded mx-auto max-w-2xl"></div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <PublicSearchContent />
    </Suspense>
  );
}

function PublicSearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(9); // Show 9 tutors initially

  const debouncedQuery = useDebounce(searchQuery, 300);

  // Filter tutors based on search query and filters
  const filteredTutors = useMemo(() => {
    return filterMockTutors({
      subjects: filters.subjects,
      districts: filters.districts,
      maxRate:
        filters.maxHourlyRate < 1000000 ? filters.maxHourlyRate : undefined,
      minRating: filters.minRating > 0 ? filters.minRating : undefined,
      query: debouncedQuery.trim() || undefined,
    })
      .filter((tutor) => {
        // Apply additional filters
        if (
          filters.verificationStatus &&
          tutor.verificationStatus.overall !== "verified"
        ) {
          return false;
        }
        if (filters.isOnline && !tutor.isOnline) {
          return false;
        }
        if (
          filters.experience.min > 0 &&
          tutor.experience < filters.experience.min
        ) {
          return false;
        }
        if (
          filters.experience.max < 50 &&
          tutor.experience > filters.experience.max
        ) {
          return false;
        }
        if (
          filters.languages.length > 0 &&
          !tutor.languages.some((lang) => filters.languages.includes(lang))
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => b.rating - a.rating);
  }, [debouncedQuery, filters]);

  const displayedTutors = filteredTutors.slice(0, displayCount);
  const hasMore = displayCount < filteredTutors.length;

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    // Update URL without navigation
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set("q", value);
    } else {
      url.searchParams.delete("q");
    }
    window.history.replaceState({}, "", url.toString());
  };

  const handleViewProfile = (tutor: Tutor) => {
    router.push(`/tutor/${tutor.id}`);
  };

  const handleContactTutor = (tutor: Tutor) => {
    // Redirect to sign up with context
    const returnUrl = `/tutor/${tutor.id}?action=contact`;
    router.push(
      `/signup?returnUrl=${encodeURIComponent(
        returnUrl
      )}&tutorName=${encodeURIComponent(tutor.name)}`
    );
  };

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 9, filteredTutors.length));
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

  const clearAllFilters = () => {
    setFilters(defaultFilters);
    setDisplayCount(9);
  };

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(9);
  }, [filters, debouncedQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tìm Gia Sư Phù Hợp
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Khám phá hàng nghìn gia sư chất lượng cao trên toàn quốc
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Tìm theo tên gia sư, môn học, chuyên môn..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Bộ lọc</h2>
                    {getActiveFiltersCount() > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Xóa tất cả
                      </Button>
                    )}
                  </div>
                  <PublicTutorFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {/* Mobile Filters & Results Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Mobile Filters Button */}
                <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Bộ lọc
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
                      <PublicTutorFilters
                        filters={filters}
                        onFiltersChange={setFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Results Info */}
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{filteredTutors.length}</span>{" "}
                    gia sư được tìm thấy
                  </div>
                  {getActiveFiltersCount() > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-blue-600 hover:text-blue-700 hidden sm:flex"
                    >
                      <Filter className="h-4 w-4 mr-1" />
                      Xóa bộ lọc ({getActiveFiltersCount()})
                    </Button>
                  )}
                </div>
              </div>

              {/* Active Filters */}
              {getActiveFiltersCount() > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-600">Đang lọc:</span>
                  {filters.subjects.map((subject) => (
                    <Badge
                      key={subject}
                      variant="secondary"
                      className="text-xs"
                    >
                      {subject}
                    </Badge>
                  ))}
                  {filters.districts.map((district) => (
                    <Badge
                      key={district}
                      variant="secondary"
                      className="text-xs"
                    >
                      {district}
                    </Badge>
                  ))}
                  {filters.maxHourlyRate < 1000000 && (
                    <Badge variant="secondary" className="text-xs">
                      Tối đa {(filters.maxHourlyRate / 1000).toLocaleString()}
                      k/giờ
                    </Badge>
                  )}
                  {filters.minRating > 0 && (
                    <Badge
                      variant="secondary"
                      className="text-xs flex items-center gap-1"
                    >
                      <Star className="h-3 w-3" /> Từ {filters.minRating}
                    </Badge>
                  )}
                </div>
              )}

              {/* Results */}
              {filteredTutors.length === 0 ? (
                <EmptyState
                  searchQuery={debouncedQuery}
                  onClearFilters={clearAllFilters}
                  hasFilters={getActiveFiltersCount() > 0}
                />
              ) : (
                <>
                  {/* Tutors Grid */}
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {displayedTutors.map((tutor) => (
                      <PublicTutorCard
                        key={tutor.id}
                        tutor={tutor}
                        onViewProfile={() => handleViewProfile(tutor)}
                        onContactTutor={() => handleContactTutor(tutor)}
                      />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {hasMore && (
                    <div className="text-center">
                      <Button variant="outline" onClick={loadMore} size="lg">
                        Xem thêm gia sư
                      </Button>
                    </div>
                  )}

                  {/* Call to Action */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6 text-center">
                      <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Tìm thấy gia sư phù hợp?
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Đăng ký ngay để liên hệ với gia sư và bắt đầu hành trình
                        học tập
                      </p>
                      <Button
                        size="lg"
                        onClick={() => router.push("/signup")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Đăng ký miễn phí
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
