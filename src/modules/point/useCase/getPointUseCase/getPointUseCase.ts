import { inject, injectable } from "tsyringe";
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getStartAndEndOfDay,
} from "../../../../utils/dateUtils";
import { ICollaboratorRepository } from "../../../collaborator/domain/repositories/ICollaboratorRepository";
import { IPointRepository } from "../../domain/repositories/IPointRepository";

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

      const startDate = getFirstDayOfMonth(new Date());
      const endDate = getLastDayOfMonth(new Date());

      const startDateHours = getStartAndEndOfDay(startDate);
      const endDateHour = getStartAndEndOfDay(endDate);

      return await this.pointRepository.getPointsByCollaboratorAndDate(
        collaborator,
        startDateHours.endOfDay,
        endDateHour.endOfDay
      );
    } catch (error) {
      throw new Error("[GetPointUseCase] - " + error);
    }
  }
}
