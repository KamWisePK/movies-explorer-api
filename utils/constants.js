const {
  JWT_SECRET,
  bitfilmsdb = 'mongodb://127.0.0.1:27017/movieDb',
  PORT = 3000,
  NODE_ENV,
} = process.env;

module.exports = {
  JWT_SECRET,
  bitfilmsdb,
  PORT,
  NODE_ENV,
};
