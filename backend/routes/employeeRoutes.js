import express from 'express';
import { createEmployee, deleteEmployee, getEmployee, getEmployeeById, updateEmployee } from "../controllers/employeeController.js";
import { authenticateToken, checkRole } from '../middleware/authMiddleware.js';
const router = express.Router();

// Create employee (only admin can create)
router.post("/create", [authenticateToken, checkRole(['admin'])], createEmployee);

// Get all employees (any authenticated user can view)
router.get('/', authenticateToken, (req, res, next) => getEmployee(req, res, next, { populate: ['department', 'manager'] }));

// Get employee by ID (any authenticated user can view)
router.get("/:id", authenticateToken, (req, res, next) => getEmployeeById(req, res, next, { populate: ['department', 'manager'] }));

// Delete employee (only admin can delete)
router.delete("/:id", [checkRole(['admin']), authenticateToken], deleteEmployee);

// Update employee (only admin can update)
router.put("/:id", [checkRole(['admin']), authenticateToken], updateEmployee);

export default router;