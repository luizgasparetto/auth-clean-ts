import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";

import { PrismaClientEnviroment } from "../../../../prisma/PrismaClientEnviroment";


async function createAdmin(): Promise<void> {
  const connection = new PrismaClientEnviroment();

  const id = uuidV4();
  const password = await hash(process.env.ADMIN_PASSWORD as string, 10);

  await connection.query(`
    INSERT INTO users(id, username, email, password, admin, created_at, updated_at)
    values('${id}', 'admin', '${password}', 'admin@admin.com', true, 'now()', 'now()')
  `);
}

createAdmin().then(() => console.log("User admin created"));