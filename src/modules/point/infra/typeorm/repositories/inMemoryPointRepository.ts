import { ICollaborator } from "../../../../collaborator/domain/entities/ICollaborator";
import { IPointRepository } from "../../../domain/repositories/IPointRepository";
import Point from "../entities/Point";

export default class InMemoryPointRepository implements IPointRepository {
  private points: Point[] = [];

  async getPointsByCollaboratorAndDate(
    collaborator: ICollaborator,
    startDate: Date,
    endDate: Date
  ): Promise<Point[] | null> {
    return (
      this.points.filter(
        (point) =>
          point.collaborator.id === collaborator.id &&
          point.dataHours >= startDate &&
          point.dataHours <= endDate
      ) || null
    );
  }

  async insert(point: Point): Promise<void> {
    this.points.push(point);
  }
}
