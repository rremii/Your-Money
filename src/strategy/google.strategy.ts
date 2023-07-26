import { PassportStrategy } from "@nestjs/passport"
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20"
import * as process from "process"

export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      email: profile.emails[0].value,
    }
  }
}
