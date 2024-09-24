const jwt = require("jsonwebtoken");
const { prisma } = require("../database/prisma-client");

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1]; //get the token from the headers

    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify the token with the secret key
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    }); //find the user in the database

    req.user = user; //add the user to the request object
    next(); //move to the next middleware
  } catch (error) {
    res.status(401).json({ msg: "Unauthorised" });
  }
};

module.exports = { auth };
