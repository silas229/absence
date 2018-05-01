const LimiterMiddleware = require('express-rate-limiter');
const MemoryStore = require('express-rate-limiter/lib/memoryStore');

module.exports = (new LimiterMiddleware({ db: new MemoryStore() })).middleware();

