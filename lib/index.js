"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const http_1 = __importDefault(require("http"));
const service_1 = __importDefault(require("./service"));
const product_1 = __importDefault(require("./product"));
/*
implement your server code here
*/
const server = http_1.default.createServer((req, res) => {
    var _a, _b;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
    }
    if (req.method === "GET") {
        if (req.url === "/api") {
            const products = service_1.default.getProducts();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ success: true, data: products }, null, 2));
            res.end();
        }
        else if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith("/api?productId")) {
            const q = url_1.default.parse(req.url, true).query;
            const productId = q.productId + "";
            try {
                const product = service_1.default.getProduct(productId);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify({ success: true, data: product }));
                res.end();
            }
            catch (error) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.write(JSON.stringify({ success: false, error: error.message }));
                res.end();
            }
        }
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ success: false, error: "Invalid URL" }));
            res.end();
        }
    }
    else if (req.method === "POST") {
        if (req.url === "/api") {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", () => {
                let product = new product_1.default(JSON.parse(body));
                try {
                    product = service_1.default.addProduct(product);
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ success: true, data: product }));
                    res.end();
                }
                catch (error) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ success: false, error: error.message }));
                    res.end();
                }
            });
        }
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ success: false, error: "Invalid URL" }));
            res.end();
        }
    }
    else if (req.method === "PUT") {
        if (req.url === "/api") {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", () => {
                let product = new product_1.default(JSON.parse(body));
                try {
                    service_1.default.updateProduct(product);
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ success: true, data: product }));
                    res.end();
                }
                catch (error) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ success: false, error: error.message }));
                    res.end();
                }
            });
        }
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ success: false, error: "Invalid URL" }));
            res.end();
        }
    }
    else if (req.method === "DELETE") {
        if ((_b = req.url) === null || _b === void 0 ? void 0 : _b.startsWith("/api?productId")) {
            const q = url_1.default.parse(req.url, true).query;
            const productId = q.productId + "";
            try {
                const product = service_1.default.deleteProduct(productId);
                res.writeHead(201, { "Content-Type": "application/json" });
                res.write(JSON.stringify({ success: true, data: product }));
                res.end();
            }
            catch (error) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.write(JSON.stringify({ success: false, error: error.message }));
                res.end();
            }
        }
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ success: false, error: "Invalid URL" }));
            res.end();
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ success: false, error: "Invalid URL" }));
        res.end();
    }
});
const PORT = process.env.PORT || 3005;
server.listen(PORT).on("listening", () => {
    console.log(`Server is listening on port ${PORT}...`);
});
