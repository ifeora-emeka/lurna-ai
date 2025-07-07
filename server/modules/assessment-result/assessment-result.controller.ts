import { Response } from 'express';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import AssessmentResultService from './assessment-result.service';

export const assessmentResultController = {
  async updateTimeStarted(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req._user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const { assessmentResultId } = req.body;

      if (!assessmentResultId) {
        res.status(400).json({ error: 'Assessment result ID is required' });
        return;
      }

      const result = await AssessmentResultService.updateTimeStarted(
        assessmentResultId,
        req._user.id
      );
      
      res.status(200).json({
        message: 'Time started updated successfully',
        data: result
      });
    } catch (error: any) {
      console.error('[DEBUG] Error in updateTimeStarted controller:', error);
      res.status(500).json({ 
        error: 'Failed to update time started',
        details: error.message || 'Unknown error' 
      });
    }
  },

  async submitAnswers(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req._user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const { assessmentResultId, answers } = req.body;

      if (!assessmentResultId || !answers) {
        res.status(400).json({ error: 'Assessment result ID and answers are required' });
        return;
      }

      const result = await AssessmentResultService.submitAssessment(
        assessmentResultId, 
        answers, 
        req._user.id
      );
      
      res.status(200).json({
        message: 'Assessment submitted successfully',
        data: result
      });
    } catch (error: any) {
      console.error('[DEBUG] Error in submitAnswers controller:', error);
      res.status(500).json({ 
        error: 'Failed to submit assessment',
        details: error.message || 'Unknown error' 
      });
    }
  }
};
