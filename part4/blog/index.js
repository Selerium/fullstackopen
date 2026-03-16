const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const db_password = process.env.MONGODB_PASS;
const mongoUrl = `mongodb+srv://johnadithya008_db_user:${db_password}@fullstackopen.bxrwquz.mongodb.net/?appName=fullstackopen`;
mongoose.connect(mongoUrl, { family: 4 });

app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
