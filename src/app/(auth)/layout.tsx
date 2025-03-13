import * as React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

interface ProtectedRoutesLayoutProps {
  children: Readonly<React.ReactNode>;
}

export default async function ProtectedRoutesLayout({
  children,
}: ProtectedRoutesLayoutProps) {
  const session = await auth();

  if (session) {
    return redirect("/home");
  }

  return <div>{children}</div>;
}
