import { Router } from "express";
import mailController from "../controllers/mail.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { cors } from "../middleware/corsMiddleware.js";
const router = Router();

router.post("/", mailController.createMail);
router.delete("/:id", cors, authMiddleware, mailController.deleteMails);

export default router;
