"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Deposit({ phone }: { phone: string }) {
  const [balance, setBalance] = React.useState("");

  async function makeDeposit() {
    const response = await fetch("/api/deposit", {
      method: "POST",
      headers: {
        ContentType: "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        amount: balance,
      }),
    });

    alert((await response.json()).message);
  }

  return (
    <div className="flex items-center gap-4 mt-8">
      <Input
        type="number"
        value={balance}
        onChange={(x) => setBalance(() => x.target.value)}
      />
      <Button disabled={balance.length < 1} onClick={makeDeposit}>
        Deposit
      </Button>
    </div>
  );
}
