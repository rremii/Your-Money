import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { UsersService } from "./users.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { User } from "./entities/user.entity"
import { AccessTokenGuard } from "../../guards/access-token.guard"
import { Request } from "express"
import { ChangeNameDto } from "./dto/change-name.dto"
import { DefaultResponse } from "../../common/types/types"
import { ChangeAvatarDto } from "./dto/change-avatar.dto"
import { GameResultsResponse } from "./response/gameResults.response"

// import { AccessTokenGuard } from "../../guards/access-token.guard"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.createUser(user)
  }

  // @Post("name")
  // @UseGuards(AccessTokenGuard)
  // @UsePipes(new ValidationPipe())
  // changeName(@Body() changeNameDto: ChangeNameDto): Promise<DefaultResponse> {
  //   return this.usersService.changeName(changeNameDto)
  // }

  // @Post("avatar")
  // @UseGuards(AccessTokenGuard)
  // @UsePipes(new ValidationPipe())
  // changeAvatar(
  //   @Body() changeAvatarDto: ChangeAvatarDto,
  // ): Promise<DefaultResponse> {
  //   return this.usersService.changeAvatar(changeAvatarDto)
  // }

  @Get()
  @UseGuards(AccessTokenGuard)
  getUser(@Req() request: Request): Promise<User> {
    const authToken = request.headers.authorization.split(" ").at(1)
    return this.usersService.getUser(authToken)
  }
}
