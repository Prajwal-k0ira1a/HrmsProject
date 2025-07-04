import Attendance from '../models/attendance.js';

// Create new attendance
export const createAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json({
      success: true,
      message: 'Attendance recorded successfully',
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create attendance',
      error: error.message
    });
  }
};

// Get all attendance records
export const getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate('userId', 'name email');
    res.status(200).json({
      success: true,
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch attendance',
      error: error.message
    });
  }
};

// Get attendance by ID
export const getAttendanceById = async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id).populate('userId');
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error: error.message });
  }
};

// Update attendance
export const updateAttendance = async (req, res) => {
  try {
    const updated = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, message: 'Updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating record', error: error.message });
  }
};

// Delete attendance
export const deleteAttendance = async (req, res) => {
  try {
    const deleted = await Attendance.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting record', error: error.message });
  }
};
