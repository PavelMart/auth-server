import { Router } from "express";
import mailController from "../controllers/mail.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = Router();

router.delete("/:id", authMiddleware, mailController.deleteMails);

export default router;
