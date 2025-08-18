import express from 'express'
import { getDepartmentById,createDepartment,updateDepartment,deleteDepartment, getDepartments } from '../controllers/departmentControllers.js'

const router=express.Router();

router.get('/get',getDepartments);

router.post("/create",createDepartment);

router.put("/:id",updateDepartment);
router.get("/:id",getDepartmentById);

router.delete("/:id",deleteDepartment);

export default router;
