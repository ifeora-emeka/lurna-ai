import { Request, Response } from 'express';
import SetsService from './sets.service';
import { createSetRequestSchema } from './set.dto';

export const setsController = {
  async createSet(req: Request, res: Response) {
    console.log('[DEBUG] Sets controller - createSet called');
    console.log('[DEBUG] Request body:', req.body);
    console.log('[DEBUG] Request headers:', req.headers);
    
    try {
      console.log('[DEBUG] Validating request data...');
      const validationResult = createSetRequestSchema.safeParse(req.body);

      if (!validationResult.success) {
        console.log('[DEBUG] Validation failed:', validationResult.error.errors);
        res.status(400).json({
          error: 'Invalid request data',
          details: validationResult.error.errors
        });
        return;
      }

      console.log('[DEBUG] Validation successful');
      const { prompt } = validationResult.data;
      console.log('[DEBUG] Extracted prompt:', prompt);

      console.log('[DEBUG] Calling SetsService.create...');
      const modules = await SetsService.create(prompt);
      console.log('[DEBUG] SetsService.create completed successfully');
      console.log('[DEBUG] Generated modules:', modules);

      console.log('[DEBUG] Sending successful response...');
      res.status(200).json({
        message: 'Learning modules generated successfully',
        data: modules
      });
      console.log('[DEBUG] Response sent successfully');
    } catch (error) {
      console.error('[DEBUG] Error in createSet controller:', error);
      console.error('[DEBUG] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      res.status(500).json({ error: 'Failed to generate learning modules' });
    }
  }
};