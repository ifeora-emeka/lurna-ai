import { Request, Response } from 'express';
import { createHardcodedSet } from './sets.service';

export const createSet = async (req: Request, res: Response) => {
  try {
    const set = await createHardcodedSet();
    res.status(201).json(set);
  } catch (error) {
    console.error('Error creating set:', error);
    res.status(500).json({ message: 'Failed to create set', error });
  }
};