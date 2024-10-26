import express, { Request, Response } from 'express';
import { UserRequest } from './types';

const router = express.Router();

router.get('/usernames', (req: UserRequest, res: Response) => {
  const usernames = req.users?.map((user) => ({
    id: user.id,
    username: user.username,
  }));
  res.json(usernames);
});

router.get('/username/:name', (req: UserRequest, res: Response) => {
  const { name } = req.params;
  const user = req.users?.find((user) => user.username === name);

  if (user) {
    res.json({ email: user.email });
  } else {
    res.status(404).json({ error: { message: 'User not found', status: 404 } });
  }
});

export default router;
