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
const box_model_1 = require("../models/box.model");
const uuid_1 = require("uuid");
const mail_service_1 = __importDefault(require("./mail.service"));
const BoxDto_1 = __importDefault(require("../dtos/BoxDto"));
class BoxService {
    createBox(userId, userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = `${userName}-${(0, uuid_1.v4)().slice(0, 4)}@test-server-by-pm.ru`;
            const box = yield box_model_1.Box.create({ email, userId });
            return box;
        });
    }
    createBoxes(userId, userEmail, boxesNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const boxes = [];
                const userNameTest = userEmail.match(/[a-z0-9_-]+@/);
                if (userNameTest === null)
                    throw new Error("Ошибка определения имени пользователя с помощью RegExp");
                const userName = userNameTest[0].slice(0, -1);
                for (let i = 0; i < boxesNumber; i++) {
                    const box = yield this.createBox(userId, userName);
                    yield mail_service_1.default.createMail(box.id, "От разработчика", `<div style="width:100%;background-color:white;padding:25px;border-radius:25px;color:lightblue;display:flex;flex-direction:column;align-items:center"><h1>Это первое сообщение</h1><p>Оно создается автоматически для каждого ящика при регистрации</p></div>`, "С любовью");
                    boxes.push(box);
                }
                return boxes;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    getBox(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const box = yield box_model_1.Box.findOne({ where: { email } });
            return box;
        });
    }
    getBoxes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const boxes = yield box_model_1.Box.findAll({ where: { userId } });
            const boxesDto = boxes.map((box) => new BoxDto_1.default(box.id, box.email));
            return boxesDto;
        });
    }
}
exports.default = new BoxService();
