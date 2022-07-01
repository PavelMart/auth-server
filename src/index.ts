import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/index";
import models from "./models/index";
import { cors } from "./middleware/corsMiddleware";
import errorMiddleware from "./middleware/errorMiddleware";

const app = express();

const PORT = process.env.PORT || 5001;

app.use(cors);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.use(errorMiddleware);

const start = async () => {
    try {
        await models.sequelize.authenticate();
        await models.sequelize.sync({ alter: true });
        app.listen(PORT, () => {
            console.log(`Server has been started on PORT: ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
