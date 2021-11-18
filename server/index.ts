import http, { IncomingMessage, Server, ServerResponse } from "http";
import fs from 'fs';
import { Product } from "./interface";
import {deleteUser, bodyParser, getDatabase } from "./helper";


const {
  getProduct,
  getSingleProduct,
  createProduct,
  updateProducts,
  deleteProduct,
} = require("./controller/productController");
/*
implement your server code here
*/
const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    let change = req.url as string;
    if (change === "/api/products" && req.method === "GET") {
      getProduct(req, res);
    } 
    else if (change.match(/\api\/products\/([0-9]+)/) && req.method === "GET") {
      const id = +change.split("/").slice(-1)[0];
      getSingleProduct(req, res, id);
    }
    else if (change === "/api/products" && req.method === "POST") {
      // createProduct(req, res);
      
      const postData = async (request: any, response: ServerResponse) => {
        try {
          await bodyParser(request);
          const data = getDatabase();
          const data2 = JSON.parse(data);
          let productId = data2[data2.length - 1]?.id + 1 || 1;
          const dateUploaded = Date.now().toString();
          const { productName, productDescription, productVarieties } =
            request.body;
          data2.push({
            productId: Date.now(),
            productName,
            productVarieties,
            productDescription,
            dateUploaded
          });
          fs.writeFileSync("./product.json", JSON.stringify(data2, null, 2));
          response.writeHead(200, { "Content-type": "/json" });
          response.end(JSON.stringify(data2));
        } catch (err) {
          console.log("Error occurred!", err);
          response.writeHead(400, { "Content-type": "/json" });
          return response.end("Invalid");
        }
      };
      postData(req, res);

    }
    // PUT request to update
    else if (change.match(/\/api\/products\/([0-9]+)/) && req.method === "PATCH") 
    {
      const id = +change.split("/").slice(-1)[0];
      updateProducts(req, res, id);
    } 
    else if (change.match(/\/api\/products\/([0-9]+)/) && req.method === "DELETE") {
      const id = +change.split("/").slice(-1)[0];
      deleteProduct(req, res, id);
    } 
    else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  }
);

const PATH = process.env.PORT || 3005;
server.listen(PATH, () => {
  console.log("Running on port 3005");
});
