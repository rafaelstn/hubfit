"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Flame,
  Handshake,
  Percent,
  Repeat,
  Users,
} from "lucide-react";
import { CabecalhoPagina } from "@/componentes/dominio/cabecalho-pagina";
import { CartaoMetrica } from "@/componentes/dominio/cartao-metrica";
import { LinhaRanking } from "@/componentes/dominio/lista-ranking";
import { LogoPatrocinador } from "@/componentes/dominio/patrocinadores";
import {
  GraficoArea,
  GraficoBarras,
  GraficoLinha,
  GraficoRosca,
} from "@/componentes/graficos/graficos";
import { NotaDemo, Selo } from "@/componentes/ui/basicos";
import { Botao } from "@/componentes/ui/botao";
import { Cartao, CartaoCabecalho, CartaoConteudo } from "@/componentes/ui/cartao";
import {
  SERIE_CONCLUSAO,
  SERIE_ENGAJAMENTO,
  SERIE_INSCRICOES,
  SERIE_PARTICIPACAO,
  SERIE_RETENCAO,
} from "@/dados/metricas";
import { classificar, desafioAtivoDe } from "@/estado/seletores";
import { useDemo } from "@/estado/store";
import { formatarNumero, formatarPeriodo } from "@/lib/formato";

const CORES_ATIVIDADE: Record<string, string> = {
  treino: "text-lima-400",
  inscricao: "text-damatech-300",
  desafio: "text-alerta",
  patrocinador: "text-sucesso",
  moderacao: "text-perigo",
};

