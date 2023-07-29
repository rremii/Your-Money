import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { CreateUserDto } from "../users/dto/create-user.dto"
import { AuthService } from "./auth.service"
import { LoginUserDto } from "./dto/login-user.dto"
import { AuthResponse } from "./response/auth.response"
import { TokenService } from "../token/token.service"
import { Request, Response } from "express"
import { ConfigService } from "@nestjs/config"
import { GetCookieExpTime } from "../../common/helpers/getCookieExpTime"
import { GoogleAuthGuard } from "../../guards/google-auth.guard"
import { Profile } from "passport-google-oauth20"
import { AccessTokenGuard } from "../../guards/access-token.guard"
import { RefreshTokenGuard } from "../../guards/refresh-token.guard"
import { FileInterceptor } from "@nestjs/platform-express"
import { diskStorage } from "multer"
import { FileUploadConfig } from "../../configurations/fileUpload.config"

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,

    private readonly configService: ConfigService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post("register")
  @UseInterceptors(FileInterceptor("avatar", FileUploadConfig))
  async register(
    @Body() userInfo: Omit<CreateUserDto, "avatar">,
    @UploadedFile()
    avatarFile: Express.Multer.File,
    @Res() response: Response,
  ) {
    const avatar =
      this.configService.get("server_origin") + "/" + avatarFile.filename
    const { accessToken, refreshToken } = await this.authService.registerUser({
      ...userInfo,
      avatar,
    })
    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: false,
      secure: true,

      maxAge: GetCookieExpTime(),
    })
    response.json({ accessToken })
  }

  @Get("refresh")
  async refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = request.cookies
    const { accessToken, refreshToken: newRefreshToken } =
      await this.tokenService.refreshTokens(refreshToken)
    response.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,

      maxAge: GetCookieExpTime(),
    })
    return { accessToken }
  }

  @UsePipes(ValidationPipe)
  @Post("login")
  async login(
    @Body() userLoginData: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.loginUser(
      userLoginData,
    )
    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: GetCookieExpTime(),
    })
    return { accessToken }
  }

  @Delete("logout")
  async logout(@Req() request: Request, @Res() response: Response) {
    const { refreshToken } = request.cookies

    await this.authService.logoutUser(refreshToken)

    response.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: GetCookieExpTime(),
    })
    response.json({ message: "you are logged out" })
  }

  @UseGuards(AccessTokenGuard)
  @Get("test")
  test() {
    return true
  }
}
