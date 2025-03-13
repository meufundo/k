import { MdOutlineMovie } from "react-icons/md";
import { RiVipFill } from "react-icons/ri";
import { BsFillEnvelopePaperHeartFill } from "react-icons/bs";
import { Inbox } from "lucide-react";
import Link from "next/link";

export default function TasksPage() {
  return (
    <div className="bg-[#6260db] min-h-screen px-4 pb-32 pt-8">
      <div className="bg-white rounded-lg px-2 py-4">
        <div className="flex items-center gap-4">
          <h2 className="italic font-bold text-xl">VIP &middot; 2</h2>
          <h2 className="italic font-bold">10 tarefas por dia</h2>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-8 z-10">
          <button className="rounded bg-[#c2c9f7] flex flex-col gap-2 items-center py-2 font-bold text-md text-white">
            <MdOutlineMovie size={36} />
            <h2>Movies</h2>
          </button>
          <button className="rounded bg-[#fb8b83] flex flex-col gap-2 items-center py-2 font-bold text-md text-white">
            <RiVipFill size={36} />
            <h2>VIP</h2>
          </button>
          <button className="rounded bg-[#97ee4d] flex flex-col gap-2 items-center py-2 font-bold text-md text-white">
            <BsFillEnvelopePaperHeartFill size={36} />
            <h2>Regras</h2>
          </button>
          <button className="rounded bg-[#7088b4] flex flex-col gap-2 items-center py-2 font-bold text-md text-white">
            <Inbox size={36} />
            <h2>Serviço</h2>
          </button>
        </div>
      </div>

      <div className="bg-white shadow-2xl mt-8 rounded-lg p-4 pb-12">
        <div className="pb-4 mt-4 border-b-2">
          <h1 className="font-bold text-xl">Tarefa</h1>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 font-bold">
          <Link href="/tasks/v+">
            <VipPlus />
          </Link>
          <Link href="/tasks/v1">
            <Vip1 />
          </Link>
          <Link href="/tasks/v2">
            <Vip2 />
          </Link>
          <Link href="/tasks/v3">
            <Vip3 />
          </Link>
          <Link href="/tasks/v4">
            <Vip4 />
          </Link>
          <Link href="/tasks/v5">
            <Vip5 />
          </Link>
        </div>
      </div>
    </div>
  );
}

function VipPlus() {
  return (
    <div className="bg-[#d3dee4] text-white p-2 pr-8 text-sm">
      <h2 className="italic font-bold">VIP &middot; +</h2>
      <p>Número de tarefas disponíveis:</p>
      <p>{5}</p>
    </div>
  );
}

function Vip1() {
  return (
    <div className="bg-[#70ddfc] text-white p-2 pr-8 text-sm">
      <h2 className="italic font-bold">VIP &middot; 1</h2>
      <p>Número de tarefas disponíveis:</p>
      <p>{10}</p>
    </div>
  );
}

function Vip2() {
  return (
    <div className="bg-[#25aff3] text-white p-2 pr-8 text-sm">
      <h2 className="italic font-bold">VIP &middot; 2</h2>
      <p>Número de tarefas disponíveis:</p>
      <p>{15}</p>
    </div>
  );
}

function Vip3() {
  return (
    <div className="bg-[#55ebc5] text-white p-2 pr-8 text-sm">
      <h2 className="italic font-bold">VIP &middot; 3</h2>
      <p>Número de tarefas disponíveis:</p>
      <p>{20}</p>
    </div>
  );
}

function Vip4() {
  return (
    <div className="bg-[#00c178] text-white p-2 pr-8 text-sm">
      <h2 className="italic font-bold">VIP &middot; 4</h2>
      <p>Número de tarefas disponíveis:</p>
      <p>{25}</p>
    </div>
  );
}

function Vip5() {
  return (
    <div className="bg-[#69ad00] text-white p-2 pr-8 text-sm">
      <h2 className="italic font-bold">VIP &middot; 5</h2>
      <p>Número de tarefas disponíveis:</p>
      <p>{30}</p>
    </div>
  );
}
