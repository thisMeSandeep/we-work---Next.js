"use client"

import { useUserStore } from "@/store/useUserStore";
import FreelancerForm from "./profileComponent/FreelancerForm";

const Profile = () => {
 
  const user=useUserStore((state)=>state.user)
  const profile= user.freelancerProfile;

  return (
    <div>
      <FreelancerForm profile={profile}/>
    </div>
  );
};

export default Profile;
