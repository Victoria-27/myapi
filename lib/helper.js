"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabase = exports.deleteUser = exports.bodyParser = void 0;
const fs_1 = require("fs");
const fs_2 = __importDefault(require("fs"));
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
async function deleteUser(res, id) {
    try {
        fs_2.default.readFile('./product.json', 'utf-8', function (err, data) {
            if (err) {
                res.end("Database does not exist");
            }
            else {
                let users = JSON.parse(data);
                let userIndex = users.findIndex((item) => item.productId == id);
                if (userIndex === -1) {
                    res.end(JSON.stringify(id));
                }
                else {
                    users.splice(userIndex, 1);
                    fs_2.default.writeFile('./product.json', JSON.stringify(users, null, 3), (err) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("File written successfully\n");
                            res.end("Product Deleted");
                        }
                    });
                }
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}
exports.deleteUser = deleteUser;
function getDatabase() {
    if (!(0, fs_1.existsSync)("./product.json")) {
        (0, fs_1.writeFileSync)("./product.json", "[]");
    }
    const content = (0, fs_1.readFileSync)("./product.json", { encoding: "utf8" });
    return content;
}
exports.getDatabase = getDatabase;
