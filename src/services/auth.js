import bcrypt from 'bcrypt';
import { UserCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';

export const registerUser = async (payload) => {
  const isNewUser = await UserCollection.findOne({ email: payload.email });
  if (isNewUser) {
    throw createHttpError(409, 'User already registered with this email');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  return await UserCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};