export default function PaginaAdmin() {
  const { estado } = useDemo();
  const desafio = desafioAtivoDe(estado);
  const ranking = classificar(estado.participantes).slice(0, 5);

  const ativos = estado.participantes.filter((item) => item.status === "ativo").length;
  const registros = estado.participantes.reduce((total, item) => total + item.treinos, 0);
  const conclusaoMedia = Math.round(
    (estado.participantes.reduce(
      (total, item) => total + Math.min(1, item.treinos / desafio.metaTreinos),
      0,
    ) /
      Math.max(1, estado.participantes.length)) *
      100,
  );
  const engajamentoAlto = SERIE_ENGAJAMENTO.find((item) => item.rotulo === "Alto")?.valor ?? 0;
  const retencao = SERIE_RETENCAO[SERIE_RETENCAO.length - 1]?.valor ?? 0;
  const desafiosAtivos = estado.desafios.filter((item) => item.situacao === "ativo").length;
  const patrocinadoresAtivos = estado.patrocinadores.filter((item) => item.ativo);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6">
      <CabecalhoPagina
        sobretitulo="Painel administrativo"
        titulo="Visão geral da operação"
        descricao="Acompanhamento de participação, conclusão de treinos, engajamento e retenção das campanhas."
        acao={
          <Botao asChild variante="estrutural">
            <Link href="/admin/desafios">
              Gerenciar desafios
              <ArrowRight />
            </Link>
          </Botao>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <CartaoMetrica
          rotulo="Participantes ativos"
          valor={formatarNumero(ativos)}
          variacao={18}
          detalhe="vs. período anterior"
          icone={Users}
        />
        <CartaoMetrica
          rotulo="Registros de treino"
          valor={formatarNumero(registros)}
          variacao={24}
          detalhe="no desafio atual"
          icone={Activity}
        />
        <CartaoMetrica
          rotulo="Taxa de conclusão"
          valor={`${conclusaoMedia}%`}
          variacao={9}
          detalhe="da meta mensal"
          icone={CheckCircle2}
        />
        <CartaoMetrica
          rotulo="Engajamento alto"
          valor={`${engajamentoAlto}%`}
          variacao={6}
          detalhe="da base ativa"
          icone={Percent}
        />
        <CartaoMetrica
          rotulo="Retenção"
          valor={`${retencao}%`}
          variacao={4}
          detalhe="entre campanhas"
          icone={Repeat}
        />
        <CartaoMetrica
          rotulo="Desafios ativos"
          valor={desafiosAtivos}
          detalhe={`${estado.desafios.length} no total`}
          icone={Flame}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Cartao>
          <CartaoCabecalho
            titulo="Participação por semana"
            descricao="Treinos registrados pela base, comparado ao mês anterior"
          />
          <CartaoConteudo className="pt-4">
            <GraficoBarras dados={SERIE_PARTICIPACAO} nome="Treinos" />
          </CartaoConteudo>
        </Cartao>

        <Cartao>
          <CartaoCabecalho
            titulo="Conclusão de treinos"
            descricao="Percentual de participantes que bateram a meta"
          />
          <CartaoConteudo className="pt-4">
            <GraficoLinha dados={SERIE_CONCLUSAO} nome="Conclusão" />
          </CartaoConteudo>
        </Cartao>

        <Cartao>
          <CartaoCabecalho
            titulo="Engajamento da base"
            descricao="Distribuição por frequência de uso"
          />
          <CartaoConteudo className="pt-4">
            <GraficoRosca dados={SERIE_ENGAJAMENTO} />
          </CartaoConteudo>
        </Cartao>

        <Cartao>
          <CartaoCabecalho
            titulo="Evolução de inscrições"
            descricao="Total acumulado de inscritos no desafio"
          />
          <CartaoConteudo className="pt-4">
            <GraficoArea dados={SERIE_INSCRICOES} nome="Inscritos" />
          </CartaoConteudo>
        </Cartao>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Cartao className="self-start lg:col-span-2">
          <CartaoCabecalho
            titulo="Atividades recentes"
            descricao="Últimos eventos registrados na operação"
          />
          <CartaoConteudo className="pt-3">
            <ul className="rolagem-fina max-h-96 space-y-2 overflow-y-auto pr-1">
              {estado.atividades.map((atividade) => (
                <li
                  key={atividade.id}
                  className="flex items-start gap-3 rounded-xl border border-grafite-600 bg-grafite-800 p-3"
                >
                  <span
                    className={`mt-1.5 size-2 shrink-0 rounded-full bg-current ${
                      CORES_ATIVIDADE[atividade.tipo] ?? "text-fumaca"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-neve">{atividade.titulo}</p>
                    <p className="truncate text-xs text-fumaca">{atividade.detalhe}</p>
                  </div>
                  <span className="shrink-0 text-xs text-fumaca">{atividade.quando}</span>
                </li>
              ))}
            </ul>
          </CartaoConteudo>
        </Cartao>

        <div className="space-y-4">
          <Cartao>
            <CartaoCabecalho
              titulo="Ranking do desafio"
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

          <Cartao>
            <CartaoCabecalho
              titulo="Patrocinadores ativos"
              acao={
                <Link
                  href="/admin/patrocinadores"
                  className="text-xs font-semibold text-damatech-300 hover:text-damatech-400"
                >
                  Gerenciar
                </Link>
              }
            />
            <CartaoConteudo className="space-y-2 pt-3">
              {patrocinadoresAtivos.map((patrocinador) => (
                <div
                  key={patrocinador.id}
                  className="flex items-center gap-3 rounded-xl border border-grafite-600 bg-grafite-800 px-3 py-2.5"
                >
                  <LogoPatrocinador patrocinador={patrocinador} tamanho="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-neve">{patrocinador.nome}</p>
                    <p className="truncate text-xs text-fumaca">
                      {patrocinador.desafiosIds.length} campanhas
                    </p>
                  </div>
                  <Handshake className="size-4 shrink-0 text-fumaca" />
                </div>
              ))}
            </CartaoConteudo>
          </Cartao>
        </div>
      </div>

      <Cartao>
        <CartaoCabecalho
          titulo="Desafio em andamento"
          acao={<Selo tom="lima">Em andamento</Selo>}
        />
        <CartaoConteudo className="flex flex-col gap-4 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-extrabold text-neve">{desafio.nome}</p>
            <p className="mt-1 text-sm text-fumaca">
              {formatarPeriodo(desafio.inicio, desafio.fim)} ·{" "}
              {formatarNumero(desafio.participantes)} inscritos · meta de {desafio.metaTreinos}{" "}
              treinos
            </p>
          </div>
          <Botao asChild variante="contorno">
            <Link href={`/desafios/${desafio.id}`}>Ver página do desafio</Link>
          </Botao>
        </CartaoConteudo>
      </Cartao>

      <NotaDemo>
        Esta tela demonstra como o administrador poderá acompanhar o desempenho do desafio. As séries
        históricas são demonstrativas, e os números de participantes, treinos e conclusão vêm dos
        dados da própria demonstração.
      </NotaDemo>
    </div>
  );
}
