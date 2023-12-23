require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');

const { PORT, movieDb } = require('./constants/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(cors);
app.use(helmet());

mongoose.connect(movieDb, {});

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
