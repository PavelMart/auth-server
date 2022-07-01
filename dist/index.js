"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("./routes/index"));
const index_2 = __importDefault(require("./models/index"));
const corsMiddleware_1 = require("./middleware/corsMiddleware");
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
app.use(corsMiddleware_1.cors);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api", index_1.default);
app.use(errorMiddleware_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield index_2.default.sequelize.authenticate();
        yield index_2.default.sequelize.sync({ alter: true });
        app.listen(PORT, () => {
            console.log(`Server has been started on PORT: ${PORT}`);
        });
    }
    catch (e) {
        console.log(e);
    }
});
start();
