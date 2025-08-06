import jwt from "jsonwebtoken";
import Employee from "../models/employee.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email }).select("+password");
    if (!employee) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      { id: employee._id, email: employee.email },
      "a-string-secret",
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000),
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({
      status: true,
      message: "Login success",
      data: {
        employee,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, ...otherFields } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Name, email, and password are required",
      });
    }
    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(400).json({
        status: false,
        message: "Email already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = new Employee({
      name,
      email,
      password: hashedPassword,
      ...otherFields,
    });
    await employee.save();
    return res.status(201).json({
      status: true,
      message: "Registration successful",
      data: {
        employee: {
          _id: employee._id,
          name: employee.name,
          email: employee.email,
          role: employee.role,
          department: employee.department,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

export { login, register };
export default login;