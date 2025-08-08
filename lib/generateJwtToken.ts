import jwt from "jsonwebtoken";
type PayloadProps = {
  id: string;
  email: string;
};


const generateJwtToken = (payload: PayloadProps) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  if (!expiresIn) {
    throw new Error("JWT_EXPIRES_IN is not defined in environment variables");
  }
  try {
    // @ts-ignore
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
  } catch (err) {
    console.error("Error generating JWT token:", err);
    return null;
  }
};


export default generateJwtToken

