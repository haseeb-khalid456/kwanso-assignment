import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from "../../user/entity/user.entity";
import { ConfigService } from "../../../../config/config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtKey
    });
  }

  async validate(payload: Partial<User>): Promise<{ id: number, email: string }> {
    return {
      id: payload.id,
      email: payload.email
    };
  }
}
