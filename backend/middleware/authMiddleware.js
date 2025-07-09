import jwt from "jsonwebtoken";
import Employee from "../models/employee.js";

async function authenticateToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    console.log("token:",token)
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token found in cookies." });
      
    }

    const decoded = jwt.verify(token, "a-string-secret");
    
    // Correct usage: pass a filter object into findOne

    // may be correct // const employee = await Employee.findOne({ _id: decoded._id }).select("-password");
const employee=await Employee.findOne(decoded.id).select("-password");

    if (!employee) {
      return res.status(403).json({ error: "Employee not found or token invalid." });
    }

    req.employee = employee;
    next();
  } catch (err) {

    console.error("Auth error:", err);
    console.log(err.message);
    
    res.status(401).json({ error: "Authentication failed." });
  }
}

export default authenticateToken;