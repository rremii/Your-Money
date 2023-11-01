import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { CreateTransactionDto } from "./dto/create-transaction.dto"
import { Transaction } from "./entities/transaction.entity"
import { GetTransactionsDto } from "./dto/get-transactions.dto"
import { TransactionService } from "./transaction.service"
import { DeleteTransactionsDto } from "./dto/delete-transactions.dto"
import { EditTransactionDto } from "./dto/edit-transaction.dto"
import { RefreshTokenGuard } from "../../guards/refresh-token.guard"

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

  // @UseGuards(new RefreshTokenGuard())
  @UsePipes(new ValidationPipe())
  @Put("")
  async editTransaction(
    @Body() editTransactionDto: EditTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.editTransaction(editTransactionDto)
  }

  // @UseGuards(new RefreshTokenGuard())
  @Get("")
  async getTransByDateGap(
    @Query() getTransactionsDto: GetTransactionsDto,
  ): Promise<Transaction[]> {
    return this.transactionService.getTransByDateGap(getTransactionsDto)
  }

  // @UseGuards(new RefreshTokenGuard())
  @Delete("/:id")
  async deleteTransById(@Param() deleteTransactionDto: DeleteTransactionsDto) {
    return this.transactionService.deleteTransactionById(deleteTransactionDto)
  }
}
