import { PrismaClient } from "@prisma/client";
import { Client } from "pg";

class PrismaClientEnviroment {
  private connectionString: string;

  constructor() {
    const dbUser = process.env.DATABASE_USER;
    const dbPassword = process.env.DATABASE_PASS;
    const dbHost = process.env.DATABASE_HOST;
    const dbPort = process.env.DATABASE_PORT;
    const dbName = process.env.DATABASE_NAME;

    this.connectionString = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?schema=public`;
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

export { PrismaClientEnviroment };