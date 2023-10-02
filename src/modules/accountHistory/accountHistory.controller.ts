import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { GetAccountHistoryDto } from "./dto/get-accountHistory.dto"
import { AccountHistoryService } from "./accountHistory.service"
import { InjectRepository } from "@nestjs/typeorm"

@Controller("account-history")
export class AccountHistoryController {
  constructor(private readonly accountHistoryService: AccountHistoryService) {}

  @Get("")
  async getAccountHistoryByDateGap(
    @Param() getAccountHistoryDto: GetAccountHistoryDto,
  ) {
    return this.accountHistoryService.getHistoryByDateGap(getAccountHistoryDto)
  }
}
