import * as process from "process"
import { ConfigService } from "@nestjs/config"
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter"
// export const mailConfig = {
//   transport: {
//     host: "smtp.gmail.com",
//     auth: {
//       user: process.env.SMTP_EMAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   },
// }
export const getMailConfig = async (
  configService: ConfigService,
): Promise<any> => {
  // const transport = configService.get<string>("mail_transport")
  // const mailFromName = configService.get<string>("mail_from_name")
  // const mailFromAddress = transport.split(":")[1].split("//")[1]

  return {
    transport: {
      host: "smtp.gmail.com",
      auth: {
        user: configService.get<string>("smtp_email"),
        pass: configService.get<string>("smtp_password"),
      },
    },
    defaults: {
      from: '"nest-modules" <modules@nestjs.com>',
    },
    template: {
      dir: __dirname + "/templates",
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  }
}
