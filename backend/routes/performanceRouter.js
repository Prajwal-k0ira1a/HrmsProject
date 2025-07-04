import express from 'express';
import {
  createPerformance,
  getPerformances,
  getPerformanceById,
  updatePerformance,
  deletePerformance
} from '../controllers/performanceController.js';

const router = express.Router();

router.post('/', createPerformance);           // Create
router.get('/', getPerformances);              // Read all
router.get('/:id', getPerformanceById);       // Read by ID
router.put('/:id', updatePerformance);        // Update
router.delete('/:id', deletePerformance);     // Delete

export default router;
