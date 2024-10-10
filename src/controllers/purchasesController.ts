import { Request, Response } from 'express';
import { purchaseItem } from '../services/purchaseService';

export const buyItem = async (req: Request, res: Response) => {
    const { userId, itemId } = req.body;
  
    try {
      const result = await purchaseItem(userId, itemId);
      res.json(result);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  };
