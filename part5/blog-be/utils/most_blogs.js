const _ = require("lodash");

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  const blogsByAuthor = _(blogs).countBy("author").entries().maxBy(_.last);

  return { author: blogsByAuthor[0], blogs: blogsByAuthor[1] };
};

module.exports = mostBlogs;
