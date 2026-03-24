const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginRouter = require("express").Router();
const User = require("../models/user");
const { SECRET } = require("../utils/config");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passCheck =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passCheck))
    return res.status(401).json({ error: "invalid username or password" });

  const token = jwt.sign(
    {
      username: user.username,
      id: user._id,
    },
    SECRET
  );

  res.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
