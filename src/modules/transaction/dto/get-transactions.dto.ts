import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class GetTransactionsDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number

  @IsString()
  dateFrom: string

  @IsString()
  dateTo: string
}
