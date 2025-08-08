import {z} from "zod"

// registration schema
export const registrationSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),        
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    country: z.string().min(1, { message: "Country is required" }),
    role: z.enum(["FREELANCER", "CLIENT"], { message: "Invalid role" }),
})

export type RegistrationType = z.infer<typeof registrationSchema>

// login schema
export const loginSchema = z.object({
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

export type LoginType = z.infer<typeof loginSchema>
