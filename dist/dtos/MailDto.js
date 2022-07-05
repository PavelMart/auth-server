"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
class MailDto {
    constructor(mail) {
        this.id = mail.id;
        this.from = mail.from;
        this.html = mail.html;
        this.theme = mail.theme;
        if (mail.createdAt) {
            const date = new Date(mail.createdAt);
            moment_1.default.locale("ru");
            this.time = (0, moment_1.default)(date).format("LT");
            this.date = (0, moment_1.default)(date).format("MMMM, DD");
        }
    }
}
exports.default = MailDto;
