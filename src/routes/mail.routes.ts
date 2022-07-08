import { Router } from "express";
import mailController from "../controllers/mail.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = Router();

router.post("/", mailController.createMail);
router.delete("/:id", authMiddleware, mailController.deleteMails);

export default router;
