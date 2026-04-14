import "dotenv/config"; 

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function test() {
  const u = await prisma.user.findFirst({});
  console.log("u", u);
}

test();