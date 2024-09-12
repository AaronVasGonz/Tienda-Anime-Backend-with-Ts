import express from 'express';
import { verifyUser } from '../utils/jwt';
import { UserRepository, RoleRepository, UserService } from '../services/index';

const roleRepository = new RoleRepository();
const userRepository = new UserRepository(roleRepository);
const userService = new UserService(userRepository);

import { JwtPayload } from 'jsonwebtoken';

interface RequestWithUser extends express.Request {
  user?: CustomJwtPayload;
}

interface CustomJwtPayload extends JwtPayload {
  correo: string;
  id: string;
  // otros campos si es necesario...
}

const authMiddleware: express.RequestHandler = async (req, res, next) => {
  const accessToken = req.headers['authorization'];

  if (!accessToken) {
    return res.status(401).json({ error: "Authorization token not provided" });
  }

  try {
    const payload = await verifyUser(accessToken);

    if (typeof payload !== 'object' || !('correo' in payload) || !('id' in payload)) {
      return res.status(400).json({ error: "Invalid token payload" });
    }

    const { correo, ...userObject } = payload as CustomJwtPayload;
    const user = await userService.getUserByEmail(correo);

    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }

    (req as RequestWithUser).user = { correo, ...userObject };
    next();

  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(403).json({ error: error.message });
    } else {
      return res.status(403).json({ error: "Invalid token" });
    }
  }
};

export default authMiddleware;