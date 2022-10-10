import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";

import { PrismaClientEnviroment } from "../../../../prisma/PrismaClientEnviroment";

async function createAdmin(): Promise<void> {
  const connection = new PrismaClientEnviroment();

  const args = process.argv.slice(2);

  const id = uuidV4();

  const username = args[0].split(':')[1];
  const email = args[1].split(':')[1];
  const password = args[2].split(':')[1];

  const hashPassword = await hash(password, 10);

  await connection.query(`
    INSERT INTO users(id, username, email, password, admin, created_at, updated_at)
    values('${id}', '${username}', '${email}', '${hashPassword}', true, 'now()', 'now()')
  `);

  console.log('\nUser admin created successfully!\n');
}

createAdmin();