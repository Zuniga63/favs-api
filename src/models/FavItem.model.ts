import { Schema, model, Types, Model } from 'mongoose';

export interface IFavItem {
  favList: Types.ObjectId;
  title: string;
  description?: string;
  link?: string;
}

const schema = new Schema<IFavItem, Model<IFavItem>>({
  favList: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    minlength: [3, 'Nombre demasiado corto.'],
    maxlength: [90, 'Nombre de usuario muy largo.'],
    required: true,
  },
  description: String,
  link: String,
});

export default model<IFavItem>('FavItem', schema);
