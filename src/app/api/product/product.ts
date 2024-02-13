
let Favourites = [
    {prodId : '010', favCount : 1},
]
export function markFavourite({ params } : { params : {prodId : string, isFavourite : boolean} }) {

    let exists = false;
    for(let i = 0; i < Favourites.length; i++) {
        if (Favourites[i].prodId === params.prodId) {
            params.isFavourite && Favourites[i].favCount++;
            exists = true;  break;
        }
    }
    if (!exists) {Favourites.push({prodId : params.prodId, favCount : 1})}
}

export function getFavourite() {
    return (Favourites);
}