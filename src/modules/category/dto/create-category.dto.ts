import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { CategoryType } from "../category.interface"

export class CreateCategoryDto {
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

  @IsString()
  @IsNotEmpty()
  type: CategoryType
}
