import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "./entities/user.entity"
import { CreateUserDto } from "./dto/create-user.dto"
import { HashData } from "../../common/helpers/hashData"
import { TokenService } from "../token/token.service"
import { ApiError } from "../../common/constants/errors"
import { IUserInfo } from "./users.interface"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email })
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = new User()
    newUser.email = user.email
    // newUser.userName = user.userName
    if (user.password) newUser.password = await HashData(user.password)
    // newUser.avatar = user.avatar

    await newUser.save()

    return newUser
  }

  // async changeName(changeNameDto: ChangeNameDto): Promise<DefaultResponse> {
  //   const user = await this.usersRepository.findOneBy({ id: changeNameDto.id })
  //   user.userName = changeNameDto.newName
  //
  //   await user.save()
  //
  //   return { message: "user name was updated" }
  // }

  // async changeAvatar(changeNameDto: ChangeAvatarDto): Promise<DefaultResponse> {
  //   const user = await this.usersRepository.findOneBy({ id: changeNameDto.id })
  //   user.avatar = changeNameDto.newAvatar
  //
  //   await user.save()
  //
  //   return { message: "user avatar was updated" }
  // }

  async getUser(authToken: string): Promise<IUserInfo> {
    const decodedUser = await this.tokenService.decodeToken(authToken)

    const user = this.usersRepository.findOne({
      where: { id: decodedUser.id },
      select: ["id", "email"],
    })

    if (!user) throw new BadRequestException(ApiError.USER_NOT_FOUND)

    return user
  }
}
