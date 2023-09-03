import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import configurations from "../configurations"
import { UsersModule } from "./users/users.module"
import { AuthModule } from "./auth/auth.module"
import { TokenModule } from "./token/token.module"
import { MailerModule } from "@nestjs-modules/mailer"
import { getMailConfig } from "src/configurations/mail.config"
import { getOrmConfig } from "../configurations/orm.config"
import { CodeModule } from "./Code/code.module"
import { PassportModule } from "@nestjs/passport"
import { GoogleAuthModule } from "./googleAuth/googleAuth.module"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"
import { AccountModule } from "./account/account.module"
import { CategoryModule } from "./category/category.module"
import { TransactionModule } from "./transaction/transaction.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
      envFilePath: [".development.env", ".env", ".production.env"],
    }),
    AccountModule,
    UsersModule,
    AuthModule,
    TokenModule,
    CodeModule,
    TransactionModule,
    PassportModule,
    GoogleAuthModule,
    CategoryModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../..", "uploads"),
      serveStaticOptions: {
        redirect: false,
        index: false,
      },
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailConfig,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getOrmConfig,
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {
  constructor() {}
}
