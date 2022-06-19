import { Schema, model, Types, models } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  favs: Types.ObjectId[];
}

const emailRegex = /^[^@]+@[^@]+.[^@]+$/;

const schema = new Schema<IUser>(
  {
    name: {
      type: String,
      minlength: [3, 'Nombre demasiado corto.'],
      maxlength: [90, 'Nombre de usuario muy largo.'],
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [emailRegex, 'Correo invalido.'],
      validate: [
        {
          async validator(value: string) {
            const user = await models.User.findOne({ email: value });
            if (user) return !user;
            return false;
          },
          message: 'Ya existe un usuario registrado con ese correo',
        },
      ],
    },
    password: {
      type: String,
      required: true,
    },
    favs: { type: [{ type: Schema.Types.ObjectId, ref: 'FavList' }] },
  },
  { timestamps: true }
);

export default model<IUser>('User', schema);
