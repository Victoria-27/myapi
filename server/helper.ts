import { existsSync, readFileSync, writeFileSync } from "fs";
import fs from 'fs';
import http, { IncomingMessage, Server, ServerResponse } from "http";

type customRequest = IncomingMessage & { body: { [key: string]: string } };
export const bodyParser = async function bodyParser(req: customRequest) {
  return new Promise<void>((resolve, reject) => {
    let totalChunked = "";
    req
      .on("error", (err: any) => {
        console.error(err);
        reject(err);
      })
      .on("data", (chunk: string) => {totalChunked += chunk })
      .on("end", () => {
        req.body = JSON.parse(totalChunked); // Adding Parsed Chunked into req.body
        resolve();
      });
  });
};


export async function deleteUser(res : ServerResponse,id : string){
  try {
      fs.readFile('./product.json', 'utf-8', function(err, data){
          if(err){
              res.end("Database does not exist")
          } else{
              let users = JSON.parse(data);
              let userIndex = users.findIndex((item: { productId: string }) => item.productId == id);
              if(userIndex === -1) {
                  res.end(JSON.stringify(id))
                  
              } else {    
                  users.splice(userIndex, 1);        
                  fs.writeFile('./product.json', JSON.stringify(users, null, 3), (err) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("File written successfully\n");
                        res.end("Product Deleted")
                      }
                  });
              }
          }
      });
  } catch (error) {
      console.log(error)
  }
}



export function getDatabase() {
  if (!existsSync("./product.json")) {
    writeFileSync("./product.json", "[]");
  }
  const content = readFileSync("./product.json", { encoding: "utf8" });
  return content;
}