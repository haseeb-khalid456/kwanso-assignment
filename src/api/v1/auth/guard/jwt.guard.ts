import { ExecutionContext, HttpStatus, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { User } from "../../user/entity/user.entity";
import { requestFromContext } from "../../../../utils/request/request-from-context";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(JwtGuard.name)
    private readonly logger: Logger,
    @InjectRepository(User)
    private userRepo: Repository<User>

  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Get Request..
    const request = this.getRequest(context);
    if (!request) {
      return true; // websocket upgrade
    }

    //Check can activate..
    const canActivate = await (super.canActivate(context) as Promise<boolean>);

    if (canActivate) {

      //Extract JWT Access Token..
      const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

      //Get user from user id..
      const user: User = await this.userRepo.findOne(request.user.id);

      if (!user) {
        throw new UnauthorizedException();
      }

      if (!user.accessToken) {
        this.logger.warn({
          user: request.user,
          error: 'Revoked Token'
        })
        throw new UnauthorizedException(
          HttpStatus.UNAUTHORIZED,
          'Revoked Token.'
        );
      }
    }
    return canActivate;
  }

  getRequest(context: ExecutionContext) {
    return requestFromContext(context);
  }
}
