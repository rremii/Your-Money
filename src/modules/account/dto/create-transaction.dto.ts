import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { CreateDateColumn } from "typeorm"
import { TransactionType } from "../account.interface"

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  accountId: number

  @IsString()
  @IsNotEmpty()
  category: string

  @IsNumber()
  @IsNotEmpty()
  quantity: number

  @IsString()
  @IsNotEmpty()
  type: TransactionType

  title: string
}
