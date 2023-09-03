import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common"
import { GoogleAuthService } from "./googleAuth.service"
import { TokenService } from "../token/token.service"
import { Request, Response } from "express"
import { ConfigService } from "@nestjs/config"
import { GetCookieExpTime } from "../../common/helpers/getCookieExpTime"
import { GoogleAuthGuard } from "../../guards/google-auth.guard"
import { GoogleLoginDto } from "./dto/google-login.dto"

@Controller("google")
export class GoogleAuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
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

    const { accessToken, refreshToken } =
      await this.googleAuthService.googleSignIn(loginDto)
    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: GetCookieExpTime(),
    })
    response.redirect(this.configService.get("client_origin"))
  }
}
