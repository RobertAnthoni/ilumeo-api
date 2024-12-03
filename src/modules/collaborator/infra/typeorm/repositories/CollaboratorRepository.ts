import { postgresDataSource } from "../../../../../shareds/infra/typeorm";
import { ICollaboratorRepository } from "../../../domain/repositories/ICollaboratorRepository";
import { InsertResult, Repository } from "typeorm";
import Collaborator from "../entities/Collaborator";

export default class CollaboratorRepository implements ICollaboratorRepository {
  private repository: Repository<Collaborator>;

  constructor() {
    this.repository = postgresDataSource.getRepository(Collaborator);
  }

  async findByCode(code: string): Promise<Collaborator | null> {
    return await this.repository.findOne({
      where: {
        code,
      },
    });
  }

  async insert(collaborator: Collaborator): Promise<void> {
    await this.repository.insert(collaborator);
  }
}
