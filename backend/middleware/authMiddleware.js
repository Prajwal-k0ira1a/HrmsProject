import jwt from "jsonwebtoken";
import Employee from "../models/employee.js";

// Role-based authorization middleware
function checkRole(roles) {
  return async (req, res, next) => {
    try {
      const token = req.cookies?.token;
      if (!token) {
        return res.status(401).json({ error: "Access denied. No token found in cookies." });
      }

      const decoded = jwt.verify(token, "a-string-secret");
      // Wrap the ID in an object for findOne()
      const employee = await Employee.findOne({ _id: decoded.id }).select("-password");

      if (!employee) {
        return res.status(403).json({ error: "Employee not found or token invalid." });
      }

      // Check if user has required role
      if (!roles.includes(employee.role)) {
        res.status(403);
        throw new Error(`User role '${employee.role}' not authorized`);
      }

      req.employee = employee;
      next();
    } catch (err) {
      console.error("Auth error:", err);
      console.log(err.message);
      res.status(401).json({ error: "Authentication failed." });
    }
  };
}

// Default authentication without role check
async function authenticateToken(req, res, next) {
  try {
    console.log('Received token:', req.cookies?.token);
    
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ 
        error: "Access denied. No token found in cookies.",
        details: "No token in cookies"
      });
    }

    try {
      const decoded = jwt.verify(token, "a-string-secret");
      console.log('Decoded token:', decoded);
      
      if (!decoded.id) {
        return res.status(401).json({ 
          error: "Invalid token format.",
          details: "Token missing ID"
        });
      }

      // Wrap the ID in an object for findOne()
      const employee = await Employee.findOne({ _id: decoded.id }).select("-password");
      console.log('Found employee:', employee);

      if (!employee) {
        return res.status(403).json({ 
          error: "Employee not found or token invalid.",
          details: `No employee found with ID: ${decoded.id}`
        });
      }

      req.employee = employee;
      next();
    } catch (jwtError) {
      console.error("JWT verification error:", jwtError);
      return res.status(401).json({ 
        error: "Invalid JWT token.",
        details: jwtError.message
      });
    }
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(500).json({ 
      error: "Internal server error.",
      details: err.message
    });
  }
}

export { authenticateToken, checkRole };


export default authenticateToken;