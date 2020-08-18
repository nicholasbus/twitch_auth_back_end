const passport = require('passport');
const axios = require('axios');
const { Router } = require('express');
const router = Router();

/* OAUTH ROUTES */
// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logOut();
    res.json({
        message: 'you have been logged out',
    });
})

//auth with twitch
router.get('/twitch', passport.authenticate('twitch', { forceVerify: true }));

//callback to be redirected to
router.get('/twitch/callback', passport.authenticate('twitch', {failureRedirect: '/'}), (req, res) => {
    res.redirect('http://localhost:3000/user_page' + `?twitch_id=${req.user.twitch_id}`);
});

router.get('/', (req, res) => {
    res.json({
        message: "you have reached the /api route"
    });
})

module.exports = router;
