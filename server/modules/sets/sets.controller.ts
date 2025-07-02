import { Response } from 'express';
import SetsService from './sets.service';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';

export const setsController = {
  async getUserSets(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req._user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const search = req.query.search as string;

      const result = await SetsService.getUserSets(req._user.id, page, limit, search);
      
      res.status(200).json({
        message: 'Sets retrieved successfully',
        ...result
      });
    } catch (error: any) {
      console.error('[DEBUG] Error in getUserSets controller:', error);
      res.status(500).json({ 
        error: 'Failed to retrieve sets',
        details: error.message || 'Unknown error' 
      });
    }
  },

  async getSetBySlug(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      
      if (!slug) {
        res.status(400).json({ error: 'Set slug is required' });
        return;
      }

      const setData = await SetsService.getSetBySlug(slug, req._user?.id);
      
      res.status(200).json({
        message: 'Set retrieved successfully',
        data: setData
      });
    } catch (error: any) {
      console.error('[DEBUG] Error in getSetBySlug controller:', error);
      
      if (error.message === 'Set not found') {
        res.status(404).json({ error: 'Set not found' });
        return;
      }
      
      res.status(500).json({ 
        error: 'Failed to retrieve set',
        details: error.message || 'Unknown error' 
      });
    }
  },

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