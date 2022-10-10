import { Entity } from "../../../../core/shared/contracts/Entity";

export type UserEntityProps = {
  id?: string;
  username: string;
  email: string;
  admin: boolean
  password: string;
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