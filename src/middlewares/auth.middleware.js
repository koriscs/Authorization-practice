const { validationResult } = require('express-validator');
const passport = require('passport');

exports.validationMiddleware = (req, res, next) =>{
    let errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        })
    }
    next()
}

exports.userAuth = passport.authenticate('jwt', {session: false})