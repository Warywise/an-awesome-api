"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
require("reflect-metadata");
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => console.log(`Running at Port:${PORT}.`));
//# sourceMappingURL=index.js.map