import { Request, Response } from 'express';
import { getItemsWithMinPrices } from '../services/skinportService';

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await getItemsWithMinPrices();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};
