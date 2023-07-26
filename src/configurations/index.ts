import * as process from "process"
import { registerAs } from "@nestjs/config"

export default () => ({
  port: process.env.PORT,
  client_origin: process.env.CLIENT_ORIGIN,
  client_domain: process.env.CLIENT_DOMAIN,

  db_host: process.env.DB_HOST || 5000,
  db_user_name: process.env.DB_USER_NAME,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  db_port: process.env.DB_PORT,

  access_secret_jwt: process.env.JWT_ACCESS_SECRET,
  refresh_secret_jwt: process.env.JWT_REFRESH_SECRET,

  access_expire_jwt: +process.env.JWT_ACCESS_EXPIRE || 600, //seconds
  refresh_expire_jwt: +process.env.JWT_REFRESH_EXPIRE || 6000, //seconds

  smtp_email: process.env.SMTP_EMAIL,
  smtp_password: process.env.SMTP_PASSWORD,

  auth_code_expire: +process.env.AUTH_CODE_EXPIRE || 60, //seconds

  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.GOOGLE_CALLBACK_URL,
})
