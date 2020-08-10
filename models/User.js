const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    profile_img_url: String,
    twitch_id: String,
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;