import { Controller, Get, Query } from "@nestjs/common"
import { GetAccountHistoryDto } from "./dto/get-accountHistory.dto"
import { AccountHistoryService } from "./accountHistory.service"

@Controller("account-history")
export class AccountHistoryController {
  constructor(private readonly accountHistoryService: AccountHistoryService) {}

  @Get("")
  async getAccountHistoryByDateGap(
    @Query() getAccountHistoryDto: GetAccountHistoryDto,
  ) {
    return this.accountHistoryService.getHistoryByDateGap(getAccountHistoryDto)
  }
}
