import { z } from "zod";

// registration schema
export const registrationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  country: z.string().min(1, { message: "Country is required" }),
  role: z.enum(["FREELANCER", "CLIENT"], { message: "Invalid role" }),
});

export type RegistrationType = z.infer<typeof registrationSchema>;

// login schema
export const loginSchema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type LoginType = z.infer<typeof loginSchema>;

// freelancer profile schema
export const ExperienceLevelEnum = z.enum(["ENTRY", "INTERMEDIATE", "EXPERT"]);

//freelancer profile schema
export const freelancerProfileSchema = z.object({
  available: z.boolean().default(true),

  mobile: z.string().regex(/^\+?[0-9]{10,15}$/, {
    message: "Mobile number must be 10-15 digits and may start with +",
  }),

  profession: z.string().min(2, { message: "Profession is required" }),

  bio: z
    .string()
    .min(10, { message: "Bio should be at least 10 characters long" })
    .max(1000, { message: "Bio should not exceed 1000 characters" }),

  skills: z
    .array(z.string().min(1, { message: "Skill name required" }))
    .nonempty({ message: "At least one skill is required" }),

  perHourRate: z.number().min(1, { message: "Rate must be greater than 0" }),

  languages: z.string().min(1, { message: "Languages are required" }),

  portfolioLink: z
    .string()
    .url({ message: "Invalid portfolio link" })
    .optional()
    .nullable(),

  otherLink: z.string().url({ message: "Invalid link" }).optional().nullable(),

  experienceLevel: ExperienceLevelEnum,

  file: z.string().url({ message: "Invalid file URL" }).optional().nullable(),
});

export type FreelancerProfileType = z.infer<typeof freelancerProfileSchema>;

// proposal schema

export const proposalSchema = z.object({
  jobId: z.string(),
  freelancerProfileId: z.string(),
  coverLetter: z
    .string()
    .min(10, "Cover letter must be at least 10 characters")
    .max(2000, "Cover letter must be at most 2000 characters"),
  message: z
    .string()
    .max(1000, "Message must be at most 1000 characters")
    .optional()
    .nullable(),
  rate: z
    .number()
    .min(0, "Rate must be a positive number")
    .max(100000, "Rate seems too high"),
});

export type ProposalType = z.infer<typeof proposalSchema>;


