import express from 'express';
import {
  createAttendance,
  getAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance
} from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/', createAttendance);
router.get('/', getAttendance);
router.get('/:id', getAttendanceById);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

export default router;
