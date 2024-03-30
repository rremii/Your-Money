import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { GetAccountHistoryDto } from "./dto/get-accountHistory.dto"
import { AccountHistoryService } from "./accountHistory.service"
import { AccessTokenGuard } from "../../guards/access-token.guard";


@UseGuards(new AccessTokenGuard())
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
