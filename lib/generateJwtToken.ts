import jwt from "jsonwebtoken";
export type PayloadProps = {
  userId: string;
  email: string;
  role:string
};


const generateJwtToken = (payload: PayloadProps) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    // @ts-ignore
    const token = jwt.sign(payload, secret, { expiresIn :'7d'});
    return token;
  } catch (err) {
    console.error("Error generating JWT token:", err);
    return null;
  }
};


export default generateJwtToken

