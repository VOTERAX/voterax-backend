import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from "../../prisma";
import { Prisma, Admin } from '@prisma/client';

export interface RequestWithUser extends Request {
  admin?: any // Use any or define a more specific type
  token?: string
}

declare global {
  namespace Express {
    interface Request {
      admin?: Admin;
    }
  }
}

function verifyOrganizerToken(token: string): any {
  try {
    return jwt.verify(token, process.env.ADMIN_JWT_SECRET!)
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}


export const AdminAuthMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer Token
    if (!token) {
        return res
        .status(401)
        .json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded =  verifyOrganizerToken(token);
        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
        const adminId = decoded.id;

        const admin = await prisma.admin.findFirst({where: {id: adminId}});

        if (admin) {
            req.admin = admin; 
            next();
        }else{
            return res.status(403).json({ message: 'Access denied. Not an Admin.' });
        }

        } else {
        return res.status(403).json({ message: 'Access denied. Not an Admin.' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};