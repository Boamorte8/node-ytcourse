import { Router } from 'express';
import { jwtVerify, SignJWT } from 'jose';

import getUser from '../helpers/get-user.js';
import loginEmail from '../helpers/login-email.js';
import validateLoginDTO from '../dto/validate_login_dto.js';

const authTokenRouter = Router();
const encoder = new TextEncoder();

// Authenticated endpoint
authTokenRouter.post('/login', validateLoginDTO, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send('Email and password are required');

  try {
    const { guid, name } = loginEmail(email, password);

    const jwtConstructor = new SignJWT({ guid });
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    res.setHeader('authorization', jwt);
    return res.send({
      message: `User ${name} authenticated`,
      jwt,
    });
  } catch (error) {
    return res.status(401).send(`${error}`);
  }
});

authTokenRouter.post('/profile', async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return res.sendStatus(401);

  const jwt = authorization.split(' ')[1];

  try {
    const { payload } = await jwtVerify(
      jwt,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    const user = getUser(payload.guid);
    delete user.password;
    return res.send(user);
  } catch (error) {
    return res.status(401).send(`${error}`);
  }
});

export default authTokenRouter;