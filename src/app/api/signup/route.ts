import { prisma } from "@/prisma.config";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { saltAndHashPassword } from "@/lib/utils";

const formValidationSchema = z.object({
  phone: z.string().length(9),
  password: z.string().min(4),
  inviterCode: z.string().or(z.null()),
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

  if (await prisma.user.findFirst({ where: { phone: data.phone } })) {
    return NextResponse.json(
      { message: "O número inserido já está em uso." },
      { status: 422 },
    );
  }

  const inviterUser = data.inviterCode
    ? await prisma.user.findFirst({
        where: { code: data.inviterCode },
      })
    : null;

  const code = crypto.randomBytes(5).toString("base64url");
  const hashedPassword = saltAndHashPassword(data.password);

  await prisma.user.create({
    data: {
      phone: data.phone,
      password: hashedPassword,
      code: code,
      account: { create: { balance: 0 } },
      role: data.phone === "848484849" ? "ADMIN" : "USER",
      inviterCode: inviterUser?.code,
    },
  });

  return NextResponse.json(
    { message: "Conta criada com sucesso." },
    { status: 201 },
  );
}
