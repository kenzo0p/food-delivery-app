import express from "express";
import {
  chechAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signUp,
  updateProfile,
  verifyEmail,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
const router = express.Router();
router.route("/check-auth").get(isAuthenticated, chechAuth);
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/profile/update").post(isAuthenticated, updateProfile);

export default router;
