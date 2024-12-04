import InsertCollaboratorUseCase from "../../../useCase/InsertCollaboratorUseCase/InsertCollaboratorUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import GetCollaboratorUseCase from "../../../useCase/getCollaboratorUseCase /getCollaboratorUseCase";

export default class GetCollaboratorController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const schema = z.object({
      code: z.string().min(1),
    });

    const params = schema.parse(req.query);

    const useCase = container.resolve(GetCollaboratorUseCase);
    const collaborator = await useCase.execute(params);

    return res.json(collaborator);
  }
}
