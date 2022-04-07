import {
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";

export class BaseEntity {

  @Index()
  @PrimaryGeneratedColumn()
  id?: number;
}
