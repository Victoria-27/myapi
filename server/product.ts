import { ProductInterface } from "./inteface";

class Product {
    productName: string; 
    productId: string;
    productDescription: string; 
    size: string; 
    color: string; 
    quantity: string; 
    images: string[]; 
    price: string; 
    dateUploaded: string; 
    dateEdited: string; 
    constructor(product: ProductInterface) {
        this.productName = product.productName;
        this.productId = product.productId;
        this.productDescription = product.productDescription;
        this.size = product.size;
        this.color = product.color;
        this.quantity = product.quantity;
        this.images = product.images;
        this.price = product.price;
        this.dateUploaded = product.dateUploaded;
        this.dateEdited = product.dateEdited;
    }
}

export default Product;