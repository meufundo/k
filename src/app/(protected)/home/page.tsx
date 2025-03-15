"use client";

import { ExternalLink, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { VipCard, vips } from "../vips/page";

export default function HomePage() {
  const session = useSession();

  async function handleShareLink() {
    await navigator.clipboard.writeText(
      `https://kampar.vercel.pp/signup?code=${session.data?.user?.code}`,
    );
    if (navigator.share) {
      navigator.share({
        url: `https://kampar.vercel.pp/signup?code=${session.data?.user?.code}`,
      });
    }
  }

  return (
    <div className="bg-[#6260db] min-h-screen px-4 pt-8 pb-32">
      <div className="text-sm p-4 rounded bg-[#7071e1] shadow-xl font-bold flex flex-col items-center text-justify">
        <div className="flex  gap-2">
          <Image
            width={68}
            height={24}
            alt="image"
            src="https://raw.githubusercontent.com/meufundo/files/refs/heads/main/328740526_562186155960460_7468924947968940764_n-removebg-preview.png"
          />
          <p className="mt-4">
            Convidar amigos para ganhar dinheiro juntos e recebe facilmente
            recompensas por convites.
          </p>
        </div>
        <p>esta é a sua maneira de ganhar dinheiro rapidamente.</p>
        <button
          onClick={handleShareLink}
          className="py-2 px-4 text-white bg-blue-900 mt-4 text-xs rounded-2xl"
        >
          Convidar amigos para ganhar dinheiro juntos
        </button>
      </div>

      <div className="mt-8 flex items-center justify-between px-4">
        <Link
          className="flex items-center gap-2 px-8 py-1 bg-[#dadcf5] text-[#8a82d1] border-2 border-[#cadcf5]  font-bold rounded-2xl"
          href={"/me"}
        >
          <User />
          Eu
        </Link>
        <button
          className="flex items-center gap-2 px-8 py-1 bg-[#dadcf5] text-[#8a82d1] border-2 border-[#cadcf5]  font-bold rounded-2xl"
          onClick={handleShareLink}
        >
          <ExternalLink />
          Invita
        </button>
      </div>

      <div className="bg-white p-2 py-4 mt-12 rounded-xl">
        <Vips />
      </div>

      <div className="bg-white p-2 py-4 mt-12 rounded-xl">
        <div className="border-b-2 mt-1">
          <h2 className="font-bold text-blue-800">tarefas recomendadas</h2>
        </div>

        <Tasks />
      </div>
    </div>
  );
}

const tasks = [
  {
    image:
      "https://raw.githubusercontent.com/meufundo/files/refs/heads/main/twitter-nieuw-scaled.webp",
    name: "VIP5",
    value: 44,
  },
  {
    image:
      "https://raw.githubusercontent.com/meufundo/files/refs/heads/main/facebook-social-media-logo-icon-free-png.webp",
    name: "VIP5",
    value: 44,
  },
  {
    image:
      "https://raw.githubusercontent.com/meufundo/files/refs/heads/main/KOnzO40Evm.png",
    name: "VIP5",
    value: 44,
  },
  {
    image:
      "https://raw.githubusercontent.com/meufundo/files/refs/heads/main/images.jpeg",
    name: "VIP5",
    value: 44,
  },
];

function Tasks() {
  return (
    <div className="space-y-4  mt-8">
      {tasks
        .concat(
          tasks.map(function (v) {
            return { image: v.image, name: "VIP4", value: 32 };
          }),
        )
        .map((t) => (
          <Task
            key={Math.random()}
            image={t.image}
            vipName={t.name}
            value={t.value}
          />
        ))}
    </div>
  );
}

function Task({
  image,
  vipName,
  value,
}: {
  image: string;
  vipName: string;
  value: number;
}) {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
    setTimeout(() => setShow(false), 2000); // Auto-close after 3 seconds
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className=""
          >
            <Alert className="bg-green-500 text-white absolute  left-1/2 -translate-x-1/2">
              <AlertTitle>Sucesso</AlertTitle>
              Tarefa completa!
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center justify-between pr-2 shadow rounded-full text-sm">
        <div className="flex gap-2 items-center">
          <Image
            src={image}
            width={50}
            height={50}
            alt=""
            className="rounded-full"
          />
          <div className="">
            <div className="flex gap-2">
              <p>{vipName}</p>
              <div className="px-1 bg-orange-600 text-white rounded flex items-center justify-center mt-[2px]">
                <p className="text-xs">{vipName}</p>
              </div>
            </div>
            <p className="font-bold text-blue-800">{value}.00 MZN</p>
          </div>
        </div>
        <div>
          <button
            onClick={handleClick}
            className="px-4 bg-blue-800 text-white rounded-2xl"
          >
            Pegue na tarefa
          </button>
        </div>
      </div>
    </div>
  );
}

export function Vips() {
  return (
    <>
      <h2 className="font-bold">Vips</h2>
      <div className="space-y-2 mt-4">
        {vips.map((vip) => (
          <VipCard key={vip.name} vip={vip} />
        ))}
      </div>
    </>
  );
}
