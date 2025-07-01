import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    _user?: User;
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const sessionToken = req.headers['authorization']?.replace('Bearer ', '');
        
        if (!sessionToken) {
            res.status(401).json({ error: 'Unauthorized: No session token provided' });
            return;
        }
        
        const secret = process.env.NEXTAUTH_SECRET;
        if (!secret) {
            console.error('NEXTAUTH_SECRET is not defined in environment variables');
            res.status(500).json({ error: 'Server configuration error' });
            return;
        }
        
        try {
            const verified = jwt.verify(sessionToken, secret) as jwt.JwtPayload;
            
            if (!verified || !verified.sub) {
                res.status(401).json({ error: 'Invalid session token' });
                return;
            }
            
            const user = await User.findByPk(verified.sub);
            
            if (!user) {
                res.status(401).json({ error: 'User not found' });
                return;
            }
            
            req._user = user;
            next();
        } catch (jwtError) {
            console.error('JWT verification error:', jwtError);
            res.status(401).json({ error: 'Invalid authentication token' });
            return;
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export type { AuthenticatedRequest };
