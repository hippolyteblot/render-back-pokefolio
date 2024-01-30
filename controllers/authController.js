const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

const AuthController = {
    register: async (req, res) => {
        console.log('req.body:', req.body);
        const { username, password } = req.body;

        try {
            // Check if user already exists
            const existingUser = await UserModel.getUserByUsername(username);
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            await UserModel.createUser(username, hashedPassword);

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    login: async (req, res) => {
        console.log('req.body:', req.body);
        const { username, password } = req.body;

        try {
            // Check if user exists
            const user = await UserModel.getUserByUsername(username);
            if (!user) {
                return res.status(400).json({ error: 'Invalid username or password' });
            }

            // Check if password is correct
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ error: 'Invalid username or password' });
            }
            console.log('user:', user);
            res.status(200).json({ message: 'User logged in successfully', id: user.id });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = AuthController;
