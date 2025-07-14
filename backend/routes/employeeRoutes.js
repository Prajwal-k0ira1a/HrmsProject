import express from 'express';
import {upload} from "../utils/imageUpload.js"
import { createEmployee, deleteEmployee, getEmployee, getEmployeeById, updateEmployee } from "../controllers/employeeController.js";
import { authenticateToken, checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create employee (only admin can create)
router.post('/create', authenticateToken, checkRole('admin', 'manager'), upload.single('profileImage'), createEmployee);


// Get all employees (any authenticated user can view)
router.get('/', authenticateToken, (req, res, next) => getEmployee(req, res, next, { populate: ['department', 'manager'] }));

// router.get('/', [authenticateToken,checkRole('admin','manager')], getEmployee);

// Get employee by ID (any authenticated user can view)
router.get("/:id", authenticateToken, (req, res, next) => getEmployeeById(req, res, next, { populate: ['department', 'manager'] }));

// Delete employee (only admin can delete)
router.delete("/:id", [authenticateToken, checkRole('admin','manager')], deleteEmployee);

// Update employee (only admin can update)
router.put("/:id", [authenticateToken, checkRole('admin','manager') ], updateEmployee);

export default router