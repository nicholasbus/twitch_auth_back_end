const { Router } = require('express');
const router = Router();

const User = require('../models/User');


// gets all users in the database
router.get('/', async (req, res) => {
    const users = await User.find({});
    
    res.json(users);
    
});

router.get('/:id', async (req, res) => {
    const user = await User.findOne({twitch_id: req.params.id});
    
    console.log('found user: ' + user)

    res.json(user);
    
});

module.exports = router;