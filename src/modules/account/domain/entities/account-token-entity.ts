import { Entity } from "../../../../core/shared/contracts/entity";

export type AccountTokenEntityProps = {
  id?: string;
  refreshToken: string;
  accountId: string;
  expiresDate: Date;
  createdAt: Date;
}

export class AccountTokenEntity extends Entity<AccountTokenEntityProps> {
  private constructor(props: AccountTokenEntityProps, id?: string) {
    super(props, id);
  }

  public static create(props: AccountTokenEntityProps, id?: string) {
    const user = new AccountTokenEntity(props, id);

    return user;
  }
}