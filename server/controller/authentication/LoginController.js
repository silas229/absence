const passport = require('passport');

module.exports = async (req, res, next) => {
    // Plug in Validation :)

    let validation = true;
    if(!validation){
        return res.status(400).json({
            success: false,
            //message: validationResult.message,
            //errors: validationResult.errors,
        })
    }

    return passport.authenticate('local-login', (err, token, userData) => {
        if(err) {
            if(err.name === 'IncorrectCredentialsError'){
                return res.status(400).json({
                    success: false,
                    message: err.name,
                });
            }
            console.error(err);
            return res.status(400).json({
                success: false,
                message: 'InternalError'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Logged in!',
            token,
            user: userData,
        });
    })(req, res, next);
};

