const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
require("dotenv").config();

const app = express();
app.use(express.json());

const db_password = process.env.MONGODB_PASS;
const mongoUrl = `mongodb+srv://johnadithya008_db_user:${db_password}@fullstackopen.bxrwquz.mongodb.net/?appName=fullstackopen`;
mongoose.connect(mongoUrl, { family: 4 });

app.use('/api/blogs/', blogRouter);

module.exports = app;
