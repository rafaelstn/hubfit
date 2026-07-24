"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Dumbbell,
  Flame,
  Plus,
  Timer,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { AnelProgresso } from "@/componentes/dominio/anel-progresso";
import { CartaoDesafio } from "@/componentes/dominio/cartao-desafio";
import { CartaoMetrica } from "@/componentes/dominio/cartao-metrica";
import { LinhaRanking } from "@/componentes/dominio/lista-ranking";
import { VitrineModalidades } from "@/componentes/dominio/modalidades";
import { FaixaPatrocinadores } from "@/componentes/dominio/patrocinadores";
import { Saudacao } from "@/componentes/dominio/saudacao";
import { Secao } from "@/componentes/dominio/cabecalho-pagina";
import { GraficoArea } from "@/componentes/graficos/graficos";
import { NotaDemo, Selo } from "@/componentes/ui/basicos";
import { Botao } from "@/componentes/ui/botao";
import { Cartao, CartaoCabecalho, CartaoConteudo } from "@/componentes/ui/cartao";
import {
  classificar,
  desafioAtivoDe,
  patrocinadoresDoDesafio,
  progressoDoUsuario,
  proximosDesafios,
  semanaDoUsuario,
  treinosDoUsuario,
  usuarioClassificado,
} from "@/estado/seletores";
import { evolucaoDePontos } from "@/estado/seletores";
import { useDemo } from "@/estado/store";
import { formatarDataCurta, formatarNumero, ordinal } from "@/lib/formato";
import { cn } from "@/lib/utils";

