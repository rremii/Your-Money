import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class GetAccountHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number

  @IsString()
  dateFrom: string

  @IsString()
  dateTo: string
}
