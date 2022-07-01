"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("sequelize/types");
const db_1 = __importDefault(require("../db"));
const User = db_1.default.define("user", {
    id: { type: types_1.DataTypes.UUID, primaryKey: true, unique: true, defaultValue: types_1.DataTypes.UUIDV4 },
    email: { type: types_1.DataTypes.STRING, unique: true, allowNull: false },
    password: { type: types_1.DataTypes.STRING, allowNull: false },
});
exports.default = User;
