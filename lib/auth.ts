import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { type PayloadProps } from "./generateJwtToken";

export const auth = async () => {
  try {
    const cookieStore = await cookies(); 
    const token = cookieStore.get("auth_token")?.value;

    if (!token) throw new Error("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload &
      PayloadProps;

    if (!decoded.userId) throw new Error("Token not verified");

    return {
      userId: decoded.userId,
      role: decoded.role,
    };
  } catch (err) {
    console.error("Auth error:", err);
    throw new Error("Invalid token");
  }
};
