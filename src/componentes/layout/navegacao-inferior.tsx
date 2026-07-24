"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { useDemo } from "@/estado/store";
import { estaAtivo, navegacaoDoPerfil } from "./navegacao";
import { cn } from "@/lib/utils";

export function NavegacaoInferior() {
  const caminho = usePathname();
  const { estado } = useDemo();
  const ehParticipante = estado.perfil === "participante";
  const itens = navegacaoDoPerfil(estado.perfil).filter((item) => !item.soDesktop);

  // No perfil do participante, o registro de treino vira o botão central de ação.
  const principais = ehParticipante
    ? itens.filter((item) => item.href !== "/registrar-treino")
    : itens;
  const metade = Math.ceil(principais.length / 2);
  const esquerda = ehParticipante ? principais.slice(0, metade) : principais;
  const direita = ehParticipante ? principais.slice(metade) : [];

  function renderizar(item: (typeof itens)[number]) {
    const ativo = estaAtivo(item, caminho);
    const Icone = item.icone;
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={ativo ? "page" : undefined}
        className={cn(
          "flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors",
          ativo ? "text-lima-400" : "text-fumaca hover:text-nevoa",
        )}
      >
        <Icone className="size-5" />
        {item.rotuloCurto}
      </Link>
    );
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-grafite-600 bg-grafite-850/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      aria-label="Navegação principal"
    >
      <div className="flex items-stretch px-2">
        {esquerda.map(renderizar)}

        {ehParticipante ? (
          <Link
            href="/registrar-treino"
            aria-label="Registrar treino"
            className="relative -mt-6 flex w-16 shrink-0 items-start justify-center"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-lima-400 text-grafite-950 shadow-[0_10px_30px_-10px_rgba(198,242,78,0.9)] transition-transform active:scale-95">
              <Plus className="size-7" strokeWidth={2.6} />
            </span>
          </Link>
        ) : null}

        {direita.map(renderizar)}
      </div>
    </nav>
  );
}
