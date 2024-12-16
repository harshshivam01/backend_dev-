const user = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/auth");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await user.create({ name, email, password: hashedPassword });

        res.status(201).json({
            message: "User registered successfully",
            token: generateToken(newUser),
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Email already exists" });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

const loginUser = async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const foundUser = await user.findOne({ name });
        if (!foundUser) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = generateToken(foundUser);
        res.status(200)
            .cookie("token", token, {
                httpOnly: true,
              
                maxAge: 30 * 24 * 60 * 60 * 1000,
            })
            .json({
                message: "Login successful",
                token: token,
                user: { name: foundUser.name, email: foundUser.email },
            });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { registerUser, loginUser };
