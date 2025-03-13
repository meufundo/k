"use client";

import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function Vip0() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="shadow relative py-2 text-xl font-bold bg-white">
        <IoIosArrowBack
          onClick={() => router.back()}
          className="absolute top-1/2 -translate-y-1/2"
        />
        <h2 className="text-center">Task</h2>
      </div>
      <div className="px-2 bg-white pt-4 pb-12 mt-8">
        <h2 className="italic font-bold">VIP &middot; +</h2>
        <Tasks />
      </div>
    </div>
  );
}

const tasks = [
  {
    image:
      "https://raw.githubusercontent.com/meufundo/files/refs/heads/main/twitter-nieuw-scaled.webp",
    name: "VIP+",
    value: 7,
  },
  {
    image:
      "https://raw.githubusercontent.com/meufundo/files/refs/heads/main/facebook-social-media-logo-icon-free-png.webp",
    name: "VIP+",
    value: 7,
  },
  {
    image:
      "https://raw.githubusercontent.com/meufundo/files/refs/heads/main/KOnzO40Evm.png",
    name: "VIP+",
    value: 7,
  },
  {
    image:
      "https://raw.githubusercontent.com/meufundo/files/refs/heads/main/twitter-nieuw-scaled.webp",
    name: "VIP+",
    value: 7,
  },
  {
    image:
      "https://raw.githubusercontent.com/meufundo/files/refs/heads/main/facebook-social-media-logo-icon-free-png.webp",
    name: "VIP+",
    value: 7,
  },
];

function Tasks() {
  return (
    <div className="space-y-4  mt-8">
      {tasks.map((t) => (
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
      <div className="flex items-center justify-between pr-2 shadow rounded-full shadow-ring text-sm">
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
