import { Document } from 'mongoose';
import { User } from '../models/userModel';

declare global {
  namespace Express {
    interface Request {
      user: Document<User> | null;
    }
  }
}

export {};