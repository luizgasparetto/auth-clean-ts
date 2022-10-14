
import { sign } from "jsonwebtoken";
import { AccountEntity } from "src/modules/account/domain/entities/account-entity";

type JWTAuthResponse = {
  user_id: string;
  token: string;
}

type JWTRefreshAuthResponse = {
  refreshToken: string;
}

export class JWTAuthService {
  static auth(user: AccountEntity): JWTAuthResponse {
    const token = sign({}, process.env.SECRET_ACCESS_TOKEN as string, {
      subject: user.id,
      expiresIn: process.env.EXPIRES_IN_ACCESS_TOKEN
    });

    return { user_id: user.id, token };
  }

  static refreshToken(payload: string, subject: string): JWTRefreshAuthResponse {
    const token = sign({ payload }, process.env.SECRET_REFRESH_TOKEN as string, {
      subject,
      expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN
    })

    return { refreshToken: token };
  }
}