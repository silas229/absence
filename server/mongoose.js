const mongoose = require('mongoose');

module.exports.connect = async() => {
    await mongoose.connect(process.env.MONGO_STRING);

    mongoose.connection.on('error', err => {
        console.error(`Mongoose connection error: ${err}`);
        process.exit(1);
    });

    const User = require('./controller/users/UserSchema');

    mongoose.model('User', User);


};

