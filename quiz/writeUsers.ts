import express, { Response } from 'express';
import fs from 'fs';
import path from 'path';
import { UserRequest, User } from './types';

const router = express.Router();
const dataFile = path.resolve(__dirname, '../data/users.json');

router.post('/adduser', (req: UserRequest, res: Response) => {
  const newUser: User = req.body as User;
  
  if (req.users) {
    req.users.push(newUser);

    // Write the updated users array back to the file
    fs.writeFile(dataFile, JSON.stringify(req.users), (err) => {
      if (err) {
        console.error('Failed to save user');
        return res.status(500).send('Error saving user');
      }
      console.log('User saved');
      res.status(201).send('User added successfully');
    });
  } else {
    res.status(500).send('User list not found');
  }
});

export default router;
