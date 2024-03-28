import { IsNotEmpty, IsNumber } from "class-validator"

export class DeleteTransactionsDto {
  @IsNotEmpty()
  @IsNumber()
  id: number
}
