import { hash } from "bcryptjs";
import { prisma } from "../client";

async function createAdmin(): Promise<void> {
  const args = process.argv.slice(2);

  const username = args[0].split(':')[1];
  const email = args[1].split(':')[1];
  const password = args[2].split(':')[1];

  const hashPassword = await hash(password, 10);

  await prisma.users.create({data: {username, email, password: hashPassword, admin: true}});
}

createAdmin().then(() => console.log('\nUser admin created successfully!\n'));