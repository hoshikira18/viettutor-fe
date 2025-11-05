"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tutor } from "@/types";
import {
  Star,
  MapPin,
  Clock,
  Shield,
  MessageSquare,
  Eye,
  Heart,
  DollarSign,
  Users,
  BookOpen,
  CheckCircle,
  Globe,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TutorCardProps {
  tutor: Tutor;
  onSendMessage: () => void;
  onToggleFavorite: () => void;
  isFavorite?: boolean;
}

export function TutorCard({
  tutor,
  onSendMessage,
  onToggleFavorite,
  isFavorite = false,
}: TutorCardProps) {
  const [isHeartHovered, setIsHeartHovered] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${price / 1000000}M`;
    } else if (price >= 1000) {
      return `${Math.round(price / 1000)}k`;
    }
    return price.toString();
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "rejected":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getVerificationText = (status: string) => {
    switch (status) {
      case "verified":
        return "Đã xác minh";
      case "pending":
        return "Chờ xác minh";
      case "rejected":
        return "Chưa xác minh";
      default:
        return "Chưa xác minh";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarImage src={tutor.avatar} alt={tutor.name} />
                <AvatarFallback className="text-lg font-semibold">
                  {getInitials(tutor.name)}
                </AvatarFallback>
              </Avatar>
              {tutor.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-lg truncate">{tutor.name}</h3>
                {tutor.verificationStatus.overall === "verified" && (
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                )}
              </div>

              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">
                    {tutor.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({tutor.reviewCount} đánh giá)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{tutor.district}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{tutor.experience} năm</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={onToggleFavorite}
            onMouseEnter={() => setIsHeartHovered(true)}
            onMouseLeave={() => setIsHeartHovered(false)}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                isFavorite || isHeartHovered
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400"
              )}
            />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="font-semibold text-lg text-green-600">
              {formatPrice(tutor.hourlyRate)} VND/giờ
            </span>
          </div>

          <Badge
            variant="secondary"
            className={cn(
              "text-xs",
              getVerificationColor(tutor.verificationStatus.overall)
            )}
          >
            <Shield className="h-3 w-3 mr-1" />
            {getVerificationText(tutor.verificationStatus.overall)}
          </Badge>
        </div>

        {/* Subjects */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Môn học</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {tutor.subjects.slice(0, 3).map((subject) => (
              <Badge key={subject} variant="outline" className="text-xs">
                {subject}
              </Badge>
            ))}
            {tutor.subjects.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tutor.subjects.length - 3} môn khác
              </Badge>
            )}
          </div>
        </div>

        {/* Bio */}
        <div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {tutor.bio}
          </p>
        </div>

        {/* Languages */}
        {tutor.languages && tutor.languages.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium">Ngôn ngữ</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {tutor.languages.slice(0, 2).map((language) => (
                <Badge key={language} variant="secondary" className="text-xs">
                  {language}
                </Badge>
              ))}
              {tutor.languages.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{tutor.languages.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Teaching Style */}
        {tutor.teachingStyle && (
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium">Phong cách dạy học</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {tutor.teachingStyle}
            </p>
          </div>
        )}

        <Separator />

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link href={`/dashboard/tutor/${tutor.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              Xem hồ sơ
            </Button>
          </Link>
          <Button className="flex-1" onClick={onSendMessage}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Liên hệ
          </Button>
        </div>

        {/* Online Status */}
        {tutor.isOnline && (
          <div className="flex items-center space-x-2 text-xs text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Đang hoạt động</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
