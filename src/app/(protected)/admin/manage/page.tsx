import { listAllUsersPhoneAndBalance } from "@/prisma.config";
import Link from "next/link";

export default async function ManageUsersPage() {
  const xs = await listAllUsersPhoneAndBalance();
  return (
    <div className="mt-8 px-4">
      <h2 className="text-center font-bold text-xl">All users list</h2>

      <div className="space-y-2 mt-8">
        {xs.map((user) => (
          <Link
            href={`/admin/manage/${user.phone}`}
            className="flex items-center justify-between py-2 px-4 shadow"
            key={user.phone}
          >
            <div>
              <p>{user.phone}</p>
            </div>
            <div>
              <p>{user.balance.toString()}.00 MZN</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
