const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: 'Вы совершили 100 запросов за 10 минут, лимит исчерпан ',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
