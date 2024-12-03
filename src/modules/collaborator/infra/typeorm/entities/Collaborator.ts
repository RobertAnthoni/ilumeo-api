import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IPoint } from "../../../../point/domain/entities/IPoint";
import Point from "../../../../point/infra/typeorm/entities/Point";
import { ICollaborator } from "../../../domain/entities/ICollaborator";

@Entity("collaborator")
export default class Collaborator implements ICollaborator {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar" })
  name: string;
  @Column({ type: "varchar" })
  code: string;
  @JoinColumn()
  @OneToMany(() => Point, (point) => point.collaborator)
  points: IPoint[];

  public setId(id: number): void {
    this.id = id;
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
