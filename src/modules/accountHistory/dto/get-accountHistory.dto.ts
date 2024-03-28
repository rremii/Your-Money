import { IsArray, IsString } from "class-validator"

export class GetAccountHistoryDto {
  @IsArray()
  accountIds: number[]

  @IsString()
  dateFrom: string

  @IsString()
  dateTo: string
}
