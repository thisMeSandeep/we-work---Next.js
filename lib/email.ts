import nodemailer from "nodemailer";
import { success } from "zod";

// Create transporter using Ethereal
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "bridie.oreilly48@ethereal.email",
    pass: "w4ztTrTEAxdG9mpnRV",
  },
});

type EmailProps = {
  to: string;
  subject: string;
  html: string;
};

const sendEmail = async ({ to, subject, html }: EmailProps) => {
  try {
    const info = await transporter.sendMail({
      from: `"WeWork" <no-reply@wework.com>`,
      to,
      subject,
      html,
    });
    return {
        success:true,
        viewLink:nodemailer.getTestMessageUrl(info),
    }
  } catch (err) {
    console.error(
      "Email sending failed:",
      err instanceof Error ? err.message : err
    );
    return {
        success:false
    }
  }
};

export default sendEmail;
