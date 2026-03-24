const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const User = require("../models/user");

const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError")
    return response.status(400).json({ error: error.message });
  if (error.name === "CastError") return response.status(400).send();
  if (error.name === "JsonWebTokenError")
    return response.status(401).json({ error: "invalid token" });
  next(error);
};

const getToken = (request, response, next) => {
  const auth = request.get("Authorization");
  request.token =
    auth && auth.startsWith("Bearer") ? auth.replace("Bearer ", "") : null;

  next();
};

const userExtractor = async (request, response, next) => {
  const decoded = jwt.verify(request.token, SECRET);
  if (!decoded.id) return response.status(401).json({ error: "invalid token" });

  const user = await User.findById(decoded.id);
  if (!user) return response.status(400).json({ error: "invalid user id" });

  request.user = user;
  next();
};

module.exports = { errorHandler, getToken, userExtractor };
