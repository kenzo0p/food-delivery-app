import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./HTMLemail";
import { client, sender } from "./mailtrap";
export const sendEmailverification = async (
  email: string,
  verificationToken: string
) => {
  const recipients = [
    {
      email,
    },
  ];
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Verify your email",

      html: htmlContent.replace("{verificationToken}", verificationToken),
      category: "Email Verification",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send new email");
  }
};
export const sendWelcomeEamil = async (email: string, name: string) => {
  const recipients = [
    {
      email,
    },
  ];
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Welcome to omEats",
      html: htmlContent,
      template_variables: {
        company_info_name: "OmEats",
        name: name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send new email");
  }
};
export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string
) => {
  const recipients = [
    {
      email,
    },
  ];
  const htmlContent = generatePasswordResetEmailHtml(resetUrl);
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Reset your password",
      html: htmlContent,
      category: "Reset Password",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to reset password");
  }
};
export const sendResetSuccessEamil = async (
  email: string,
  resetUrl: string
) => {
  const recipients = [
    {
      email,
    },
  ];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Password reset successfully",
      html: htmlContent,
      category: "Password Reset",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send password reset success email");
  }
};
// TODO:10:11