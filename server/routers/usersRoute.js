const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

// new user registration
router.post('/register', async(req, res) => {
    try {
        console.log('server/user')
        // Check if user already exists
        const user = await User.findOne({email: req.body.email});
        if(user) {
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Save user 
        const newUser = new User;
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = hashedPassword;
        await newUser.save();
        res.send({
            success: true,
            message: "User created successfully",
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

// User login
router.post('/login', async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findOne({ email: req.body.email });
        if(!user) {
            throw new Error('User not found');
        }

        // Compare password
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );

        if(!validPassword) {
            throw new Error('Invalid password');
        }

        // Create and assign token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {expiresIn: "1d"});

        // Send response
        res.send({
            success: true,
            message: "User logged in successfully",
            data: token,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
})

// get current user
router.get('/get-current-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        // get user
        res.send({
            success: true,
            message: 'User fetched successfully',
            data: user,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
})

module.exports = router;