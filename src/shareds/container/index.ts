import { container } from "tsyringe";

import { ICollaboratorRepository } from "../../modules/collaborator/domain/repositories/ICollaboratorRepository";
import CollaboratorRepository from "../../modules/collaborator/infra/typeorm/repositories/CollaboratorRepository";

container.register<ICollaboratorRepository>(
  "CollaboratorRepository",
  CollaboratorRepository
);
