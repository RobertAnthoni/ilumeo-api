import { InsertResult } from "typeorm";
import { ICollaborator } from "../entities/ICollaborator";

export interface ICollaboratorRepository {
  findByCode(code: string): Promise<ICollaborator | null>;
  insert(collaborator: ICollaborator): Promise<void>;
}
