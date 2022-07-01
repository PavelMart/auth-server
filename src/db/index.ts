import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";
import { Box } from "../models/box.model";
import { Mail } from "../models/mail.model";
import { Token } from "../models/token.model";
import { User } from "../models/user.model";

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
});

export default sequelize;
