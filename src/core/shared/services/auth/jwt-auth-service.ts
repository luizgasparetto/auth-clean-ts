
import { sign } from "jsonwebtoken";
import { UserEntity } from "src/modules/account/domain/entities/user-entity";

export type JWTAuthResponse = {
  user_id: string;
  token: string;
}

export class JWTAuthService {
  static auth(user: UserEntity): JWTAuthResponse {
    const token = sign({}, process.env.AUTH_KEY as string, { subject: user.id, expiresIn: '1d' });

    return { user_id: user.id, token };
  }
}