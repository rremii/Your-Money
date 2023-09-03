import { IsNotEmpty, IsNumber } from "class-validator"

export class GetCategoriesDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number
}
