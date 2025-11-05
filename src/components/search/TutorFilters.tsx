"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTutorSearchStore } from "@/stores/tutorSearchStore";
import { SUBJECTS, DISTRICTS } from "@/types";
import { X, RotateCcw } from "lucide-react";

export function TutorFilters() {
  const { filters, setFilters, clearFilters } = useTutorSearchStore();

  const handleSubjectToggle = (subject: string) => {
    const updatedSubjects = filters.subjects.includes(subject)
      ? filters.subjects.filter((s) => s !== subject)
      : [...filters.subjects, subject];

    setFilters({ subjects: updatedSubjects });
  };

  const handleDistrictToggle = (district: string) => {
    const updatedDistricts = filters.districts.includes(district)
      ? filters.districts.filter((d) => d !== district)
      : [...filters.districts, district];

    setFilters({ districts: updatedDistricts });
  };

  const handleLanguageToggle = (language: string) => {
    const updatedLanguages = filters.languages.includes(language)
      ? filters.languages.filter((l) => l !== language)
      : [...filters.languages, language];

    setFilters({ languages: updatedLanguages });
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${price / 1000000}M`;
    } else if (price >= 1000) {
      return `${price / 1000}k`;
    }
    return price.toString();
  };

  const languages = [
    "Tiếng Việt",
    "English",
    "Tiếng Trung",
    "Tiếng Nhật",
    "Tiếng Hàn",
  ];

  return (
    <div className="space-y-6">
      {/* Clear Filters */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Bộ lọc</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="h-8 px-2 text-xs"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Xóa tất cả
        </Button>
      </div>

      {/* Subjects Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Môn học</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {SUBJECTS.map((subject) => (
            <div key={subject} className="flex items-center space-x-2">
              <Checkbox
                id={`subject-${subject}`}
                checked={filters.subjects.includes(subject)}
                onCheckedChange={() => handleSubjectToggle(subject)}
              />
              <Label
                htmlFor={`subject-${subject}`}
                className="text-sm cursor-pointer"
              >
                {subject}
              </Label>
            </div>
          ))}
        </div>
        {filters.subjects.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {filters.subjects.map((subject) => (
              <Badge
                key={subject}
                variant="secondary"
                className="text-xs cursor-pointer"
                onClick={() => handleSubjectToggle(subject)}
              >
                {subject}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Price Range Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Mức phí tối đa: {formatPrice(filters.maxHourlyRate)} VND/giờ
        </Label>
        <Slider
          value={[filters.maxHourlyRate]}
          onValueChange={(value) => setFilters({ maxHourlyRate: value[0] })}
          max={1000000}
          min={50000}
          step={25000}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>50k</span>
          <span>1M+</span>
        </div>
      </div>

      <Separator />

      {/* Rating Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Đánh giá tối thiểu</Label>
        <Select
          value={filters.minRating.toString()}
          onValueChange={(value) =>
            setFilters({ minRating: parseFloat(value) })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn đánh giá" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Tất cả</SelectItem>
            <SelectItem value="3">3+ sao</SelectItem>
            <SelectItem value="4">4+ sao</SelectItem>
            <SelectItem value="4.5">4.5+ sao</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Experience Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Kinh nghiệm: {filters.experience.min} - {filters.experience.max} năm
        </Label>
        <div className="space-y-2">
          <div>
            <Label className="text-xs text-muted-foreground">
              Tối thiểu (năm)
            </Label>
            <Slider
              value={[filters.experience.min]}
              onValueChange={(value) =>
                setFilters({
                  experience: { ...filters.experience, min: value[0] },
                })
              }
              max={filters.experience.max}
              min={0}
              step={1}
              className="w-full"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">
              Tối đa (năm)
            </Label>
            <Slider
              value={[filters.experience.max]}
              onValueChange={(value) =>
                setFilters({
                  experience: { ...filters.experience, max: value[0] },
                })
              }
              max={50}
              min={filters.experience.min}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Districts Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Khu vực</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {DISTRICTS.map((district) => (
            <div key={district} className="flex items-center space-x-2">
              <Checkbox
                id={`district-${district}`}
                checked={filters.districts.includes(district)}
                onCheckedChange={() => handleDistrictToggle(district)}
              />
              <Label
                htmlFor={`district-${district}`}
                className="text-sm cursor-pointer"
              >
                {district}
              </Label>
            </div>
          ))}
        </div>
        {filters.districts.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {filters.districts.map((district) => (
              <Badge
                key={district}
                variant="secondary"
                className="text-xs cursor-pointer"
                onClick={() => handleDistrictToggle(district)}
              >
                {district}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Languages Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Ngôn ngữ</Label>
        <div className="space-y-2">
          {languages.map((language) => (
            <div key={language} className="flex items-center space-x-2">
              <Checkbox
                id={`language-${language}`}
                checked={filters.languages.includes(language)}
                onCheckedChange={() => handleLanguageToggle(language)}
              />
              <Label
                htmlFor={`language-${language}`}
                className="text-sm cursor-pointer"
              >
                {language}
              </Label>
            </div>
          ))}
        </div>
        {filters.languages.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {filters.languages.map((language) => (
              <Badge
                key={language}
                variant="secondary"
                className="text-xs cursor-pointer"
                onClick={() => handleLanguageToggle(language)}
              >
                {language}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Verification & Online Status */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="verified" className="text-sm font-medium">
            Chỉ gia sư đã xác minh
          </Label>
          <Switch
            id="verified"
            checked={filters.verificationStatus}
            onCheckedChange={(checked) =>
              setFilters({ verificationStatus: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="online" className="text-sm font-medium">
            Đang hoạt động
          </Label>
          <Switch
            id="online"
            checked={filters.isOnline}
            onCheckedChange={(checked) => setFilters({ isOnline: checked })}
          />
        </div>
      </div>
    </div>
  );
}
