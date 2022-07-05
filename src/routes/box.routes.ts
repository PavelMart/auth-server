import { Router } from "express";
import boxController from "../controllers/box.controller.js";
import mailController from "../controllers/mail.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = Router();

router.get("/", authMiddleware, boxController.getBoxes);
router.get("/:id", authMiddleware, boxController.getMailsFromBox);
router.delete("/:id", authMiddleware, mailController.deleteMails);

export default router;
