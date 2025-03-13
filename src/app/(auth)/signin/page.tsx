"use client";

import Image from "next/image";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";

const loginFormSchema = z.object({
  phone: z
    .string()
    .regex(/^(84|85|82|83|86|87)\d*$/)
    .length(9, {
      message: "O número deve conter 9 dígitos e deve ser válido",
    }),
  pass: z
    .string()
    .min(6, {
      message: "A senha deve conter no mínimo 6 caracteres",
    })
    .max(16, {
      message: "A senha deve conter no máximo 16 caracteres",
    }),
});

export default function SigninPage() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const [loginError, setLoginError] = React.useState<string | undefined>(
    undefined,
  );
  async function onSubmit(form: z.infer<typeof loginFormSchema>) {
    setIsLoading(() => true);
    setLoginError(() => undefined);
    const result = await signIn("credentials", {
      phone: form.phone,
      password: form.pass,
      redirect: false,
    });
    setIsLoading(() => false);
    if (result?.error) {
      setLoginError(
        () =>
          "As credentials inseridas são inválidas, verifique e tente novamente.",
      );
      return;
    }
    router.replace("/");
  }

  return (
    <div className="max-w-[750px] mx-auto p-4 bg-[#660ff2] min-h-screen text-white">
      <div className="">
        <h3 className="text-lg text-center font-bold">Entrar na conta</h3>
      </div>
      <div className="p-2 py-8 shadow-lg bg-white rounded relative mt-[15vh]">
        <Image
          alt=""
          width={85}
          height={85}
          className="rounded-full absolute left-1/2 -translate-x-1/2 top-[-48] border-2 border-gray-500"
          src="https://raw.githubusercontent.com/meufundo/files/refs/heads/main/328740526_562186155960460_7468924947968940764_n.jpg"
        />

        <Form {...form}>
          {loginError && (
            <div className="my-8 bg-red-500 rounded p-4">
              <h3 className="font-bold text-lg">Erro</h3>
              <p className="font-bold">{loginError}</p>
            </div>
          )}

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-12"
          >
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      type="text"
                      className="w-full h-12 bg-sky-200 rounded-2xl px-4 border-none text-xs text-black"
                      placeholder="por favor, introduza o número de telefone móvel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pass"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      type="password"
                      className="w-full h-12 bg-sky-200 rounded-2xl px-4 border-none text-xs text-black"
                      placeholder="por favor, introduza a senha (6-16 dígitos)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <button
                disabled={isLoading}
                className="w-full bg-[#7a3ae9] shadow-md px-4 py-2 rounded-2xl font-bold"
                type="submit"
              >
                {isLoading ? "Processando..." : "Signar"}
              </button>
            </div>

            <div className="flex justify-center text-black right-4">
              <Link className="underline" href="/signup">
                Para register
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
