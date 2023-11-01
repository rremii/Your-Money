import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { TransactionType } from "../transaction.interface"

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  accountId: number

  @IsNumber()
  @IsNotEmpty()
  userId: number

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

  title: string
}
