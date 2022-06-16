const { check } = require('express-validator');
const db = require('../db');
const { compare} = require('bcryptjs');

const password = check('password').isLength({min: 6, max: 15}).withMessage('Password has to be minimum 6 maximum 15 characters')

const email = check('email').isEmail().withMessage('Please give valid email address');

const emailExist = check('email').custom(async (value) =>{
    const { rows } = await db.query('SELECT * FROM users WHERE email =$1',[value])
    if (rows.length) {
        throw new Error ('Email already exists.')
    }
})
//login validation
const loginFieldsCheck = check('email').custom(async (value, { req}) =>{
    const user = await db.query('SELECT * FROM users WHERE email =$1', [value])
    if (!user.rows.length) {
        throw new Error ('Email does not exists.');
    }
    const validPassword = await compare(req.body.password, user.rows[0].password)

    if(!validPassword) {
        throw new Error ('Wrong password!');
    }
    req.user = user.rows[0]
    })  


module.exports = {
    registerValidations: [email, password, emailExist],
    loginValidation: [loginFieldsCheck]
}

