import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { TransactionType } from "../transaction.interface"

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

  // @IsString()
  // @IsNotEmpty()
  // type: TransactionType

  @IsString()
  @IsNotEmpty()
  date: string

  title: string
}
