import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class GetCategoriesDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number
}
