import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from "../../prisma";
import { Prisma, Organizer } from '@prisma/client';

export interface RequestWithUser extends Request {
  organizer?: any // Use any or define a more specific type
  token?: string
}

declare global {
  namespace Express {
    interface Request {
      organizer?: Organizer;
    }
  }
}

function verifyOrganizerToken(token: string): any {
  try {
    return jwt.verify(token, process.env.ORGANIZER_JWT_SECRET!)
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}


export const OrganizerAuthMiddleware = async (
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
        const organizerId = decoded.id;

        const organizer = await prisma.organizer.findFirst({where: {id: organizerId}});

        if (organizer) {
            req.organizer = organizer; 
            next();
        }else{
            return res.status(403).json({ message: 'Access denied. Not an Organizer.' });
        }

        } else {
        return res.status(403).json({ message: 'Access denied. Not an Organizer.' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};