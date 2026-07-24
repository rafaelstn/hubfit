"use client";

import { useMemo, useState } from "react";
import { Target } from "lucide-react";
import { CabecalhoPagina } from "@/componentes/dominio/cabecalho-pagina";
import { CartaoDesafio } from "@/componentes/dominio/cartao-desafio";
import { EstadoVazio, NotaDemo } from "@/componentes/ui/basicos";
import type { SituacaoDesafio } from "@/dados/tipos";
import { desafioAtivoDe, progressoDoUsuario } from "@/estado/seletores";
import { useDemo } from "@/estado/store";
import { cn } from "@/lib/utils";

const FILTROS: { valor: SituacaoDesafio | "todos"; rotulo: string }[] = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "ativo", rotulo: "Em andamento" },
  { valor: "futuro", rotulo: "Próximos" },
  { valor: "encerrado", rotulo: "Encerrados" },
];

export default function PaginaDesafios() {
  const { estado } = useDemo();
  const [filtro, setFiltro] = useState<SituacaoDesafio | "todos">("todos");
  const ativo = desafioAtivoDe(estado);
  const progressoAtivo = progressoDoUsuario(estado, ativo);

  const listagem = useMemo(() => {
    const ordem: Record<SituacaoDesafio, number> = { ativo: 0, futuro: 1, encerrado: 2 };
    return estado.desafios
      .filter((desafio) => filtro === "todos" || desafio.situacao === filtro)
      .sort((a, b) => ordem[a.situacao] - ordem[b.situacao] || (a.inicio < b.inicio ? -1 : 1));
  }, [estado.desafios, filtro]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6">
      <CabecalhoPagina
        sobretitulo="Campanhas"
        titulo="Desafios"
        descricao="Campanhas mensais com regras, período, premiação e patrocinadores. Toque em um desafio para ver os detalhes completos e participar."
      />

      <div className="sem-barra -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {FILTROS.map((item) => (
          <button
            key={item.valor}
            type="button"
            onClick={() => setFiltro(item.valor)}
            className={cn(
              "shrink-0 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors",
              filtro === item.valor
                ? "border-damatech-500 bg-damatech-500 text-white"
                : "border-grafite-600 bg-grafite-850 text-nevoa hover:border-grafite-500",
            )}
          >
            {item.rotulo}
          </button>
        ))}
      </div>

      {listagem.length === 0 ? (
        <EstadoVazio
          icone={<Target />}
          titulo="Nenhum desafio nesta situação"
          mensagem="Quando uma campanha for criada ou encerrada pelo administrador, ela aparece aqui automaticamente."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listagem.map((desafio) => (
            <CartaoDesafio
              key={desafio.id}
              desafio={desafio}
              progresso={
                desafio.id === ativo.id
                  ? {
                      concluidos: progressoAtivo.concluidos,
                      meta: progressoAtivo.meta,
                      percentual: progressoAtivo.percentual,
                    }
                  : undefined
              }
            />
          ))}
        </div>
      )}

      <NotaDemo>
        Esta tela demonstra como o participante encontra as campanhas disponíveis. Os desafios
        criados no painel administrativo aparecem nesta listagem na hora.
      </NotaDemo>
    </div>
  );
}
