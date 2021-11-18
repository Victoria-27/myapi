"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabase = exports.bodyParser = void 0;
const fs_1 = require("fs");
const bodyParser = async function bodyParser(req) {
    return new Promise((resolve, reject) => {
        let totalChunked = "";
        req
            .on("error", (err) => {
            console.error(err);
            reject(err);
        })
            .on("data", (chunk) => { totalChunked += chunk; })
            .on("end", () => {
            req.body = JSON.parse(totalChunked); // Adding Parsed Chunked into req.body
            resolve();
        });
    });
};
exports.bodyParser = bodyParser;
function getDatabase() {
    if (!fs_1.existsSync("./product.json")) {
        fs_1.writeFileSync("./product.json", "[]");
    }
    const content = fs_1.readFileSync("./product.json", { encoding: "utf8" });
    return content;
}
exports.getDatabase = getDatabase;
