import { PrismaClient } from "@prisma/client";

declare const globalThis: {
  prismaGlobal?: PrismaClient;
} & typeof global;

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = new PrismaClient();
  }
  prisma = globalThis.prismaGlobal;
}

export { prisma };

export async function listAllUsersPhoneAndBalance(): Promise<
  Array<{
    phone: string;
    balance: number;
  }>
> {
  const xs = await prisma.user.findMany({
    select: { phone: true, account: { select: { balance: true } } },
  });
  return xs.map((x) => ({
    phone: x.phone,
    balance: x.account?.balance ? (x.account.balance as unknown as number) : 0,
  }));
}
