import { Response } from 'express';
import LearningPathService from './learning-path.service';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';

export const learningPathController = {
  async createLearningPath(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req._user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const { setId } = req.body;

      if (!setId) {
        res.status(400).json({ error: 'Set ID is required' });
        return;
      }

      const learningPath = await LearningPathService.createLearningPath(setId, req._user.id);
      
      res.status(201).json({
        message: 'Learning path created successfully',
        data: learningPath
      });
    } catch (error: any) {
      console.error('[DEBUG] Error in createLearningPath controller:', error);
      res.status(500).json({ 
        error: 'Failed to create learning path',
        details: error.message || 'Unknown error' 
      });
    }
  }
};
