import { DataTypes } from "sequelize";
import sequelize from "../db";

export const Box = sequelize.define("box", {
    id: { type: DataTypes.UUID, primaryKey: true, unique: true, defaultValue: DataTypes.UUIDV4 },
    email: { type: DataTypes.STRING, allowNull: false },
});
