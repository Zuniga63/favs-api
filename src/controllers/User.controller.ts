import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import UserModel, { IUser } from '../models/User.model';
import createToken from '../utils/createToken';
import InvalidSignInError from '../utils/errors/InvalidSignInError';
import sendError from '../utils/SendError';

export default async function signUp(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const user = await UserModel<IUser>.create({ ...req.body });
    const token = createToken(user.id);
    res.status(201).json({ token });
  } catch (error: any) {
    sendError(error, res);
  }
}

export async function signIn(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  const unauthorizeMessage: string = 'Correo o contraseña invalido';

  try {
    const user = await UserModel.findOne({ email });
    if (!user) throw new InvalidSignInError(unauthorizeMessage);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new InvalidSignInError(unauthorizeMessage);

    const token = createToken(user.id);

    res.status(200).json({ token });
  } catch (error) {
    sendError(error, res);
  }
}
