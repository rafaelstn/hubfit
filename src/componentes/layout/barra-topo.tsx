"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Bell, LogOut, RotateCcw, Search, UserRound } from "lucide-react";
import { toast } from "sonner";
import { MarcaHubfit } from "@/componentes/marca";
import { Avatar } from "@/componentes/ui/basicos";
import { Botao } from "@/componentes/ui/botao";
import { DialogoConfirmacao } from "@/componentes/ui/dialogo";
import { useDemo } from "@/estado/store";
import { usuarioDe } from "@/estado/seletores";
import { SeletorPerfil } from "./seletor-perfil";
import { cn } from "@/lib/utils";

const NOTIFICACOES = [
  {
    id: "n-1",
    titulo: "Você subiu para a 2ª posição",
    detalhe: "O ranking foi atualizado depois do último treino.",
    quando: "há 2 horas",
  },
  {
    id: "n-2",
    titulo: "Faltam 7 treinos para bater a meta",
    detalhe: "O desafio Força e Constância termina em 12 dias.",
    quando: "hoje",
  },
  {
    id: "n-3",
    titulo: "Novo benefício da NutriForce",
    detalhe: "Cupom de 15% liberado para participantes ativos.",
    quando: "ontem",
  },
];

export function BarraTopo() {
  const { estado, reiniciarDemo } = useDemo();
  const usuario = usuarioDe(estado);
  const caminho = usePathname();
  const router = useRouter();
  const [confirmarReinicio, setConfirmarReinicio] = useState(false);

  function reiniciar() {
    reiniciarDemo();
    toast.success("Demonstração reiniciada", {
      description: "Os dados voltaram ao estado original.",
    });
    router.push("/dashboard");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-grafite-600 bg-grafite-900/85 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:h-20">
        <Link href="/dashboard" className="lg:hidden" aria-label="HUBFIT, ir para o início">
          <MarcaHubfit assinatura={false} />
        </Link>

        <div className="relative hidden max-w-sm flex-1 lg:block">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fumaca" />
          <input
            type="search"
            placeholder="Buscar desafio, participante ou marca"
            aria-label="Buscar na demonstração"
            className="h-10 w-full rounded-xl border border-grafite-600 bg-grafite-800 pr-3 pl-9 text-sm text-neve placeholder:text-fumaca outline-none focus:border-damatech-500"
            onKeyDown={(evento) => {
              if (evento.key !== "Enter") return;
              const termo = (evento.target as HTMLInputElement).value.trim();
              if (!termo) return;
              toast("Busca da demonstração", {
                description: `Na versão oficial, "${termo}" traria resultados de desafios, participantes e marcas.`,
              });
            }}
          />
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <SeletorPerfil />
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Botao variante="fantasma" tamanho="icone" aria-label="Notificações" className="relative">
                <Bell />
                <span className="absolute top-2 right-2 size-2 rounded-full bg-lima-400" />
              </Botao>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={8}
                className="z-50 w-80 rounded-xl border border-grafite-600 bg-grafite-850 p-2 shadow-2xl"
              >
                <p className="px-3 py-2 text-xs font-semibold tracking-wide text-fumaca uppercase">
                  Notificações
                </p>
                {NOTIFICACOES.map((notificacao) => (
                  <div
                    key={notificacao.id}
                    className="rounded-lg px-3 py-2.5 transition-colors hover:bg-grafite-700"
                  >
                    <p className="text-sm font-medium text-neve">{notificacao.titulo}</p>
                    <p className="mt-0.5 text-xs text-fumaca">{notificacao.detalhe}</p>
                    <p className="mt-1 text-[11px] text-fumaca">{notificacao.quando}</p>
                  </div>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-grafite-600 bg-grafite-800 p-1 pr-2 transition-colors hover:border-grafite-500"
                aria-label="Menu do usuário"
              >
                <Avatar nome={usuario.nome} gradiente={usuario.gradiente} tamanho="sm" />
                <span className="hidden text-sm font-medium text-neve sm:block">
                  {usuario.nome.split(" ")[0]}
                </span>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={8}
                className="z-50 w-60 rounded-xl border border-grafite-600 bg-grafite-850 p-2 shadow-2xl"
              >
                <div className="flex items-center gap-3 px-3 py-2">
                  <Avatar nome={usuario.nome} gradiente={usuario.gradiente} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-neve">{usuario.nome}</p>
                    <p className="truncate text-xs text-fumaca">Nível {usuario.nivel}</p>
                  </div>
                </div>
                <div className="my-1 h-px bg-grafite-600" />
                <DropdownMenu.Item asChild>
                  <Link
                    href="/perfil"
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-nevoa outline-none",
                      "hover:bg-grafite-700 hover:text-neve focus:bg-grafite-700",
                    )}
                  >
                    <UserRound className="size-4" />
                    Meu perfil
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => setConfirmarReinicio(true)}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-nevoa outline-none hover:bg-grafite-700 hover:text-neve focus:bg-grafite-700"
                >
                  <RotateCcw className="size-4" />
                  Reiniciar demonstração
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link
                    href="/"
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-nevoa outline-none hover:bg-grafite-700 hover:text-neve focus:bg-grafite-700"
                  >
                    <LogOut className="size-4" />
                    Sair da demonstração
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-grafite-600 px-4 py-2 sm:hidden">
        <span className="text-[11px] font-semibold tracking-wide text-fumaca uppercase">
          Visualizar como
        </span>
        <SeletorPerfil compacto />
      </div>

      {caminho.startsWith("/admin") ? (
        <div className="border-t border-grafite-600 bg-damatech-500/8 px-4 py-2 text-center text-xs text-damatech-300 sm:px-6">
          Você está visualizando a experiência do administrador da operação.
        </div>
      ) : null}

      <DialogoConfirmacao
        aberto={confirmarReinicio}
        aoMudar={setConfirmarReinicio}
        titulo="Reiniciar demonstração"
        mensagem="Os treinos registrados, os desafios criados e as alterações feitas nesta sessão serão apagados. Os dados voltam ao estado inicial."
        rotuloConfirmar="Reiniciar agora"
        aoConfirmar={reiniciar}
      />
    </header>
  );
}
