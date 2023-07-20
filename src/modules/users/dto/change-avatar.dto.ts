import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ChangeAvatarDto {
  @IsNotEmpty()
  @IsNumber()
  id: number

  @IsNotEmpty()
  @IsString()
  newAvatar: string
}
