import { forwardRef, Inject, Module } from "@nestjs/common"
import { CategoryController } from "./category.controller"
import { CategoryService } from "./category.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { Category } from "./entities/category.entity"
import { Transaction } from "../transaction/entities/transaction.entity"
import { TransactionModule } from "../transaction/transaction.module"
import { TransactionService } from "../transaction/transaction.service"

@Module({
  imports: [TypeOrmModule.forFeature([User, Category]), TransactionModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
