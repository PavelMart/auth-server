import express, { Router } from "express";
const router = Router();
import userRouter from "./user.routes";
import boxRouter from "./box.routes";
import mailRouter from "./mail.routes";
import { cors } from "../middleware/corsMiddleware";

router.use("/users", cors, userRouter);
router.use("/boxes", cors, boxRouter);
router.use("/mails", mailRouter);

export default router;
