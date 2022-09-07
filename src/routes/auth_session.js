import { Router } from 'express';
import { nanoid } from 'nanoid';

import getUser from '../helpers/get-user.js';
import loginEmail from '../helpers/login-email.js';

const sessions = [];
const authSessionRouter = Router();

// Authenticated endpoint
authSessionRouter.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send('Email and password are required');

  try {
    const { guid, name } = loginEmail(email, password);

    const sessionId = nanoid();
    sessions.push({ sessionId, guid });

    res.cookie('sessionId', sessionId, {
      httpOnly: true,
    });
    return res.send(`User ${name} authenticated`);
  } catch (error) {
    return res.status(401).send(`${error}`);
  }
});

authSessionRouter.get('/profile', (req, res) => {
  const { cookies } = req;

  if (!cookies.sessionId) return res.sendStatus(401);

  const userSession = sessions.find(
    (session) => session.sessionId === cookies.sessionId
  );

  if (!userSession) return res.status(401).send('User not authenticated');

  try {
    const user = getUser(userSession.guid);

    delete user.password;

    return res.send(user);
  } catch (error) {
    return res.status(401).send(`${error}`);
  }
});

authSessionRouter.get('/logout', (req, res) => {
  const { cookies } = req;

  if (!cookies.sessionId) return res.sendStatus(401);

  const sessionIndex = sessions.findIndex(
    (session) => session.sessionId === cookies.sessionId
  );

  if (sessionIndex === -1)
    return res.status(401).send('User not authenticated');

  res.clearCookie('sessionId', { maxAge: 10 });

  return res.send('Logout successfully');
});

export default authSessionRouter;
