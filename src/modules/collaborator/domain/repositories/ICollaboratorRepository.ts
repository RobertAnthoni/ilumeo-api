import { InsertResult } from "typeorm";
import Collaborator from "../../infra/typeorm/entities/Collaborator";
import { ICollaborator } from "../entities/ICollaborator";

export interface ICollaboratorRepository {
  findByCode(code: string): Promise<ICollaborator | null>;
  insert(collaborator: Collaborator): Promise<InsertResult>;
}
