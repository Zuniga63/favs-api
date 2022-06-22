import { Response, Request } from 'express';
import FavItemModel, { IFavItem } from '../models/FavItem.model';
import FavListModel, { IFavList } from '../models/FavList.model';
import UserModel, { IUser } from '../models/User.model';
import NotFoundError from '../utils/errors/NotFoundError';
import { IAuthRequest } from '../utils/isAuthenticated';
import sendError from '../utils/SendError';

interface ICreateBody {
  listName: string;
  items: IFavItem[];
}

const itemFieldsPopulate = 'id title description link';

export async function create(req: Request, res: Response): Promise<void> {
  const { listName, items }: ICreateBody = req.body;
  const { userId } = req as IAuthRequest;

  try {
    const user = await UserModel<IUser>.findById(userId);
    if (!user) throw new NotFoundError('Usuario no encontrado');

    const favList = await FavListModel<IFavList>.create({
      user: userId,
      name: listName,
    });

    user.favs.push(favList.id);
    await user.save({ validateBeforeSave: false });

    await Promise.all(
      items.map(async (item) => {
        const favItem = await FavItemModel<IFavItem>.create({
          ...item,
          favList: favList.id,
        });
        favList.items.push(favItem.id);
      })
    );

    await favList.save({ validateBeforeSave: false });
    await favList.populate('items', itemFieldsPopulate);

    res
      .status(201)
      .json({ ok: true, message: 'Fav list was created.', favList });
  } catch (error) {
    sendError(error, res);
  }
}

export async function list(req: Request, res: Response): Promise<void> {
  const { userId } = req as IAuthRequest;

  try {
    const favList = await FavListModel.find({ user: userId })
      .populate<{ user: IUser }>('user', 'id, name')
      .populate('items', itemFieldsPopulate);

    res.status(200).json({ favList });
  } catch (error) {
    sendError(error, res);
  }
}

export async function destroy(req: Request, res: Response): Promise<void> {
  const { userId } = req as IAuthRequest;
  const { favListId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new NotFoundError('Usuario no encontrado.');
    if (user.favs.some((itemId) => itemId.equals(favListId))) {
      throw new NotFoundError('Esta lista no pertenece al usuario.');
    }

    const favList = await FavListModel.findByIdAndDelete(favListId);
    if (!favList) throw new Error('No se pudo eliminar la lista');

    user.favs = user.favs.filter((itemId) => !itemId.equals(favListId));
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ ok: true, message: 'Listado eliminado.', favList });
  } catch (error) {
    sendError(error, res);
  }
}
