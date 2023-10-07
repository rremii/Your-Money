import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Transaction } from "./entities/transaction.entity"
import { TransactionController } from "./transaction.controller"
import { TransactionService } from "./transaction.service"
import { User } from "../users/entities/user.entity"
import { Account } from "../account/entities/account.entity"
import { Category } from "../category/entities/category.entity"
import { AccountHistoryModule } from "../accountHistory/accountHistory.module"
import { AccountHistoryPoint } from "../accountHistory/entities/accountHistoryPoint.entity"
import { AccountModule } from "../account/account.module"
import { CategoryModule } from "../category/category.module"
import { UsersModule } from "../users/users.module"

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Account, Transaction, Category]),
    AccountHistoryModule,
    AccountModule,
    CategoryModule,
    UsersModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
