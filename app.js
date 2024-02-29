require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimit');
const cookieParser = require('cookie-parser');

const app = express();

const { PORT, bitfilmsdb } = require('./constants/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/routes');
const errorHandler = require('./middlewares/errorHandler');

const options = {
  origin: [
    'http://diplomyandex.movies.nomoredomainswork.ru',
    'https://diplomyandex.movies.nomoredomainswork.ru',

  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use(cors(options));
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cookieParser());


mongoose.connect(bitfilmsdb, {});

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
