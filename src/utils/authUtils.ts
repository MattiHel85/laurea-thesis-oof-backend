require('dotenv').config();

import jwt from 'jsonwebtoken';
import { User } from '../types/user';

export const generateToken = (user: User) => {
    const accessTokenPayload = {
        id: user.id,
        email: user.email
    };

    const refreshTokenPayload = {
        id: user.id
    }

    const secretKey = process.env.JWT_SECRET_KEY || 'secretKeyByDefault';
    const accessToken = jwt.sign(accessTokenPayload, secretKey, { expiresIn: '2h'});
    const refreshToken = jwt.sign(refreshTokenPayload, secretKey, { expiresIn: '7d'});

    console.log('Generated Acess Token:', accessToken);
    console.log('Generated Refresh Token', refreshToken)

    return {accessToken, refreshToken};
}