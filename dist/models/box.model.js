"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const user_model_1 = require("./user.model");
exports.Box = db_1.default.define("box", {
    id: { type: sequelize_1.DataTypes.UUID, primaryKey: true, unique: true, defaultValue: sequelize_1.DataTypes.UUIDV4 },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    userId: { type: sequelize_1.DataTypes.UUID, references: { model: user_model_1.User } },
});
