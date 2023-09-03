import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { Repository } from "typeorm"
import { CreateUserDto } from "../users/dto/create-user.dto"
import { UsersService } from "../users/users.service"
import { TokenService } from "../token/token.service"
import { GoogleLoginDto } from "./dto/google-login.dto"

@Injectable()
export class GoogleAuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
  ) {}

  async googleSignUp(createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto)
    const tokens = await this.tokenService.getTokens(newUser)
    await this.tokenService.updateRefreshToken(newUser.id, tokens.refreshToken)

    return tokens
  }
  async googleSignIn(loginDto: GoogleLoginDto) {
    const existUser = await this.usersService.findUserByEmail(loginDto.email)

    if (!existUser) return this.googleSignUp(loginDto)

    const tokens = await this.tokenService.getTokens(existUser)

    await this.tokenService.updateRefreshToken(
      existUser.id,
      tokens.refreshToken,
    )
    return tokens
  }
}
