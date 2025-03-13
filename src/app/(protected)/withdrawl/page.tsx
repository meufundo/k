"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function WithdrawlPage() {
  const [amount, setAmount] = React.useState("");

  async function onWithdrawl(): Promise<void> {}

  return (
    <>
      <div className="pt-[10vh] px-2 text-lg text-white font-bold">
        <div className="shadow-2xl bg-[#d7bf69] rounded p-2 py-8">
          <h2 className="text-center text-2xl font-bold">Retirar</h2>
          <div className="flex items-center justify-between gap-4 shadow py-2 px-4 mt-12 rounded">
            <h2>Fundo disponível</h2>
            <h2 className="font-bold">{500}.00 MZN</h2>
          </div>
          <div className="mt-12">
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
              disabled={amount.length <= 0 || amount.length > 6}
            >
              Retirar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
