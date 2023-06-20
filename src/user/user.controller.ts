import { Body, Controller, Get, Inject, Patch, Post, Query } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { ApiTags } from "@nestjs/swagger";
import { CreateLocationDto } from "../common/dto/create-location.dto";
import { UserService } from "./service/user.service";
import { Point } from "typeorm";
import { Service } from "../common/enum/service";
import { IUserService } from "./service/user";

@Controller(Router.USER)
@ApiTags("User APIs  (user)")
export class UserController {

  constructor(@Inject(Service.USER_SERVICE) private readonly userService: IUserService) {}


}
