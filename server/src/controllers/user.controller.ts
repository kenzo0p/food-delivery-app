import { Response, Request } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import { generateVerificatioinToken } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import { sendEmailverification, sendPasswordResetEmail, sendResetSuccessEamil, sendWelcomeEamil } from "../mailtrap/email";
export const signUp = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, contact } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificatioinToken();

    user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    generateToken(res, user);
    await sendEmailverification (email , verificationToken);
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    return res.status(201).json({
      suceess: true,
      message: "Account created successfully",
      userWithoutPassword,
    });
  } catch (error) {
    console.log(error, "Error during the signup user");
    return res.status(500).json({ message: "Failed to signup" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const isPassworMatch = await bcrypt.compare(password, user.password);
    if (!isPassworMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    generateToken(res,user)
    user.lastLogin = new Date();
    await user.save();
    // send user without password
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    return res.status(200).json({
      message: `Welcome back ${user.fullname}`,
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error, "Error while login");
    return res.status(500).json({ message: "Failed to signup" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { verificationCode } = req.body;
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }
    user.isVerified = true;
    user.verificationToken = "";
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    // send welcome email
    await sendWelcomeEamil(user.email , user.fullname)
    return res.status(200).json({
      success: true,
      message: "Email verifiend successfully",
      user,
    });
  } catch (error) {
    console.log(error, "Error while verifying email");
    return res.status(500).json({ message: "Failed to verify email" });
  }
};
export const logout = (req: Request, res: Response) => {
  try {
    return res.clearCookie("token").status(200).json({
      message: "User Logged Out Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error, "Error while logout user");
    return res.status(500).json({ message: "Failed to logout" });
  }
};
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); //for one hour
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
    await user.save();
    // send email
    await sendPasswordResetEmail(user.email , `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`)
    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log(error, "Error while forgetting the password");
    return res.status(500).json({
      success: false,
      message: "Failed to forgot password",
    });
  }
};
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }
    // update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = "";
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();
    // send success resetemail
    await sendResetSuccessEamil(user.email);
    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log(error, "Error while resetting  the password");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const chechAuth = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const user = await User.findById({ userId }).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const { fullname, email, address, city, country, profilePicture } =
      req.body;
    // upload image on cloudinary
    let cloudResponse: any;

    cloudResponse = await cloudinary.uploader.upload(profilePicture);
    const updatedData = {
      fullname,
      email,
      address,
      city,
      country,
      profilePicture,
    };
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");
    return res
      .status(200)
      .json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
