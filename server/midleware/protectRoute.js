import jwt from "jsonwebtoken";
import { errorHandler } from "../utilis/errorHandler.js";
import User from "../models/userModel.js";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.accesstoken;
    if (!token) {
      next(errorHandler(401, "unauthorized no token from cookie"));
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded) {
      next(errorHandler(401, "unauthorized,invalid token"));
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      next(errorHandler(404, "no user found"));
    }
    req.user = user;
    console.log("user from protectRoute", user);
    next();
  } catch {
    console.log("error from", error.message);
    next(error);
  }
};
