import { IsNumber } from "class-validator"

export class GameResultsResponse {
  @IsNumber()
  quickMathScore: number

  @IsNumber()
  hardMathScore: number

  @IsNumber()
  inputMathScore: number

  @IsNumber()
  trueFalseMathScore: number

  @IsNumber()
  balanceMathScore: number
}
