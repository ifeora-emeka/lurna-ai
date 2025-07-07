import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import { Response } from 'express';
import AssessmentsService from './assessments.service';

export const assessmentsController = {

    async generateAssessment(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            if (!req._user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }

            const { unitId, nextSteps } = req.body;

            if (!unitId || !nextSteps) {
                res.status(400).json({ error: 'Unit ID and next steps are required' });
                return;
            }

            const result = await AssessmentsService.generateAssessment({
                unitId,
                userId: req._user.id,
                nextSteps
            });

            res.status(201).json({
                message: 'Assessment generated successfully',
                data: result
            });
        } catch (error: any) {
            console.error('[DEBUG] Error in generateAssessment controller:', error);
            res.status(500).json({
                error: 'Failed to generate assessment',
                details: error.message || 'Unknown error'
            });
        }
    }

}
