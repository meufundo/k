import { prisma } from "@/prisma.config";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const formValidationSchema = z.object({
  phone: z.string().length(9),
  amount: z.string(),
});

export async function POST(request: NextRequest) {
  const { data, success } = formValidationSchema.safeParse(
    await request.json(),
  );
  if (false === success) {
    return NextResponse.json(
      { message: "As informações inseridas são inválidas." },
      { status: 400 },
    );
  }

  const user = await prisma.user.findFirst({
    where: { phone: data.phone },
    include: { inviter: { include: { account: true } }, account: true },
  });
  if (!user) {
    return NextResponse.json(
      { message: "Usuário não encontrado." },
      { status: 404 },
    );
  }

  const amount = Number(data.amount);
  if (isNaN(amount) || amount < 50 || amount > 50000) {
    return NextResponse.json(
      {
        message: "O saldo introduzido é inválido, deve estar entre 50 e 50,000",
      },
      { status: 400 },
    );
  }

  await prisma.account.update({
    where: { userId: user.id },
    data: { balance: { increment: amount } },
  });
  await prisma.transaction.create({
    data: {
      amount,
      type: "DEPOSIT",
      status: "SUCCESS",
      accountId: user.account!.id,
    },
  });

  if (user.inviter) {
    const comission = 0.15 * amount;
    await prisma.account.update({
      where: { userId: user.inviter.id },
      data: { balance: { increment: comission } },
    });
    await prisma.transaction.create({
      data: {
        amount: comission,
        type: "BONUS",
        status: "SUCCESS",
        accountId: user.inviter.account!.id,
      },
    });
  }

  return NextResponse.json(
    { message: "Transação criada com sucesso." },
    { status: 200 },
  );
}
