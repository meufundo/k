import Link from "next/link";
import { prisma } from "@/prisma.config";
import Deposit from "./deposit";

export default async function Page({
  params,
}: {
  params: Promise<{ phone: string }>;
}) {
  const { phone } = await params;
  const user = await prisma.user.findFirst({
    where: { phone },
    include: {
      inviter: true,
      invitedUsers: true,
      account: {
        include: {
          vips: { include: { vip: true } },
          transactions: true,
        },
      },
    },
  });

  const pendingWithdrawls = user!.account!.transactions.filter(
    (t: { type: string; status: string }) =>
      t.type == "WITHDRAWAL" && t.status == "PENDING",
  );

  return (
    <div className="p-4">
      <h1 className="font-bold text-xl">{phone}</h1>

      <Deposit phone={phone} />

      <div className="flex items-center justify-between py-2 px-4 shadow mt-4">
        <h2 className="font-bold">Balance</h2>
        <h2>{user!.account!.balance.toString()}.00 MZN</h2>
      </div>

      <div className="flex items-center justify-between py-2 px-4 shadow mt-4">
        <h2 className="font-bold">Code</h2>
        <h2>{user!.code}</h2>
      </div>

      <div className="py-2 px-4 shadow mt-4">
        <h2 className="font-bold">VIPS</h2>
        {user!.account!.vips.length > 0 ? (
          user?.account?.vips.map(
            (v: { id: string; vip: { name: string } }) => (
              <h1 key={v.id}>{v.vip.name}</h1>
            ),
          )
        ) : (
          <h2>Inactivo</h2>
        )}
      </div>

      <div className="py-2 px-4 shadow mt-4">
        <h2 className="font-bold">Pending withdrawls</h2>
        {pendingWithdrawls.length > 0 ? (
          pendingWithdrawls.map((t) => (
            <h1 key={t.id}>Withdrawl: {t.amount.toString()}.00 MZN</h1>
          ))
        ) : (
          <h2>No pending withdrawls</h2>
        )}
      </div>

      <div className="flex items-center justify-between py-2 px-4 shadow mt-4">
        <h2 className="font-bold">Convidado por</h2>
        {user?.inviter ? (
          <Link
            className="underline text-blue-500"
            href={`/admin/manage/${user.inviter.phone}`}
          >
            {user.inviter.phone}
          </Link>
        ) : (
          <>Ninguem</>
        )}
      </div>
    </div>
  );
}
