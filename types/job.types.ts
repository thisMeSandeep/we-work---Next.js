export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  role: "CLIENT" | "FREELANCER";
  profileImage: string;
  emailVerified: boolean;
  createdAt: string; // ISO date string
};

export type Client = {
  id: string;
  mobile: string;
  company: string;
  websiteLink: string;
  location: string;
  rating: number;
  user: User;
};

export type JobCategory =
  | "WEB_DEVELOPMENT"
  | "MOBILE_DEVELOPMENT"
  | "DESIGN"
  | "MARKETING";
export type JobSpeciality = "FRONTEND" | "BACKEND" | "FULLSTACK" | "UI/UX";

export type Job = {
  id: string;
  title: string;
  description: string;
  category: JobCategory;
  speciality: JobSpeciality;
  skills: string[];
  budget: number;
  status: "OPEN" | "CLOSED" | "IN_PROGRESS";
  numberOfProposals: number;
  completed: boolean;
  scopeSize: "SMALL" | "MEDIUM" | "LARGE";
  duration:
    | "LESS_THAN_ONE_MONTH"
    | "ONE_TO_THREE_MONTHS"
    | "MORE_THAN_THREE_MONTHS";
  experience: "BEGINNER" | "INTERMEDIATE" | "EXPERT";
  createdAt: string; // ISO date string
  connectsRequired: number;
  client: Client;
};
