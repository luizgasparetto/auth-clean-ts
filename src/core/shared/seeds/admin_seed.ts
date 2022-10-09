import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";

import { prisma } from "../../../../prisma/PrismaClient";

async function createAdmin(): Promise<void> {
  const id = uuidV4();
  const password = await hash(process.env.ADMIN_PASSWORD as string, 10);

  await prisma.users.create({
    data: { id, username: 'admin', email: 'admin@admin.com', password, admin: true }
  })
}

createAdmin().then(() => console.log("User admin created"));