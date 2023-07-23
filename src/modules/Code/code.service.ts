import { BadRequestException, Injectable } from "@nestjs/common"
import { ConfirmEmailDto } from "./dto/confirm-email.dto"
import { DefaultResponse } from "../../common/types/types"
import { ApiError } from "../../common/constants/errors"
import { v4 as uuid } from "uuid"
import { VerifyCodeDto } from "./dto/verify-code.dto"
import { MailerService } from "@nestjs-modules/mailer"
import { UsersService } from "../users/users.service"
import { InjectRepository } from "@nestjs/typeorm"
import { Code } from "./entities/code.entity"
import { Repository } from "typeorm"

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code)
    private readonly codeRepository: Repository<Code>,
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
  ) {}

  async sendConfirmCode({ email }: ConfirmEmailDto): Promise<DefaultResponse> {
    const existUser = await this.usersService.findUserByEmail(email)
    if (existUser) throw new BadRequestException(ApiError.USER_EXIST)

    const code = uuid().slice(0, 6)
    await this.mailerService.sendMail({
      to: email,
      from: "remi mail sender",
      subject: "confirm email",
      text: "please confirm your email",
      html: `<div>${code}</div>`,
    })

    const newCode = this.codeRepository.create({
      code,
      expTime: new Date(Date.now() + 1000 * 60 * 5),
    })

    await newCode.save()

    return { message: "code was sent" }
  }

  async verifyCode({ code }: VerifyCodeDto) {
    const codeData = await this.codeRepository.findOneBy({ code })

    if (!codeData || codeData.code !== code)
      throw new BadRequestException(ApiError.INVALID_CODE)

    await codeData.remove()

    return { message: "code is correct" }
  }
}
