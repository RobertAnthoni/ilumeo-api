import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IPoint } from "../../../domain/entities/IPoint";
import Collaborator from "../../../../collaborator/infra/typeorm/entities/Collaborator";
import { ICollaborator } from "../../../../collaborator/domain/entities/ICollaborator";

@Entity("point")
export default class Point implements IPoint {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "timestamp" })
  dataHours: Date;
  @JoinColumn()
  @ManyToOne(() => Collaborator, (collaborator) => collaborator.points)
  collaborator: ICollaborator;

  public setId(id: number): void {
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }

  public setCollaborator(collaborator: ICollaborator): void {
    this.collaborator = collaborator;
  }

  public getCollaborator(): ICollaborator {
    return this.collaborator;
  }

  public setDateHours(dataHours: Date): void {
    this.dataHours = dataHours;
  }

  public getDateHours(): Date {
    return this.dataHours;
  }
}
