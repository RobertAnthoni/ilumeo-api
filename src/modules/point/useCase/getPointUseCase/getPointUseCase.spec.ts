import "reflect-metadata";
import { describe, expect, it } from "vitest";
import Collaborator from "../../../collaborator/infra/typeorm/entities/Collaborator";
import InMemoryCollaboratorRepository from "../../../collaborator/infra/typeorm/repositories/inMemoryCollaboratorRepository ";
import Point from "../../infra/typeorm/entities/Point";
import InMemoryPointRepository from "../../infra/typeorm/repositories/inMemoryPointRepository";
import GetPointUseCase from "./getPointUseCase";

describe("Get Points", () => {
  it("Search points of the month", async () => {
    const code = "ce474cdd-f5be-4abb-a6db-ad1d417a92fe";

    const collaborator: Partial<Collaborator> = {
      id: 1,
      name: "Robert",
      code,
    };

    const inMemoryCollaboratorRepository = new InMemoryCollaboratorRepository();
    inMemoryCollaboratorRepository.insert(collaborator as Collaborator);

    const inMemoryPointRepository = new InMemoryPointRepository();
    const useCase = new GetPointUseCase(
      inMemoryCollaboratorRepository,
      inMemoryPointRepository
    );

    const object = await useCase.execute({ code });
    expect(object).toBeInstanceOf(Object);
  });
});
