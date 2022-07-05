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
const ApiError_1 = __importDefault(require("../error/ApiError"));
const box_service_1 = __importDefault(require("../services/box.service"));
const mail_service_1 = __importDefault(require("../services/mail.service"));
class BoxController {
    getBoxes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user)
                    throw ApiError_1.default.Unauthorized();
                const boxes = yield box_service_1.default.getBoxes(user.id);
                return res.json(boxes);
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    getMailsFromBox(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const mails = yield mail_service_1.default.getBoxMails(id);
                return res.json(mails);
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.default = new BoxController();
