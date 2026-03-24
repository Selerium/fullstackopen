const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const { MONGODB_URI } = require("./utils/config");
const { errorHandler, getToken } = require("./utils/middleware");

const app = express();

mongoose
  .connect(MONGODB_URI, { family: 4 })
  .then(() => console.log("connected to DB"))
  .catch(() => console.error("DB failed to connect"));

app.use(express.json());
app.use(getToken);

app.use("/api/login", loginRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

module.exports = app;
