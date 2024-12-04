import "reflect-metadata";
import { describe, expect, it } from "vitest";
import Collaborator from "../../infra/typeorm/entities/Collaborator";
import InMemoryCollaboratorRepository from "../../infra/typeorm/repositories/inMemoryCollaboratorRepository ";
import GetCollaboratorUseCase from "./getCollaboratorUseCase";
import { ICollaborator } from "../../domain/entities/ICollaborator";

describe("Get collaborator", () => {
  it("get collaborator", async () => {
    const newCollaborator: ICollaborator = {
      id: 1,
      name: "Robert",
      code: "20304051",
    };

    const repository = new InMemoryCollaboratorRepository();
    repository.insert(newCollaborator as Collaborator);

    const useCase = new GetCollaboratorUseCase(repository);
    const collaborator = await useCase.execute({ code: newCollaborator.code });

    expect(collaborator.id).toBe(newCollaborator.id);
    expect(collaborator.name).toBe(newCollaborator.name);
    expect(collaborator.code).toBe(newCollaborator.code);
  });
});
