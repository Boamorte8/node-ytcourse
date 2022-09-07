import { USERS_DB } from '../ddbb.js';

const getUser = (guid) => {
  const user = USERS_DB.find((user) => user.guid === guid);
  if (!user) throw new Error('User not found');

  return user;
};

export default getUser;
