const { Router } = require('express');
const { getUsers, register, login, protected, logout } = require('../controllers/auth');
const { validationMiddleware, userAuth } = require('../middlewares/auth.middleware');
const { registerValidations, loginValidation } = require('../validators/auth');
const authRouter = Router();


authRouter.get('/protected', userAuth,protected);
authRouter.get('/get-users', getUsers);
authRouter.post('/register', registerValidations, validationMiddleware, register);
authRouter.post('/login', loginValidation, validationMiddleware, login);
authRouter.get('/logout', logout);

module.exports = authRouter;