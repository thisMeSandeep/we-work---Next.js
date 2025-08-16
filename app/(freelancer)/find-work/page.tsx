import WorkCard from "@/components/workcard/WorkCard";
import { Job } from "@/types/job.types";

const jobs: Job[] = [
  {
    id: "job-001",
    title: "Build a Responsive Portfolio Website",
    description:
      "Looking for a frontend developer to design and build a modern, responsive portfolio website using Next.js and Tailwind CSS.",
    category: "WEB_DEVELOPMENT",
    speciality: "FRONTEND",
    skills: ["Next.js", "Tailwind CSS", "JavaScript", "Responsive Design"],
    budget: 500.0,
    status: "OPEN",
    numberOfProposals: 12,
    completed: false,
    scopeSize: "SMALL",
    duration: "LESS_THAN_ONE_MONTH",
    experience: "INTERMEDIATE",
    createdAt: "2025-08-16T07:00:00.000Z",
    connectsRequired: 2,
    client: {
      id: "cl-101",
      mobile: "+1-555-123-4567",
      company: "Creative Web Studio",
      websiteLink: "https://creativeweb.dev",
      location: "San Francisco, USA",
      rating: 4.8,
      user: {
        id: "u-101",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        country: "USA",
        role: "CLIENT",
        profileImage: "https://example.com/john.png",
        emailVerified: true,
        createdAt: "2025-07-01T09:30:00.000Z",
      },
    },
  },
  {
    id: "job-002",
    title: "Mobile App UI Design",
    description:
      "Need a UI/UX designer to create interactive mobile app screens with Figma and prototyping.",
    category: "DESIGN",
    speciality: "UI/UX",
    skills: ["Figma", "Prototyping", "User Experience", "Mobile Design"],
    budget: 700.0,
    status: "OPEN",
    numberOfProposals: 8,
    completed: false,
    scopeSize: "MEDIUM",
    duration: "ONE_TO_THREE_MONTHS",
    experience: "BEGINNER",
    createdAt: "2025-08-15T10:00:00.000Z",
    connectsRequired: 3,
    client: {
      id: "cl-102",
      mobile: "+1-555-987-6543",
      company: "App Creators Inc.",
      websiteLink: "https://appcreators.com",
      location: "New York, USA",
      rating: 4.5,
      user: {
        id: "u-102",
        firstName: "Alice",
        lastName: "Smith",
        email: "alice.smith@example.com",
        country: "USA",
        role: "CLIENT",
        profileImage: "https://example.com/alice.png",
        emailVerified: true,
        createdAt: "2025-06-20T14:45:00.000Z",
      },
    },
  },
  {
    id: "job-003",
    title: "Backend API Development",
    description:
      "Looking for a backend developer to build RESTful APIs using Node.js and Express for our web application.",
    category: "WEB_DEVELOPMENT",
    speciality: "BACKEND",
    skills: ["Node.js", "Express", "MongoDB", "REST API"],
    budget: 1000.0,
    status: "IN_PROGRESS",
    numberOfProposals: 15,
    completed: false,
    scopeSize: "LARGE",
    duration: "MORE_THAN_THREE_MONTHS",
    experience: "EXPERT",
    createdAt: "2025-08-14T09:00:00.000Z",
    connectsRequired: 5,
    client: {
      id: "cl-103",
      mobile: "+1-555-246-1357",
      company: "Backend Solutions Ltd.",
      websiteLink: "https://backendsolutions.io",
      location: "Los Angeles, USA",
      rating: 4.9,
      user: {
        id: "u-103",
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob.johnson@example.com",
        country: "USA",
        role: "CLIENT",
        profileImage: "https://example.com/bob.png",
        emailVerified: true,
        createdAt: "2025-05-12T11:15:00.000Z",
      },
    },
  },
];

const FindWork = () => {
  return (
    <div className="px-6 max-w-7xl mx-auto space-y-8">
      {jobs.map((job, i) => (
        <WorkCard key={i} job={job} />
      ))}
    </div>
  );
};

export default FindWork;
