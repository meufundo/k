"use client";

import Image from "next/image";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PiWarningCircle } from "react-icons/pi";
import { signIn } from "next-auth/react";

const signupFormSchema = z.object({
  phone: z
    .string()
    .regex(/^(84|85|82|83|86|87)\d*$/)
    .length(9, {
      message: "O número deve conter 9 dígitos e deve ser válido",
    }),
  password: z
    .string()
    .min(6, {
      message: "A senha deve conter no mínimo 6 caracteres",
    })
    .max(16, {
      message: "A senha deve conter no máximo 16 caracteres",
    }),
  passwordTransanctional: z
    .string()
    .min(6, {
      message: "A senha deve conter no mínimo 6 caracteres",
    })
    .max(16, {
      message: "A senha deve conter no máximo 16 caracteres",
    }),
});

export default function SignupPage() {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
  });

  const [inviterCode, setInviterCode] = React.useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    setInviterCode(() => searchParams.get("code"));
  }, [searchParams]);

  const [signupError, setSignupError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(form: z.infer<typeof signupFormSchema>) {
    setIsLoading(() => true);
    setSignupError(() => null);

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phone: form.phone,
        password: form.password,
        inviterCode: inviterCode,
      }),
    });

    if (response.status !== 201) {
      setIsLoading(() => false);
      const error = ((await response.json()) as { message: string }).message;
      setSignupError(() => error);
      return;
    }

    const signInResult = await signIn("credentials", {
      phone: form.phone,
      password: form.password,
      redirect: false,
    });

    if (signInResult?.error) {
      alert(
        "Algo deu errado iniciando sessão automaticamente, tente de forma manual.",
      );
      router.push("/signin");
    }

    setIsLoading(() => false);
    router.replace("/");
  }

  return (
    <div className="max-w-[750px] mx-auto p-4 bg-[#660ff2] min-h-screen text-white">
      <div className="">
        <h3 className="text-lg text-center font-bold">
          Registração de números móveis
        </h3>
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
          {signupError && (
            <div className="my-8 bg-red-500 rounded p-4">
              <h3 className="font-bold text-lg">Erro</h3>
              <p className="font-bold">{signupError}</p>
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
                      onChange={field.onChange}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {inviterCode && (
              <div className="bg-gray-200 text-black p-4 py-2 rounded-2xl">
                <h2>{inviterCode}</h2>
              </div>
            )}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      type="password"
                      className="w-full h-12 bg-sky-200 rounded-2xl px-4 border-none text-xs text-black"
                      placeholder="por favor, introduza a senha (6-16 dígitos)"
                      {...field}
                      onChange={field.onChange}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    <div className="flex items-center gap-2 text-yellow-500 text-sm">
                      <PiWarningCircle />
                      <h2>Não esqueça a senha de acesso</h2>
                    </div>
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordTransanctional"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      type="password"
                      className="w-full h-12 bg-sky-200 rounded-2xl px-4 border-none text-xs text-black"
                      placeholder="por favor, introduza a senha da transação (6-16 dígitos)"
                      {...field}
                      onChange={field.onChange}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    <div className="flex items-center gap-2 text-yellow-500 text-sm">
                      <PiWarningCircle />
                      <h2>Não esqueça a senha da transação</h2>
                    </div>
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="flex justify-center text-black right-4">
              <Link className="underline" href="/signin">
                Login
              </Link>
            </div>

            <div>
              <button
                disabled={isLoading}
                className="w-full bg-[#7a3ae9] shadow-md px-4 py-2 rounded-2xl font-bold"
                type="submit"
              >
                {isLoading ? "Processando..." : "Register agora"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
