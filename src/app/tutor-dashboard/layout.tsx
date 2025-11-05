import { redirect } from "next/navigation";
import { TutorDashboardSidebar } from "@/components/tutor/TutorDashboardSidebar";
import { TutorDashboardHeader } from "@/components/tutor/TutorDashboardHeader";

export default function TutorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add authentication check for tutor role
  // if (!user || user.role !== 'tutor') {
  //   redirect('/signin?role=tutor');
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <TutorDashboardHeader />
      <div className="flex">
        <TutorDashboardSidebar />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
