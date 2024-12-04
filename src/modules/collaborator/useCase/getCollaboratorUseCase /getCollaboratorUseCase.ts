import { inject, injectable } from "tsyringe";
import { ICollaboratorRepository } from "../../domain/repositories/ICollaboratorRepository";

interface GetCollaboratorDTO {
  code: string;
}

@injectable()
export default class GetCollaboratorUseCase {
  constructor(
    @inject("CollaboratorRepository")
    private collaboratorRepository: ICollaboratorRepository
  ) {}

  async execute(getCollaboratorDTO: GetCollaboratorDTO) {
    const { code } = getCollaboratorDTO;

    if (!code) throw new Error("There are empty or null parameters.");

    try {
      const collaborator = await this.collaboratorRepository.findByCode(code);
      if (!collaborator) throw new Error("Collaborator not found.");

      return collaborator;
    } catch (error) {
      throw new Error("[GetCollaboratorUseCase] - " + error);
    }
  }
}
