const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocal = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports= new PassportLocal({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, async (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim(),
    };

    try{
        let user = await User.findOne({email: userData.email});

        if(!user){
            return done(wrong());
        }

        let requesting_pw = userData.password;
        let pw = user.password;
        if(await bcrypt.compare(requesting_pw, pw)) {
                const token = jwt.sign({sub:user._id}, process.env.JWT_SECRET, {expiresIn: '168h'});
                return done(null, token, {name: user.name, grade: user.grade});
        }

        return done(wrong());


    } catch(e){
        done(e);
    }

});

function wrong(){
    const error = new Error('Incorrect Credentials');
    error.name = 'IncorrectCredentialsError';
    return error;
}

