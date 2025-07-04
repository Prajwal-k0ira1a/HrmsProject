import express from 'express';
import {
  applyLeave,
  getLeaves,
  getLeaveById,
  updateLeaveStatus,
  deleteLeave
} from '../controllers/leaveController.js';

const router = express.Router();

router.post('/', applyLeave); // Apply for leave
router.get('/', getLeaves);   // View all leave requests
router.get('/:id', getLeaveById); // View leave by ID
router.put('/:id', updateLeaveStatus); // Approve or reject
router.delete('/:id', deleteLeave); // Delete leave request

export default router;
