import "reflect-metadata";
import { describe, expect, it } from "vitest";
import InsertCollaboratorUseCase from "./InsertCollaboratorUseCase";
import Collaborator from "../../infra/typeorm/entities/Collaborator";
import InMemoryCollaboratorRepository from "../../infra/typeorm/repositories/inMemoryCollaboratorRepository ";

describe("insert collaborator", () => {
  it("employee insertion", async () => {
    const name = "Robert";
    const code = "ce474cdd-f5be-4abb-a6db-ad1d417a92fe";

    const repository = new InMemoryCollaboratorRepository();
    const useCase = new InsertCollaboratorUseCase(repository);

    const collaborator = await useCase.execute({ name, code });

    expect(collaborator).toBeInstanceOf(Collaborator);
    expect(collaborator.name).toBe(name);
    expect(collaborator.code).toBe(code);
  });
});
