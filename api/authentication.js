const passport = require('passport');

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

    res.json({
        message: 'you have been logged in.',
        user: req.user,
    });
    
    //res.redirect('http://localhost:3000');
});
 

router.get('/', (req, res) => {
    res.json({
        message: "you have reached the /api route"
    });
})


module.exports = router;
