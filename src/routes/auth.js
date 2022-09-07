import { Router } from 'express';
import loginEmail from '../helpers/login-email.js';

const authRouter = Router();

// Public endpoint (Unauthorized and Unauthenticated)
authRouter.get('/public', (req, res) => res.send('Public endpoint'));

// Authenticated endpoint
authRouter.post('/authenticated', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send('Email and password are required');

  try {
    const user = loginEmail(email, password);

    return res.send(`User ${user.name} authenticated`);
  } catch (error) {
    return res.status(401).send(`${error}`);
  }
});

// Authorized endpoint for admin
authRouter.post('/authorized', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send('Email and password are required');

  try {
    const user = loginEmail(email, password);

    if (user.role !== 'admin')
      return res.status(403).send('No authorized user');

    return res.send(`User admin: ${user.name}`);
  } catch (error) {
    return res.status(401).send(`${error}`);
  }
});

export default authRouter;
