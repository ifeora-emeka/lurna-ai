import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    _user?: User;
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log('[AUTH] Processing request:', req.method, req.path);
        console.log('[AUTH] Headers:', Object.keys(req.headers));
        
        const sessionToken = req.headers['authorization']?.replace('Bearer ', '');
        
        if (!sessionToken) {
            console.log('[AUTH] No session token provided');
            res.status(401).json({ error: 'Unauthorized: No session token provided' });
            return;
        }
        
        console.log('[AUTH] Session token received (first 20 chars):', sessionToken.substring(0, 20) + '...');
        
        const secret = process.env.NEXTAUTH_SECRET;
        if (!secret) {
            console.error('[AUTH] NEXTAUTH_SECRET is not defined in environment variables');
            res.status(500).json({ error: 'Server configuration error' });
            return;
        }
        
        try {
            console.log('[AUTH] Attempting to verify JWT token');
            const verified = jwt.verify(sessionToken, secret) as jwt.JwtPayload;

            console.log('[AUTH] JWT verification result:', {
                message: 'JWT verified successfully',
                userId: verified.sub,
                email: verified.email,
                issuedAt: verified.iat,
                expiresAt: verified.exp,
                currentTime: Math.floor(Date.now() / 1000)
            });
            
            if (!verified || !verified.sub) {
                console.log('[AUTH] Invalid token: missing sub claim');
                res.status(401).json({ error: 'Invalid session token' });
                return;
            }
            
            console.log('[AUTH] Looking up user with ID:', verified.sub);
            const user = await User.findByPk(verified.sub);
            
            if (!user) {
                console.log('[AUTH] User not found in database:', verified.sub);
                res.status(401).json({ error: 'User not found' });
                return;
            }
            
            console.log('[AUTH] User found:', { id: user.id, email: user.email });
            req._user = user;
            next();
        } catch (jwtError) {
            console.error('[AUTH] JWT verification error:', jwtError);
            res.status(401).json({ error: 'Invalid authentication token' });
            return;
        }
    } catch (error) {
        console.error('[AUTH] Auth middleware error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export type { AuthenticatedRequest };
