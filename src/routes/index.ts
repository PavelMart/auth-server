import express, { Router } from "express";
const router = Router();
import userRouter from "./user.routes";
import boxRouter from "./box.routes";
import mailRouter from "./mail.routes";

router.use("/users", userRouter);
router.use("/boxes", boxRouter);
router.use("/mails", mailRouter);

export default router;
