import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { CodeService } from "./code.service"
import { CodeController } from "./code.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TokenModule } from "../token/token.module"
import { TokenService } from "../token/token.service"
import { JwtModule } from "@nestjs/jwt"
import { Code } from "./entities/code.entity"
import { User } from "../users/entities/user.entity"
import { UsersService } from "../users/users.service"

@Module({
  imports: [TypeOrmModule.forFeature([Code, User]), JwtModule, TokenModule],
  exports: [TypeOrmModule, CodeService],
  providers: [CodeService, UsersService, TokenService],
  controllers: [CodeController],
})
export class CodeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes(CodeController)
  }
}
