import { Email } from "../../../../core/shared/value-objects/email";
import { Entity } from "../../../../core/shared/contracts/entity";
import { Password } from "../../../../core/shared/value-objects/password";
import { Username } from "../../../../core/shared/value-objects/username";

export type AccountEntityProps = {
  id?: string;
  username: Username;
  email: Email;
  password: Password;
  admin: boolean
  createdAt: Date;
  updatedAt?: Date;
}

export class AccountEntity extends Entity<AccountEntityProps> {
  private constructor(props: AccountEntityProps, id?: string) {
    super(props, id);
  }

  public static create(props: AccountEntityProps, id?: string) {
    const user = new AccountEntity(props, id);

    return user;
  }
}