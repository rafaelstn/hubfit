"use client";

import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import type { Perfil } from "@/dados/tipos";
import { useDemo } from "@/estado/store";
import { cn } from "@/lib/utils";

const OPCOES: { valor: Perfil; rotulo: string; destino: string }[] = [
  { valor: "participante", rotulo: "Participante", destino: "/dashboard" },
  { valor: "admin", rotulo: "Administrador", destino: "/admin" },
];

export function SeletorPerfil({ compacto = false }: { compacto?: boolean }) {
  const { estado, definirPerfil } = useDemo();
  const router = useRouter();

  function trocar(opcao: (typeof OPCOES)[number]) {
    definirPerfil(opcao.valor);
    router.push(opcao.destino);
  }

  return (
    <div className="flex items-center gap-2">
      {!compacto ? (
        <span className="hidden items-center gap-1.5 text-xs font-medium tracking-wide text-fumaca uppercase lg:flex">
          <Eye className="size-3.5" />
          Visualizar como
        </span>
      ) : null}
      <div
        className="flex rounded-xl border border-grafite-600 bg-grafite-800 p-1"
        role="group"
        aria-label="Visualizar como"
      >
        {OPCOES.map((opcao) => {
          const ativo = estado.perfil === opcao.valor;
          return (
            <button
              key={opcao.valor}
              type="button"
              onClick={() => trocar(opcao)}
              aria-pressed={ativo}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                ativo
                  ? "bg-damatech-500 text-white"
                  : "text-fumaca hover:bg-grafite-700 hover:text-neve",
              )}
            >
              {opcao.rotulo}
            </button>
          );
        })}
      </div>
    </div>
  );
}
