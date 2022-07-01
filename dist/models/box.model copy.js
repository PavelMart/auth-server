"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("sequelize/types");
const db_1 = __importDefault(require("../db"));
const Box = db_1.default.define("box", {
    id: { type: types_1.DataTypes.UUID, primaryKey: true, unique: true, defaultValue: types_1.DataTypes.UUIDV4 },
});
exports.default = Box;
