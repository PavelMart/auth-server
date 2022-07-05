import { User } from "./user.model";
import { DataTypes } from "sequelize";
import sequelize from "../db";
import { TokenModel } from "../types/types";

export const Token = sequelize.define<TokenModel>("token", {
    id: { type: DataTypes.UUID, primaryKey: true, unique: true, defaultValue: DataTypes.UUIDV4 },
    token: { type: DataTypes.STRING(1000), allowNull: false, unique: true },
    userId: { type: DataTypes.UUID, references: { model: User } },
});
