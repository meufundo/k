import { HandHeart, Home, Tag, Wallet } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import Link from "next/link";
import { MdOutlineTaskAlt } from "react-icons/md";

interface ProtectedRoutesLayoutProps {
  children: Readonly<React.ReactNode>;
}

export default async function ProtectedRoutesLayout({
  children,
}: ProtectedRoutesLayoutProps) {
  const session = await auth();

  if (!session) {
    return redirect("/signin");
  }

  return (
    <div className="relative  min-h-screen">
      {children}
      <nav className="fixed bg-[#660ff2] bottom-0 border-t-2 text-white w-full py-2 flex items-center justify-evenly gap-4 font-bold">
        <Link
          href={"/home"}
          className="flex flex-col items-center text-center justify-center"
        >
          <Home size={32} />
          <h2>Casa</h2>
        </Link>
        <Link
          href={"/tasks"}
          className="flex flex-col items-center text-center justify-center"
        >
          <MdOutlineTaskAlt size={32} />
          <h2>Tarefa</h2>
        </Link>
        <Link
          href={"/deposit"}
          className="flex flex-col items-center text-center justify-center"
        >
          <Tag size={32} />
          <h2>Recarregar</h2>
        </Link>
        <Link
          href={"/withdrawl"}
          className="flex flex-col items-center text-center justify-center"
        >
          <Wallet size={32} />
          <h2>Retirar</h2>
        </Link>
        <Link
          href={"/me"}
          className="flex flex-col items-center text-center justify-center"
        >
          <HandHeart size={32} />
          <h2>Eu</h2>
        </Link>
      </nav>
    </div>
  );
}
