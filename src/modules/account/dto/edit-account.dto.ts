import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class EditAccountDto {
  @IsNotEmpty()
  @IsNumber()
  id: number

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  color: string

  @IsString()
  @IsNotEmpty()
  icon: string
}
