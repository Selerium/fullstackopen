const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError")
    response.status(400).send({ error: error.message });
  if (error.name === "CastError") response.status(400).send();
  next(error);
};

module.exports = errorHandler;
