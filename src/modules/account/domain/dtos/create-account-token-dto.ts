export interface CreateAccountTokenDTO {
  accountId: string;
  refreshToken: string;
  expiresDate: Date;
}