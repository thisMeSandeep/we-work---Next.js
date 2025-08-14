"use client"

import FreelancerHeader from "@/components/header/FreelancerHeader";
import { fetchAndSetUser } from "@/lib/fetchUser";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

const FreelancerLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    fetchAndSetUser();
  }, []);

  if (!user) return <div>Loading profile...</div>;

  return <div>
    <FreelancerHeader/>
    <main className="mt-10">
      {children}
    </main>
  </div>;
};

export default FreelancerLayout;
