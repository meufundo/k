import Image from "next/image";

interface VIP {
  name: string;
  price: number;
  dailyGain: number;
}

const vips: VIP[] = [
  { name: "VIP+", price: 500, dailyGain: 35 },
  { name: "VIP1", price: 1000, dailyGain: 60 },
  { name: "VIP2", price: 5000, dailyGain: 15 * 14 },
  { name: "VIP3", price: 10000, dailyGain: 20 * 24 },
  { name: "VIP4", price: 30000, dailyGain: 25 * 48 },
  { name: "VIP5", price: 60000, dailyGain: 30 * 93 },
];
export { vips };

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

export function VipCard({ vip }: { vip: VIP }) {
  return (
    <div className="shadow p-4 py-2 rounded  bg-[#d7bf69]">
      <div className="flex items-center gap-4">
        <div>
          <Image
            alt=""
            width={85}
            height={85}
            className="rounded"
            src="https://raw.githubusercontent.com/meufundo/files/refs/heads/main/328740526_562186155960460_7468924947968940764_n.jpg"
          />
        </div>
        <div>
          <h2 className="text-md font-bold">{vip.name}</h2>
          <p>Preço: {vip.price} MZN</p>
          <p>Renda diária: {vip.dailyGain}.00 MZN</p>
          <p>Renda mensal: {vip.dailyGain * 30}.00 MZN</p>
          <p>Renda anual: {vip.dailyGain * 30 * 12}.00 MZN</p>
        </div>
      </div>
    </div>
  );
}
