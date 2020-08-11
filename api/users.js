const { Router } = require('express');
const { use } = require('passport');
const router = Router();

const User = require('../models/User');


// gets all users in the database
router.get('/', async (req, res) => {
    const users = await User.find({});
    
    res.json(users);
    
});

module.exports = router;