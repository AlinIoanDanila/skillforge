import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type ICurrentUser = {
  id: string;
  username: string;
};

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
