"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const box_model_1 = require("./box.model");
const mail_model_1 = require("./mail.model");
const token_model_1 = require("./token.model");
const user_model_1 = require("./user.model");
const db_1 = __importDefault(require("../db"));
user_model_1.User.hasOne(token_model_1.Token);
token_model_1.Token.belongsTo(user_model_1.User);
user_model_1.User.hasMany(box_model_1.Box);
box_model_1.Box.belongsTo(user_model_1.User);
box_model_1.Box.hasMany(mail_model_1.Mail);
mail_model_1.Mail.belongsTo(box_model_1.Box);
exports.default = {
    sequelize: db_1.default,
    User: user_model_1.User,
    Token: token_model_1.Token,
};
