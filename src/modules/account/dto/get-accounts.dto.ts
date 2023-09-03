import { IsNotEmpty, IsNumber } from "class-validator"

export class GetAccountsDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number
}
