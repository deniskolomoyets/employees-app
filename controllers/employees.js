const { prisma } = require("../prisma/prisma-client");

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

/**
 * @route POST /api/employees/add
 * @desc Add a new employee
 * @access Private
 */
const add = async (req, res) => {
  try {
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: "Please enter all fields" });
    } //check if all the fields are filled

    const employee = await prisma.user.update({
      where: {
        id: req.user.id,
      }, //find the user by the id
      data: {
        createdEmployee: {
          create: data,
        }, // and give him back the created employee
      },
    }); //
    return res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error adding employee" });
  }
};

module.exports = { all, add };
