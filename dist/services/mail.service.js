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
const MailDto_1 = __importDefault(require("../dtos/MailDto"));
const mail_model_1 = require("../models/mail.model");
class MailService {
    createMail(boxId, from, html, theme) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mail_model_1.Mail.create({ from, html, theme, boxId });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    deleteMail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mail_model_1.Mail.destroy({ where: { id } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    clearBox(boxId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mail_model_1.Mail.destroy({ where: { boxId } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    getBoxMails(boxId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mails = yield mail_model_1.Mail.findAll({ where: { boxId } });
                const mailsDto = mails.map((mail) => new MailDto_1.default(mail));
                return mailsDto;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.default = new MailService();
