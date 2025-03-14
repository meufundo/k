"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function WithdrawlPage() {
  const [amount, setAmount] = React.useState("");
  const session = useSession();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = React.useState(false);
  const router = useRouter();

  async function onWithdrawl(): Promise<void> {
    setError(() => null);
    setIsLoading(() => true);

    const amountParsed = Number(amount);
    if (isNaN(amountParsed)) {
      setIsLoading(() => false);
      setError(() => "Saldo inválido");
      return;
    }
    if ((session.data?.user?.balance ?? 0) < amountParsed) {
      setIsLoading(() => false);
      setError(() => "Saldo insuficiente");
      return;
    }
    const response = await fetch("/api/withdrawl", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phone: session.data?.user?.phone,
        amount: amountParsed.toString(),
      }),
    });
    if (response.status != 200) {
      setIsLoading(() => false);
      const responseBody = (await response.json()) as unknown as {
        message: string;
      };
      setError(() => responseBody.message);
      return;
    }
    setIsWithdrawDialogOpen(() => true);
  }

  return (
    <div className="pt-[10vh] min-h-screen bg-[#6260db] px-2 text-lg text-white font-bold">
      <div className="shadow-2xl bg-[#d7bf69] rounded p-2 py-8">
        <h2 className="text-center text-2xl font-bold">Retirar</h2>
        <div className="flex items-center justify-between gap-4 shadow py-2 px-4 mt-12 rounded">
          <h2>Fundo disponível</h2>
          <h2 className="font-bold">{session.data?.user?.balance}.00 MZN</h2>
        </div>
        <div className="mt-12">
          {error && (
            <div className="mb-8 text-white bg-red-500 rounded p-4">
              <h3 className="font-bold text-lg">Erro</h3>
              <p>{error}</p>
            </div>
          )}
          <Input
            type="number"
            value={amount}
            minLength={1}
            maxLength={6}
            onChange={(x) => setAmount(() => x.target.value)}
            placeholder="insira o valor"
            autoFocus
          />
          <Button
            className="mt-4 w-full font-bold  bg-[#1a657a] mb-16"
            onClick={onWithdrawl}
            disabled={amount.length <= 0 || amount.length > 6 || isLoading}
          >
            Retirar
          </Button>
        </div>
      </div>

      <AlertDialog
        open={isWithdrawDialogOpen}
        onOpenChange={setIsWithdrawDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Levantamento</AlertDialogTitle>
            <AlertDialogDescription>
              O seu pedido de levantamento foi efectuado com êxito.
              <br />O valor levantado será depositado no número{" "}
              <span className="font-bold">{session.data?.user?.phone}</span> em
              breve.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.push("/")}>
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
