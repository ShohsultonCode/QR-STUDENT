import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID:
        '887945634684-cfsanemkolbd7prbpkd7ptgm4umvn83i.apps.googleusercontent.com', //process.env.GOOGLE_CLIENT_ID,
      clientSecret: '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', //process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/students/google/callback', //process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const googleId = profile.id;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      googleId,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
