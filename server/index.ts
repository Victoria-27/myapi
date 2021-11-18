import url from "url";
import http, { IncomingMessage, Server, ServerResponse } from "http";

import service from "./service";
import Product from "./product";

/*
implement your server code here
*/

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
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
        const products = service.getProducts();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ success: true, data: products },null,2));
        res.end();
      } else if (req.url?.startsWith("/api?productId")) {
        const q = url.parse(req.url, true).query;
        const productId: string = q.productId + "";
        try {
          const product = service.getProduct(productId);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ success: true, data: product }));
          res.end();
        } catch (error: any) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ success: false, error: error.message }));
          res.end();
        }
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ success: false, error: "Invalid URL" }));
        res.end();
      }
    } else if (req.method === "POST") {
      if (req.url === "/api") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => {
          let product: Product = new Product(JSON.parse(body));
          try {
            product = service.addProduct(product);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ success: true, data: product }));
            res.end();
          } catch (error: any) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ success: false, error: error.message }));
            res.end();
          }
        });
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ success: false, error: "Invalid URL" }));
        res.end();
      }
    } else if (req.method === "PUT") {
      if (req.url === "/api") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => {
          let product: Product = new Product(JSON.parse(body));
          try {
            service.updateProduct(product);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ success: true, data: product }));
            res.end();
          } catch (error: any) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ success: false, error: error.message }));
            res.end();
          }
        });
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ success: false, error: "Invalid URL" }));
        res.end();
      }
    } else if (req.method === "DELETE") {
      if (req.url?.startsWith("/api?productId")) {
        const q = url.parse(req.url, true).query;
        const productId: string = q.productId + "";
        try {
          const product = service.deleteProduct(productId);
          res.writeHead(201, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ success: true, data: product }));
          res.end();
        } catch (error: any) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ success: false, error: error.message }));
          res.end();
        }
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ success: false, error: "Invalid URL" }));
        res.end();
      }
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ success: false, error: "Invalid URL" }));
      res.end();
    }
  }
);

const PORT = process.env.PORT || 3005;

server.listen(PORT).on("listening", () => {
  console.log(`Server is listening on port ${PORT}...`);
});
