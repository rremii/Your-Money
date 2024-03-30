import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AccountService } from "./account.service"
import { CreateAccountDto } from "./dto/create-account.dto"
import { Account } from "./entities/account.entity"
import { GetAccountsDto } from "./dto/get-accounts.dto"
import { EditAccountDto } from "./dto/edit-account.dto"
import { RefreshTokenGuard } from "../../guards/refresh-token.guard";
import { AccessTokenGuard } from "../../guards/access-token.guard";

@UseGuards(new AccessTokenGuard())
@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UsePipes(new ValidationPipe())
  @Post("")
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<Account> {
    return this.accountService.createAccount(createAccountDto)
  }

  @UsePipes(new ValidationPipe())
  @Put("")
  async editAccount(@Body() editAccountDto: EditAccountDto): Promise<Account> {
    return this.accountService.editAccount(editAccountDto)
  }

  @UsePipes(new ValidationPipe())
  @Delete(":id")
  async deleteAccount(@Param("id", ParseIntPipe) id: number): Promise<Account> {
    return this.accountService.deleteAccount(id)
  }


  @Get("")
  async getAccounts(
    @Param() getAccountsDto: GetAccountsDto,
  ): Promise<Account[]> {
    return this.accountService.getAccounts(getAccountsDto)
  }
}
