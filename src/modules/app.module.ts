import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DataSource } from "typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import configurations from "../configurations"
import { UsersModule } from "./users/users.module"
import { AuthModule } from "./auth/auth.module"
import { User } from "./users/entities/user.entity"
import { TokenModule } from "./token/token.module"
import { MailerModule } from "@nestjs-modules/mailer"
import { getMailConfig } from "src/configurations/mail.config"
import { getOrmConfig } from "../configurations/orm.config"
import process from "process"
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
      envFilePath: [".development.env", ".env", ".production.env"],
    }),
    UsersModule,
    AuthModule,
    TokenModule,
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
  constructor(private dataSource: DataSource) {}
}
