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
        if(err || token === false || userData.message === "Missing credentials") {
            let error = "InternalError";
            if(err.name === 'IncorrectCredentialsError'){
                error = err.name;
            }
            console.error(err);
            return res.status(400).json({
                success: false,
                message: error
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

