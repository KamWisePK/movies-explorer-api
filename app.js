require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimit');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());

const { PORT, bitfilmsdb } = require('./constants/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/routes');
const errorHandler = require('./middlewares/errorHandler');


const options = {
  origin: [
    'http://diplomyandex.movies.nomoredomainswork.ru',
    'https://diplomyandex.movies.nomoredomainswork.ru',
    'http://localhost:3001',
    'https://localhost:3001'


  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use(cors(options));

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
