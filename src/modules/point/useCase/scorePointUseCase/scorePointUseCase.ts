import { inject, injectable } from "tsyringe";
import { ICollaboratorRepository } from "../../../collaborator/domain/repositories/ICollaboratorRepository";
import Point from "../../infra/typeorm/entities/Point";
import { IPointRepository } from "../../domain/repositories/IPointRepository";

interface InsertPointDTO {
  code: string;
}

@injectable()
export default class ScorePointUseCase {
  constructor(
    @inject("CollaboratorRepository")
    private collaboratorRepository: ICollaboratorRepository,

    @inject("PointRepository")
    private pointRepository: IPointRepository
  ) {}

  async execute(insertPointDTO: InsertPointDTO) {
    const { code } = insertPointDTO;

    if (!code) throw new Error("There are empty or null parameters.");

    try {
      const collaborator = await this.collaboratorRepository.findByCode(code);
      if (!collaborator) throw new Error("Unregistered collaborator.");

      const point = new Point();
      point.setCollaborator(collaborator);
      point.setDateHours(new Date());

      await this.pointRepository.insert(point);

      return point;
    } catch (error) {
      throw new Error("[ScorePointUseCase] - " + error);
    }
  }
}
