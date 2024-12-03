import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import scorePointUseCase from "../../../useCase/scorePointUseCase/scorePointUseCase";
import ScorePointUseCase from "../../../useCase/scorePointUseCase/scorePointUseCase";

export default class ScorePointController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const schema = z.object({
      code: z.string().min(1),
    });

    const params = schema.parse(req.body);

    const useCase = container.resolve(ScorePointUseCase);
    await useCase.execute(params);

    return res.json({ message: "Point Scored Successfully." });
  }
}
