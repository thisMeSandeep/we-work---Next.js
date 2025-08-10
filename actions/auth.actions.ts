"use server";

import { db } from "@/lib/db";
import sendEmail from "@/lib/email";
import generateJwtToken from "@/lib/generateJwtToken";
import { otpEmailTemplate } from "@/lib/otpEmailTemplate";
import {
  loginSchema,
  LoginType,
  registrationSchema,
  type RegistrationType,
} from "@/lib/validation";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";


// register user
export const registerUserAction = async (data: RegistrationType) => {
  // validate data
  const result = registrationSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: result.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  try {
    // check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    // hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    // generate six digit otp
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const { password, ...rest } = data;

    // create user
    const user = await db.user.create({
      data: {
        ...rest,
        password: hashedPassword,
        emailOTP: otp.toString(),
        otpExpiresAt,
      },
    });

    // send otp to email
    const res = await sendEmail({
      to: user.email,
      subject: "Verify your email",
      html: otpEmailTemplate(otp.toString()),
    });

    if (!res.success) {
      throw new Error("Failed to send email");
    }

    return {
      success: true,
      message: "Registration successful , please verify your email",
      otpLink: res.viewLink,
    };
  } catch (err:any) {
    console.error("Error registering user:", err);
    return {
      success: false,
      message: "Failed to create user",
    };
  }
};

// verify otp and email and login user
type OtpType = {
  email: string;
  otp: string;
};

export const verifyOtpAndLoginAction = async ({ email, otp }: OtpType) => {
  if (!email || !otp) {
    return {
      success: false,
      message: "Email and OTP are required",
    };
  }

  try {
    // get user
    const user = await db.user.findUnique({
      where: { email },
      omit: { password: true},
    });

    if (!user) {
      return {
        success: false,
        message: "User not found , please register first",
      };
    }

    // match Otp and expiration time
    if (
      user.emailOTP !== otp ||
      !user.otpExpiresAt ||
      user.otpExpiresAt < new Date()
    ) {
      return {
        success: false,
        message: "Invalid OTP or OTP has expired",
      };
    }

    // remove emailOTP and otpExpiresAt field
      await db.user.update({
      where: { email },
      data: {
        emailVerified: true,
        emailOTP: null,
        otpExpiresAt: null,
      },
    });

    // generate jwt token
    const token = generateJwtToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    if (!token) {
      throw new Error("Failed to generate token")
    }

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // return user
    return {
      success: true,
      message: "Email verified successfully",
      user,
    };
  } catch (err) {
    console.error("Error verifying OTP:", err);
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

// login user
export const loginUserAction = async (data: LoginType) => {
  // validate data
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  try {
    // check if user exists
    const user = await db.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found , please register first",
      };
    }
    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return {
        success: false,
        message: "Invalid password",
      };
    }

    // check if email is verified or not
    if (!user.emailVerified) {
      return {
        success: false,
        message: "Please verify your email first",
      };
    }

    // generate token
    const token = generateJwtToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    if (!token) {
       throw new Error("Failed to generate token")
    }

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // return data
    return {
      success: true,
      message: "Login successful",
      user,
    };
  } catch (err) {
    console.error("Error logging in user:", err);
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

//logout user
export const logoutUserAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  return {
    success: true,
    message: "Logout successful",
  };
};
