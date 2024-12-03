import { ICollaborator } from "../../../collaborator/domain/entities/ICollaborator";
import { IPoint } from "../entities/IPoint";

export interface IPointRepository {
  insert(point: IPoint): Promise<void>;
  getPointsByCollaboratorAndDate(
    collaborator: ICollaborator,
    startDate: Date,
    endDate: Date
  ): Promise<IPoint[] | null>;
}
