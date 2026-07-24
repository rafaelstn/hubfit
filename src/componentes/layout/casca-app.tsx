"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BarraLateral } from "./barra-lateral";
import { BarraTopo } from "./barra-topo";
import { NavegacaoInferior } from "./navegacao-inferior";
import { CarregandoDemo } from "./carregando-demo";
import { useDemo } from "@/estado/store";

export function CascaApp({ children }: { children: ReactNode }) {
  const { pronto, estado, definirPerfil } = useDemo();
  const caminho = usePathname();

  // O perfil exibido acompanha a rota: abrir uma tela administrativa direto pela
  // URL precisa trazer o menu e o seletor correspondentes.
  useEffect(() => {
    // Só depois da hidratação: o estado restaurado do navegador chega em seguida
    // e sobrescreveria o perfil definido aqui.
    if (!pronto) return;
    const perfilDaRota = caminho.startsWith("/admin") ? "admin" : "participante";
    if (estado.perfil !== perfilDaRota) definirPerfil(perfilDaRota);
  }, [pronto, caminho, estado.perfil, definirPerfil]);

  return (
    <div className="flex min-h-dvh bg-grafite-900">
      <BarraLateral />
      <div className="flex min-w-0 flex-1 flex-col">
        <BarraTopo />
        <main className="flex-1 pb-24 lg:pb-10">{pronto ? children : <CarregandoDemo />}</main>
      </div>
      <NavegacaoInferior />
    </div>
  );
}
