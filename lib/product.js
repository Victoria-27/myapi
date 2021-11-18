"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(product) {
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
exports.default = Product;
