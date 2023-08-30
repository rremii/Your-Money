import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { CreateDateColumn } from "typeorm"
import { TransactionType } from "../account.interface"

export class GetAccountsDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number
}
