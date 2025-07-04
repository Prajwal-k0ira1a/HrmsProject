import express from 'express';
import { createEmployee, deleteEmployee, getEmployee, getEmployeeById, updateEmployee } from "../controllers/employeeController.js";

const router = express.Router();

// Create employee
router.post("/", createEmployee);

// Get all employees (populate department and manager)
router.get('/', (req, res, next) => getEmployee(req, res, next, { populate: ['department', 'manager'] }));

// Get employee by ID (populate department and manager)
router.get("/:id", (req, res, next) => getEmployeeById(req, res, next, { populate: ['department', 'manager'] }));

// Delete employee
router.delete("/:id", deleteEmployee);

// Update employee
router.put("/:id", updateEmployee);

export default router;