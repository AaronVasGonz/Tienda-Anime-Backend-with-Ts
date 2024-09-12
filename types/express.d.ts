// src/@types/express.d.ts
import { UserObject } from '../utils/jwt'; 

declare global {
  namespace Express {
    interface Request {
      user?: UserObject; 
    }
  }
}