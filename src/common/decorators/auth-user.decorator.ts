import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { requestFromContext } from "../../utils/request/request-from-context";

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = requestFromContext(ctx);
    return request.user;
  }
);
