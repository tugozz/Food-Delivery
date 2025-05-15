import { configDotenv } from "dotenv";
import { createTransport } from "nodemailer";

configDotenv();

const { EMAIL_PASS, EMAIL_USER } = process.env;

const transport = createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendVerificationLink = async (baseURL: string, email: string) => {
  await transport.sendMail({
    to: email,
    from: "EMAIL_USER",
    subject: "User Verification Link",
    html: `
    <div>
        <h1>User Verification Link</h1>
        <p style="color:red">This verification link is valid for 1 hours</p>
        <a href="${baseURL}" target="_blank">Verify</a>
    </div>
    `,
  });
};