export default function PaginaDashboard() {
  const { estado } = useDemo();
  const usuario = usuarioClassificado(estado);
  const desafio = desafioAtivoDe(estado);
  const progresso = progressoDoUsuario(estado, desafio);
  const treinos = treinosDoUsuario(estado, desafio.id);
  const semana = semanaDoUsuario(treinos);
  const ranking = classificar(estado.participantes).slice(0, 5);
  const patrocinadores = patrocinadoresDoDesafio(estado, desafio);
  const futuros = proximosDesafios(estado);
  const ultimoTreino = treinos[0];

  const evolucao = evolucaoDePontos(treinos).map((ponto) => ({
    rotulo: formatarDataCurta(ponto.rotulo),
    valor: ponto.valor,
  }));

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-lima-400 uppercase">
            Desafio em andamento
          </p>
          <Saudacao nome={usuario.nome} />
          <p className="mt-1.5 text-sm text-fumaca">
            Faltam {Math.max(0, progresso.meta - progresso.concluidos)} treinos para bater a meta de{" "}
            {desafio.nome}.
          </p>
        </div>
        <Botao asChild tamanho="lg" className="hidden sm:inline-flex">
          <Link href="/registrar-treino">
            <Plus />
            Registrar treino
          </Link>
        </Botao>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Cartao className="relative overflow-hidden lg:col-span-2">
          <div className="absolute inset-0 grade-tenue opacity-60" />
          <div className="relative flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Selo tom="lima">Em andamento</Selo>
                <span className="inline-flex items-center gap-1.5 text-xs text-fumaca">
                  <CalendarClock className="size-3.5" />
                  Termina em {progresso.diasRestantes} dias
                </span>
              </div>
              <h2 className="mt-3 font-display text-2xl font-extrabold text-neve sm:text-3xl">
                {desafio.nome}
              </h2>
              <p className="mt-2 max-w-md text-sm text-fumaca">{desafio.chamada}</p>

              <div className="mt-5 flex flex-wrap items-center gap-6">
                <div>
                  <p className="font-display text-2xl font-extrabold text-neve">
                    {progresso.concluidos}
                    <span className="text-base text-fumaca"> / {progresso.meta}</span>
                  </p>
                  <p className="text-xs text-fumaca">Treinos registrados</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-extrabold text-lima-400">
                    {ordinal(usuario.posicao)}
                  </p>
                  <p className="text-xs text-fumaca">Posição no ranking</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-extrabold text-neve">
                    {formatarNumero(usuario.pontos)}
                  </p>
                  <p className="text-xs text-fumaca">Pontos acumulados</p>
                </div>
              </div>
            </div>

            <AnelProgresso
              percentual={progresso.percentual}
              rotulo="da meta"
              detalhe={`${progresso.concluidos} de ${progresso.meta} treinos`}
              className="self-center"
            />
          </div>

          <div className="relative border-t border-grafite-600 p-5 pt-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold tracking-wide text-fumaca uppercase">
                Sequência atual
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-lima-400">
                <Flame className="size-4" />
                {usuario.sequencia} dias
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-1.5">
              {semana.map((dia) => (
                <div key={dia.data} className="flex flex-1 flex-col items-center gap-1.5">
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-xl border text-xs font-bold transition-colors",
                      dia.treinou
                        ? "border-lima-400 bg-lima-400 text-grafite-950"
                        : dia.futuro
                          ? "border-grafite-600 bg-grafite-800 text-fumaca"
                          : "border-grafite-600 bg-grafite-800 text-grafite-500",
                    )}
                  >
                    {dia.treinou ? "✓" : dia.data.slice(8, 10)}
                  </span>
                  <span className="text-[10px] font-medium text-fumaca">{dia.sigla}</span>
                </div>
              ))}
            </div>
          </div>

          <Botao asChild largura="cheia" tamanho="lg" className="rounded-t-none sm:hidden">
            <Link href="/registrar-treino">
              <Dumbbell />
              Registrar treino
            </Link>
          </Botao>
        </Cartao>

        <Cartao>
          <CartaoCabecalho
            titulo="Ranking geral"
            acao={
              <Link
                href="/ranking"
                className="text-xs font-semibold text-damatech-300 hover:text-damatech-400"
              >
                Ver todos
              </Link>
            }
          />
          <CartaoConteudo className="space-y-1 pt-3">
            {ranking.map((participante) => (
              <LinhaRanking key={participante.id} participante={participante} compacto />
            ))}
          </CartaoConteudo>
        </Cartao>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CartaoMetrica
          rotulo="Dias restantes"
          valor={progresso.diasRestantes}
          unidade="dias"
          detalhe="para encerrar o desafio"
          icone={CalendarClock}
        />
        <CartaoMetrica
          rotulo="Volume total"
          valor={formatarNumero(progresso.volumeTotal)}
          unidade="kg"
          detalhe="no desafio atual"
          icone={Dumbbell}
        />
        <CartaoMetrica
          rotulo="Pontos no desafio"
          valor={formatarNumero(progresso.pontosNoDesafio)}
          detalhe={`${desafio.pontosPorTreino} pts por treino`}
          icone={TrendingUp}
        />
        <CartaoMetrica
          rotulo="Posição"
          valor={ordinal(usuario.posicao)}
          detalhe={`entre ${estado.participantes.length} participantes`}
          icone={Trophy}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Cartao className="overflow-hidden">
          <CartaoCabecalho titulo="Treino da semana" descricao="Sugestão da comissão técnica" />
          <div className="relative mt-4 h-44 w-full">
            <Image
              src="/fotos/treino-semana.jpg"
              alt="Atleta em treino de força na academia"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-grafite-850 to-transparent" />
          </div>
          <CartaoConteudo className="pt-4">
            <h3 className="font-display text-lg font-bold text-neve">Peito e tríceps</h3>
            <div className="mt-2 flex items-center gap-4 text-xs text-fumaca">
              <span className="inline-flex items-center gap-1.5">
                <Timer className="size-3.5" />
                45 a 60 min
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Dumbbell className="size-3.5" />
                Intermediário
              </span>
            </div>
            <p className="mt-3 text-sm text-nevoa">
              Supino reto, supino inclinado, crucifixo, tríceps corda e paralelas. Quatro séries por
              exercício, com foco em execução limpa.
            </p>
            <Botao asChild variante="contorno" largura="cheia" className="mt-4">
              <Link href="/registrar-treino">
                Registrar este treino
                <ArrowRight />
              </Link>
            </Botao>
          </CartaoConteudo>
        </Cartao>

        <Cartao className="lg:col-span-2">
          <CartaoCabecalho
            titulo="Sua evolução"
            descricao="Pontos acumulados a cada treino registrado no desafio"
          />
          <CartaoConteudo className="pt-4">
            <GraficoArea dados={evolucao} nome="Pontos" altura={236} />
            {ultimoTreino ? (
              <p className="mt-3 text-xs text-fumaca">
                Último registro: {ultimoTreino.tipo}, {ultimoTreino.duracaoMin} min, em{" "}
                {formatarDataCurta(ultimoTreino.data)}.
              </p>
            ) : null}
          </CartaoConteudo>
        </Cartao>
      </div>

      <Secao
        titulo="Modalidades"
        acao={
          <span className="text-xs text-fumaca">Escolha e registre em poucos toques</span>
        }
      >
        <VitrineModalidades />
      </Secao>

      <FaixaPatrocinadores
        patrocinadores={patrocinadores}
        titulo="Patrocinadores do desafio atual"
      />

      <Secao
        titulo="Próximos desafios"
        acao={
          <Link
            href="/desafios"
            className="text-xs font-semibold text-damatech-300 hover:text-damatech-400"
          >
            Ver todos
          </Link>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {futuros.map((proximo) => (
            <CartaoDesafio key={proximo.id} desafio={proximo} />
          ))}
        </div>
      </Secao>

      <NotaDemo>
        Esta tela demonstra a experiência do participante logado. Os números de progresso, ranking e
        pontuação são recalculados a cada treino registrado dentro da demonstração.
      </NotaDemo>
    </div>
  );
}
