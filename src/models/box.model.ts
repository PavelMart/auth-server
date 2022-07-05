import { DataTypes } from "sequelize";
import sequelize from "../db";
import { BoxModel } from "../types/types";
import { User } from "./user.model";

export const Box = sequelize.define<BoxModel>("box", {
    id: { type: DataTypes.UUID, primaryKey: true, unique: true, defaultValue: DataTypes.UUIDV4 },
    email: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.UUID, references: { model: User } },
});
