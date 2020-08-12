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
   
    res.redirect('http://localhost:3000' + `?twitch_id=${req.user.twitch_id}`);
    
    /* BELOW IF I NEED AN AUTHENTICATION CODE FOR THE API */

    // const CODE = req.query.code;

    // axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&code=${CODE}&grant_type=authorization_code&redirect_uri=http://localost:5000/api/auth/twitch/access`)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err)); 
    // // } else if (req.body.access_token && !req.params.code) {
    // //     // passing the twitch user Id to the client so the client can make API calls based on the user
    // //     res.redirect('http://localhost:3000' + `?twitch_id=${req.user.twitch_id}&access_token=${req.body.access_token}`); 
    // // }
    


    
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
