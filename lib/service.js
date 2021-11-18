"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const product_1 = __importDefault(require("./product"));
function getProducts() {
    const products = fs_1.default.readFileSync(__dirname + '/../database.json', { encoding: 'utf8', flag: 'r' });
    return JSON.parse(products);
}
function getProduct(productId) {
    const products = getProducts();
    const product = products.find((product) => product.productId == productId);
    if (!product) {
        throw new Error("Product Not Found");
    }
    return new product_1.default(product);
}
function addProduct(newProduct) {
    const data = fs_1.default.readFileSync(__dirname + '/../database.json', { encoding: 'utf8', flag: 'r' });
    const products = JSON.parse(data);
    if (!newProduct.productName)
        throw new Error("Product Name is required");
    if (!newProduct.productDescription)
        throw new Error("Product Description is required");
    if (!newProduct.size)
        throw new Error("Product Size is required");
    if (!newProduct.color)
        throw new Error("Product Color is required");
    if (!newProduct.quantity)
        throw new Error("Product Quantity is required");
    if (!newProduct.images)
        throw new Error("Product Images is required");
    if (!newProduct.price)
        throw new Error("Product Price is required");
    newProduct.productId = products[products.length - 1].productId + 1 + "";
    newProduct.dateUploaded = Date.now().toString();
    newProduct.dateEdited = Date.now().toString();
    products.push(newProduct);
    fs_1.default.writeFileSync(__dirname + '/../database.json', JSON.stringify(products));
    return newProduct;
}
function updateProduct(newProduct) {
    const data = fs_1.default.readFileSync(__dirname + '/../database.json', { encoding: 'utf8', flag: 'r' });
    const products = JSON.parse(data);
    let updateProduct = products.find((product) => product.productId == newProduct.productId);
    if (!updateProduct) {
        throw new Error("Product Not Found");
    }
    products.map((product) => {
        if (product.productId == newProduct.productId) {
            if (newProduct.productName)
                product.productName = newProduct.productName;
            if (newProduct.productDescription)
                product.productDescription = newProduct.productDescription;
            if (newProduct.size)
                product.size = newProduct.size;
            if (newProduct.color)
                product.color = newProduct.color;
            if (newProduct.quantity)
                product.quantity = newProduct.quantity;
            if (newProduct.images)
                product.images = newProduct.images;
            if (newProduct.price)
                product.price = newProduct.price;
            product.dateEdited = Date.now().toString();
            updateProduct = product;
        }
        return product;
    });
    fs_1.default.writeFileSync(__dirname + '/../database.json', JSON.stringify(products));
    return updateProduct;
}
function deleteProduct(productId) {
    const data = fs_1.default.readFileSync(__dirname + '/../database.json', { encoding: 'utf8', flag: 'r' });
    const products = JSON.parse(data);
    const deleteProduct = products.find((product) => product.productId == productId);
    if (!deleteProduct) {
        throw new Error("Product Not Found");
    }
    var newProducts = products.filter((product) => product.productId != productId);
    fs_1.default.writeFileSync(__dirname + '/../database.json', JSON.stringify(newProducts));
    return deleteProduct;
}
module.exports = { getProducts, addProduct, updateProduct, deleteProduct, getProduct };
