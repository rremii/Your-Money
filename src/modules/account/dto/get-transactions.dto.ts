import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { CreateDateColumn } from "typeorm"
import { TransactionType } from "../account.interface"

export class GetTransactionsDto {
  @IsNotEmpty()
  @IsString()
  dateFrom: string

  @IsNotEmpty()
  @IsString()
  dateTo: string
}
