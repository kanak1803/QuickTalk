import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    //get token from cookie
    const token = req.cookies.jwt;
    //check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //check if token is valid
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    //find user by id
    const user = await User.findById(decoded.userId).select("-password");
    //check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //set user in req object
    req.user = user;
    //call next middleware
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
