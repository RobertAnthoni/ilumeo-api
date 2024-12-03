import { container } from "tsyringe";

import { ICollaboratorRepository } from "../../modules/collaborator/domain/repositories/ICollaboratorRepository";
import CollaboratorRepository from "../../modules/collaborator/infra/typeorm/repositories/CollaboratorRepository";
import { IPointRepository } from "../../modules/point/domain/repositories/IPointRepository";
import PointRepository from "../../modules/point/infra/typeorm/repositories/PointRepository";

container.register<ICollaboratorRepository>(
  "CollaboratorRepository",
  CollaboratorRepository
);

container.register<IPointRepository>("PointRepository", PointRepository);
