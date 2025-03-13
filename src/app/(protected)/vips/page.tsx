import Image from "next/image";
import { Button } from "@/components/ui/button";

interface VIP {
  name: string;
  price: number;
  dailyGain: number;
}

const vips: VIP[] = [
  { name: "VIP1", price: 500, dailyGain: 120 },
  { name: "VIP2", price: 1000, dailyGain: 240 },
  { name: "VIP3", price: 5000, dailyGain: 480 },
  { name: "VIP4", price: 10000, dailyGain: 750 },
  { name: "VIP5", price: 20000, dailyGain: 1500 },
  { name: "VIP6", price: 50000, dailyGain: 3500 },
];

export default function VipsPage() {
  return (
    <div className="bg-[#660ff2] p-4">
      <div className="flex items-center justify-between gap-4 shadow py-4 px-4 my-8 rounded bg-white">
        <h2>Fundo disponível</h2>
        <h2 className="font-bold">{500}.00 MZN</h2>
      </div>
      <div className="space-y-2">
        {vips.map((vip) => (
          <VipCard key={vip.name} vip={vip} />
        ))}
      </div>
    </div>
  );
}

function VipCard({ vip }: { vip: VIP }) {
  return (
    <div className="shadow p-4 rounded  bg-[#d7bf69]">
      <div className="flex items-center justify-between">
        <div className="flex-auto">
          <Image
            alt=""
            width={85}
            height={85}
            className="rounded"
            src="https://raw.githubusercontent.com/meufundo/files/refs/heads/main/328740526_562186155960460_7468924947968940764_n.jpg"
          />
        </div>
        <div className="flex-auto">
          <h2 className="text-lg font-bold">{vip.name}</h2>
          <p>Preço: {vip.price} MZN</p>
          <p>Renda diária: {vip.dailyGain}.00 MZN</p>
          <p>Renda mensal: {vip.dailyGain * 30}.00 MZN</p>
        </div>
      </div>
      <div className="w-full mt-4">
        <Button className="w-full bg-[#1a657a] rounded text-white py-2">
          Investir
        </Button>
      </div>
    </div>
  );
}
