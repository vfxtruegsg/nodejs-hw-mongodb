import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
} from '../services/auth.js';
import { setupSession } from '../utils/setupSession.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).end();
};

export const refreshSessionController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  const session = await refreshUser(sessionId, refreshToken);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};
