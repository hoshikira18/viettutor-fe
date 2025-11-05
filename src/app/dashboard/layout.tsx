"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useChildrenStore } from "@/stores/childrenStore";
import { useSessionStore } from "@/stores/sessionStore";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated, loading, initialized, initialize } =
    useAuthStore();
  const { subscribeToChildren, unsubscribeFromChildren } = useChildrenStore();
  const { subscribeToSessions, unsubscribeFromSessions } = useSessionStore();

  useEffect(() => {
    // Initialize auth state
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (initialized && !isAuthenticated && !loading) {
      router.push("/signin");
    }
  }, [isAuthenticated, initialized, loading, router]);

  useEffect(() => {
    if (user && isAuthenticated) {
      // Subscribe to real-time updates for children and sessions
      subscribeToChildren(user.id);
      subscribeToSessions(user.id);

      // Cleanup subscriptions on unmount
      return () => {
        unsubscribeFromChildren();
        unsubscribeFromSessions();
      };
    }
  }, [
    user,
    isAuthenticated,
    subscribeToChildren,
    subscribeToSessions,
    unsubscribeFromChildren,
    unsubscribeFromSessions,
  ]);

  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to signin
  }

  return <>{children}</>;
}
