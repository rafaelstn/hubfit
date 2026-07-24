"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { MarcaHubfit } from "@/componentes/marca";
import { Botao } from "@/componentes/ui/botao";
import { useDemo } from "@/estado/store";
import { cn } from "@/lib/utils";

const SECOES = [
  { href: "#problema", rotulo: "O problema" },
  { href: "#solucao", rotulo: "A solução" },
  { href: "#como-funciona", rotulo: "Como funciona" },
  { href: "#demonstracao", rotulo: "Demonstração" },
  { href: "#fase-1", rotulo: "Fase 1" },
  { href: "#planos", rotulo: "Planos" },
];

export function NavApresentacao() {
  const [aberto, setAberto] = useState(false);
  const { definirPerfil } = useDemo();
  const router = useRouter();

  function abrirDemo() {
    definirPerfil("participante");
    router.push("/dashboard");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-grafite-600 bg-grafite-900/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="#topo" aria-label="HUBFIT, ir para o topo">
          <MarcaHubfit />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {SECOES.map((secao) => (
            <a
              key={secao.href}
              href={secao.href}
              className="text-sm font-medium text-nevoa transition-colors hover:text-neve"
            >
              {secao.rotulo}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Botao onClick={abrirDemo} tamanho="sm" className="hidden sm:inline-flex">
            Ver demonstração
          </Botao>
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="flex size-10 items-center justify-center rounded-xl border border-grafite-600 text-neve lg:hidden"
          >
            {aberto ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-grafite-600 transition-[max-height] duration-300 lg:hidden",
          aberto ? "max-h-96" : "max-h-0 border-t-0",
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {SECOES.map((secao) => (
            <a
              key={secao.href}
              href={secao.href}
              onClick={() => setAberto(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-nevoa hover:bg-grafite-800 hover:text-neve"
            >
              {secao.rotulo}
            </a>
          ))}
          <Botao onClick={abrirDemo} largura="cheia" className="mt-2">
            Ver demonstração
          </Botao>
        </nav>
      </div>
    </header>
  );
}
