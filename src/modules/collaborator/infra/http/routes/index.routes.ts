import { Router } from "express";
import InsertCollaboratorController from "../controller/InsertCollaboratorController";

const router = Router();

router.get("/new", new InsertCollaboratorController().handle as any);

export default router;
