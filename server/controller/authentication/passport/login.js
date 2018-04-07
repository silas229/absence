/*******************************************************************************
 * Copyright (c) 2018. LukvonStrom
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 ******************************************************************************/

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
                const token = jwt.sign({sub:user._id}, 'SECRET' /*process.env.JWT_SECRET*/, {expiresIn: '172h'});
                return done(null, token, {name: user.name});
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

