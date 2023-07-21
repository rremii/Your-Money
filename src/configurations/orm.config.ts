import { ConfigService } from "@nestjs/config"
import { User } from "../modules/users/entities/user.entity"

export const getOrmConfig = async (config: ConfigService): Promise<any> => {
  return {
    type: "postgres",

    host: config.get("db_host"),
    port: config.get("db_port"),
    username: config.get("db_user_name"),
    password: config.get("db_password"),
    database: config.get("db_name"),
    synchronize: true,

    entities: [User],

    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
}
