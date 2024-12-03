import { Router } from "express";
import GetPointController from "../controller/getPointController";
import ScorePointController from "../controller/scorePointController";

const router = Router();

router.post("/score-point", new ScorePointController().handle as any);
router.get("/get-point", new GetPointController().handle as any);

export default router;
