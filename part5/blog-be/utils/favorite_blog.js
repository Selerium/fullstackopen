const favoriteBlog = (posts) => {
  if (posts.length === 0) return {};

  let favBlog = posts[0];

  posts.forEach((post) => {
    if (favBlog.likes < post.likes) favBlog = post;
  });

  return favBlog;
};

module.exports = favoriteBlog;
