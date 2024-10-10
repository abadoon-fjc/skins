import { pool } from '../db/db';

export const purchaseItem = async (userId: number, itemId: number) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows: userRows } = await client.query(
      'SELECT balance FROM users WHERE id = $1', [userId]
    );
    const balance = userRows[0].balance;

    const { rows: itemRows } = await client.query(
      'SELECT price FROM items WHERE id = $1', [itemId]
    );
    const price = itemRows[0].price;

    if (balance < price) {
      throw new Error('Insufficient balance');
    }

    await client.query(
      'UPDATE users SET balance = balance - $1 WHERE id = $2', [price, userId]
    );
    await client.query(
      'INSERT INTO purchases(user_id, item_id, price) VALUES($1, $2, $3)', [userId, itemId, price]
    );

    await client.query('COMMIT');
    return { message: 'Purchase successful' };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
