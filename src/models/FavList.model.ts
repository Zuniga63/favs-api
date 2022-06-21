import { Schema, model, Types } from 'mongoose';

export interface IFavList {
  user: Types.ObjectId;
  name: String;
  items: Types.ObjectId[];
}

const schema = new Schema<IFavList>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      minlength: [3, 'Nombre demasiado corto.'],
      maxlength: [90, 'Nombre de usuario muy largo.'],
      required: true,
    },
    items: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'FavItem',
        },
      ],
    },
  },
  { timestamps: true }
);

export default model<IFavList>('FavList', schema);
