import { forwardRef, Module } from "@nestjs/common"
import { CategoryController } from "./category.controller"
import { CategoryService } from "./category.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { Category } from "./entities/category.entity"
import { TransactionModule } from "../transaction/transaction.module"
import { UsersModule } from "../users/users.module"

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Category]),
    TransactionModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
