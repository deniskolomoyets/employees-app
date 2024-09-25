const { orisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/employees
 * @desc Get all employees
 * @access Private
 */

const all = async (req, res) => {
  try {
    const employees = await prisma.employees.findMany(); //this will get all the employees

    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: "Error getting employees" });
  }
};
