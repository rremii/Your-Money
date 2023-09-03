import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { AccountService } from "./account.service"
import { CreateAccountDto } from "./dto/create-account.dto"
import { Account } from "./entities/account.entity"
import { GetAccountsDto } from "./dto/get-accounts.dto"

@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  //todo
  // @UseGuards(new RefreshTokenGuard())
  @UsePipes(new ValidationPipe())
  @Post("")
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<Account> {
    return this.accountService.createAccount(createAccountDto)
  }

  // @UsePipes(new ValidationPipe())
  @Get("")
  async getAccounts(
    @Param() getAccountsDto: GetAccountsDto,
  ): Promise<Account[]> {
    return this.accountService.getAccounts(getAccountsDto)
  }
}
