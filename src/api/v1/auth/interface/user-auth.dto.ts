import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserAuthDto {
  @ApiProperty()
  @IsNotEmpty({ always: true })
  @IsEmail({}, { always: true })
  email: string;

  @ApiProperty()
  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  password: string;
}
