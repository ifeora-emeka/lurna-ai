import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateRequestBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({
        error: 'Invalid request data',
        details: error
      });
    }
  };
};
