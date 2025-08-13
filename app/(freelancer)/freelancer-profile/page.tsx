"use client";

import { useUserStore } from "@/store/useUserStore";
import FreelancerForm from "./profileComponent/FreelancerForm";

const Profile = () => {
  const user = useUserStore((state) => state.user);
  const profile = user.freelancerProfile;

  // Only keep editable fields
  const editableProfile = profile
    ? {
        available: profile.available,
        mobile: profile.mobile,
        profession: profile.profession,
        bio: profile.bio,
        skills: profile.skills,
        perHourRate: profile.perHourRate,
        languages: profile.languages,
        portfolioLink: profile.portfolioLink,
        otherLink: profile.otherLink,
        experienceLevel: profile.experienceLevel,
        file: profile.file, 
      }
    : null;

  return (
    <div>
      <FreelancerForm profile={editableProfile} />
    </div>
  );
};

export default Profile;
