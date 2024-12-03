import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import GetPointUseCase from "../../../useCase/getPointUseCase/getPointUseCase";

export default class GetPointController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const schema = z.object({
      code: z.string().min(1),
    });

    const params = schema.parse(req.body);

    const useCase = container.resolve(GetPointUseCase);
    const result = await useCase.execute(params);

    return res.json(result);
  }
}
