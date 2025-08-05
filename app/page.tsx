"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (pathname === "/") {
      router.push("/login");
    }
  }, [pathname, router]);

  return <></>;
};

export default Page;


