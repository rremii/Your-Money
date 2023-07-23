import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./entities/user.entity"
import { TokenModule } from "../token/token.module"
import { TokenService } from "../token/token.service"
import { JwtModule } from "@nestjs/jwt"

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule,
    TokenModule,
    // QuickMathModule,
  ],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersService, TokenService],
  controllers: [UsersController],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes(CodeController)
  }
}
