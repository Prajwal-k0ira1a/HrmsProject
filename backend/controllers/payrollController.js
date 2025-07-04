import Payroll from '../models/payroll.js';

// Create payroll entry
export const createPayroll = async (req, res) => {
  try {
    const data = req.body;

    // Calculate totals
    const totalAllowances = Object.values(data.allowances || {}).reduce((a, b) => a + b, 0);
    const totalDeductions = Object.values(data.deductions || {}).reduce((a, b) => a + b, 0);
    const grossSalary = data.basicSalary + totalAllowances;
    const netSalary = grossSalary - totalDeductions;

    const payroll = new Payroll({
      ...data,
      totalAllowances,
      totalDeductions,
      grossSalary,
      netSalary
    });

    const saved = await payroll.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all payrolls
export const getPayrolls = async (req, res) => {
  try {
    const records = await Payroll.find().populate('userId', 'name email');
    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get payroll by ID
export const getPayrollById = async (req, res) => {
  try {
    const record = await Payroll.findById(req.params.id).populate('userId');
    if (!record) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update payroll status or data
export const updatePayroll = async (req, res) => {
  try {
    const updated = await Payroll.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete payroll
export const deletePayroll = async (req, res) => {
  try {
    const deleted = await Payroll.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
