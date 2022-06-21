import { Schema, model, Types, models, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  name: string;
  email: string;
  password: string;
  favs: Types.ObjectId[];
}

const emailRegex = /^[^@]+@[^@]+.[^@]+$/;
const strongPass =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

const schema = new Schema<IUser, Model<IUser>>(
  {
    name: {
      type: String,
      minlength: [3, 'Nombre demasiado corto.'],
      maxlength: [90, 'Nombre de usuario muy largo.'],
      required: [true, 'Nombre de usuario es requerido.'],
    },
    email: {
      type: String,
      required: [true, 'Se requiere el correo electronico.'],
      match: [emailRegex, 'Correo invalido.'],
      validate: [
        {
          async validator(value: string) {
            try {
              const user = await models.User.findOne({ email: value });
              return !user;
            } catch (error) {
              return false;
            }
          },
          message: 'Ya existe un usuario registrado con ese correo',
        },
      ],
    },
    password: {
      type: String,
      match: [strongPass, 'La contraseña no es segura'],
      required: [true, 'Se requiere una contraseña.'],
    },
    favs: { type: [{ type: Schema.Types.ObjectId, ref: 'FavList' }] },
  },
  { timestamps: true }
);

/**
 * Ref: https://www.section.io/engineering-education/password-strength-checker-javascript/
 */
schema.pre('save', function encryptPassword(next) {
  const user = this;
  const saltRounds = 10;

  if (this.isModified('password') || this.isNew) {
    // eslint-disable-next-line consistent-return
    bcrypt.genSalt(saltRounds, (saltError, salt) => {
      if (saltError) return next(saltError);

      // eslint-disable-next-line consistent-return
      bcrypt.hash(user.password, salt, (hashError, hash) => {
        if (hashError) return next(hashError);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

export default model<IUser>('User', schema);
