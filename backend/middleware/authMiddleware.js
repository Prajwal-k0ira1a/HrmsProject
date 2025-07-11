import jwt from "jsonwebtoken";
import Employee from "../models/employee.js";

const SECRET = "a-string-secret";

// Helper function to decode token and get employee
const getEmployeeFromToken = async (token) => {
  const decoded = jwt.verify(token, SECRET);
  if (!decoded.id) throw new Error("Token missing ID");

  const employee = await Employee.findOne({ _id: decoded.id }).select("-password");
  if (!employee) throw new Error("Employee not found");

  return employee;
};

// Role-based middleware
function checkRole(...roles) {
  return async (req, res, next) => {
    try {
      const token = req.cookies?.token;
      if (!token) return res.status(401).json({ error: "No token in cookies" });

      const employee = await getEmployeeFromToken(token);

      if (!roles.includes(employee.role)) {
        return res.status(403).json({ error: `Role '${employee.role}' not authorized` });
      }

      req.employee = employee;
      next();
    } catch (err) {
      console.error("checkRole error:", err);
      res.status(401).json({ error: err.message });
    }
  };
}

// Basic authentication
async function authenticateToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: "No token in cookies" });

    const employee = await getEmployeeFromToken(token);

    req.employee = employee;
    next();
  } catch (err) {
    console.error("authenticateToken error:", err);
    res.status(401).json({ error: err.message });
  }
}

export { authenticateToken, checkRole };
export default authenticateToken;
