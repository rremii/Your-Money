import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class GetTransactionsDto {
  @IsArray()
  accountIds: number[]

  @IsString()
  dateFrom: string

  @IsString()
  dateTo: string
}
