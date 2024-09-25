const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 *
 * @route POST /api/user/login
 * @desc Login a user
 * @access Public
 */
const login = async (req, res) => {
  try {
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

    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "1d" }),
      }); //return the user data
    } else {
      res.status(400).json({ msg: "Incorrect login or password entered" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Something go wrong" });
  }
};

/**
 *
 * @route POST /api/user/register
 * @desc Register a new user
 * @access Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email,
      },
    }); //check if the user already exists
    if (registeredUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10); //generate the salt
    const hashedPassword = await bcrypt.hash(password, salt); //hash the password

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    }); //create the user

    const secret = process.env.JWT_SECRET; //get the secret from the environment variables

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "1d" }), // sign the token with the user id and the secret and set the expiration time to 1 day
      });
    } else {
      res.status(400).json({ msg: "Failed to create a user" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Something go wrong" });
  }
};

/**
 *
 * @route GET /api/user/current
 * @desc Current user
 * @access Private
 */
const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  login,
  register,
  current,
};
