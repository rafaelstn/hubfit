"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Dumbbell,
  LayoutDashboard,
  Medal,
  RotateCcw,
  Smartphone,
  Target,
  Trophy,
  Users,
  Flame,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import { MarcaHubfit } from "@/componentes/marca";
import { Botao } from "@/componentes/ui/botao";
import { cn } from "@/lib/utils";

interface TelaPreview {
  rotulo: string;
  href: string;
  icone: LucideIcon;
}

const TELAS_PARTICIPANTE: TelaPreview[] = [
  { rotulo: "Início", href: "/dashboard", icone: LayoutDashboard },
  { rotulo: "Desafios", href: "/desafios", icone: Target },
  { rotulo: "Registrar treino", href: "/registrar-treino", icone: Dumbbell },
  { rotulo: "Ranking", href: "/ranking", icone: Trophy },
  { rotulo: "Perfil", href: "/perfil", icone: Medal },
];

const TELAS_ADMIN: TelaPreview[] = [
  { rotulo: "Visão geral", href: "/admin", icone: Flame },
  { rotulo: "Desafios", href: "/admin/desafios", icone: Target },
  { rotulo: "Participantes", href: "/admin/participantes", icone: Users },
  { rotulo: "Patrocinadores", href: "/admin/patrocinadores", icone: Handshake },
];

export default function PaginaCelular() {
  const [perfil, setPerfil] = useState<"participante" | "admin">("participante");
  const [href, setHref] = useState("/dashboard");
  const [recarga, setRecarga] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const telas = perfil === "admin" ? TELAS_ADMIN : TELAS_PARTICIPANTE;

  // Ao trocar de perfil, leva para a primeira tela daquela experiência.
  useEffect(() => {
    setHref(perfil === "admin" ? "/admin" : "/dashboard");
  }, [perfil]);

  function recarregar() {
    setRecarga((v) => v + 1);
  }

  return (
    <div className="min-h-dvh bg-grafite-900">
      <header className="sticky top-0 z-30 border-b border-grafite-600 bg-grafite-900/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <Link href="/" aria-label="HUBFIT, ir para a apresentação">
            <MarcaHubfit />
          </Link>
          <Botao asChild variante="contorno" tamanho="sm">
            <Link href="/dashboard">
              Abrir em tela cheia
              <ArrowUpRight />
            </Link>
          </Botao>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-lima-400/30 bg-lima-400/12 px-3 py-1 text-xs font-semibold text-lima-300">
            <Smartphone className="size-3.5" />
            Pré-visualização mobile
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-neve sm:text-4xl">
            Veja como fica no app do celular
          </h1>
          <p className="mt-3 text-nevoa">
            Esta é a experiência real do aplicativo em um celular, exibida aqui dentro de uma moldura
            para você conferir pelo computador. Use os botões ao lado para navegar pelas telas.
          </p>
        </div>

        {/* No próprio celular a moldura não faz sentido: abre as telas em tela cheia. */}
        <div className="mt-8 space-y-3 lg:hidden">
          <div className="flex rounded-xl border border-grafite-600 bg-grafite-800 p-1">
            {(["participante", "admin"] as const).map((opcao) => (
              <button
                key={opcao}
                type="button"
                onClick={() => setPerfil(opcao)}
                className={cn(
                  "flex-1 rounded-lg px-3 py-2 text-sm font-semibold capitalize transition-colors",
                  perfil === opcao
                    ? "bg-damatech-500 text-white"
                    : "text-fumaca hover:bg-grafite-700 hover:text-neve",
                )}
              >
                {opcao}
              </button>
            ))}
          </div>
          {telas.map((tela) => {
            const Icone = tela.icone;
            return (
              <Botao key={tela.href} asChild variante="contorno" largura="cheia" tamanho="lg">
                <Link href={tela.href}>
                  <Icone />
                  {tela.rotulo}
                </Link>
              </Botao>
            );
          })}
          <p className="rounded-xl border border-damatech-500/25 bg-damatech-500/8 px-4 py-3 text-sm text-nevoa">
            Você está no celular: as telas abrem em tamanho real, exatamente como no aplicativo.
          </p>
        </div>

        {/* No computador, a experiência aparece dentro de uma moldura de celular. */}
        <div className="mt-10 hidden gap-10 lg:grid lg:grid-cols-[320px_1fr] lg:items-start">
          {/* Painel de controle */}
          <div className="space-y-5">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wide text-fumaca uppercase">
                Visualizar como
              </p>
              <div className="flex rounded-xl border border-grafite-600 bg-grafite-800 p-1">
                {(["participante", "admin"] as const).map((opcao) => (
                  <button
                    key={opcao}
                    type="button"
                    onClick={() => setPerfil(opcao)}
                    className={cn(
                      "flex-1 rounded-lg px-3 py-2 text-sm font-semibold capitalize transition-colors",
                      perfil === opcao
                        ? "bg-damatech-500 text-white"
                        : "text-fumaca hover:bg-grafite-700 hover:text-neve",
                    )}
                  >
                    {opcao}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold tracking-wide text-fumaca uppercase">
                Telas do app
              </p>
              <div className="grid gap-2">
                {telas.map((tela) => {
                  const ativa = href === tela.href;
                  const Icone = tela.icone;
                  return (
                    <button
                      key={tela.href}
                      type="button"
                      onClick={() => setHref(tela.href)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                        ativa
                          ? "border-lima-400 bg-lima-400/10 text-lima-300"
                          : "border-grafite-600 bg-grafite-850 text-nevoa hover:border-grafite-500",
                      )}
                    >
                      <Icone className="size-4.5" />
                      {tela.rotulo}
                    </button>
                  );
                })}
              </div>
            </div>

            <Botao variante="suave" tamanho="sm" largura="cheia" onClick={recarregar}>
              <RotateCcw />
              Recarregar tela
            </Botao>

            <p className="rounded-xl border border-damatech-500/25 bg-damatech-500/8 px-4 py-3 text-sm text-nevoa">
              A pré-visualização usa a largura de um celular, então a interface aparece exatamente
              como no aplicativo: menu inferior, cards em coluna e botões grandes para o toque.
            </p>
          </div>

          {/* Moldura de celular com o app dentro */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 -z-10 translate-y-6 rounded-[3rem] bg-lima-400/8 blur-[80px]" />
              <div className="relative w-[300px] rounded-[3rem] border-[10px] border-grafite-700 bg-grafite-950 p-2 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)] sm:w-[340px]">
                <div className="absolute top-4 left-1/2 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-grafite-950" />
                <div className="relative h-[620px] overflow-hidden rounded-[2.3rem] bg-grafite-900 sm:h-[680px]">
                  <iframe
                    key={`${href}-${recarga}`}
                    ref={iframeRef}
                    src={href}
                    title="Pré-visualização do app HUBFIT no celular"
                    className="h-full w-full border-0"
                  />
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-fumaca">
                Toque e navegue dentro da moldura, como no celular.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
