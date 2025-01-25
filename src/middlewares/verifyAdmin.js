import jwt from "jsonwebtoken";

const verifyAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res
      .status(403)
      .send({ success: false, message: "Access Denied. Admins only." });
  }
  next();
};

export default verifyAdmin;
