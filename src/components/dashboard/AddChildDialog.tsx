"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useChildrenStore } from "@/stores/childrenStore";
import { SUBJECTS, GRADE_LEVELS } from "@/types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const addChildSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  age: z
    .number()
    .min(3, "Tuổi phải từ 3 trở lên")
    .max(25, "Tuổi không được quá 25"),
  grade: z
    .number()
    .min(1, "Lớp phải từ 1 trở lên")
    .max(12, "Lớp không được quá 12"),
  subjects: z.array(z.string()).min(1, "Vui lòng chọn ít nhất 1 môn học"),
  learningGoals: z.string().optional(),
  personality: z.string().optional(),
  strugglingWith: z.string().optional(),
});

type AddChildForm = z.infer<typeof addChildSchema>;

interface AddChildDialogProps {
  open: boolean;
  onClose: () => void;
  parentId: string;
}

export function AddChildDialog({
  open,
  onClose,
  parentId,
}: AddChildDialogProps) {
  const { addChild, loading } = useChildrenStore();

  const form = useForm<AddChildForm>({
    resolver: zodResolver(addChildSchema),
    defaultValues: {
      name: "",
      age: 6,
      grade: 1,
      subjects: [],
      learningGoals: "",
      personality: "",
      strugglingWith: "",
    },
  });

  const onSubmit = async (data: AddChildForm) => {
    try {
      await addChild(parentId, data);
      toast.success("Đã thêm thông tin con em thành công!");
      form.reset();
      onClose();
    } catch (error) {
      // Error is handled by the store
    }
  };

  const handleSubjectChange = (subject: string, checked: boolean) => {
    const currentSubjects = form.getValues("subjects");
    if (checked) {
      form.setValue("subjects", [...currentSubjects, subject]);
    } else {
      form.setValue(
        "subjects",
        currentSubjects.filter((s) => s !== subject)
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thêm thông tin con em</DialogTitle>
          <DialogDescription>
            Nhập thông tin chi tiết về con em để chúng tôi có thể tìm gia sư phù
            hợp nhất.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập họ và tên" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Age */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tuổi *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập tuổi"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Grade */}
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lớp *</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn lớp" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GRADE_LEVELS.map((grade) => (
                          <SelectItem key={grade} value={grade.toString()}>
                            Lớp {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Subjects */}
            <FormField
              control={form.control}
              name="subjects"
              render={() => (
                <FormItem>
                  <FormLabel>Môn học quan tâm *</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {SUBJECTS.map((subject) => (
                      <FormItem
                        key={subject}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={form.watch("subjects").includes(subject)}
                            onCheckedChange={(checked) =>
                              handleSubjectChange(subject, checked as boolean)
                            }
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          {subject}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Learning Goals */}
            <FormField
              control={form.control}
              name="learningGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mục tiêu học tập</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ví dụ: Cải thiện điểm số môn Toán, chuẩn bị thi đại học..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Personality */}
            <FormField
              control={form.control}
              name="personality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tính cách và sở thích</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ví dụ: Con tôi khá nhút nhát, thích đọc sách, học tốt môn Văn..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Struggling With */}
            <FormField
              control={form.control}
              name="strugglingWith"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khó khăn hiện tại</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ví dụ: Khó hiểu bài Toán hình học, không tự tin khi nói tiếng Anh..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Hủy
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang thêm...
                  </>
                ) : (
                  "Thêm con em"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
