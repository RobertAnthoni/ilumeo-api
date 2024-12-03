import { ICollaborator } from "../../../collaborator/domain/entities/ICollaborator";

export interface IPoint {
  id: number;
  collaborator: ICollaborator;
  dataHours: Date;
}
