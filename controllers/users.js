const prisma = require("../prisma/prisma-client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  }); //this will return the first user that matches the email because using findFirst

  const isPasswordCorrect =
    user && (await bcrypt.compare(password, user.password)); //compare the password from the request with the password from the user in the database

  if (user && isPasswordCorrect) {
    response.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
    }); //return the user data
  } else {
    response.status(400).json({ msg: "Incorrect login or password entered" });
  }
};

const register = async (req, res) => {
  res.send("register");
};

const current = async (req, res) => {
  res.send("current");
};

module.exports = {
  login,
  register,
  current,
};
