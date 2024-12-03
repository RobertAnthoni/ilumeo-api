import InsertCollaboratorUseCase from "../../../useCase/InsertCollaboratorUseCase/InsertCollaboratorUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export default class InsertCollaboratorController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const schema = z.object({
      name: z.string().min(1),
      code: z.string().min(1),
    });
    const params = schema.parse(req.body);

    const useCase = container.resolve(InsertCollaboratorUseCase);
    await useCase.execute(params);

    return res.json({ message: "Collaborator successfully inserted." });
  }
}
