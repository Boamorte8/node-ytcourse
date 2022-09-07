import { USERS_DB } from '../ddbb.js';

const loginEmail = (email, password) => {
  const user = USERS_DB.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) throw new Error('Email y/o password are wrong');

  return user;
};

export default loginEmail;
