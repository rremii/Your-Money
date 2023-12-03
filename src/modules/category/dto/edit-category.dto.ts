import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { CategoryType } from "../category.interface"

export class EditCategoryDto {
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

  @IsString()
  @IsNotEmpty()
  type: CategoryType
}
