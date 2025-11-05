"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { SearchFilters, SUBJECTS, DISTRICTS } from "@/types";
import { Star, X } from "lucide-react";

interface PublicTutorFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

export function PublicTutorFilters({
  filters,
  onFiltersChange,
}: PublicTutorFiltersProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount);
  };

  const handleSubjectChange = (subject: string, checked: boolean) => {
    const newSubjects = checked
      ? [...filters.subjects, subject]
      : filters.subjects.filter((s) => s !== subject);

    onFiltersChange({ ...filters, subjects: newSubjects });
  };

  const handleDistrictChange = (district: string, checked: boolean) => {
    const newDistricts = checked
      ? [...filters.districts, district]
      : filters.districts.filter((d) => d !== district);

    onFiltersChange({ ...filters, districts: newDistricts });
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    const newLanguages = checked
      ? [...filters.languages, language]
      : filters.languages.filter((l) => l !== language);

    onFiltersChange({ ...filters, languages: newLanguages });
  };

  const removeSubject = (subject: string) => {
    onFiltersChange({
      ...filters,
      subjects: filters.subjects.filter((s) => s !== subject),
    });
  };

  const removeDistrict = (district: string) => {
    onFiltersChange({
      ...filters,
      districts: filters.districts.filter((d) => d !== district),
    });
  };

  return (
    <div className="space-y-6">
      {/* Subjects Filter */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Môn học</h3>

        {/* Selected Subjects */}
        {filters.subjects.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {filters.subjects.map((subject) => (
              <Badge
                key={subject}
                variant="secondary"
                className="flex items-center gap-1 bg-blue-100 text-blue-800"
              >
                {subject}
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 w-4 h-4 hover:bg-transparent"
                  onClick={() => removeSubject(subject)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
          {SUBJECTS.map((subject) => (
            <div key={subject} className="flex items-center space-x-2">
              <Checkbox
                id={`subject-${subject}`}
                checked={filters.subjects.includes(subject)}
                onCheckedChange={(checked) =>
                  handleSubjectChange(subject, checked as boolean)
                }
              />
              <Label
                htmlFor={`subject-${subject}`}
                className="text-sm cursor-pointer flex-1"
              >
                {subject}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Location Filter */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Khu vực</h3>

        {/* Selected Districts */}
        {filters.districts.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {filters.districts.map((district) => (
              <Badge
                key={district}
                variant="secondary"
                className="flex items-center gap-1 bg-green-100 text-green-800"
              >
                {district}
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 w-4 h-4 hover:bg-transparent"
                  onClick={() => removeDistrict(district)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
          {DISTRICTS.map((district) => (
            <div key={district} className="flex items-center space-x-2">
              <Checkbox
                id={`district-${district}`}
                checked={filters.districts.includes(district)}
                onCheckedChange={(checked) =>
                  handleDistrictChange(district, checked as boolean)
                }
              />
              <Label
                htmlFor={`district-${district}`}
                className="text-sm cursor-pointer flex-1"
              >
                {district}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range Filter */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">
          Mức học phí (VNĐ/giờ)
        </h3>
        <div className="space-y-4">
          <Slider
            value={[filters.maxHourlyRate]}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, maxHourlyRate: value[0] })
            }
            max={1000000}
            min={50000}
            step={50000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>50,000 đ</span>
            <span className="font-medium">
              {filters.maxHourlyRate >= 1000000
                ? "Không giới hạn"
                : `${formatCurrency(filters.maxHourlyRate)} đ`}
            </span>
            <span>1,000,000+ đ</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Rating Filter */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Đánh giá tối thiểu</h3>
        <div className="space-y-3">
          {[0, 3, 4, 4.5].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.minRating === rating}
                onCheckedChange={(checked) =>
                  onFiltersChange({
                    ...filters,
                    minRating: checked ? rating : 0,
                  })
                }
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="text-sm cursor-pointer flex items-center space-x-1"
              >
                {rating === 0 ? (
                  <span>Tất cả</span>
                ) : (
                  <>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(rating)
                              ? "text-yellow-400 fill-current"
                              : i < rating
                              ? "text-yellow-400 fill-current opacity-50"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span>{rating}+ sao</span>
                  </>
                )}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Experience Range */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Kinh nghiệm (năm)</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">
              Từ {filters.experience.min} năm
            </Label>
            <Slider
              value={[filters.experience.min]}
              onValueChange={(value) =>
                onFiltersChange({
                  ...filters,
                  experience: { ...filters.experience, min: value[0] },
                })
              }
              max={20}
              min={0}
              step={1}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">
              Đến{" "}
              {filters.experience.max >= 50 ? "50+" : filters.experience.max}{" "}
              năm
            </Label>
            <Slider
              value={[filters.experience.max]}
              onValueChange={(value) =>
                onFiltersChange({
                  ...filters,
                  experience: { ...filters.experience, max: value[0] },
                })
              }
              max={50}
              min={0}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Quick Filters */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Tùy chọn khác</h3>

        <div className="flex items-center justify-between">
          <Label htmlFor="verified" className="text-sm">
            Chỉ gia sư đã xác thực
          </Label>
          <Switch
            id="verified"
            checked={filters.verificationStatus}
            onCheckedChange={(checked) =>
              onFiltersChange({ ...filters, verificationStatus: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="online" className="text-sm">
            Đang hoạt động
          </Label>
          <Switch
            id="online"
            checked={filters.isOnline}
            onCheckedChange={(checked) =>
              onFiltersChange({ ...filters, isOnline: checked })
            }
          />
        </div>
      </div>

      <Separator />

      {/* Languages */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Ngôn ngữ</h3>
        <div className="space-y-2">
          {["Tiếng Việt", "English", "Français", "中文", "日本語"].map(
            (language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={`language-${language}`}
                  checked={filters.languages.includes(language)}
                  onCheckedChange={(checked) =>
                    handleLanguageChange(language, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`language-${language}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {language}
                </Label>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
