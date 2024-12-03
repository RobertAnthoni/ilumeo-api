import { Between, Repository } from "typeorm";
import { postgresDataSource } from "../../../../../shareds/infra/typeorm";
import { getStartAndEndOfDay } from "../../../../../utils/dateUtils";
import { IPointRepository } from "../../../domain/repositories/IPointRepository";
import Point from "../entities/Point";
import { IPoint } from "../../../domain/entities/IPoint";
import { ICollaborator } from "../../../../collaborator/domain/entities/ICollaborator";

export default class PointRepository implements IPointRepository {
  private repository: Repository<Point>;

  constructor() {
    this.repository = postgresDataSource.getRepository(Point);
  }

  async insert(point: IPoint): Promise<void> {
    await this.repository.insert(point);
  }

  async getPointsByCollaboratorAndDate(
    collaborator: ICollaborator,
    startDate: Date,
    endDate: Date
  ): Promise<Point[] | null> {
    return await this.repository.find({
      where: {
        collaborator,
        dataHours: Between(startDate, endDate),
      },
    });
  }
}
