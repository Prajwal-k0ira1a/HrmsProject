import express from "express";
import employeeRoutes from "./employeeRoutes.js";
import attendanceRoutes from "./attendanceRoutes.js";
import leaveRoutes from "./leaveRoutes.js";
import payrollRoutes from "./payrollRoutes.js";
import performanceRoutes from "./performanceRouter.js";
import authRoutes from "./authRoutes.js";

import departmentRoutes from "./departmentRoutes.js";

const router=express.Router();

router.use("/employees",employeeRoutes);
router.use("/auth",authRoutes);
router.use("/department",departmentRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/leaves', leaveRoutes);
router.use('/payrolls', payrollRoutes);
router.use('/performance', performanceRoutes);

export default router;