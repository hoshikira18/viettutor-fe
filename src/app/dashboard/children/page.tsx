"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/stores/authStore";
import { useChildrenStore } from "@/stores/childrenStore";
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  BookOpen,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import { AddChildDialog } from "@/components/dashboard/AddChildDialog";
import { EditChildDialog } from "@/components/dashboard/EditChildDialog";
import { Child } from "@/types";

export default function ChildrenPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [deletingChild, setDeletingChild] = useState<Child | null>(null);

  const { user } = useAuthStore();
  const { children, loading, deleteChild } = useChildrenStore();

  const handleDeleteChild = async (child: Child) => {
    try {
      await deleteChild(child.id);
      toast.success(`Đã xóa thông tin ${child.name}`);
      setDeletingChild(null);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa thông tin con em");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Quản lý con em</h1>
                <p className="text-muted-foreground">
                  Thêm và quản lý thông tin con em để tìm gia sư phù hợp
                </p>
              </div>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm con em
              </Button>
            </div>

            {/* Children List */}
            {children.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {children.map((child) => (
                  <Card key={child.id} className="relative">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={child.avatar} />
                            <AvatarFallback>
                              {getInitials(child.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">
                              {child.name}
                            </CardTitle>
                            <CardDescription>
                              Lớp {child.grade} • {child.age} tuổi
                            </CardDescription>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setEditingChild(child)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setDeletingChild(child)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Subjects */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Môn học</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {child.subjects.slice(0, 3).map((subject) => (
                            <Badge
                              key={subject}
                              variant="secondary"
                              className="text-xs"
                            >
                              {subject}
                            </Badge>
                          ))}
                          {child.subjects.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{child.subjects.length - 3} môn khác
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Learning Goals */}
                      {child.learningGoals && (
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Mục tiêu học tập
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {child.learningGoals}
                          </p>
                        </div>
                      )}

                      {/* Struggling With */}
                      {child.strugglingWith && (
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Khó khăn hiện tại
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {child.strugglingWith}
                          </p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Tìm gia sư
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Xem lịch học
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* Empty State */
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">
                    Chưa có thông tin con em
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Hãy thêm thông tin con em để bắt đầu tìm kiếm gia sư phù
                    hợp. Chúng tôi sẽ giúp bạn kết nối với những gia sư tốt
                    nhất.
                  </p>
                  <Button onClick={() => setShowAddDialog(true)} size="lg">
                    <Plus className="mr-2 h-5 w-5" />
                    Thêm con em đầu tiên
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>

      {/* Add Child Dialog */}
      {showAddDialog && (
        <AddChildDialog
          open={showAddDialog}
          onClose={() => setShowAddDialog(false)}
          parentId={user?.id || ""}
        />
      )}

      {/* Edit Child Dialog */}
      {editingChild && (
        <EditChildDialog
          open={!!editingChild}
          onClose={() => setEditingChild(null)}
          child={editingChild}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingChild}
        onOpenChange={() => setDeletingChild(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa thông tin của {deletingChild?.name}?
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingChild && handleDeleteChild(deletingChild)}
              className="bg-red-600 hover:bg-red-700"
              disabled={loading}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
