import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { CreateUserDto } from "../users/dto/create-user.dto"
import { User } from "../users/entities/user.entity"
import { AuthService } from "./auth.service"
import { LoginUserDto } from "./dto/login-user.dto"
import { AuthResponse } from "./response/auth.response"
import { ApiResponse, ApiTags } from "@nestjs/swagger"
import { TokenService } from "../token/token.service"
import { JwtService } from "@nestjs/jwt"
import { Request, Response } from "express"
import { GetCookieExpTime } from "src/common/helpers/getCookieExpTime"
import { AccessTokenGuard } from "../../guards/access-token.guard"
import { ConfigService } from "@nestjs/config"
import { ConfirmEmailDto } from "./dto/confirm-email.dto"
import { DefaultResponse } from "../../common/types/types"
import { VerifyCodeDto } from "./dto/verify-code.dto"

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post("register")
  async register(
    @Body() userRegisterData: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponse> {
    const { accessToken, refreshToken } = await this.authService.registerUser(
      userRegisterData,
    )
    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: false,
      secure: true,

      maxAge: GetCookieExpTime(),
    })
    return { accessToken }
  }

  // @UseGuards(RefreshTokenGuard)
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
      path: "auth/refresh",
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
  ): Promise<AuthResponse> {
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

  @UsePipes(new ValidationPipe())
  @Post("confirm-email")
  async confirmEmail(@Body() email: ConfirmEmailDto): Promise<DefaultResponse> {
    return this.authService.sendConfirmCode(email)
  }

  @UsePipes(new ValidationPipe())
  @Post("verify-code")
  async verifyCode(@Body() code: VerifyCodeDto): Promise<DefaultResponse> {
    return this.authService.verifyCode(code)
  }

  @UseGuards(AccessTokenGuard)
  @Post("test")
  test() {
    return true
  }
}
