module.exports = (err, req, res, next) => {
  const { statusCode = 500, messageError } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? messageError : messageError,
  });
  next();
};
