import http, { IncomingMessage, Server, ServerResponse } from "http";
import fs from "fs";
import {deleteUser, bodyParser, getDatabase } from "./helper";
import { Product } from "./interface";

/*
implement your server code here
*/
const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === "/products" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      const content = getDatabase();
      // console.log(data);
      const data = JSON.parse(content);
      res.end(JSON.stringify({ products: data }, null, 2));
      return;
    }
if(req.url === "/create-prod" && req.method === "POST") {
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
if (req.url === "/update-prod" && req.method === "PUT") {
      const updateData = async (request: any, response: ServerResponse) => {
        try {
          await bodyParser(request);
          const content = getDatabase();
          const products = JSON.parse(content);
          let productId = request.body.productId;
          if (isNaN(Number(productId))) {
            //pro 
            response.writeHead(400, { "Content-type": "/json" });
            return response.end(
              JSON.stringify({ message: "Invalid product Id " }, null, 2)
            );
          }
          console.log(productId);
          const product = products.find(
            (product: Product) => product.productId === +productId
          );
          if (!product) {
            response.writeHead(404, { "Content-type": "/json" });
            return response.end(
              JSON.stringify({ message: "product not found" }, null, 2)
            );
          }
          const { productName, productDescription, productVarieties } =
            request.body;
          product.productName = productName || product.productName;
          product.productDescription =
            productDescription || product.productDescription;
          product.productVarieties =
            productVarieties || product.productVarieties;
          product.dateEdited = Date.now().toString();
          fs.writeFileSync("./product.json", JSON.stringify(products, null, 2));
          response.writeHead(200, { "Content-type": "/json" });
          response.end(JSON.stringify(products));
        } catch (err) {
          console.log("Error occurred!", err);
          response.writeHead(400, { "Content-type": "/json" });
          return response.end("Invalid");
        }
      };
      updateData(req, res);
    }
    else if(req.method === "DELETE"){
      let url: any = req.url;
      let id = url.split('/')[1];
      deleteUser(res,id);
    }
  }
);
// server.listen(3005, () => {
//   console.log("the server is running on the port 3005");
// });

const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});