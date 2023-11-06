import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Currency } from "../account.interface"

export class CreateAccountDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  color: string

  @IsString()
  @IsNotEmpty()
  icon: string

  @IsNotEmpty()
  @IsEnum(Currency)
  currency: Currency
}
