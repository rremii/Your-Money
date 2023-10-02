import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { CreateTransactionDto } from "./dto/create-transaction.dto"
import { Transaction } from "./entities/transaction.entity"
import { GetTransactionsDto } from "./dto/get-transactions.dto"
import { TransactionService } from "./transaction.service"
import { DeleteTransactionsDto } from "./dto/delete-transactions.dto"
import { EditTransactionDto } from "./dto/edit-transaction.dto"

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
  @UsePipes(new ValidationPipe())
  @Post("")
  async editTransaction(
    @Body() editTransactionDto: EditTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.editTransaction(editTransactionDto)
  }

  @Get("")
  async getTransByDateGap(
    @Query() getTransactionsDto: GetTransactionsDto,
  ): Promise<Transaction[]> {
    return this.transactionService.getTransByDateGap(getTransactionsDto)
  }
  @Delete("/:id")
  async deleteTransById(@Param() deleteTransactionDto: DeleteTransactionsDto) {
    return this.transactionService.deleteTransactionById(deleteTransactionDto)
  }
}
