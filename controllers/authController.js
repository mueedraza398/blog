const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const profileImage = req.file;

        const BASE_URL =
            process.env.NODE_ENV === 'production'
                ? process.env.BASE_URL_PROD
                : process.env.BASE_URL;

        const imageUrl = `${BASE_URL}/uploads/${req.file.filename}`;


        if (!name || !email || !password || !role || !profileImage) {
            return res.status(400).json({ message: 'Please enter all fields', success: false });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', success: false });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);



        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            profileImage: imageUrl,
            role,
        });


        await newUser.save();

        const token = jwt.sign({ id: newUser._id, role }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                profileImage: newUser.profileImage,
            },
            message: 'User registered successfully',
            success: true,
        });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({
            success: false,
            message: 'User registration failed',
            error: err.message,
        });
    }
};

module.exports = register;


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields', success: false });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User does not exist', success: false });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials', success: false });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email }, message: "Login successful", success: true });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User registration failed",
            error: err.message,
        });
    }
};

module.exports = { register, login };
