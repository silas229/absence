const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    rank: String,
    grade: String,
});

UserSchema.pre('save', async function saveHook(next) {
    let user = this;
    if(!user.isModified("password")) return next();

    user.password = await bcrypt.hash(user.password, 5);
    return next();
});

module.exports =UserSchema;

