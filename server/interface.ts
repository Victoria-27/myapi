interface Variety{
    size: string,
    color: string,
    quantity: string,
    images: string[],
    price:string
}
export interface Product{
    productId: number,
    productName: string,
    productDescription: string,
    productVarieties: Variety[],
    dateEdited:string,
    dateUploaded:string
}