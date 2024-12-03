import { ICollaboratorRepository } from "../../domain/repositories/ICollaboratorRepository";
import { inject, injectable } from "tsyringe";
import Collaborator from "../../infra/typeorm/entities/Collaborator";

interface InsertCollaboratorDTO {
  name: string;
  code: string;
}

@injectable()
export default class InsertCollaboratorUseCase {
  constructor(
    @inject("CollaboratorRepository")
    private collaboratorRepository: ICollaboratorRepository
  ) {}

  async execute(insertCollaboratorDTO: InsertCollaboratorDTO) {
    const { name, code } = insertCollaboratorDTO;

    if (!name || !code) throw new Error("There are empty or null parameters.");

    try {
      const isRegistered = await this.collaboratorRepository.findByCode(code);
      if (isRegistered) throw new Error("Already registered collaborator.");

      const collaborator = new Collaborator();
      collaborator.setName(name);
      collaborator.setCode(code);

      await this.collaboratorRepository.insert(collaborator);

      return collaborator;
    } catch (error) {
      throw new Error("[InsertCollaboratorUseCase] - " + error);
    }
  }
}
