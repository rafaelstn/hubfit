"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Trophy, Users } from "lucide-react";
import { CabecalhoPagina } from "@/componentes/dominio/cabecalho-pagina";
import { LinhaRanking } from "@/componentes/dominio/lista-ranking";
import { Avatar, EstadoVazio, NotaDemo, Selo } from "@/componentes/ui/basicos";
import { Botao } from "@/componentes/ui/botao";
import { Cartao, CartaoCabecalho, CartaoConteudo } from "@/componentes/ui/cartao";
import { Campo } from "@/componentes/ui/formulario";
import { classificar, desafioAtivoDe, usuarioClassificado } from "@/estado/seletores";
import { useDemo } from "@/estado/store";
import { formatarNumero, ordinal } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Recorte = "semana" | "mes" | "desafio";

const RECORTES: { valor: Recorte; rotulo: string; descricao: string }[] = [
  { valor: "semana", rotulo: "Semana", descricao: "Pontos conquistados nos últimos 7 dias" },
  { valor: "mes", rotulo: "Mês", descricao: "Pontos conquistados no mês corrente" },
  { valor: "desafio", rotulo: "Desafio", descricao: "Pontuação acumulada no desafio em andamento" },
];

/** Proporção aplicada sobre a pontuação para simular cada recorte de período. */
const FATOR: Record<Recorte, number> = { semana: 0.28, mes: 0.72, desafio: 1 };

export default function PaginaRanking() {
  const { estado } = useDemo();
  const [recorte, setRecorte] = useState<Recorte>("desafio");
  const [busca, setBusca] = useState("");
  const desafio = desafioAtivoDe(estado);
  const usuario = usuarioClassificado(estado);

  const ranking = useMemo(() => {
    const ajustados = estado.participantes.map((participante) => ({
      ...participante,
      pontos: Math.round(participante.pontos * FATOR[recorte]),
      treinos:
        recorte === "desafio"
          ? participante.treinos
          : Math.max(1, Math.round(participante.treinos * FATOR[recorte])),
    }));
    return classificar(ajustados);
  }, [estado.participantes, recorte]);

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return ranking;
    return ranking.filter(
      (participante) =>
        participante.nome.toLowerCase().includes(termo) ||
        participante.apelido.toLowerCase().includes(termo),
    );
  }, [ranking, busca]);

  const podio = ranking.slice(0, 3);
  const recorteAtual = RECORTES.find((item) => item.valor === recorte);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 sm:px-6">
      <CabecalhoPagina
        sobretitulo={desafio.nome}
        titulo="Ranking geral"
        descricao="Classificação dos participantes por pontuação acumulada. A posição é recalculada a cada treino validado."
        acao={
          <Botao asChild variante="contorno">
            <Link href="/registrar-treino">Registrar treino</Link>
          </Botao>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex rounded-xl border border-grafite-600 bg-grafite-850 p-1">
          {RECORTES.map((item) => (
            <button
              key={item.valor}
              type="button"
              onClick={() => setRecorte(item.valor)}
              className={cn(
                "flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors sm:flex-none",
                recorte === item.valor
                  ? "bg-damatech-500 text-white"
                  : "text-fumaca hover:bg-grafite-700 hover:text-neve",
              )}
            >
              {item.rotulo}
            </button>
          ))}
        </div>

        <div className="relative sm:w-72">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fumaca" />
          <Campo
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
            placeholder="Buscar participante"
            aria-label="Buscar participante no ranking"
            className="pl-9"
          />
        </div>
      </div>

      <p className="text-xs text-fumaca">{recorteAtual?.descricao}</p>

      <div className="grid gap-3 sm:grid-cols-3">
        {podio.map((participante) => (
          <Cartao
            key={participante.id}
            className={cn(
              "relative flex flex-col items-center gap-2 overflow-hidden p-5 text-center",
              participante.posicao === 1 && "border-lima-400/40",
            )}
          >
            {participante.posicao === 1 ? (
              <>
                <Image
                  src="/fotos/detalhe-pesos.jpg"
                  alt=""
                  fill
                  sizes="33vw"
                  className="object-cover opacity-15"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-grafite-850 via-grafite-850/85 to-grafite-850/60" />
              </>
            ) : null}
            <div className="relative flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-fumaca">
                {ordinal(participante.posicao)}
              </span>
              <Avatar
                nome={participante.nome}
                gradiente={participante.gradiente}
                tamanho="lg"
                destaque={participante.ehUsuario}
              />
              <p className="text-sm font-semibold text-neve">
                {participante.ehUsuario ? "Você" : participante.nome}
              </p>
              <p className="font-display text-2xl font-extrabold text-lima-400">
                {formatarNumero(participante.pontos)}
              </p>
              <p className="text-xs text-fumaca">{participante.treinos} treinos</p>
            </div>
          </Cartao>
        ))}
      </div>

      <Cartao>
        <CartaoCabecalho
          titulo="Classificação completa"
          descricao={`${ranking.length} participantes no desafio`}
          acao={<Selo tom="azul">{recorteAtual?.rotulo}</Selo>}
        />
        <CartaoConteudo className="space-y-1 pt-3">
          {filtrados.length === 0 ? (
            <EstadoVazio
              icone={<Users />}
              titulo="Nenhum participante encontrado"
              mensagem="Ajuste a busca para localizar outro atleta na classificação."
            />
          ) : (
            filtrados.map((participante) => (
              <LinhaRanking key={participante.id} participante={participante} />
            ))
          )}
        </CartaoConteudo>
      </Cartao>

      <Cartao className="border-lima-400/30 bg-lima-400/6">
        <CartaoConteudo className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-lima-400 text-grafite-950">
              <Trophy className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-neve">
                Você está em {ordinal(usuario.posicao)} lugar
              </p>
              <p className="text-xs text-fumaca">
                {formatarNumero(usuario.pontos)} pontos e {usuario.treinos} treinos registrados
              </p>
            </div>
          </div>
          <Botao asChild>
            <Link href="/registrar-treino">Somar mais pontos</Link>
          </Botao>
        </CartaoConteudo>
      </Cartao>

      <NotaDemo>
        Esta tela demonstra o ranking do desafio com filtros por período. Os recortes de semana e mês
        usam proporções ilustrativas sobre a pontuação total.
      </NotaDemo>
    </div>
  );
}
