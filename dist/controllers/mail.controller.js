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
const mail_service_1 = __importDefault(require("../services/mail.service"));
class MailController {
    deleteMails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: boxId } = req.params;
                const { id: mailId } = req.query;
                if (mailId)
                    yield mail_service_1.default.deleteMail(mailId);
                else
                    yield mail_service_1.default.clearBox(boxId);
                const mails = yield mail_service_1.default.getBoxMails(boxId);
                return res.json(mails);
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.default = new MailController();
