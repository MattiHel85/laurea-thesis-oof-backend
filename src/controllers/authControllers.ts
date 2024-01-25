import { generateToken } from '../utils/authUtils';
import { User } from '../types/user';

const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');

const getProfile = async (req: any, res: any) => {
    try {
        const user: User = await UserModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req: any, res: any) => {
    const { email, password } = req.body;
    
    try {
        const user: User = await UserModel.findOne({email});
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid user' });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export {
    getProfile,
    login
};