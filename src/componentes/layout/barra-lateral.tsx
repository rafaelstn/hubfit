"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ShieldCheck } from "lucide-react";
import { MarcaHubfit } from "@/componentes/marca";
import { ReiniciarDemo } from "./reiniciar-demo";
import { estaAtivo, navegacaoDoPerfil } from "./navegacao";
import { useDemo } from "@/estado/store";
import { cn } from "@/lib/utils";

export function BarraLateral() {
  const caminho = usePathname();
  const { estado } = useDemo();
  const itens = navegacaoDoPerfil(estado.perfil);

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-grafite-600 bg-grafite-850 lg:flex">
      <div className="flex h-20 items-center border-b border-grafite-600 px-6">
        <Link href="/dashboard" aria-label="HUBFIT, ir para o início">
          <MarcaHubfit />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {estado.perfil === "admin" ? (
          <p className="mb-3 flex items-center gap-2 px-3 text-[11px] font-semibold tracking-[0.18em] text-fumaca uppercase">
            <ShieldCheck className="size-3.5" />
            Painel administrativo
          </p>
        ) : null}

        {itens.map((item) => {
          const ativo = estaAtivo(item, caminho);
          const Icone = item.icone;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={ativo ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                ativo
                  ? "bg-damatech-500 text-white"
                  : "text-nevoa hover:bg-grafite-700 hover:text-neve",
              )}
            >
              <Icone className="size-4.5" />
              {item.rotulo}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-grafite-600 p-4">
        <ReiniciarDemo />
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-fumaca transition-colors hover:bg-grafite-700 hover:text-neve"
        >
          <LogOut className="size-4.5" />
          Sair da demonstração
        </Link>
      </div>
    </aside>
  );
}
