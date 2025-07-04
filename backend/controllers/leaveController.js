import Leave from '../models/leave.js';

// Apply for leave
export const applyLeave = async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).json({
      success: true,
      message: 'Leave application submitted',
      data: leave
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Leave submission failed',
      error: error.message
    });
  }
};

// Get all leave requests
export const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate('userId', 'name email')
      .populate('approvedBy', 'name email');
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get leave by ID
export const getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id)
      .populate('userId')
      .populate('approvedBy');
    if (!leave) {
      return res.status(404).json({ success: false, message: 'Leave not found' });
    }
    res.json({ success: true, data: leave });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Approve or reject leave
export const updateLeaveStatus = async (req, res) => {
  try {
    const { status, approvedBy, rejectionReason } = req.body;

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        status,
        approvedBy,
        rejectionReason,
        processedAt: Date.now()
      },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({ success: false, message: 'Leave not found' });
    }

    res.json({ success: true, message: 'Leave updated', data: leave });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete leave
export const deleteLeave = async (req, res) => {
  try {
    const deleted = await Leave.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Leave not found' });
    }
    res.json({ success: true, message: 'Leave deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
