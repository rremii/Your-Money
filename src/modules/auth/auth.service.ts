import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { Repository } from "typeorm"
import { CreateUserDto } from "../users/dto/create-user.dto"
import { ApiError } from "../../common/constants/errors"
import { UsersService } from "../users/users.service"
import { LoginUserDto } from "./dto/login-user.dto"
import * as bcrypt from "bcrypt"
import { TokenService } from "../token/token.service"
import { TokenResponse } from "./response/token.response"
import { MailerService } from "@nestjs-modules/mailer"
import { v4 as uuid } from "uuid"
import { Code } from "./entities/code.entity"
import { DefaultResponse } from "../../common/types/types"
import { ConfirmEmailDto } from "./dto/confirm-email.dto"
import { VerifyCodeDto } from "./dto/verify-code.dto"
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Code)
    private readonly codeRepository: Repository<Code>,
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  async registerUser(CreateUserDto: CreateUserDto): Promise<TokenResponse> {
    const existUser = await this.usersService.findUserByEmail(
      CreateUserDto.email,
    )
    if (existUser) throw new BadRequestException(ApiError.USER_EXIST)

    const newUser = await this.usersService.createUser(CreateUserDto)
    const tokens = await this.tokenService.getTokens(newUser)
    await this.tokenService.updateRefreshToken(newUser.id, tokens.refreshToken)

    return tokens
  }

  async loginUser(LoginUserDto: LoginUserDto): Promise<TokenResponse> {
    const existUser = await this.usersService.findUserByEmail(
      LoginUserDto.email,
    )
    if (!existUser) throw new BadRequestException(ApiError.USER_NOT_FOUND)

    const isPasswordValid = await bcrypt.compare(
      LoginUserDto.password,
      existUser.password,
    )
    if (!isPasswordValid) throw new BadRequestException(ApiError.WRONG_DATA)

    const tokens = await this.tokenService.getTokens(existUser)
    await this.tokenService.updateRefreshToken(
      existUser.id,
      tokens.refreshToken,
    )
    return tokens
  }

  async sendConfirmCode({ email }: ConfirmEmailDto): Promise<DefaultResponse> {
    const existUser = await this.usersService.findUserByEmail(email)
    if (existUser) throw new BadRequestException(ApiError.USER_EXIST)

    const code = uuid().slice(0, 6)
    await this.mailerService.sendMail({
      to: email,
      from: "remi mail sender",
      subject: "confirm email",
      text: "please confirm your email",
      html: `<div>${code}</div>`,
    })

    const newCode = this.codeRepository.create({
      code,
      expTime: new Date(Date.now() + 1000 * 60 * 5),
    })

    await newCode.save()

    return { message: "code was sent" }
  }

  async verifyCode({ code }: VerifyCodeDto) {
    const codeData = await this.codeRepository.findOneBy({ code })

    if (!codeData || codeData.code !== code)
      throw new BadRequestException(ApiError.INVALID_CODE)

    await codeData.remove()

    return { message: "code is correct" }
  }
}
