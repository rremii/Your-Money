import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { TransactionType } from "../transaction.interface"
import { Optional } from "@nestjs/common"

export class EditTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  id: number

  @IsNumber()
  @IsNotEmpty()
  accountId: number

  @IsNumber()
  @IsNotEmpty()
  categoryId: number

  @IsNumber()
  @IsNotEmpty()
  quantity: number

  @IsString()
  @IsNotEmpty()
  date: string

  @Optional()
  title: string
}
