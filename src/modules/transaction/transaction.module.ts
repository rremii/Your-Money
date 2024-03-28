import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Transaction } from "./entities/transaction.entity"
import { TransactionController } from "./transaction.controller"
import { TransactionService } from "./transaction.service"
import { Account } from "../account/entities/account.entity"
import { Category } from "../category/entities/category.entity"
import { AccountHistoryModule } from "../accountHistory/accountHistory.module"
import { AccountHistoryPoint } from "../accountHistory/entities/accountHistoryPoint.entity"

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Transaction,
      Category,
      AccountHistoryPoint,
      Account,
    ]),
    AccountHistoryModule,
    // AccountModule,
    // UsersModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
