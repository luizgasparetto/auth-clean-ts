import { ICryptographyService } from "./i-cryptography-service";

import bcrypt from "bcryptjs";

export class BCryptCryptographyServiceImpl implements ICryptographyService {
  constructor(private readonly salt: number = 10) { }

  async hash(plaintext: string): Promise<string> {
    return await bcrypt.hash(plaintext, this.salt);
  }
}