const Blog = require("../models/blog");
const blogRouter = require("express").Router();
const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogRouter.post("/", userExtractor, async (request, response) => {
  const user = request.user;

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id,
  });

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  const saveUser = await user.save();

  response.status(201).json(result);
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;

  if (user._id.toString() === user._id.toString()) {
    const blog = await Blog.findByIdAndDelete(request.params.id);
    user.blogs = user.blogs.filter(
      (blog) => blog.toString() !== request.params.id
    );
    await user.save();
    return response.json(blog);
  }

  return response.status(401).json({ error: "unauthorized delete" });
});

blogRouter.put("/:id", async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  response.json(blog);
});

module.exports = blogRouter;
