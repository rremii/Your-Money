import { ConfigService } from "@nestjs/config"
import { User } from "../modules/users/entities/user.entity"
import { Code } from "../modules/Code/entities/code.entity"
import { Account } from "src/modules/account/entities/account.entity"
import { Category } from "../modules/category/entities/category.entity"
import { Transaction } from "../modules/transaction/entities/transaction.entity"
import { AccountHistoryModule } from "../modules/accountHistory/accountHistory.module"
import { AccountHistoryPoint } from "../modules/accountHistory/entities/accountHistoryPoint.entity"

export const getOrmConfig = async (config: ConfigService): Promise<any> => {
  return {
    type: "postgres",

    host: config.get("db_host"),
    port: config.get("db_port"),
    username: config.get("db_user_name"),
    password: config.get("db_password"),
    database: config.get("db_name"),
    synchronize: true,

    entities: [User, Code, Account, Transaction, Category, AccountHistoryPoint],

    // ssl: true,
    // extra: {
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    // },
  }
}
