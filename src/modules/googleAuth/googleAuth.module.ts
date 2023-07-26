import { Module } from "@nestjs/common"
import { GoogleAuthController } from "./googleAuth.controller"
import { GoogleAuthService } from "./googleAuth.service"
import { UsersModule } from "../users/users.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { TokenModule } from "../token/token.module"
import { GoogleStrategy } from "../../strategy/google.strategy"
import { AccessTokenStrategy } from "../../strategy/access-token.strategy"
import { RefreshTokenStrategy } from "../../strategy/refresh-token.strategy"
import { ConfigModule, ConfigService } from "@nestjs/config"

@Module({
  imports: [UsersModule, TokenModule, TypeOrmModule.forFeature([User])],
  controllers: [GoogleAuthController],
  providers: [GoogleStrategy, GoogleAuthService, ConfigService],
})
export class GoogleAuthModule {}
