import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty() id: number;
  @ApiProperty() email: string;
  @ApiProperty() username: string;
  @ApiProperty() accessToken: string;
}