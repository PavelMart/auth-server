"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mail = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
exports.Mail = db_1.default.define("mail", {
    id: { type: sequelize_1.DataTypes.UUID, primaryKey: true, unique: true, defaultValue: sequelize_1.DataTypes.UUIDV4 },
    text: { type: sequelize_1.DataTypes.TEXT },
});
