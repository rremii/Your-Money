import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { CreateTransactionDto } from "./dto/create-transaction.dto"
import { Transaction } from "./entities/transaction.entity"
import { GetTransactionsDto } from "./dto/get-transactions.dto"
import { TransactionService } from "./transaction.service"

@Controller("transaction")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  // @UseGuards(new RefreshTokenGuard())
  @UsePipes(new ValidationPipe())
  @Post("")
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.createTransaction(createTransactionDto)
  }

  @Get("")
  async getTransByDateGap(
    @Param() getTransactionsDto: GetTransactionsDto,
  ): Promise<Transaction[]> {
    return this.transactionService.getTransByDateGap(getTransactionsDto)
  }
}
