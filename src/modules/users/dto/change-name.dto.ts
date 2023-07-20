import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ChangeNameDto {
  @IsNotEmpty()
  @IsNumber()
  id: number

  @IsNotEmpty()
  @IsString()
  newName: string
}
