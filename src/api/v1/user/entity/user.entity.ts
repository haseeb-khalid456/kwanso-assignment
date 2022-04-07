import {
  Entity,
  Column
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "../../../../common/entities/base.entity";
import { CrudValidationGroups } from "@nestjsx/crud";

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class User extends BaseEntity {

  @IsEmail({}, { always: true })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: "text", nullable: false, unique: true })
  email: string;

  @IsString({ always: true })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: "text", nullable: false })
  password: string;

  @IsString({ always: true })
  @IsOptional({ always: true })
  @Column({ type: "text", nullable: true })
  accessToken: string;
}
