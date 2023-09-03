import { Module } from "@nestjs/common"
import { GoogleAuthController } from "./googleAuth.controller"
import { GoogleAuthService } from "./googleAuth.service"
import { UsersModule } from "../users/users.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { TokenModule } from "../token/token.module"
import { GoogleStrategy } from "../../strategy/google.strategy"

@Module({
  imports: [UsersModule, TokenModule, TypeOrmModule.forFeature([User])],
  controllers: [GoogleAuthController],
  providers: [GoogleStrategy, GoogleAuthService],
})
export class GoogleAuthModule {}
