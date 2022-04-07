/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../../../config/config.service';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { ConfigModule } from "../../../config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entity/user.entity";

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.jwtKey,
        signOptions: { expiresIn: '10d' }
      })
    })
  ],
  providers: [
    AuthService,
    ConfigService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
})
export class AuthModule {
}
