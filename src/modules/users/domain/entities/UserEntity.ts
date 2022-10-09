import { v4 as uuidV4 } from "uuid";

class UserEntity {
  id?: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(username: string, email: string, password: string, createdAt: Date, updatedAt: Date, id?: string) {
    this.id = id || uuidV4();
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export { UserEntity };