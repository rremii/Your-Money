import { forwardRef, Module, NestModule } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./entities/user.entity"
import { TokenModule } from "../token/token.module"
import { AccountModule } from "../account/account.module"
import { CategoryModule } from "../category/category.module"

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TokenModule,
    AccountModule,

    CategoryModule,
  ],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule implements NestModule {
  configure() {}
}
