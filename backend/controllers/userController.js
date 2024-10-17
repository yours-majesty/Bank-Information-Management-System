const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register user
const register = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: "User already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            username,
            email,
            password: hashPassword
        });

        // Send response
        return res.status(201).json({
            success: true,
            message: "User successfully registered! You can log in now"
        });
    } catch (error) {
        console.error("Error during registration:", error); // Log for debugging
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};

// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User does not exist"
            });
        }

        // Check if password is valid
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                error: "Invalid credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.JWT_SECRET, // Use correct env variable name
            { expiresIn: '1h' } // Optional: token expiration
        );

        // Set cookie with token
        res.cookie("token", token, {
            httpOnly: true, // Prevent client-side access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
           
        });

        // Send login success response
        return res.status(200).json({
            success: true,
            message: "Login successful"
        });
    } catch (error) {
        console.error("Error during login:", error); // Log for debugging
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};

// for logout User
const logOutUser = (req,res)=>{
    res.clearCookie({
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'strict'
    });

    return res.status(200).json({
        success:true,
        message:"Logout Successful"
    })
}


module.exports = { register, loginUser, logOutUser };
