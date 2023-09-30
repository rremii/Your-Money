import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { Transaction } from "../transaction/entities/transaction.entity"
import { AccountHistoryPoint } from "./entities/accountHistoryPoint.entity"
import { AccountHistoryService } from "./accountHistory.service"

@Module({
  imports: [TypeOrmModule.forFeature([AccountHistoryPoint])],
  controllers: [],
  providers: [AccountHistoryService],
  exports: [AccountHistoryService],
})
export class AccountHistoryModule {}
