import { Router } from "express";
import InsertCollaboratorController from "../controller/InsertCollaboratorController";
import GetCollaboratorController from "../controller/getCollaboratorController";

const router = Router();

router.get("/me", new GetCollaboratorController().handle as any);
router.post("/new", new InsertCollaboratorController().handle as any);

export default router;
