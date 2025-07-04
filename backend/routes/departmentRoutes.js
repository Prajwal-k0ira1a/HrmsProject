import express from 'express'
import { getDepartmentById,createDepartment,updateDepartment,deleteDepartment, getDepartments } from '../controllers/departmentControllers'

const router=express.Router();

router.get('/',getDepartments);

router.post("/",createDepartment);

router.put("/:id",updateDepartment);

router.delete("/:id",deleteDepartment);

export default router;
