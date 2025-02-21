import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config(); 

export interface AuthenticatedRequest extends Request {
  user?: { id: string }
}

// generate a random secret key of sufficient length
const generateSecretKey = (): string => {
  return crypto.randomBytes(32).toString('hex'); // generate a 256-bit (32-byte) random string
};

const key: string = process.env.SECRET_KEY || generateSecretKey();

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) { 
  return res.status(401).json({ message: 'Access denied. Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Access denied. Invalid or expired token" });
  }
}

export default authenticateToken ;