"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CircleCheck,
  Dumbbell,
  Gift,
  ScrollText,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { AnelProgresso } from "@/componentes/dominio/anel-progresso";
import { SeloSituacao } from "@/componentes/dominio/cartao-desafio";
import { LogoPatrocinador } from "@/componentes/dominio/patrocinadores";
import { EstadoVazio, EtiquetaDemonstrativa, NotaDemo, Selo } from "@/componentes/ui/basicos";
import { Botao } from "@/componentes/ui/botao";
import { Cartao, CartaoCabecalho, CartaoConteudo } from "@/componentes/ui/cartao";
import { patrocinadoresDoDesafio, progressoDoUsuario } from "@/estado/seletores";
import { useDemo } from "@/estado/store";
import { formatarMoeda, formatarNumero, formatarPeriodo } from "@/lib/formato";

export default function PaginaDetalheDesafio() {
  const parametros = useParams<{ id: string }>();
  const router = useRouter();
  const { estado, alternarInscricao } = useDemo();

  const desafio = estado.desafios.find((item) => item.id === parametros.id);

  if (!desafio) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <EstadoVazio
          icone={<Target />}
          titulo="Desafio não encontrado"
          mensagem="Este desafio pode ter sido removido no painel administrativo durante a demonstração."
          acao={
            <Botao asChild variante="contorno">
              <Link href="/desafios">Voltar para os desafios</Link>
            </Botao>
          }
        />
      </div>
    );
  }

  const inscrito = estado.inscricoes.includes(desafio.id);
  const progresso = progressoDoUsuario(estado, desafio);
  const patrocinadores = patrocinadoresDoDesafio(estado, desafio);

  function participar() {
    alternarInscricao(desafio!.id);
    if (inscrito) {
      toast("Inscrição cancelada", {
        description: `Você saiu do desafio ${desafio!.nome} nesta demonstração.`,
      });
    } else {
      toast.success("Inscrição confirmada", {
        description: `Você entrou no desafio ${desafio!.nome}. As regras foram aceitas.`,
      });
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm font-medium text-fumaca transition-colors hover:text-neve"
      >
        <ArrowLeft className="size-4" />
        Voltar
      </button>

      <Cartao className="overflow-hidden">
        <div className="relative h-56 w-full sm:h-72">
          <Image
            src={desafio.imagem}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-grafite-850 via-grafite-850/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <SeloSituacao situacao={desafio.situacao} />
              {inscrito ? <Selo tom="sucesso">Você está inscrito</Selo> : null}
            </div>
            <h1 className="mt-3 font-display text-3xl font-extrabold text-neve sm:text-4xl">
              {desafio.nome}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-nevoa">{desafio.chamada}</p>
          </div>
        </div>

        <div className="grid gap-4 border-t border-grafite-600 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-fumaca uppercase">
              <CalendarDays className="size-3.5" />
              Período
            </p>
            <p className="mt-1.5 text-sm font-semibold text-neve">
              {formatarPeriodo(desafio.inicio, desafio.fim)}
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-fumaca uppercase">
              <Target className="size-3.5" />
              Meta
            </p>
            <p className="mt-1.5 text-sm font-semibold text-neve">
              {desafio.metaTreinos} treinos registrados
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-fumaca uppercase">
              <Users className="size-3.5" />
              Participantes
            </p>
            <p className="mt-1.5 text-sm font-semibold text-neve">
              {formatarNumero(desafio.participantes)} inscritos
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-fumaca uppercase">
              <Trophy className="size-3.5" />
              Premiação
            </p>
            <p className="mt-1.5 text-sm font-semibold text-lima-400">
              {formatarMoeda(desafio.premiacaoTotal)}
            </p>
            <EtiquetaDemonstrativa>Valor demonstrativo</EtiquetaDemonstrativa>
          </div>
        </div>
      </Cartao>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Cartao>
            <CartaoCabecalho titulo="Sobre o desafio" />
            <CartaoConteudo className="pt-3">
              <p className="text-sm leading-relaxed text-nevoa">{desafio.descricao}</p>
            </CartaoConteudo>
          </Cartao>

          <Cartao>
            <CartaoCabecalho
              titulo="Regras"
              descricao="Critérios de validação dos treinos enviados"
              acao={<ScrollText className="size-4 text-fumaca" />}
            />
            <CartaoConteudo className="pt-3">
              <ul className="space-y-2.5">
                {desafio.regras.map((regra) => (
                  <li key={regra} className="flex items-start gap-3 text-sm text-nevoa">
                    <CircleCheck className="mt-0.5 size-4 shrink-0 text-lima-400" />
                    {regra}
                  </li>
                ))}
              </ul>
            </CartaoConteudo>
          </Cartao>

          <Cartao>
            <CartaoCabecalho
              titulo="Premiação"
              descricao="Distribuição prevista para a campanha"
              acao={<Gift className="size-4 text-fumaca" />}
            />
            <CartaoConteudo className="space-y-2 pt-3">
              {desafio.premios.map((premio) => (
                <div
                  key={premio.colocacao}
                  className="flex flex-col gap-1 rounded-xl border border-grafite-600 bg-grafite-800 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-sm font-bold text-lima-400">{premio.colocacao}</span>
                  <span className="text-sm text-nevoa">{premio.descricao}</span>
                </div>
              ))}
              <EtiquetaDemonstrativa>Premiação demonstrativa</EtiquetaDemonstrativa>
            </CartaoConteudo>
          </Cartao>
        </div>

        <div className="space-y-4">
          <Cartao>
            <CartaoCabecalho titulo="Seu progresso" />
            <CartaoConteudo className="flex flex-col items-center gap-4 pt-3">
              {desafio.situacao === "ativo" ? (
                <>
                  <AnelProgresso
                    percentual={progresso.percentual}
                    tamanho={132}
                    rotulo="da meta"
                    detalhe={`${progresso.concluidos} de ${progresso.meta}`}
                  />
                  <div className="grid w-full grid-cols-2 gap-3">
                    <div className="rounded-xl border border-grafite-600 bg-grafite-800 p-3 text-center">
                      <p className="font-display text-xl font-extrabold text-neve">
                        {progresso.diasRestantes}
                      </p>
                      <p className="text-xs text-fumaca">dias restantes</p>
                    </div>
                    <div className="rounded-xl border border-grafite-600 bg-grafite-800 p-3 text-center">
                      <p className="font-display text-xl font-extrabold text-neve">
                        {formatarNumero(progresso.pontosNoDesafio)}
                      </p>
                      <p className="text-xs text-fumaca">pontos</p>
                    </div>
                  </div>
                  <Botao asChild largura="cheia" tamanho="lg">
                    <Link href="/registrar-treino">
                      <Dumbbell />
                      Registrar treino
                    </Link>
                  </Botao>
                </>
              ) : (
                <div className="w-full space-y-4 text-center">
                  <p className="text-sm text-fumaca">
                    {desafio.situacao === "futuro"
                      ? "O desafio ainda não começou. Ao se inscrever, você recebe um aviso quando o período abrir."
                      : "Este desafio foi encerrado. O histórico segue disponível para consulta."}
                  </p>
                  <Botao
                    largura="cheia"
                    tamanho="lg"
                    variante={inscrito ? "contorno" : "principal"}
                    onClick={participar}
                    disabled={desafio.situacao === "encerrado"}
                  >
                    {inscrito ? (
                      <>
                        <Check />
                        Inscrição confirmada
                      </>
                    ) : (
                      "Participar do desafio"
                    )}
                  </Botao>
                </div>
              )}
            </CartaoConteudo>
          </Cartao>

          <Cartao>
            <CartaoCabecalho titulo="Patrocinadores" />
            <CartaoConteudo className="space-y-2 pt-3">
              {patrocinadores.length === 0 ? (
                <p className="text-sm text-fumaca">
                  Nenhuma marca vinculada a esta campanha até o momento.
                </p>
              ) : (
                patrocinadores.map((patrocinador) => (
                  <Link
                    key={patrocinador.id}
                    href="/patrocinadores"
                    className="flex items-center gap-3 rounded-xl border border-grafite-600 bg-grafite-800 px-3 py-2.5 transition-colors hover:border-grafite-500"
                  >
                    <LogoPatrocinador patrocinador={patrocinador} tamanho="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-neve">
                        {patrocinador.nome}
                      </p>
                      <p className="truncate text-xs text-fumaca">{patrocinador.desconto}</p>
                    </div>
                  </Link>
                ))
              )}
            </CartaoConteudo>
          </Cartao>
        </div>
      </div>

      <NotaDemo>
        Esta tela demonstra a página completa de um desafio: período, regras, premiação, marcas
        parceiras e o progresso individual do participante.
      </NotaDemo>
    </div>
  );
}
