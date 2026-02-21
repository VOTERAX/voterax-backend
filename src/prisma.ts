import "dotenv/config"; 

import { PrismaClient } from "@prisma/client";


console.log("DATABASE_URL:", process.env.DATABASE_URL); // add this line

export const prisma = new PrismaClient();

async function test() {
  const u = await prisma.user.findFirst({});
  console.log(u);
}

test();