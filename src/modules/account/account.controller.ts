import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { VerifyCodeDto } from "../Code/dto/verify-code.dto"
import { DefaultResponse } from "../../common/types/types"
import { AccountService } from "./account.service"
import { CreateAccountDto } from "./dto/create-account.dto"
import { RefreshTokenGuard } from "../../guards/refresh-token.guard"
import { Account } from "./entities/account.entity"
import { CreateTransactionDto } from "./dto/create-transaction.dto"
import { Transaction } from "./entities/transaction.entity"
import { GetTransactionsDto } from "./dto/get-transactions.dto"

@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  //todo
  // @UseGuards(new RefreshTokenGuard())
  @UsePipes(new ValidationPipe())
  @Post("")
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<Account> {
    return this.accountService.createAccount(createAccountDto)
  }

  // @UseGuards(new RefreshTokenGuard())
  @UsePipes(new ValidationPipe())
  @Post("transaction")
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.accountService.createTransaction(createTransactionDto)
  }

  @UsePipes(new ValidationPipe())
  @Get("transaction")
  async getTransByDateGap(
    @Body() getTransactionsDto: GetTransactionsDto,
  ): Promise<Transaction[]> {
    return this.accountService.getTransByDateGap(getTransactionsDto)
  }
}
