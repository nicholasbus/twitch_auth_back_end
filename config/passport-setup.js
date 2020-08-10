const passport = require('passport');
const TwitchStrategy = require("@d-fischer/passport-twitch").Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
});

passport.use(
    new TwitchStrategy({
        //options for the strategy
        clientID: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/auth/twitch/callback",
        scope: ['user_read', 'user_subscriptions'],
    }, (accessToken, refreshToken, profile, done) => {

    //     User.findOne({ twitch_id: profile.id })
    //             .then((currentUser) => {
    //                 if(currentUser) {
    //                     console.log('user is: ' + currentUser)
    //                     done(null, currentUser);
    //                 } else {
    //                     new User({
    //                         username: profile.display_name,
    //                         email: profile.email,
    //                         profile_img_url: profile.profile_image_url,
    //                         offline_img_url: profile.offline_image_url,
    //                         twitch_id: profile.id,
    //                         broadcaster_type: profile.broadcaster_type,
    //                         description: profile.description,
    //                         view_count: profile.view_count,
    //                         provider: profile.provider,
    //                     }).save()
    //                         .then((newUser) =>{
    //                             console.log('new user created: ' + newUser);
    //                             done(null, newUser);
    //                         });
    //                 }
    //             })
    // })

    console.log(profile);
    }
))