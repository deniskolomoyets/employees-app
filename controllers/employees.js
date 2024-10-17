const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/employees
 * @desc Get all employees
 * @access Private
 */

const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany(); //this will get all the employees

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error getting employees" });
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

    // await prisma.user.update({
    //   where: {
    //     id: req.user.id,
    //   }, //find the user by the id
    //   data: {
    //     createdEmployee: {
    //       create: data,
    //     }, // and give him back the created employee
    //   },
    // });
    const employee = await prisma.employee.create({
      data: {
        ...data, //spread the data from the request
        userId: req.user.id, //add the userId of the current user
      },
    }); //Create a new employee in the database using the data from the request and adding the userId of the current user

    return res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error adding employee" });
  }
};

/**
 * @route POST /api/employees/remove/:id
 * @desc Remove an employee
 * @access Private
 */
const remove = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.employee.delete({
      where: {
        id,
      },
    });

    res.status(204).json({ message: "Employee removed" });
  } catch (error) {
    res.status(500).json({ message: "Error removing employee" });
  }
};

/**
 * @route PUT /api/employees/edit/:id
 * @desc Edit an employee
 * @access Private
 */

const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;
  try {
    await prisma.employee.update({
      where: {
        id,
      },
      data,
    }); // find the record by id and update it with the new data provided in the data object.
    res.status(204).json({ message: "Employee edited" });
  } catch (error) {
    res.status(500).json({ message: "Error editing employee" });
  }
};

/**
 * @route GET /api/employees/:id
 * @desc Get a single employee
 * @access Private
 */
const employee = async (req, res) => {
  const { id } = req.params; //http://localhost:8000/api/employees/573c6ea2-23b5-48a4-811d-74b28359f3f6
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    }); //find the employee by id
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error getting employee" });
  }
};

module.exports = { all, add, remove, edit, employee };
