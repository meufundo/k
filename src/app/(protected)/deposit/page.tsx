import * as React from "react";

export default function WithdrawlPage() {
  return (
    <>
      <div className="pt-[10vh] min-h-screen pb-32 px-2 text-lg  bg-[#660ff2] text-white font-bold">
        <div className="shadow-2xl bg-[#d7bf69] rounded p-2 py-8">
          <h2 className="text-center text-2xl font-bold">Recarregar</h2>
          <div className="shadow py-2 px-4 mt-12 rounded">
            <h2 className="text-xl font-bold">Contas officiais</h2>
            <div className="flex items-center justify-between rounded mt-4">
              <h2>Mpesa</h2>
              <h2>87487687</h2>
              <h2>Carlos Mauro</h2>
            </div>
            <div className="flex items-center justify-between rounded mt-2">
              <h2>Emola</h2>
              <h2>87487687</h2>
              <h2>Carlos Mauro</h2>
            </div>
          </div>
          <h2 className="mt-8 text-sm">
            NB: Todos os depósitos devem ser efectuados nas contas officiais e
            com o número usado para criar a conta.
          </h2>
        </div>
      </div>
    </>
  );
}
