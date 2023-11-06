import { Module } from "@nestjs/common"
import { AccountController } from "./account.controller"
import { AccountService } from "./account.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { Account } from "./entities/account.entity"
import { Transaction } from "../transaction/entities/transaction.entity"

@Module({
  imports: [TypeOrmModule.forFeature([User, Account, Transaction])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}