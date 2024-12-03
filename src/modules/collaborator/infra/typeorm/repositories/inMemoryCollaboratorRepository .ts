import { ICollaboratorRepository } from "../../../domain/repositories/ICollaboratorRepository";
import Collaborator from "../entities/Collaborator";

export default class InMemoryCollaboratorRepository
  implements ICollaboratorRepository
{
  private collaborators: Collaborator[] = [];

  async findByCode(code: string): Promise<Collaborator | null> {
    const collaborator = this.collaborators.find(
      (collaborator) => collaborator.code === code
    );
    return Promise.resolve(collaborator || null);
  }

  async insert(collaborator: Collaborator): Promise<void> {
    this.collaborators.push(collaborator);
  }
}
