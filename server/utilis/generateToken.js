import jwt from "jsonwebtoken";
const generateandSetCokie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SECRET, {
    expiresIn: "15d",
  });
  res.cookie("accesstoken", token, {
    maxAge: 15 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.MODE_ENV !== "production",
  });
};
export default generateandSetCokie;
