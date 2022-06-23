import { Schema, model, Types } from 'mongoose';
import FavItemModel from './FavItem.model';

export interface IFavList {
  user: Types.ObjectId;
  name: String;
  items: Types.ObjectId[];
}

const schema = new Schema<IFavList>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

schema.pre('findOneAndDelete', async function deleteItems(next) {
  try {
    const { _id: favList } = this.getFilter();
    await FavItemModel.deleteMany({ favList });
    next();
  } catch (error: any) {
    next(error);
  }
});

export default model<IFavList>('FavList', schema);
