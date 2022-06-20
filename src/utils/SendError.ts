import { Response } from 'express';

/**
 * Response Code
 * 400: Bad Request
 * 401: Unauthorized
 * 403: Forbidden
 * 404: Not Found
 * 405: Method Not Allowed
 * 415: Unsupported Media Type
 *
 * 500 Internal Server Error
 * 511 Network Authentication Required
 */
export default function sendError(error: any, res: Response) {
  if (error.name === 'ValidationError') {
    res.status(400).json({ error });
    return;
  }

  if (error.name === 'InvalidSignInError') {
    res.status(400).json({ error });
    return;
  }

  if (error.name === 'AuthError') {
    res.status(401).json({ error });
    return;
  }

  res.status(500).json({ message: error.message, error });
  // eslint-disable-next-line no-console
  console.log(error);
}
