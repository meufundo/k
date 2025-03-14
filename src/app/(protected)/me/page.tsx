import Image from "next/image";
import { Mona_Sans } from "next/font/google";
import { Crown, Settings, Tag, Wallet } from "lucide-react";
import Link from "next/link";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export default function HomePage() {
  return (
    <div className={`${monaSans.variable} bg-[#6260db] min-h-screen pb-32`}>
      <div className="p-2">
        <div className="bg-[#d7bf69] text-white mt-4 p-2 rounded relative border-2 border-white">
          <div className="absolute right-2">
            <Settings size={32} />
          </div>
          <div className="mt-8 flex gap-4">
            <div>
              <Image
                alt=""
                width={85}
                height={85}
                className="rounded-full"
                src="https://raw.githubusercontent.com/meufundo/files/refs/heads/main/328740526_562186155960460_7468924947968940764_n.jpg"
              />
            </div>
            <div className="">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold mt-2">8********</h2>
                <h2 className="font-bold italic mt-2 [text-shadow:2px_2px_2px_rgb(59,130,246)]">
                  VIP&middot;0
                </h2>
              </div>
              <h2 className="font-bold text-[14px]">
                Data de Expiração: Permanentemente válido
              </h2>
            </div>
          </div>
          <div className="mt-8 border-t border-t-white" />
          <div className="flex justify-evenly mt-4 pt-4 pb-8 font-bold text-center text-sm">
            <Link href={"/vips"} className="flex flex-col items-center gap-2">
              <Crown size={52} />
              <h1>VIP</h1>
            </Link>
            <Link
              href={"/deposit"}
              className="flex flex-col items-center gap-2"
            >
              <Tag size={52} />
              <h1>
                Recarrega de <br /> equilibrio
              </h1>
            </Link>
            <Link
              href={"/withdrawl"}
              className="flex flex-col items-center gap-2"
            >
              <Wallet size={52} />
              <h1>Retirar</h1>
            </Link>
          </div>
        </div>

        <div className="mt-8 p-4 border-[12px] border-green-600 bg-[#351793] rounded">
          <div className="grid grid-cols-3 grid-rows-3">
            {Array.from([
              { name: "comulativas", value: 0.0 },
              { name: "Equilibrio", value: 0.0 },
              { name: "Fundo", value: 0.0 },
              //
              { name: "Tarefa coletavel", value: 0.0 },
              { name: "Coletavel", value: 0.0 },
              { name: "Hoje", value: 0.0 },
              //
              { name: "Ontem", value: 0.0 },
              { name: "Semana", value: 0.0 },
              { name: "mes", value: 0.0 },
            ]).map((x) => (
              <Box key={Math.random()} name={x.name} value={x.value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Box({ name, value }: { name: string; value: number }) {
  return (
    <div className="rounded-lg flex flex-col justify-between gap-2 bg-white text-center p-2 font-bold mb-[1px]">
      <div>
        <h1>{name}</h1>
      </div>
      <div>
        <h1 className="text-[#d6844c]">{value}</h1>
      </div>
    </div>
  );
}
