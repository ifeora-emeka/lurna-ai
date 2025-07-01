import { Response } from 'express';
import SetsService from './sets.service';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';

export const setsController = {
  async createSetFromPrompt(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      console.log('[DEBUG] createSetFromPrompt called with prompt:', req.body.prompt);
      
      if (!req._user) {
        console.log('[DEBUG] User not authenticated');
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      console.log('[DEBUG] Calling SetsService.createFromPrompt');
      const setData = await SetsService.createFromPrompt(req.body.prompt, req._user.id);
      console.log('[DEBUG] Set created successfully:', setData.id);

      res.status(201).json({
        message: 'Learning set created successfully',
        data: setData
      });
    } catch (error: any) {
      console.error('[DEBUG] Error in createSetFromPrompt controller:', error);
      console.error('[DEBUG] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      
      // Provide more specific error messages based on the error type
      if (error.message && error.message.includes('AI failed')) {
        res.status(500).json({ 
          error: 'Failed to generate content with AI', 
          details: error.message 
        });
        return;
      }
      
      if (error.message && error.message.includes('parse JSON')) {
        res.status(500).json({ 
          error: 'Failed to parse AI response', 
          details: 'The AI generated an invalid response format' 
        });
        return;
      }
      
      res.status(500).json({ 
        error: 'Failed to create learning set',
        details: error.message || 'Unknown error' 
      });
    }
  },

  async createSet(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      console.log('[DEBUG] createSet called with prompt:', req.body.prompt);
      
      if (!req._user) {
        console.log('[DEBUG] User not authenticated');
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      console.log('[DEBUG] Calling SetsService.createFromPrompt');
      const setData = await SetsService.createFromPrompt(req.body.prompt, req._user.id);
      console.log('[DEBUG] Set created successfully:', setData.id);

      res.status(201).json({
        message: 'Learning set created successfully',
        data: setData
      });
    } catch (error: any) {
      console.error('[DEBUG] Error in createSet controller:', error);
      console.error('[DEBUG] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      
      // Provide more specific error messages based on the error type
      if (error.message && error.message.includes('AI failed')) {
        res.status(500).json({ 
          error: 'Failed to generate content with AI', 
          details: error.message 
        });
        return;
      }
      
      if (error.message && error.message.includes('parse JSON')) {
        res.status(500).json({ 
          error: 'Failed to parse AI response', 
          details: 'The AI generated an invalid response format' 
        });
        return;
      }
      
      res.status(500).json({ 
        error: 'Failed to create learning set',
        details: error.message || 'Unknown error' 
      });
    }
  }
};