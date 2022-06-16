const db = require('../db');
const {hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken')
const {SECRET } = require('../constans/index');

exports.getUsers = async (req, res) =>{
    try {
        const {rows} = await db.query('SELECT user_id, email FROM users')
        return res.status(200).json({succes: true, users: rows})
    } catch (error) {
        console.log(error.message)
    }
}

exports.register = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const hashedPassword = await hash(password, 10)

        await db.query('INSERT INTO users (email, password) values ($1, $2);',[email, hashedPassword])

        return res.status(201).json({sucess: true,
                                    message: "the registration was sucessfull!"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.login = async (req, res) =>{
    let user = req.user
    payload = {
        id: user.user_id,
        email: user.email
    }

    try {
        const token = sign(payload, SECRET)

        return res.status(200).cookie('token', token, {httpOnly: true}).json({
            succes: true, 
            message: "Logged in sucesfully!"
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.protected = async (req, res) =>{
    try {
        return res.status(200).json({
            info: 'protected info'
        })
    } catch( error) {
        console.log(error.message)
    }
}
 exports.logout = async (req, res) =>{
    try {
        return res.status(200).clearCookie('token', {httpOnly: true}).json({
            succes: true, 
            message: "Logged out sucesfully!"
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
 }

