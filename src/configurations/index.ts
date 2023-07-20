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

  access_expire_jwt: process.env.JWT_ACCESS_EXPIRE || 600,
  refresh_expire_jwt: process.env.JWT_REFRESH_EXPIRE || 6000,
})
