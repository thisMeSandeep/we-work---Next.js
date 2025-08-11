"use client"

import { fetchAndSetUser } from "@/lib/fetchUser";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

const FreelancerLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    fetchAndSetUser();
  }, []);

  if (!user) return <div>Loading profile...</div>;

  return <div>{children}</div>;
};

export default FreelancerLayout;
