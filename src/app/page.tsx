"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CircleDollarSign,
  Info,
  LayoutDashboard,
  Play,
} from "lucide-react";
import { MarcaHubfit } from "@/componentes/marca";
import { LogoPatrocinador } from "@/componentes/dominio/patrocinadores";
import { NavApresentacao } from "@/componentes/apresentacao/nav-apresentacao";
import { MolduraCelular, MolduraNavegador, Revela } from "@/componentes/apresentacao/mockups";
import { Selo } from "@/componentes/ui/basicos";
import { Botao } from "@/componentes/ui/botao";
import { Cartao } from "@/componentes/ui/cartao";
import {
  FASE_1,
  JORNADA,
  MONETIZACAO,
  PILARES,
  PRIMEIRO_PASSO,
  PROBLEMAS,
  ROADMAP,
  SOLUCOES,
} from "@/dados/apresentacao";
import { PATROCINADORES_INICIAIS } from "@/dados/patrocinadores";
import { useDemo } from "@/estado/store";
import { formatarMoeda } from "@/lib/formato";

const NUMEROS = [
  { valor: "312", rotulo: "participantes ativos" },
  { valor: "20", rotulo: "treinos por desafio" },
  { valor: "6", rotulo: "marcas parceiras" },
  { valor: "64%", rotulo: "taxa de conclusão" },
];

const INVESTIMENTO_FASE_1 = 5000;

