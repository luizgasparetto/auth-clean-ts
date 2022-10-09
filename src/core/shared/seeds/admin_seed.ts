import crypto from "node:crypto";

import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";

import { PrismaClientEnviroment } from "../../../../prisma/PrismaClientEnviroment";

async function createAdmin(): Promise<void> {
  const connection = new PrismaClientEnviroment();

  const id = uuidV4();

  const args = process.argv;

  const username = args[args.length - 2].split('=')[1];
  const email = args[args.length - 1].split('=')[1];

  const password = crypto.createHash('md5').digest('hex');
  const hashPassword = await hash(password, 10);

  await connection.query(`
    INSERT INTO users(id, username, email, password, admin, created_at, updated_at)
    values('${id}', '${username}', '${email}', '${hashPassword}', true, 'now()', 'now()')
  `);

  console.log('\nUser admin created successfully!\n');
  console.log(`Username: ${username}\nEmail: ${email}\nPassword: ${password}\n`);
}

createAdmin();