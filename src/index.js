import express from 'express';
import dotenv from 'dotenv';
import accountRouter from './routes/account.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.text());

// If you don't put the first param the encapsulation doesn't work properly
expressApp.use('/account', accountRouter);

expressApp.get('/root', (req, res) => {
  res.send('This is the root endpoint');
});

expressApp.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
