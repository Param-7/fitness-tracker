const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await user.isValidPassword(password)) {
        req.session.userId = user._id;
        return res.redirect('/home');
    }
    res.render('login', { error: 'Invalid username or password' });
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.render('register', { error: 'Error creating account' });
    }
});

// // GET: Dashboard
// router.get('/dashboard', (req, res) => {
//     if (!req.session.userId) {
//         return res.redirect('/login');
//     }
//     res.render('dashboard', { username: req.session.username });
// });

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;
