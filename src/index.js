import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import accountRouter from './routes/account.js';
import authRouter from './routes/auth.js';
import authSessionRouter from './routes/auth_session.js';
import authTokenRouter from './routes/auth_token.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const expressApp = express();

expressApp.use(cookieParser());
expressApp.use(express.json());
expressApp.use(express.text());

// If you don't put the first param the encapsulation doesn't work properly
expressApp.use('/account', accountRouter);
expressApp.use('/auth', authRouter);

expressApp.use('/auth-session', authSessionRouter);
expressApp.use('/auth-token', authTokenRouter);

expressApp.get('/root', (req, res) => {
  res.send('This is the root endpoint');
});

const bootstrap = async () => {
  await mongoose.connect(process.env.MONGODB_URL);

  expressApp.listen(PORT, () =>
    console.log(`Server listening at port ${PORT}`)
  );
};

bootstrap();
