import express from 'express';
import { USERS_DB } from '../ddbb.js';

// This is a way to encapsulate a group of endpoints
const accountRouter = express.Router();

accountRouter.use((req, res, next) => {
  console.log(req.ip);

  next();
});

// Get details of an account
accountRouter.get('/:guid', (req, res) => {
  const { guid } = req.params;
  const account = USERS_DB.find((user) => user.guid === guid);
  if (!account) return res.status(404).send('No account found');
  return res.send(account);
});
// Create a new account with guid and name
accountRouter.post('', (req, res) => {
  const { guid, name } = req.body;
  const accountIndex = USERS_DB.findIndex((user) => user.guid === guid);
  if (accountIndex !== -1)
    return res.status(409).send('Account already exists');
  if (!name || !guid) return res.status(400).send('Name and guid are required');

  USERS_DB.push({ guid, name });
  return res.send('Account created successfully');
});

// Update the name of an account
accountRouter.patch('/:guid', (req, res) => {
  const { guid } = req.params;
  const { name } = req.body;
  const accountIndex = USERS_DB.findIndex((user) => user.guid === guid);
  if (accountIndex === -1) return res.status(404).send('No account found');
  if (!name) return res.status(400).send('Name is required');

  USERS_DB[accountIndex].name = name;
  return res.send('Account updated successfully');
});

// Delete an account
accountRouter.delete('/:guid', (req, res) => {
  const { guid } = req.params;
  const accountIndex = USERS_DB.findIndex((user) => user.guid === guid);
  if (accountIndex === -1) return res.status(404).send('No account found');

  USERS_DB.splice(accountIndex, 1);
  return res.send('Account deleted successfully');
});

export default accountRouter;
