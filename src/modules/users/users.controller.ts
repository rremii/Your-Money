import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { UsersService } from "./users.service"
import { AccessTokenGuard } from "../../guards/access-token.guard"
import { Request } from "express"
import { ChangePasswordDto } from "./dto/change-password.dto"
import { ChangeNameDto } from "./dto/change-name.dto"
import { DefaultResponse } from "../../common/types/types"

// import { AccessTokenGuard } from "../../guards/access-token.guard"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UsePipes(new ValidationPipe())
  // @Post()
  // createUser(@Body() user: CreateUserDto): Promise<User> {
  //   return this.usersService.createUser(user)
  // }

  @Put("name")
  @UseGuards(AccessTokenGuard)
  @UsePipes(new ValidationPipe())
  changeName(@Body() changeNameDto: ChangeNameDto): Promise<DefaultResponse> {
    return this.usersService.changeName(changeNameDto)
  }

  @Put("password")
  @UseGuards(AccessTokenGuard)
  @UsePipes(new ValidationPipe())
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<DefaultResponse> {
    return this.usersService.changePassword(changePasswordDto)
  }

  // @Post("avatar")
  // @UseGuards(AccessTokenGuard)
  // @UsePipes(new ValidationPipe())
  // changeAvatar(
  //   @Body() changeAvatarDto: ChangeAvatarDto,
  // ): Promise<DefaultResponse> {
  //   return this.usersService.changeAvatar(changeAvatarDto)
  // }

  @Get("/me")
  @UseGuards(AccessTokenGuard)
  getUser(@Req() request: Request) {
    const authToken = request.headers.authorization.split(" ").at(1)
    return this.usersService.getUser(authToken)
  }
}
