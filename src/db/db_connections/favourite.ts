import { ConnectDatabase } from '@/db/db_connections/Connector';
import FavouriteModel from '@/db/models/favouritesModel';
import { FavouritesType } from '@/TypeInterfaces/TypeInterfaces';

export async function getFavourites(id: string) {
    await ConnectDatabase();

    const res = await FavouriteModel.findOne({favouriteId:id});
    return res;
}

export async function addToFavourites(favourite: FavouritesType) {
    await ConnectDatabase();

    const res = await FavouriteModel.create(favourite);
    return res;
}

export async function removeFromFavourites(id: string) {
    await ConnectDatabase();

    const res = await FavouriteModel.deleteOne({favouriteId:id});
    return res;
}