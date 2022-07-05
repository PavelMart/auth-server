import { DataTypes } from "sequelize";
import sequelize from "../db";
import { UserModel } from "../types/types";

export const User = sequelize.define<UserModel>("user", {
    id: { type: DataTypes.UUID, primaryKey: true, unique: true, defaultValue: DataTypes.UUIDV4 },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
});
