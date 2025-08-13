"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Pencil, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButton from "@/components/button/SubmitButton";
import { fillFreelancerProfileAction } from "@/actions/freelancer.actions";
import { toast } from "sonner";
import { fetchAndSetUser } from "@/lib/fetchUser";
import FilePreview from "@/components/preview/FilePreview";

const experienceLevel = ["ENTRY", "INTERMEDIATE", "EXPERT"] as const;

type FreelancerFormType = {
  available: boolean;
  mobile: string;
  profession: string;
  bio: string;
  skills: string[];
  perHourRate: number;
  languages: string;
  portfolioLink?: string;
  otherLink?: string;
  experienceLevel: (typeof experienceLevel)[number] | "";
  file?: File | string;
};

type FreelancerFormProps = {
  profile: Partial<FreelancerFormType> | null;
};

type ActionArg = Parameters<typeof fillFreelancerProfileAction>[0];

const defaultValues: FreelancerFormType = {
  available: true,
  mobile: "",
  profession: "",
  bio: "",
  skills: [],
  perHourRate: 8,
  languages: "",
  portfolioLink: "",
  otherLink: "",
  experienceLevel: "",
  file: "",
};

const FreelancerForm = ({ profile }: FreelancerFormProps) => {
  const [editMode, setEditMode] = useState(false);
  const [skill, setSkill] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formDefaultValues = { ...defaultValues, ...profile };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<FreelancerFormType>({
    defaultValues: formDefaultValues,
  });

  // add skill to skillList
  const addSkill = () => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    const currentSkills = watch("skills") || [];
    if (currentSkills.includes(trimmed)) {
      setSkill("");
      return;
    }
    setValue("skills", [...currentSkills, trimmed], {
      shouldDirty: true,
      shouldValidate: true,
    });
    setSkill("");
  };

  // remove skill
  const removeSkill = (name: string) => {
    const currentSkills = watch("skills") || [];
    const filtered = currentSkills.filter((s: string) => s !== name);
    setValue("skills", filtered, { shouldDirty: true, shouldValidate: true });
  };

  // handle form submit
  const onSubmit = async (data: FreelancerFormType) => {
    setIsLoading(true);
    try {
      if (!data.experienceLevel) {
        toast.error("Experience level is required");
        return;
      }
      const payload = {
        ...data,
        experienceLevel:
          data.experienceLevel as (typeof experienceLevel)[number],
      } as ActionArg;
      const response = await fillFreelancerProfileAction(payload);
      if (response.success) {
        await fetchAndSetUser();
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
      setEditMode(false);
    }
  };

  const watchedValues = watch();

  return (
    <div className="mx-auto p-6 bg-white rounded shadow">
      {/* edit button */}
      <div className="flex items-center justify-between mb-6 border rounded-md px-4 py-2">
        <p className="text-2xl font-medium">Edit Your profile</p>
        {editMode ? (
          <button
            type="button"
            onClick={() => setEditMode(false)}
            className="flex items-center gap-2 text-green-700 hover:text-green-500 border-2 border-green-700 rounded-full p-2 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 text-green-700 hover:text-green-500 border-2 border-green-700 rounded-full p-2 cursor-pointer"
          >
            <Pencil className="h-5 w-5" />
          </button>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 border rounded-md px-4 py-2"
      >
        {/* Available */}
        <div>
          <Label htmlFor="available" className="font-medium text-lg">
            Available
          </Label>
          {editMode ? (
            <Controller
              name="available"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="available"
                  checked={!!field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                  className="size-5 mt-2 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 border border-black/80 focus:border-2 focus-visible:border-green-500  focus:ring-0 focus-visible:ring-0 focus:outline-none"
                />
              )}
            />
          ) : (
            <p className="mt-1">{watchedValues.available ? "Yes" : "No"}</p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <Label htmlFor="mobile" className="font-medium text-lg">
            Mobile
          </Label>
          {editMode ? (
            <>
              <Input
                id="mobile"
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^\+?[0-9]{10,15}$/,
                    message:
                      "Enter a valid mobile number (10-15 digits, may start with +)",
                  },
                })}
                placeholder="eg. +12345678901"
                inputMode="tel"
                aria-invalid={!!errors.mobile}
                className="mt-2 pr-10 w-full border border-black/80 md:py-5 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
              />
              {errors.mobile && (
                <p className="text-red-600 mt-1">{errors.mobile.message}</p>
              )}
            </>
          ) : (
            <p className="mt-1">{formDefaultValues.mobile || "-"}</p>
          )}
        </div>

        {/* Profession */}
        <div>
          <Label htmlFor="profession" className="font-medium text-lg">
            Profession
          </Label>
          {editMode ? (
            <>
              <Input
                id="profession"
                {...register("profession", {
                  required: "Profession is required",
                })}
                placeholder="eg. Web Developer"
                aria-invalid={!!errors.profession}
                className="mt-2 pr-10 w-full border border-black/80 md:py-5 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
              />
              {errors.profession && (
                <p className="text-red-600 mt-1">{errors.profession.message}</p>
              )}
            </>
          ) : (
            <p className="mt-1">{watchedValues.profession || "-"}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <Label htmlFor="bio" className="font-medium text-lg">
            Bio
          </Label>
          {editMode ? (
            <>
              <textarea
                id="bio"
                {...register("bio", { required: "Bio is required" })}
                rows={3}
                placeholder="eg. I'm a skilled full stack developer..."
                aria-invalid={!!errors.bio}
                className="mt-2 px-2 py-1 w-full border border-black/80 md:py-5 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none rounded-md"
              />
              {errors.bio && (
                <p className="text-red-600 mt-1">{errors.bio.message}</p>
              )}
            </>
          ) : (
            <p className="mt-1 whitespace-pre-wrap">
              {watchedValues.bio || "-"}
            </p>
          )}
        </div>

        {/* Skills */}
        <div>
          <Label htmlFor="skills" className="font-medium text-lg">
            Add skills
          </Label>
          {editMode ? (
            <>
              <div className="relative">
                <Input
                  id="skills"
                  onChange={(e) => setSkill(e.target.value)}
                  value={skill}
                  placeholder="eg. Html"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  className="mt-2 pr-10 w-full border border-black/80 md:py-5 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
                />
                {/* add icon */}
                <button
                  type="button"
                  aria-label="Add skill"
                  onClick={() => addSkill()}
                  className="absolute right-1.5 top-1.5 p-1 rounded-full text-green-700 hover:text-green-500"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              {errors.skills && (
                <p className="text-red-600 mt-1">
                  At least one skill is required
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.isArray(watchedValues.skills) &&
                  watchedValues.skills.length > 0 &&
                  watchedValues.skills.map((item: string) => (
                    <span
                      key={item}
                      className="flex items-center gap-2 rounded-lg bg-green-700 text-white px-2 py-1"
                    >
                      {item}
                      <button
                        type="button"
                        aria-label={`Remove ${item}`}
                        onClick={() => removeSkill(item)}
                      >
                        <X className="size-4 cursor-pointer" />
                      </button>
                    </span>
                  ))}
              </div>
            </>
          ) : (
            <div className="flex flex-wrap gap-2 mt-2">
              {Array.isArray(watchedValues.skills) &&
                watchedValues.skills.length > 0 &&
                watchedValues.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-green-700 text-white px-2 py-1"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          )}
        </div>

        {/* Per Hour Rate */}
        <div>
          <Label htmlFor="perHourRate" className="font-medium text-lg">
            Hourly Rate(USD)
          </Label>
          {editMode ? (
            <>
              <Input
                id="perHourRate"
                type="number"
                {...register("perHourRate", {
                  required: "Hourly rate is required",
                  min: {
                    value: 1,
                    message: "Hourly rate must be greater than 0",
                  },
                  valueAsNumber: true,
                })}
                placeholder="eg. 10"
                aria-invalid={!!errors.perHourRate}
                className="mt-2 pr-10 w-full border border-black/80 md:py-5 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
              />
              {errors.perHourRate && (
                <p className="text-red-600 mt-1">
                  {errors.perHourRate.message}
                </p>
              )}
            </>
          ) : (
            <p className="mt-1">{watchedValues.perHourRate ?? "-"}</p>
          )}
        </div>

        {/* Languages */}
        <div>
          <Label htmlFor="languages" className="font-medium text-lg">
            Languages
          </Label>
          {editMode ? (
            <>
              <Input
                id="languages"
                {...register("languages", {
                  required: "Languages are required",
                })}
                placeholder="eg. English , Hindi ..."
                aria-invalid={!!errors.languages}
                className="mt-2 pr-10 w-full border border-black/80 md:py-5 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
              />
              {errors.languages && (
                <p className="text-red-600 mt-1">{errors.languages.message}</p>
              )}
            </>
          ) : (
            <p className="mt-1">{watchedValues.languages || "-"}</p>
          )}
        </div>

        {/* Experience Level */}
        <div>
          <Label htmlFor="experienceLevel" className="font-medium text-lg">
            Experience Level
          </Label>
          {editMode ? (
            <>
              <Controller
                name="experienceLevel"
                control={control}
                rules={{ required: "Experience level is required" }}
                render={({ field }) => (
                  <>
                    <Select
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <SelectTrigger
                        id="experienceLevel"
                        className="mt-2 pr-10 w-full border border-black/80 md:py-5 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
                      >
                        <SelectValue placeholder="Choose experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevel.map((item) => (
                          <SelectItem value={item} key={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.experienceLevel && (
                      <p className="text-red-600 mt-1">
                        {errors.experienceLevel.message}
                      </p>
                    )}
                  </>
                )}
              />
            </>
          ) : (
            <p className="mt-1">{watchedValues.experienceLevel || "-"}</p>
          )}
        </div>

        {/* Portfolio Link */}
        <div>
          <Label htmlFor="portfolioLink" className="font-medium text-lg">
            Portfolio Link
          </Label>
          {editMode ? (
            <>
              <Input
                id="portfolioLink"
                {...register("portfolioLink", {
                  pattern: {
                    value: /^$|^(https?:\/\/.*)/,
                    message: "Invalid portfolio URL",
                  },
                })}
                placeholder="eg. www.myportfolio.com"
                aria-invalid={!!errors.portfolioLink}
                className="mt-2 pr-10 w-full border border-black/80 md:py-5 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
              />
              {errors.portfolioLink && (
                <p className="text-red-600 mt-1">
                  {errors.portfolioLink.message}
                </p>
              )}
            </>
          ) : (
            <p className="mt-1">
              {watchedValues.portfolioLink ? (
                <a
                  href={watchedValues.portfolioLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {watchedValues.portfolioLink}
                </a>
              ) : (
                "-"
              )}
            </p>
          )}
        </div>

        {/* Other Link */}
        <div>
          <Label htmlFor="otherLink" className="font-medium text-lg">
            Other Link
          </Label>
          {editMode ? (
            <>
              <Input
                id="otherLink"
                {...register("otherLink", {
                  pattern: {
                    value: /^$|^(https?:\/\/.*)/,
                    message: "Invalid other link URL",
                  },
                })}
                placeholder="eg. www.mylinkedin.com"
                aria-invalid={!!errors.otherLink}
                className="mt-2 pr-10 w-full border border-black/80 md:py-5 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
              />
              {errors.otherLink && (
                <p className="text-red-600 mt-1">{errors.otherLink.message}</p>
              )}
            </>
          ) : (
            <p className="mt-1">
              {watchedValues.otherLink ? (
                <a
                  href={watchedValues.otherLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {watchedValues.otherLink}
                </a>
              ) : (
                "-"
              )}
            </p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <Label htmlFor="file" className="font-medium text-lg">
            Resume/CV (PDF only)
          </Label>
          {editMode ? (
            <Input
              type="file"
              id="file"
               accept="application/pdf"
              onChange={(e) =>
                setValue("file", e.target.files?.[0] ?? "", {
                  shouldDirty: true,
                })
              }
              className="mt-2 pr-10 w-full border border-black/80 md:py-5 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
            />
          ) : (
            <div className="mt-1">
              {typeof watchedValues.file === "string" ? (
                watchedValues.file ? (
                  <FilePreview fileUrl={watchedValues.file} />
                ) : (
                  "-"
                )
              ) : watchedValues.file instanceof File ? (
                <p>{watchedValues.file.name}</p>
              ) : (
                "Uploaded file"
              )}
            </div>
          )}
        </div>

        {/* Save button */}
        {editMode && (
          <SubmitButton isLoading={isLoading} disabled={isLoading}>
            Save
          </SubmitButton>
        )}
      </form>
    </div>
  );
};

export default FreelancerForm;
