import { Request, Response } from 'express';
import User from '../../models/User';
import Wallet from '../../models/Wallet';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';

export const authController = {
    async handleAuthCallback(req: Request, res: Response) {
        try {
            const { id, name, email, image, emailVerified } = req.body;

            if (!id || !email) {
                res.status(400).json({ error: 'Missing required user data' });
                return
            }

            const [user, created] = await User.findOrCreate({
                where: { email },
                defaults: {
                    id,
                    name: name || email.split('@')[0],
                    email,
                    image,
                    emailVerified: emailVerified ? new Date(emailVerified) : undefined
                }
            });

            let wallet;
            if (created) {
                wallet = await Wallet.create({ userId: user.id, tier: 0, totalBalance: 0 });
            } else {
                wallet = await Wallet.findOne({ where: { userId: user.id } });
                if (!wallet) {
                    wallet = await Wallet.create({ userId: user.id, tier: 0, totalBalance: 0 });
                }
            }

            if (!created) {
                await user.update({
                    name: name || user.name,
                    image: image || user.image,
                    emailVerified: emailVerified ? new Date(emailVerified) : undefined
                });
            }

            res.status(200).json({
                message: created ? 'User created successfully' : 'User updated successfully',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                },
                wallet: wallet ? {
                    id: wallet.id,
                    userId: wallet.userId,
                    tier: wallet.tier,
                    totalBalance: wallet.totalBalance
                } : null
            });
        } catch (error) {
            console.error('Auth callback error:', error);
            res.status(500).json({ error: 'Internal server error' });
            return
        }
    },

    async getCurrentUser(req: AuthenticatedRequest, res: Response) {
        try {
            if (!req._user) {
                res.status(401).json({ error: 'Unauthorized' });
                return
            }
            const wallet = await Wallet.findOne({ where: { userId: req._user.id } });
            res.status(200).json({
                user: {
                    id: req._user.id,
                    name: req._user.name,
                    email: req._user.email,
                    image: req._user.image
                },
                wallet: wallet ? {
                    id: wallet.id,
                    userId: wallet.userId,
                    tier: wallet.tier,
                    totalBalance: wallet.totalBalance
                } : null
            });
            return
        } catch (error) {
            console.error('Get current user error:', error);
            res.status(500).json({ error: 'Internal server error' });
            return
        }
    }
};
