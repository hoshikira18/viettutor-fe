"use client";

import { useState } from "react";
import {
  Star,
  MapPin,
  Clock,
  CheckCircle,
  Eye,
  MessageSquare,
  Heart,
  DollarSign,
  Users,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tutor } from "@/types";
import { cn } from "@/lib/utils";

interface PublicTutorCardProps {
  tutor: Tutor;
  onViewProfile: () => void;
  onContactTutor: () => void;
}

export function PublicTutorCard({
  tutor,
  onViewProfile,
  onContactTutor,
}: PublicTutorCardProps) {
  const [isFavoriteHovered, setIsFavoriteHovered] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getVerificationBadge = () => {
    if (tutor.verificationStatus.overall === "verified") {
      return (
        <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <CheckCircle className="h-3 w-3" />
          <span className="text-xs font-medium">Đã xác thực</span>
        </div>
      );
    }
    return null;
  };

  const getTotalAvailableSlots = () => {
    return Object.values(tutor.availability).filter((slot) => slot.isAvailable)
      .length;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-0 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 ring-2 ring-blue-100">
              <AvatarImage src={tutor.avatar} alt={tutor.name} />
              <AvatarFallback className="bg-linear-to-br from-blue-400 to-purple-500 text-white font-semibold">
                {getInitials(tutor.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {tutor.name}
              </h3>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium text-gray-900">
                    {tutor.rating}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({tutor.reviewCount})
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <MapPin className="h-3 w-3" />
                  <span className="text-xs">{tutor.district}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
            onMouseEnter={() => setIsFavoriteHovered(true)}
            onMouseLeave={() => setIsFavoriteHovered(false)}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isFavoriteHovered
                  ? "text-red-500 fill-current"
                  : "text-gray-400"
              )}
            />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Subjects */}
        <div className="flex flex-wrap gap-1">
          {tutor.subjects.slice(0, 3).map((subject, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
            >
              {subject}
            </Badge>
          ))}
          {tutor.subjects.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tutor.subjects.length - 3}
            </Badge>
          )}
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 line-clamp-2">{tutor.bio}</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center space-y-1 p-2 bg-gray-50 rounded-lg">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-600">
              {tutor.experience} năm
            </span>
          </div>
          <div className="flex flex-col items-center space-y-1 p-2 bg-gray-50 rounded-lg">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-600">
              {getTotalAvailableSlots()} buổi/tuần
            </span>
          </div>
          <div className="flex flex-col items-center space-y-1 p-2 bg-gray-50 rounded-lg">
            <BookOpen className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-600">
              {tutor.subjects.length} môn
            </span>
          </div>
        </div>

        {/* Price and Verification */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-lg font-bold text-green-600">
              {formatCurrency(tutor.hourlyRate)}
            </span>
            <span className="text-sm text-gray-500">/giờ</span>
          </div>
          {getVerificationBadge()}
        </div>

        {/* Specializations */}
        {tutor.specializations && tutor.specializations.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tutor.specializations.slice(0, 2).map((spec, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs text-purple-700 border-purple-200"
              >
                {spec}
              </Badge>
            ))}
            {tutor.specializations.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{tutor.specializations.length - 2}
              </Badge>
            )}
          </div>
        )}

        <Separator />

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1" onClick={onViewProfile}>
            <Eye className="h-4 w-4 mr-2" />
            Xem hồ sơ
          </Button>
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={onContactTutor}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Liên hệ
          </Button>
        </div>

        {/* Online Status */}
        {tutor.isOnline && (
          <div className="flex items-center justify-center space-x-2 text-xs text-green-600 bg-green-50 py-2 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Đang hoạt động</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
