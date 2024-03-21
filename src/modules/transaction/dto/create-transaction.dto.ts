import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { TransactionType } from "../transaction.interface"
import { Optional } from "@nestjs/common"

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  accountId: number

  @IsNumber()
  @IsNotEmpty()
  categoryId: number

  @IsString()
  @IsNotEmpty()
  date: string

  @IsNumber()
  @IsNotEmpty()
  quantity: number

  @IsString()
  @IsNotEmpty()
  type: TransactionType

  @Optional()
  title: string
}
