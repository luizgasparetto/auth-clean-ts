import { Email } from "../../../../core/shared/value-objects/email";
import { Entity } from "../../../../core/shared/contracts/entity";
import { Password } from "src/core/shared/value-objects/password";

export type UserEntityProps = {
  id?: string;
  username: string;
  email: Email;
  password: Password;
  admin: boolean
  createdAt: Date;
  updatedAt?: Date;
}

export class UserEntity extends Entity<UserEntityProps> {
  private constructor(props: UserEntityProps, id?: string) {
    super(props, id);
  }

  public static create(props: UserEntityProps, id?: string) {
    const user = new UserEntity(props, id);

    return user;
  }
}