import { Module } from "@nestjs/common"
import { TokenService } from "./token.service"
import { JwtModule, JwtService } from "@nestjs/jwt"
import { UsersService } from "../users/users.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  providers: [TokenService, JwtService, UsersService],
  exports: [TokenService, JwtService, UsersService],
})
export class TokenModule {}
