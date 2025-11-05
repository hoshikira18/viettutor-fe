"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initialize } = useAuthStore();

  useEffect(() => {
    // Initialize auth state when the app starts
    initialize();
  }, [initialize]);

  return <>{children}</>;
}
