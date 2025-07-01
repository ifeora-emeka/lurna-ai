import { Response } from 'express';
import ModulesService from './modules.service';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';

export const modulesController = {
  async generateModulesForSet(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { setSlug } = req.params;
      
      if (!req._user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      if (!setSlug) {
        res.status(400).json({ error: 'Set slug is required' });
        return;
      }

      const modules = await ModulesService.generateModulesForSet(setSlug, req._user.id);
      
      res.status(201).json({
        message: `${modules.length} modules generated successfully`,
        data: modules
      });
    } catch (error: any) {
      console.error('[DEBUG] Error in generateModulesForSet controller:', error);
      
      if (error.message === 'Set not found') {
        res.status(404).json({ error: 'Set not found' });
        return;
      }
      
      if (error.message && error.message.includes('AI failed')) {
        res.status(500).json({ 
          error: 'Failed to generate modules with AI', 
          details: error.message 
        });
        return;
      }
      
      res.status(500).json({ 
        error: 'Failed to generate modules',
        details: error.message || 'Unknown error' 
      });
    }
  }
};
