"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/types/user";




export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    const userInfo = localStorage.getItem("user-info");

    if (!token || !userInfo) {
      router.push("/login");
    } else {
      // setUser(JSON.parse(userInfo));
    }

    setIsLoading(false);
  }, [router]);

  const logout = () => {
    ["user-token", "user-info", "user-cookie"].forEach((key) =>
      localStorage.removeItem(key)
    );
    router.push("/login");
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout,
  };
}



