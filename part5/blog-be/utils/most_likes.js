const _ = require("lodash");

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  const mostLiked = _(blogs)
    .groupBy("author")
    .map((group, author) => ({
      author: author,
      likes: _.sumBy(group, "likes"),
    }))
    .maxBy("likes");

  return mostLiked;
};

module.exports = mostLikes;
