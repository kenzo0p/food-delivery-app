import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<any> => {
  try {
    // console.log("Cookies received:", req.cookies); // Add this
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
    // console.log("Token found, verifying..."); // Add this
    // verify the token
    const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
    // check if decoding was successfull
    if (!decode) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
