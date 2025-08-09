import jwt from "jsonwebtoken";
import Employee from "../models/employee.js";
import rateLimit from "express-rate-limit";
/**
 * Rate limiter middleware for login route.
 *
 * Prevents brute-force attacks by limiting failed login attempts from the same IP.
 *
 * Settings:
 * - Time Window: 3 hours (windowMs)
 * - Max Attempts: 3 failed login attempts per IP within the time window
 * - Headers:
 *   - standardHeaders: Enables modern RateLimit-* headers in responses
 *   - legacyHeaders: Disables deprecated X-RateLimit-* headers
 * - skipSuccessfulRequests: Successful logins (status < 400) are not counted
 *
 * Behavior:
 * - After 3 failed login attempts, the IP is blocked from making further login attempts for 3 hours
 * - Successful login requests do not count against the limit
 */
export const loginRateLimit = rateLimit({
  windowMs: 3 * 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      message: "Too many failed login attempts. Please try again after 3 hours.",
    });
  },
});


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
