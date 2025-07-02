import { Response } from 'express';
import UnitsService from './units.service';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';

export const unitsController = {
  async generateUnitsForModule(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { moduleId } = req.params;
      
      if (!req._user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      if (!moduleId) {
        res.status(400).json({ error: 'Module ID is required' });
        return;
      }

      const moduleIdNumber = parseInt(moduleId, 10);
      if (isNaN(moduleIdNumber)) {
        res.status(400).json({ error: 'Module ID must be a valid number' });
        return;
      }

      const units = await UnitsService.generateUnitsForModule(moduleIdNumber, req._user.id);
      
      res.status(201).json({
        message: `${units.length} units generated successfully`,
        data: units
      });
    } catch (error: any) {
      console.error('[DEBUG] Error in generateUnitsForModule controller:', error);
      
      if (error.message === 'Module not found') {
        res.status(404).json({ error: 'Module not found' });
        return;
      }
      
      if (error.message && error.message.includes('AI failed')) {
        res.status(500).json({ 
          error: 'Failed to generate units with AI', 
          details: error.message 
        });
        return;
      }
      
      if (error.name === 'SequelizeUniqueConstraintError' || 
          (error.original && error.original.code === 'SQLITE_CONSTRAINT')) {
        console.error('[DEBUG] Database constraint error:', error.original?.message || error.message);
        res.status(500).json({ 
          error: 'Database constraint error', 
          details: error.original?.message || 'Error storing units in database. Missing required fields.'
        });
        return;
      }
      
      if (error.message && error.message.includes('Cannot create units')) {
        res.status(400).json({ 
          error: 'Invalid module data', 
          details: error.message 
        });
        return;
      }
      
      res.status(500).json({ 
        error: 'Failed to generate units',
        details: error.message || 'Unknown error' 
      });
    }
  }
};
