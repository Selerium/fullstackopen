const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcryptjs");

userRouter.get("/", async (req, res) => {
  const result = await User.find({}).select("username name").populate("blogs");
  res.json(result);
});

userRouter.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const passHash = await bcrypt.hash(password, salt);

  if (!(username && password && name))
    res.status(400).send({ error: "missing fields" });

  if (password.length < 3)
    res.status(400).send({ error: "password too short" });

  const newUser = new User({
    username: username,
    password: passHash,
    name: name,
  });

  try {
    const result = await newUser.save();
    res.json(result);
  } catch (err) {
    if (err.code == 11000)
      res.status(400).send({ error: "this username is already in use" });
    else throw err;
  }
});

module.exports = userRouter;
