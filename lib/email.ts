import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAIL_TRAP || "";

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "snayal50@gmail.com", 
  name: "WeWork",
};


export async function sendOtpEmail(receiverEmail: string, otpCode: string) {
  const recipients = [{ email: receiverEmail }];

  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      template_uuid: "6d3630d8-5c18-45cf-9670-7a4e1b899a31", 
      template_variables: {
        OTP_CODE: otpCode,
      },
    });

    return { success: true, data: response };
  } catch (error) {
    console.error("Failed to send OTP email via Mailtrap:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
