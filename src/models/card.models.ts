export interface CardModel {
    "id": string,
    "series": string,
    "serialNumber": string,
    "cardSerial": string,
    "rarity": string,
    "cardType": string,
    "cost": string,
    "power": string,
    "counter": string,
    "color": string,
    "type": string,
    "effect": string,
    "cardSet": string,
    "attribute": string,
    "cardName": string,
    "image": string,
    "trigger": null | string
}
export interface Pagination {
    "totalItems": number,
    "currentPage": number,
    "totalPages": number,
    "hasNextPage": boolean,
    "hasPreviousPage": boolean
}
export interface CardResultModel {
    "pagination": Pagination,
    "data":CardModel[]
}


