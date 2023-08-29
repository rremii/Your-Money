import { Module } from "@nestjs/common"
import { CategoryController } from "./category.controller"
import { CategoryService } from "./category.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { Category } from "./entities/category.entity"

@Module({
  imports: [TypeOrmModule.forFeature([User, Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
