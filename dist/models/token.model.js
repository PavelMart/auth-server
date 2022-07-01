"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const user_model_1 = require("./user.model");
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
exports.Token = db_1.default.define("token", {
    id: { type: sequelize_1.DataTypes.UUID, primaryKey: true, unique: true, defaultValue: sequelize_1.DataTypes.UUIDV4 },
    token: { type: sequelize_1.DataTypes.STRING(1000), allowNull: false, unique: true },
    userId: { type: sequelize_1.DataTypes.UUID, references: { model: user_model_1.User } },
});
