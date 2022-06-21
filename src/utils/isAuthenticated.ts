import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthError from './errors/AuthError';
import sendError from './SendError';

export interface IAuthRequest extends Request {
  userId?: string;
}

export interface IDecode {
  id: string;
}

export default function isAuthenticated(
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    const { authorization } = req.headers;
    const message = 'Su sesión expiró.';
    if (!authorization) throw new AuthError(message);

    // eslint-disable-next-line no-unused-vars
    const [_, token] = authorization.split(' ');

    if (!token) throw new AuthError(message);

    const secretKey = process.env.JWT_SECRET_KEY || '';
    jwt.verify(token, secretKey, (error, decode) => {
      if (error || !decode) {
        throw new AuthError('Failed to authenticate token.');
      } else {
        req.userId = (decode as IDecode).id;
        next();
      }
    });
  } catch (error) {
    sendError(error, res);
  }
}
