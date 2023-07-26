import { Module, NestModule } from "@nestjs/common"
import { CodeService } from "./code.service"
import { CodeController } from "./code.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Code } from "./entities/code.entity"
import { User } from "../users/entities/user.entity"
import { UsersModule } from "../users/users.module"

@Module({
  imports: [TypeOrmModule.forFeature([Code, User]), UsersModule],
  exports: [CodeService],
  providers: [CodeService],
  controllers: [CodeController],
})
export class CodeModule implements NestModule {
  configure() {}
}
