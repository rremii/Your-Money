import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DataSource } from "typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import configurations from "../configurations"
import { UsersModule } from "./users/users.module"
import { AuthModule } from "./auth/auth.module"
import { User } from "./users/entities/user.entity"
import { TokenModule } from "./token/token.module"

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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          type: "postgres",

          host: config.get("db_host"),
          port: config.get("db_port"),
          username: config.get("db_user_name"),
          password: config.get("db_password"),
          database: config.get("db_name"),
          synchronize: true,

          entities: [
            User,
          ],

          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
