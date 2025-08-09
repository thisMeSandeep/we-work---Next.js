export const otpEmailTemplate = (otp: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>WeWork OTP</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="border-radius: 8px; overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td align="center" bgcolor="#16a34a" style="padding: 20px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">WeWork</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 30px; color: #333333; font-size: 16px;">
              <p>Hi there,</p>
              <p>Here is your One-Time Password (OTP) to proceed:</p>

              <div style="text-align: center; margin: 20px 0;">
                <span style="display: inline-block; background-color: #16a34a; color: #ffffff; padding: 12px 20px; font-size: 24px; font-weight: bold; letter-spacing: 2px; border-radius: 5px;">
                  ${otp}
                </span>
              </div>

              <p>This OTP will be valid for <strong>1 hour</strong>. Please do not share it with anyone.</p>
              <p>If you didn’t request this code, you can ignore this message.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td bgcolor="#f1f1f1" style="padding: 20px; text-align: center; font-size: 12px; color: #888888;">
              &copy; 2025 WeWork. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
