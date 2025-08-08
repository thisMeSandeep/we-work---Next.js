"use server";

import { db } from "@/lib/db";
import { sendOtpEmail } from "@/lib/email";
import generateJwtToken from "@/lib/generateJwtToken";
import {
  loginSchema,
  LoginType,
  registrationSchema,
  type RegistrationType,
} from "@/lib/validation";
import bcrypt from "bcryptjs";

// register user

export const registerUser = async (data: RegistrationType) => {
  // validate data
  const result = registrationSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((issue) => issue.message).join(", "),
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
        error: "User already exists",
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
    const sendResult = await sendOtpEmail(user.email, otp.toString());
    if (!sendResult.success) {
      console.warn("OTP email failed:", sendResult.error);
    }

    return {
      success: true,
      message:
        "Registration successfull , please check your email for verification",
    };
  } catch (err) {
    console.error("Error registering user:", err);
    return {
      success: false,
      error: "Failed to create user",
    };
  }
};

// verify otp and email and login user
export const verifyOtpAndLogin = async (email: string, otp: string) => {
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
    const token = generateJwtToken({ id: user.id, email: user.email });

    if (!token) {
      return {
        success: false,
        message: "Failed to generate token",
      };
    }

    // return user
    return {
      success: true,
      message: "Email verified successfully",
      token,
      user,
    };
  } catch (err) {
    console.error("Error verifying OTP:", err);
    return {
      success: false,
      message: "Failed to verify OTP",
    };
  }
};

// login user
export const loginUser = async (data: LoginType) => {
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
        error: "User not found , please register first",
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
        error: "Invalid password",
      };
    }

    // check if email is verified or not
    if (!user.emailVerified) {
      return {
        success: false,
        error: "Please verify your email first",
      };
    }

    // generate token
    const token = generateJwtToken({ id: user.id, email: user.email });

    // return data
    return {
      success: true,
      message: "Login successful",
      token,
      user,
    };
  } catch (err) {
    console.error("Error logging in user:", err);
    return {
      success: false,
      error: "Failed to login user",
    };
  }
};
