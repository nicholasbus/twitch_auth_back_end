const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: String, // display_name
    email: String, // email
    profile_img_url: String, // profile_image_url
    offline_img_url: String, // offline_imgage_url
    twitch_id: String, // id
    broadcaster_type: String, // broadcaster_type
    description: String, // description
    view_count: Number, // view_count
    provider: String, // provider
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;