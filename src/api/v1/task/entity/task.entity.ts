import {
  Entity,
  Column
} from 'typeorm';
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "../../../../common/entities/base.entity";
import { CrudValidationGroups } from "@nestjsx/crud";

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class Task extends BaseEntity {

  @IsString({ always: true })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: "text", nullable: true })
  name: string;
}
