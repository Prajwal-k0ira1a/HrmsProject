import Employee from '../models/employee.js';
import bcrypt from 'bcryptjs';
import  sendEmail  from '../utils/sendEmail.js';
// Create new employee
const createEmployee = async (req, res) => {
    try {
        const { password, ...otherFields } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const employee = new Employee({
            ...otherFields,
            password: hashedPassword,
            profileImage: req.file?.filename, // save uploaded image filename
        });
        const savedEmployee = await employee.save();

      sendEmail(
            employee.email,
            'Welcome to Our Company',
            `Hello ${employee.name},
            Welcome to our company! We are glad to have you on board.
            Your login credentials are as follows:
            Email: ${employee.email}
            Password: ${req.body.password}
            
            Please make sure to change your password after logging in for the first time.
            
            Thank you,
            Admin`
        );

        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: savedEmployee,
        });
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({
            success: false,
            message: "Error creating employee",
            error: error.message,
        });
    }
};

// Get all employees
const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find().populate('department');
    res.status(200).json({
      success: true,
      message: "Employees retrieved successfully",
      data: employees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving employees',
      error: error.message
    });
  }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id).populate('department');
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Employee retrieved successfully",
      data: employee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving employee',
      error: error.message
    });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: employee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// Update employee (including role changes for admins)
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    delete updates.password; // prevent password change directly

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

export {
  createEmployee,
  getEmployee,
  getEmployeeById,
  deleteEmployee,
  updateEmployee
};
