import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class DeleteTransactionsDto {
  @IsNotEmpty()
  @IsNumber()
  id: number
}
