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
   
    let token = '';
    
    axios({
        method: 'post',
        url: `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
    })
    .then(result => {
        token = result.data.access_token
        res.redirect('http://localhost:3000' + `?twitch_id=${req.user.twitch_id}` + `&token=${token}`);
    })
    .catch(err => console.log(err));



    
    
    // TODO: GET ACCESS TOKEN AND PASS IT TO THE REDIR URL THAT IS ABOVE
    
});
 
router.get('/twitch/access', (req, res) => {
    console.log(req.body.access_token);
})

router.get('/', (req, res) => {
    res.json({
        message: "you have reached the /api route"
    });
})


module.exports = router;
