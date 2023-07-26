import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { CreateUserDto } from "../users/dto/create-user.dto"
import { GoogleAuthService } from "./googleAuth.service"
import { AuthResponse } from "./response/auth.response"
import { TokenService } from "../token/token.service"
import { Request, Response } from "express"
import { ConfigService } from "@nestjs/config"
import { GetCookieExpTime } from "../../common/helpers/getCookieExpTime"
import { GoogleAuthGuard } from "../../guards/google-auth.guard"
import { GoogleLoginDto } from "./dto/google-login.dto"
import { Profile } from "passport-google-oauth20"
import { AccessTokenGuard } from "../../guards/access-token.guard"
import { RefreshTokenGuard } from "../../guards/refresh-token.guard"

@Controller("google")
export class GoogleAuthController {
  constructor(
    private readonly authService: GoogleAuthService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  @Get("login")
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    return { msg: "OK" }
  }

  @Get("redirect")
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(
    @Req() loginReq: Request<GoogleLoginDto>,
    @Res() response: Response,
  ) {
    const loginDto = loginReq.user as GoogleLoginDto

    const { accessToken, refreshToken } = await this.authService.googleSignIn(
      loginDto,
    )
    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: GetCookieExpTime(),
    })
    response.redirect(this.configService.get("client_origin"))
  }
}
