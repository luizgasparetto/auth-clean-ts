import { PrismaClient } from "@prisma/client";
import { Client } from "pg";

import { v4 as uuid } from "uuid";

export class PrismaClientEnviroment {
  private connectionString: string;

  constructor() {
    const dbUser = process.env.DATABASE_USER;
    const dbPassword = process.env.DATABASE_PASS;
    const dbHost = process.env.DATABASE_HOST;
    const dbPort = process.env.DATABASE_PORT;
    const dbName = process.env.DATABASE_NAME;

    const schema = `public_${uuid()}`;

    this.connectionString = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?schema=${schema}`;
  }

  get prisma() {
    return new PrismaClient();
  }

  async query(query: string): Promise<void> {
    const client = new Client({ connectionString: this.connectionString });

    await client.connect();
    await client.query(query);
    await client.end();
  }
}