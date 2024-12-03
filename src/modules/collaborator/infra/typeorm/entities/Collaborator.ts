import { ICollaborator } from "../../../domain/entities/ICollaborator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("collaborator")
export default class Collaborator implements ICollaborator {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  code: string;

  public setId(id: number): void {
    this.id;
  }

  public getId(): number {
    return this.id;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setCode(code: string): void {
    this.code = code;
  }

  public getCode(): string {
    return this.code;
  }
}
