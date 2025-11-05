"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Filter,
  UserX,
  RefreshCw,
  Lightbulb,
  MapPin,
  Star,
  BookOpen,
} from "lucide-react";

interface EmptyStateProps {
  searchQuery: string;
  hasFilters: boolean;
  onClearFilters: () => void;
}

export function EmptyState({
  searchQuery,
  hasFilters,
  onClearFilters,
}: EmptyStateProps) {
  const hasSearch = searchQuery.trim().length > 0;

  if (hasSearch || hasFilters) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>

          <h3 className="text-xl font-semibold mb-2">
            Không tìm thấy gia sư phù hợp
          </h3>

          <div className="space-y-2 mb-6 text-muted-foreground max-w-md mx-auto">
            {hasSearch && (
              <p>
                Không có kết quả nào cho từ khóa{" "}
                <strong>"{searchQuery}"</strong>
              </p>
            )}
            {hasFilters && (
              <p>Thử điều chỉnh bộ lọc để tìm thấy nhiều gia sư hơn</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {hasFilters && (
              <Button variant="outline" onClick={onClearFilters}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Xóa bộ lọc
              </Button>
            )}
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Điều chỉnh tìm kiếm
            </Button>
          </div>

          {/* Search Suggestions */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg max-w-md mx-auto">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium">Gợi ý tìm kiếm</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Thử tìm kiếm với từ khóa rộng hơn</p>
              <p>• Kiểm tra lại chính tả</p>
              <p>• Sử dụng ít bộ lọc hơn</p>
              <p>• Tăng phạm vi mức phí</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No search, no filters - general empty state
  return (
    <Card>
      <CardContent className="text-center py-16">
        <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <Search className="h-10 w-10 text-blue-400" />
        </div>

        <h3 className="text-2xl font-semibold mb-3">
          Tìm gia sư phù hợp cho con em
        </h3>

        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Sử dụng thanh tìm kiếm và bộ lọc để tìm những gia sư tốt nhất cho nhu
          cầu học tập của con em bạn
        </p>

        {/* Search Tips */}
        <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
          <div className="p-4 bg-muted/50 rounded-lg">
            <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium mb-1">Theo môn học</h4>
            <p className="text-sm text-muted-foreground">
              Tìm kiếm theo môn học cụ thể
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium mb-1">Theo khu vực</h4>
            <p className="text-sm text-muted-foreground">
              Lọc theo quận/huyện gần nhà
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <h4 className="font-medium mb-1">Theo đánh giá</h4>
            <p className="text-sm text-muted-foreground">
              Chọn gia sư có đánh giá cao
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Bắt đầu bằng cách nhập từ khóa vào thanh tìm kiếm ở trên
          </p>

          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="outline" size="sm">
              Toán học
            </Button>
            <Button variant="outline" size="sm">
              Tiếng Anh
            </Button>
            <Button variant="outline" size="sm">
              Vật lý
            </Button>
            <Button variant="outline" size="sm">
              Hóa học
            </Button>
            <Button variant="outline" size="sm">
              Lập trình
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
