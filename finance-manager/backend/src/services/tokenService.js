import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const DEFAULT_EXPIRES = process.env.JWT_EXPIRES || '60d';

export const tokenService = {
    generateToken: (payload, expiresIn = DEFAULT_EXPIRES) => {
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        return jwt.sign(payload, JWT_SECRET, { expiresIn });
    },

    verifyToken: (token) => {
        try {
            if (!JWT_SECRET) {
                throw new Error('JWT_SECRET is not defined');
            }
            return jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return null;
        }
    }
};
