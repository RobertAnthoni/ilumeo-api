import { inject, injectable } from "tsyringe";
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getStartAndEndOfDay,
  groupeByDay,
  sumWorkedHours,
} from "../../../../utils/dateUtils";
import { ICollaborator } from "../../../collaborator/domain/entities/ICollaborator";
import { ICollaboratorRepository } from "../../../collaborator/domain/repositories/ICollaboratorRepository";
import { IPointRepository } from "../../domain/repositories/IPointRepository";
import { IPoint } from "../../domain/entities/IPoint";

interface GetPointDTO {
  code: string;
}

@injectable()
export default class GetPointUseCase {
  constructor(
    @inject("CollaboratorRepository")
    private collaboratorRepository: ICollaboratorRepository,

    @inject("PointRepository")
    private pointRepository: IPointRepository
  ) {}

  async execute(getPointDTO: GetPointDTO) {
    const { code } = getPointDTO;

    if (!code) throw new Error("There are empty or null parameters.");

    try {
      const collaborator = await this.collaboratorRepository.findByCode(code);
      if (!collaborator) throw new Error("Unregistered collaborator.");

      const pointsMonth = await this.calculatePointsMonth(collaborator);
      const pointsToday = await this.getPointsToday(collaborator);

      const hoursMonths = pointsMonth?.map((point) => point.dataHours) ?? [];
      const groupedDay = groupeByDay(hoursMonths || []);

      const hoursMonth = await this.calculateHours(pointsMonth || []);
      const hoursToday = await this.calculateHours(pointsToday || []);

      return {
        groupedDay,
        hoursMonth,
        hoursToday,
      };
    } catch (error) {
      throw new Error("[GetPointUseCase] - " + error);
    }
  }

  async calculateHours(points: IPoint[]) {
    const hours = points?.map((point) => point.dataHours) ?? [];
    return sumWorkedHours(hours);
  }

  async calculatePointsMonth(
    collaborator: ICollaborator
  ): Promise<IPoint[] | null> {
    const now = new Date();

    const dayStartMonth = getFirstDayOfMonth(now);
    const dayEndMonth = getLastDayOfMonth(now);

    const startAndEndOfDayStartMonth = getStartAndEndOfDay(dayStartMonth);
    const startAndEndOfDayEndMonth = getStartAndEndOfDay(dayEndMonth);

    return await this.pointRepository.getPointsByCollaboratorAndDate(
      collaborator,
      startAndEndOfDayStartMonth.startOfDay,
      startAndEndOfDayEndMonth.endOfDay
    );
  }

  async getPointsToday(collaborator: ICollaborator): Promise<IPoint[] | null> {
    const startAndEndOfDay = getStartAndEndOfDay(new Date());

    return await this.pointRepository.getPointsByCollaboratorAndDate(
      collaborator,
      startAndEndOfDay.startOfDay,
      startAndEndOfDay.endOfDay
    );
  }
}
