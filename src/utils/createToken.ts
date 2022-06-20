import jwt from 'jsonwebtoken';

/**
 *
 * @param userId Id del usuario autenticado
 * @param duration Duración en segundos del token.
 * @returns
 */
export default function createToken(userId: string, duration?: number): string {
  const secretKey: string = process.env.JWT_SECRET_KEY || 'secretKey';
  const expiresIn: number = duration || 60 * 60 * 24;

  return jwt.sign({ id: userId }, secretKey, { expiresIn });
}
