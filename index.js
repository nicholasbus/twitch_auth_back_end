require('dotenv').config();
const express = require('express');
const app = express();
const passportSetup = require('./config/passport-setup');
const mongooseSetup = require('./config/mongoose-setup');
const authenticationRoutes = require('./api/authentication');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));

// init passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.json({
        message: "you have reached the root path 🍤",
    });
})

const corsOptions = {
    origin: process.env.CORS_ORIGIN
}

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authenticationRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})