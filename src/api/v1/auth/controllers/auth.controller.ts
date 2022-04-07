/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller, Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../../user/entity/user.entity";
import { AuthGuard } from "@nestjs/passport";
import { AuthUser } from "../../../../common/decorators/auth-user.decorator";
import { JwtGuard } from "../guard/jwt.guard";
import { DeepPartial } from "typeorm";
import { UserAuthDto } from "../interface/user-auth.dto";
import { LoginResponseDto } from "../interface/login-response.dto";

@ApiTags('User Auth')
@Controller('auth')
export class AuthController {
  constructor(
    protected authService: AuthService
  ) {
  }

  @ApiOperation({ summary: "Register New User" })
  @Post('register')
  async register(
    @Body() registrationData: UserAuthDto
  ): Promise<User> {
    return await this.authService.register(registrationData);
  }

  @ApiOperation({ summary: "User Login" })
  @UseGuards(AuthGuard('local'))
  @ApiResponse({ type: User })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(
    @Req() request,
    @Body() userLoginRequest: UserAuthDto
  ): Promise<LoginResponseDto> {
    return await this.authService.userLogin(userLoginRequest);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: "Get logged in user detail" })
  @Get('user')
  async getUserByJWT(@AuthUser() user: User): Promise<DeepPartial<User>> {
    return await this.authService.getLoggedInUser(user.id);
  }
}
