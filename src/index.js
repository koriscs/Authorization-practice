const express = require('express');
const { PORT, CLIENT_URL } = require('./constans');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors')

//import passport middleware
require('./middlewares/passport-middleware');

//initialize middlewears
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

//import routes
const authRouter = require('./routes/auth');

//initialize routes
app.use('/api', authRouter);

const appStart = () => {
    try{
    app.listen(PORT, () =>{
        console.log(`The app is listening on http://localhost:${PORT}`)
    })
        } catch (error) {
    console.log(`Error: ${error.message}`)
    } 
}

appStart();