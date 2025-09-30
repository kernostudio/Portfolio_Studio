import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const generateToken = (payload: object) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

  return { accessToken };
};

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);
