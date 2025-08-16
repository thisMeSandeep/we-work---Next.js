"use client";

import { useUserStore } from "@/store/useUserStore";
import FreelancerForm from "./profileComponent/FreelancerForm";
import FileInput from "@/components/fileInput/FileInput";
import { ArrowRight, ChevronRight, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  // extract text placeholder
  const textPlaceholder = (user.firstName[0] + user.lastName[0]).toUpperCase();

  return (
    <div className="px-4 sm:px-6 max-w-7xl mx-auto">
      {/* profile image and name */}
      <div className="mx-auto flex flex-col sm:flex-row items-center justify-between border rounded-md px-4 py-4 sm:py-2 mb-10 gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <FileInput
            textPlaceholder={textPlaceholder}
            imageUrl={user.profileImage}
            isAvailable={user.freelancerProfile?.available}
          />
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-2xl sm:text-3xl font-semibold">
              {user.firstName + " " + user.lastName}
            </p>
            <p className="flex items-center justify-center sm:justify-start gap-2 text-gray-600">
              <MapPin className="size-5 text-green-500" />
              {user.country}
            </p>
          </div>
        </div>

        {/* button - takes full width on mobile, auto on larger screens */}
        <div className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto border-2 border-green-700 text-lg tracking-tight bg-transparent hover:bg-transparent text-green-700 px-6 sm:px-10 py-2 cursor-pointer">
            See public view
          </Button>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row md:items-start gap-6">
        {/* additional information */}
        <div className="w-full md:w-[380px] border p-4 rounded-md space-y-4 flex-shrink-0">
          {/* promotion card */}
          <div
            className="bg-gradient-to-r from-green-100 to-green-300 p-4 rounded-md"
            style={{
              boxShadow:
                "0 4px 12px rgba(173, 255, 47, 0.4), 0 6px 20px rgba(144, 238, 144, 0.4)",
            }}
          >
            <div className="flex items-center gap-2">
              <Star className="size-3" />
              <p className="flex-1 text-xs uppercase font-semibold tracking-wide">
                Freelancer plus offer
              </p>
              <ArrowRight />
            </div>
            <p className="text-xs mt-2 leading-relaxed">
              Get Freelancer Plus for 50% off one month and keep your profile
              visible during breaks. <br /> Limited time only
            </p>
          </div>

          {/* details */}
          <div className="p-4 space-y-5 bg-gray-50 rounded-md">
            <p className="text-sm">
              <span className="text-lg font-medium text-black">Email:</span>{" "}
              <span className="ml-4">{user.email}</span>
            </p>
            <p className="text-sm">
              <span className="text-lg font-medium text-black">
                Profession:
              </span>{" "}
              <span className="ml-4">
                {user.freelancerProfile?.profession || "Not available"}
              </span>
            </p>
            <p className="text-sm">
              <span className="text-lg font-medium text-black">Mobile:</span>{" "}
              <span className="ml-4">
                {user.freelancerProfile?.mobile || "Not available"}
              </span>
            </p>
            <p className="text-sm">
              <span className="text-lg font-medium text-black">Languages:</span>{" "}
              <span className="ml-4">
                {user.freelancerProfile?.languages || "Not available"}
              </span>
            </p>
            <p className="text-sm">
              <span className="text-lg font-medium text-black">
                Remaining connects:
              </span>{" "}
              <span className="ml-4">
                {user.freelancerProfile?.connects ?? "0"}
              </span>
            </p>

            <div className="flex items-center gap-1 text-green-700 font-medium cursor-pointer hover:underline">
              <span>Know more</span>
              <ChevronRight className="size-4" />
            </div>
          </div>
        </div>

        {/* form */}
        <div className="w-full flex-1">
          <FreelancerForm profile={editableProfile} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
