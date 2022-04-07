import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginResponseDto {
  @ApiProperty()
  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  jwt: string;
}
