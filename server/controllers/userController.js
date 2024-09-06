import User from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const logedInUser = req.user._id;
    const filertedUsers = await User.find({ _id: { $ne: logedInUser } }).select(
      "-password"
    );
    return res.status(201).json(filertedUsers);
  } catch (error) {
    next(error);
  }
};
