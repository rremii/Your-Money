import { PassportStrategy } from "@nestjs/passport"
import { Profile, Strategy } from "passport-google-oauth20"
import { ConfigService } from "@nestjs/config"
import { Injectable } from "@nestjs/common"

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get("google_client_id"),
      clientSecret: configService.get("google_client_secret"),
      callbackURL: configService.get("google_callback_url"),
      scope: ["profile", "email"],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      email: profile.emails[0].value,
      name: profile.displayName,
      avatar: profile.photos[0].value,
    }
  }
}
