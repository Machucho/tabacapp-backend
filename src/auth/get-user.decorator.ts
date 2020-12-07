import { createParamDecorator } from "@nestjs/common";
import { UserEntity } from "src/data/entities/user.entity";

export const GetUser = createParamDecorator((data, req): UserEntity => {
  return req.user;
});