export default function PaginaApresentacao() {
  const { definirPerfil } = useDemo();
  const router = useRouter();

  function abrirDemo(perfil: "participante" | "admin") {
    definirPerfil(perfil);
    router.push(perfil === "admin" ? "/admin" : "/dashboard");
  }

  return (
    <div id="topo" className="min-h-dvh bg-grafite-900">
      <NavApresentacao />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/fotos/hero-landing.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-grafite-900/85 via-grafite-900/94 to-grafite-900" />
          <div className="absolute inset-0 grade-tenue opacity-40" />
          <div className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-lima-400/12 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Revela>
                <Selo tom="lima">Apresentação do produto</Selo>
                <h1 className="mt-5 font-display text-4xl leading-[1.04] font-extrabold text-neve sm:text-6xl">
                  O app que transforma treino em{" "}
                  <span className="text-lima-400">desafio</span>, ranking e patrocínio.
                </h1>
                <p className="mt-5 max-w-xl text-base text-nevoa sm:text-lg">
                  O HUBFIT organiza desafios mensais, registra treinos com foto, monta o ranking
                  automático e abre espaço para marcas parceiras. Uma primeira versão profissional,
                  pronta para validar a operação real.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Botao tamanho="lg" onClick={() => abrirDemo("participante")}>
                    <Play />
                    Abrir demonstração
                  </Botao>
                  <Botao variante="contorno" tamanho="lg" onClick={() => abrirDemo("admin")}>
                    <LayoutDashboard />
                    Ver painel admin
                  </Botao>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {PILARES.map((pilar) => (
                    <span
                      key={pilar.titulo}
                      className="inline-flex items-center gap-1.5 rounded-full border border-grafite-600 bg-grafite-850 px-3 py-1.5 text-xs font-medium text-nevoa"
                    >
                      <pilar.icone className="size-3.5 text-lima-400" />
                      {pilar.titulo}
                    </span>
                  ))}
                </div>
              </Revela>
            </div>

            <div className="relative lg:col-span-6">
              <MolduraNavegador
                imagem="/mockups/dashboard-desktop.png"
                legenda="Dashboard do participante no HUBFIT"
                prioridade
              />
              <MolduraCelular
                imagem="/mockups/dashboard-mobile.png"
                legenda="HUBFIT no celular"
                className="absolute -right-3 -bottom-10 hidden sm:block"
                atraso={0.6}
              />
            </div>
          </div>

          <Revela atraso={0.15}>
            <div className="mt-16 grid grid-cols-2 gap-4 border-t border-grafite-600 pt-8 sm:grid-cols-4">
              {NUMEROS.map((item) => (
                <div key={item.rotulo}>
                  <p className="font-display text-3xl font-extrabold text-neve sm:text-4xl">
                    {item.valor}
                  </p>
                  <p className="text-xs text-fumaca">{item.rotulo}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] tracking-wide text-fumaca uppercase">
              Números demonstrativos
            </p>
          </Revela>
        </div>
      </section>

      {/* PROBLEMA */}
      <section id="problema" className="border-t border-grafite-600 bg-grafite-850">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Revela className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-lima-400 uppercase">
              O desafio real
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-neve sm:text-4xl">
              O problema não é só treinar. É manter constância e engajamento.
            </h2>
            <p className="mt-4 text-nevoa">
              Sem desafio, ranking e incentivo, a motivação cai e a operação perde força.
            </p>
          </Revela>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PROBLEMAS.map((problema, indice) => (
              <Revela key={problema.numero} atraso={indice * 0.06}>
                <Cartao className="h-full p-5">
                  <span className="font-display text-2xl font-extrabold text-grafite-500">
                    {problema.numero}
                  </span>
                  <h3 className="mt-3 font-semibold text-neve">{problema.titulo}</h3>
                  <p className="mt-1.5 text-sm text-fumaca">{problema.texto}</p>
                </Cartao>
              </Revela>
            ))}
          </div>

          <Revela atraso={0.1}>
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-perigo/25 bg-perigo/8 px-5 py-4">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-perigo" />
              <p className="text-sm text-nevoa">
                <span className="font-semibold text-neve">Resultado:</span> menos engajamento, menor
                recorrência e pouca atratividade para patrocinadores.
              </p>
            </div>
          </Revela>
        </div>
      </section>

      {/* SOLUÇÃO */}
      <section id="solucao">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Revela>
              <p className="text-xs font-semibold tracking-[0.18em] text-lima-400 uppercase">
                A plataforma
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-neve sm:text-4xl">
                Uma plataforma que transforma treino em desafio.
              </h2>
              <p className="mt-4 text-nevoa">
                O aplicativo organiza desafios mensais, registra treinos, incentiva o
                compartilhamento e cria uma base para monetização.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {SOLUCOES.map((solucao) => (
                  <div key={solucao.titulo} className="flex gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-lima-400/12 text-lima-400">
                      <solucao.icone className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-neve">{solucao.titulo}</h3>
                      <p className="mt-1 text-sm text-fumaca">{solucao.texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Revela>

            <Revela atraso={0.15} className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 -z-10 rounded-[3rem] bg-damatech-500/15 blur-[80px]" />
                <MolduraCelular
                  imagem="/mockups/registrar-mobile.png"
                  legenda="Registro de treino no HUBFIT"
                  className="w-[248px]"
                />
              </div>
            </Revela>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="border-y border-grafite-600 bg-grafite-850">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Revela className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-lima-400 uppercase">
              Jornada do produto
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-neve sm:text-4xl">
              Como funciona na prática
            </h2>
            <p className="mt-4 text-nevoa">
              Uma jornada simples para colocar o desafio em uso sem complicar a operação.
            </p>
          </Revela>

          <div className="relative mt-12">
            <div className="absolute top-7 right-0 left-0 hidden h-px bg-grafite-600 lg:block" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {JORNADA.map((etapa, indice) => (
                <Revela key={etapa.passo} atraso={indice * 0.08}>
                  <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                    <span className="flex size-14 items-center justify-center rounded-2xl border border-grafite-600 bg-grafite-800 text-lima-400">
                      <etapa.icone className="size-6" />
                    </span>
                    <span className="mt-3 font-display text-xs font-extrabold text-lima-400">
                      Passo {etapa.passo}
                    </span>
                    <h3 className="mt-1 font-semibold text-neve">{etapa.titulo}</h3>
                    <p className="mt-1.5 text-sm text-fumaca">{etapa.texto}</p>
                  </div>
                </Revela>
              ))}
            </div>
          </div>

          <Revela atraso={0.1}>
            <div className="mt-10 flex items-start gap-3 rounded-xl border border-damatech-500/25 bg-damatech-500/8 px-5 py-4">
              <Info className="mt-0.5 size-5 shrink-0 text-damatech-300" />
              <p className="text-sm text-nevoa">
                Integrações e automações avançadas com Instagram dependem das APIs disponíveis e
                podem entrar por fase de evolução.
              </p>
            </div>
          </Revela>
        </div>
      </section>

      {/* DEMONSTRAÇÃO */}
      <section id="demonstracao">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Revela className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-lima-400 uppercase">
              Demonstração navegável
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-neve sm:text-4xl">
              Experimente o produto agora mesmo
            </h2>
            <p className="mt-4 text-nevoa">
              Registre um treino, veja o ranking subir, abra o painel do administrador e crie um
              desafio. Tudo funciona no navegador, sem cadastro.
            </p>
          </Revela>

          <Revela atraso={0.12}>
            <div className="relative mt-12">
              <div className="absolute inset-x-8 top-8 -z-10 h-72 rounded-[3rem] bg-gradient-to-r from-lima-400/10 via-transparent to-damatech-500/12 blur-[70px]" />
              <MolduraNavegador
                imagem="/mockups/admin-desktop.png"
                legenda="Painel administrativo do HUBFIT"
                flutuar={false}
                className="mx-auto max-w-4xl"
              />
              <MolduraCelular
                imagem="/mockups/ranking-mobile.png"
                legenda="Ranking do HUBFIT no celular"
                flutuar={false}
                className="absolute -bottom-8 left-2 hidden w-[200px] md:block lg:left-10"
              />
            </div>
          </Revela>

          <Revela atraso={0.15}>
            <div className="mt-14 flex flex-col justify-center gap-3 sm:flex-row">
              <Botao tamanho="lg" onClick={() => abrirDemo("participante")}>
                Entrar como participante
                <ArrowRight />
              </Botao>
              <Botao variante="contorno" tamanho="lg" onClick={() => abrirDemo("admin")}>
                Abrir painel administrativo
              </Botao>
            </div>
          </Revela>
        </div>
      </section>

      {/* FASE 1 */}
      <section id="fase-1" className="border-y border-grafite-600 bg-grafite-850">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Revela className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-lima-400 uppercase">
              Escopo
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-neve sm:text-4xl">
              O que entra na Fase 1
            </h2>
            <p className="mt-4 text-nevoa">
              Uma primeira versão funcional e profissional, focada no núcleo do produto.
            </p>
          </Revela>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FASE_1.map((item, indice) => (
              <Revela key={item.numero} atraso={indice * 0.05}>
                <Cartao className="h-full p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-grafite-700 text-lima-400">
                      <item.icone className="size-5" />
                    </span>
                    <span className="font-display text-sm font-extrabold text-grafite-500">
                      {item.numero}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-neve">{item.titulo}</h3>
                  <p className="mt-1.5 text-sm text-fumaca">{item.texto}</p>
                </Cartao>
              </Revela>
            ))}
          </div>
        </div>
      </section>

      {/* MONETIZAÇÃO */}
      <section id="monetizacao">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Revela className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-lima-400 uppercase">
              Modelo de negócio
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-neve sm:text-4xl">
              Estrutura de monetização para crescer com o uso
            </h2>
            <p className="mt-4 text-nevoa">
              A operação pode começar simples e ganhar receita em camadas conforme a validação do
              produto.
            </p>
          </Revela>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MONETIZACAO.map((camada, indice) => (
              <Revela key={camada.titulo} atraso={indice * 0.06}>
                <Cartao className="h-full p-5">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-damatech-500/15 text-damatech-300">
                    <camada.icone className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-neve">{camada.titulo}</h3>
                  <p className="mt-1.5 text-sm text-fumaca">{camada.texto}</p>
                </Cartao>
              </Revela>
            ))}
          </div>

          <Revela atraso={0.1}>
            <div className="mt-8 rounded-xl border border-grafite-600 bg-grafite-850 px-5 py-4">
              <p className="text-sm text-nevoa">
                <span className="font-semibold text-neve">A monetização não precisa nascer
                completa.</span>{" "}
                O MVP serve para validar adesão, engajamento e interesse comercial.
              </p>
            </div>
          </Revela>

          <Revela atraso={0.12}>
            <div className="mt-10">
              <p className="text-xs font-semibold tracking-wide text-fumaca uppercase">
                Marcas parceiras da demonstração
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {PATROCINADORES_INICIAIS.map((patrocinador) => (
                  <div
                    key={patrocinador.id}
                    className="flex items-center gap-2.5 rounded-xl border border-grafite-600 bg-grafite-850 px-3 py-2.5"
                  >
                    <LogoPatrocinador patrocinador={patrocinador} tamanho="sm" />
                    <span className="truncate text-sm font-medium text-nevoa">
                      {patrocinador.nome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Revela>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="border-t border-grafite-600 bg-grafite-850">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Revela className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-lima-400 uppercase">
              Evolução
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-neve sm:text-4xl">
              Lançamento, validação e evolução contínua
            </h2>
            <p className="mt-4 text-nevoa">
              O produto nasce forte na Fase 1 e continua evoluindo com o uso e com os testes reais.
            </p>
          </Revela>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {ROADMAP.map((coluna, indice) => (
              <Revela key={coluna.etiqueta} atraso={indice * 0.08}>
                <Cartao
                  className={
                    coluna.destaque
                      ? "h-full border-lima-400/40 bg-lima-400/6 p-6"
                      : "h-full p-6"
                  }
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        coluna.destaque
                          ? "flex size-11 items-center justify-center rounded-xl bg-lima-400 text-grafite-950"
                          : "flex size-11 items-center justify-center rounded-xl bg-grafite-700 text-damatech-300"
                      }
                    >
                      <coluna.icone className="size-5" />
                    </span>
                    <h3 className="font-display text-lg font-bold text-neve">{coluna.etiqueta}</h3>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {coluna.itens.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-nevoa">
                        <Check
                          className={
                            coluna.destaque
                              ? "mt-0.5 size-4 shrink-0 text-lima-400"
                              : "mt-0.5 size-4 shrink-0 text-damatech-300"
                          }
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Cartao>
              </Revela>
            ))}
          </div>

          <Revela atraso={0.1}>
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-damatech-500/25 bg-damatech-500/8 px-5 py-4">
              <Info className="mt-0.5 size-5 shrink-0 text-damatech-300" />
              <p className="text-sm text-nevoa">
                Recursos dependentes de API, como integrações avançadas com Instagram, entram por
                fase de evolução para proteger o escopo do lançamento.
              </p>
            </div>
          </Revela>
        </div>
      </section>

      {/* PLANOS / INVESTIMENTO */}
      <section id="planos">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Revela>
            <Cartao className="relative overflow-hidden border-lima-400/25">
              <div className="absolute inset-0 grade-tenue opacity-40" />
              <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-lima-400/10 blur-[90px]" />
              <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-lima-400 uppercase">
                    Primeiro passo
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-extrabold text-neve sm:text-4xl">
                    Primeiro passo para validar o projeto
                  </h2>
                  <p className="mt-4 text-nevoa">
                    A primeira versão coloca a ideia em uso, valida a operação e abre espaço para
                    patrocínio, monetização e evolução do produto.
                  </p>

                  <ul className="mt-6 space-y-3">
                    {PRIMEIRO_PASSO.map((passo) => (
                      <li key={passo} className="flex items-center gap-3 text-sm text-nevoa">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-lima-400 text-grafite-950">
                          <Check className="size-3.5" strokeWidth={3} />
                        </span>
                        {passo}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-grafite-600 bg-grafite-800 p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <CircleDollarSign className="size-6 text-lima-400" />
                    <span className="text-sm font-semibold tracking-wide text-fumaca uppercase">
                      Investimento inicial
                    </span>
                  </div>
                  <p className="mt-3 font-display text-5xl font-extrabold text-neve">
                    {formatarMoeda(INVESTIMENTO_FASE_1)}
                  </p>
                  <p className="mt-2 text-sm text-fumaca">
                    Primeira versão funcional e profissional, focada no núcleo do produto.
                  </p>

                  <Botao
                    largura="cheia"
                    tamanho="lg"
                    className="mt-6"
                    onClick={() => abrirDemo("participante")}
                  >
                    Quero avançar com a Fase 1
                    <ArrowRight />
                  </Botao>
                  <p className="mt-4 text-xs text-fumaca">
                    Próximo passo: alinhar os detalhes finais do escopo e iniciar a proposta oficial.
                  </p>
                </div>
              </div>
            </Cartao>
          </Revela>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-grafite-600 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
          <MarcaHubfit />
          <p className="max-w-md text-xs text-fumaca">
            Apresentação e demonstração preparadas pela Damatech Solutions. Dados, marcas, cupons e
            premiações são fictícios e servem para ilustrar a proposta.
          </p>
          <div className="flex gap-2">
            <Botao variante="contorno" tamanho="sm" onClick={() => abrirDemo("participante")}>
              Demonstração
            </Botao>
            <Botao variante="fantasma" tamanho="sm" asChild>
              <Link href="#topo">Voltar ao topo</Link>
            </Botao>
          </div>
        </div>
      </footer>
    </div>
  );
}
