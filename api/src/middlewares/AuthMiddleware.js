const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Users } = require("../App/Db");

const authMiddleware = {
  // Middleware para verificar si el token es valido
  verifyToken: async (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    try {
      token = token.split(" ")[1]; // Remove Bearer from token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      // Check if user exists
      const user = await Users.findByPk(req.userId);
      if (!user) {
        return res.status(404).send({
          message: "No user found.",
        });
      }

      next();
    } catch (error) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
  },

  // Middleware para verificar si el usuarios es admin
  isAdmin: async (req, res, next) => {
    try {
      const user = await Users.findByPk(req.userId);
      if (user.isAdmin) {
        next();
        return;
      }

      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    } catch (error) {
      res.status(500).send({
        message: "Unable to validate user role.",
      });
    }
  },
};
module.exports = {
  authMiddleware,
};
