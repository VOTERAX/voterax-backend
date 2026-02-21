import jwt from 'jsonwebtoken';

export interface TokenPayload {
  id: string;
  email: string;
}

export function generateToken(payload: TokenPayload): string {
  const tokenPayload: TokenPayload = {
    id: payload.id,
    email: payload.email,
  };

  return jwt.sign(tokenPayload, process.env.USER_JWT_SECRET!,);
}