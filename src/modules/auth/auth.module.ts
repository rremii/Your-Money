import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { UsersService } from "../users/users.service"
import { UsersModule } from "../users/users.module"
import { TokenService } from "../token/token.service"
import { JwtModule, JwtService } from "@nestjs/jwt"
import { AccessTokenStrategy } from "../../strategy/access-token.strategy"
import { RefreshTokenStrategy } from "../../strategy/refresh-token.strategy"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { Code } from "../Code/entities/code.entity"

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Code]), JwtModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    JwtService,
    UsersService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
