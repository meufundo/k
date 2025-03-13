import Link from "next/link";

const adminFunctions = [
  { name: "Manage users", href: "/admin/manage" },
  { name: "Withdraws", href: "/admin/withdraws" },
];

export default function AdminPage() {
  return (
    <div className="p-4 mt-8">
      <div>
        <h2 className="font-bold text-lg text-center">Admin Panel</h2>
      </div>
      <div className="mt-8 grid gap-4">
        {adminFunctions.map((af) => (
          <AdminFunction key={af.name} name={af.name} href={af.href} />
        ))}
      </div>
    </div>
  );
}

function AdminFunction({ name, href }: { name: string; href: string }) {
  return (
    <Link className="shadow p-4" href={href}>
      {name}
    </Link>
  );
}
