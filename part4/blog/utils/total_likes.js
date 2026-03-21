const totalLikes = (posts) => {
  return posts.reduce((sum, item) => {
    return sum + item.likes;
  }, 0);
};

module.exports = totalLikes;
