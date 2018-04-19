const hooks = require('./mongo-mock/hooks');

before(hooks.before(done));

after(hooks.after());

const mongoose = hooks.mongoose;

