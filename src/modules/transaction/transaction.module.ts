import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Transaction } from "./entities/transaction.entity"
import { TransactionController } from "./transaction.controller"
import { TransactionService } from "./transaction.service"
import { User } from "../users/entities/user.entity"
import { Account } from "../account/entities/account.entity"
import { Category } from "../category/entities/category.entity"

@Module({
  imports: [TypeOrmModule.forFeature([User, Account, Transaction, Category])],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
