"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Check,
  Dumbbell,
  Flame,
  ImageUp,
  PartyPopper,
  Share2,
  Sparkles,
  Trash2,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import { AnelProgresso } from "@/componentes/dominio/anel-progresso";
import { CabecalhoPagina } from "@/componentes/dominio/cabecalho-pagina";
import { ModalCompartilhar } from "@/componentes/dominio/modal-compartilhar";
import { NotaDemo, Selo } from "@/componentes/ui/basicos";
import { Botao } from "@/componentes/ui/botao";
import { Cartao, CartaoCabecalho, CartaoConteudo } from "@/componentes/ui/cartao";
import { SeletorModalidade } from "@/componentes/dominio/modalidades";
import { AreaTexto, Campo, GrupoCampo } from "@/componentes/ui/formulario";
import { DATA_DEMO, fotoDoTipo, volumeEstimado } from "@/dados/catalogo";
import { REGRA_PONTOS, calcularPontos } from "@/dados/treinos";
import type { TipoTreino } from "@/dados/tipos";
import {
  desafioAtivoDe,
  patrocinadoresDoDesafio,
  progressoDoUsuario,
  usuarioClassificado,
} from "@/estado/seletores";
import { useDemo, type ResultadoRegistro } from "@/estado/store";
import { formatarData, formatarNumero, ordinal } from "@/lib/formato";
import { lerPreviaLocal } from "@/lib/imagem";
import { cn } from "@/lib/utils";

const DURACOES = [30, 45, 60, 75, 90];

export default function PaginaRegistrarTreino() {
  const { estado, registrarTreino, aplicarBonusPatrocinadores } = useDemo();
  const desafio = desafioAtivoDe(estado);
  const progresso = progressoDoUsuario(estado, desafio);
  const usuario = usuarioClassificado(estado);
  const patrocinadores = patrocinadoresDoDesafio(estado, desafio);
  const entradaArquivo = useRef<HTMLInputElement>(null);

  const [tipo, setTipo] = useState<TipoTreino>("Musculação");
  const [data, setData] = useState(DATA_DEMO);
  const [duracao, setDuracao] = useState(60);
  const [observacao, setObservacao] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const [aceitouRegras, setAceitouRegras] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<ResultadoRegistro | null>(null);
  const [marcouPatrocinadores, setMarcouPatrocinadores] = useState(false);
  const [compartilhando, setCompartilhando] = useState(false);

  const pontosPrevistos = calcularPontos(duracao, data, desafio.pontosPorTreino);

  async function escolherFoto(evento: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = evento.target.files?.[0];
    if (!arquivo) return;
    try {
      const previa = await lerPreviaLocal(arquivo);
      setFoto(previa);
      setErros((atual) => ({ ...atual, foto: "" }));
    } catch (falha) {
      toast.error("Não foi possível carregar a imagem", {
        description: falha instanceof Error ? falha.message : "Tente outro arquivo.",
      });
    } finally {
      evento.target.value = "";
    }
  }

  function validar() {
    const novos: Record<string, string> = {};
    if (!data) novos.data = "Informe a data do treino.";
    else if (data > DATA_DEMO) novos.data = "Não é possível registrar treino em data futura.";
    else if (data < desafio.inicio) novos.data = "A data está fora do período do desafio.";

    if (!duracao || duracao < 20) novos.duracao = "A duração mínima é de 20 minutos.";
    else if (duracao > 300) novos.duracao = "Informe uma duração de até 300 minutos.";

    if (!aceitouRegras) novos.regras = "Confirme que o treino segue as regras do desafio.";

    setErros(novos);
    return Object.keys(novos).length === 0;
  }

  function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    if (!validar()) return;

    setEnviando(true);
    // Carregamento simulado: nesta etapa nada é enviado para servidor.
    window.setTimeout(() => {
      const retorno = registrarTreino({ tipo, data, duracaoMin: duracao, observacao, foto });
      setResultado(retorno);
      setEnviando(false);
      toast.success("Treino registrado", {
        description: `Você somou ${retorno.pontos} pontos no desafio ${desafio.nome}.`,
      });
    }, 900);
  }

  function marcarPatrocinadores() {
    if (!resultado || marcouPatrocinadores) return;
    const creditado = aplicarBonusPatrocinadores(resultado.treinoId);
    setMarcouPatrocinadores(true);
    if (creditado > 0) {
      toast.success("Patrocinadores marcados", {
        description: `Bônus de engajamento de ${creditado} pontos aplicado.`,
      });
    }
  }

  function registrarOutro() {
    setResultado(null);
    setMarcouPatrocinadores(false);
    setFoto(null);
    setObservacao("");
    setAceitouRegras(false);
  }

  if (resultado) {
    const subiu = resultado.posicaoAnterior - resultado.posicao;
    return (
      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6 sm:px-6">
        <Cartao className="overflow-hidden">
          <div className="flex flex-col items-center gap-4 border-b border-grafite-600 bg-lima-400/8 p-6 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-lima-400 text-grafite-950">
              <Check className="size-7" strokeWidth={3} />
            </span>
            <div>
              <h1 className="font-display text-2xl font-extrabold text-neve">
                Treino registrado com sucesso
              </h1>
              <p className="mt-1.5 text-sm text-fumaca">
                {tipo}, {duracao} minutos, em {formatarData(data)}.
              </p>
            </div>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-3">
            <div className="flex flex-col items-center justify-center rounded-xl border border-grafite-600 bg-grafite-800 p-4">
              <p className="font-display text-3xl font-extrabold text-lima-400">
                +{formatarNumero(resultado.pontos)}
              </p>
              <p className="text-xs text-fumaca">pontos conquistados</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border border-grafite-600 bg-grafite-800 p-4">
              <AnelProgresso
                percentual={resultado.percentual}
                tamanho={92}
                espessura={9}
                rotulo="da meta"
              />
              <p className="mt-1 text-xs text-fumaca">
                {resultado.concluidos} de {resultado.meta} treinos
              </p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border border-grafite-600 bg-grafite-800 p-4">
              <p className="font-display text-3xl font-extrabold text-neve">
                {ordinal(resultado.posicao)}
              </p>
              <p className="text-xs text-fumaca">
                {subiu > 0
                  ? `subiu ${subiu} ${subiu > 1 ? "posições" : "posição"}`
                  : "posição no ranking"}
              </p>
            </div>
          </div>

          {resultado.conquistasNovas.length > 0 ? (
            <div className="mx-6 mb-6 flex items-start gap-3 rounded-xl border border-lima-400/30 bg-lima-400/8 p-4">
              <PartyPopper className="mt-0.5 size-5 shrink-0 text-lima-400" />
              <div>
                <p className="text-sm font-semibold text-neve">
                  {resultado.conquistasNovas.length === 1
                    ? "Nova conquista desbloqueada"
                    : "Novas conquistas desbloqueadas"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {resultado.conquistasNovas.map((conquista) => (
                    <Selo key={conquista.id} tom="lima">
                      {conquista.nome}
                    </Selo>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-2 border-t border-grafite-600 p-6 sm:flex-row">
            <Botao largura="cheia" onClick={() => setCompartilhando(true)}>
              <Share2 />
              Compartilhar resultado
            </Botao>
            <Botao
              largura="cheia"
              variante={marcouPatrocinadores ? "suave" : "estrutural"}
              onClick={marcarPatrocinadores}
              disabled={marcouPatrocinadores}
            >
              {marcouPatrocinadores ? <Check /> : <Sparkles />}
              {marcouPatrocinadores
                ? "Patrocinadores marcados"
                : `Marcar patrocinadores (+${REGRA_PONTOS.bonusPatrocinadores} pts)`}
            </Botao>
          </div>

          <div className="flex flex-col gap-2 border-t border-grafite-600 p-6 sm:flex-row">
            <Botao variante="contorno" largura="cheia" onClick={registrarOutro}>
              <Dumbbell />
              Registrar outro treino
            </Botao>
            <Botao asChild variante="contorno" largura="cheia">
              <Link href="/ranking">
                <Trophy />
                Ver ranking
              </Link>
            </Botao>
            <Botao asChild variante="fantasma" largura="cheia">
              <Link href="/dashboard">
                Voltar ao início
                <ArrowRight />
              </Link>
            </Botao>
          </div>
        </Cartao>

        <NotaDemo>
          O progresso, o ranking e as conquistas foram atualizados nesta demonstração e ficam salvos
          no navegador. Use o botão de reiniciar para voltar ao estado original.
        </NotaDemo>

        <ModalCompartilhar
          aberto={compartilhando}
          aoMudar={setCompartilhando}
          nome={usuario.nome}
          desafio={desafio.nome}
          pontos={resultado.pontos}
          posicao={resultado.posicao}
          sequencia={resultado.sequencia}
          tipoTreino={tipo}
          duracaoMin={duracao}
          patrocinadores={patrocinadores}
          patrocinadoresMarcados={marcouPatrocinadores}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 sm:px-6">
      <CabecalhoPagina
        sobretitulo={desafio.nome}
        titulo="Registrar treino"
        descricao="Envie o treino do dia para somar pontos, avançar na meta e movimentar o ranking."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <form className="space-y-4 lg:col-span-2" onSubmit={enviar} noValidate>
          <Cartao>
            <CartaoCabecalho titulo="Dados do treino" />
            <CartaoConteudo className="space-y-4 pt-4">
              <GrupoCampo rotulo="Tipo de treino" obrigatorio dica="toque para escolher">
                <SeletorModalidade valor={tipo} aoSelecionar={setTipo} />
              </GrupoCampo>

              <GrupoCampo rotulo="Data" htmlFor="data" obrigatorio erro={erros.data}>
                <Campo
                  id="data"
                  type="date"
                  value={data}
                  min={desafio.inicio}
                  max={DATA_DEMO}
                  onChange={(evento) => setData(evento.target.value)}
                  className="sm:w-56"
                />
              </GrupoCampo>

              <GrupoCampo
                rotulo="Duração"
                htmlFor="duracao"
                obrigatorio
                dica="em minutos"
                erro={erros.duracao}
              >
                <div className="flex flex-wrap gap-2">
                  {DURACOES.map((valor) => (
                    <button
                      key={valor}
                      type="button"
                      onClick={() => setDuracao(valor)}
                      className={cn(
                        "rounded-xl border px-4 py-2 text-sm font-semibold transition-colors",
                        duracao === valor
                          ? "border-lima-400 bg-lima-400/12 text-lima-300"
                          : "border-grafite-600 bg-grafite-800 text-nevoa hover:border-grafite-500",
                      )}
                    >
                      {valor} min
                    </button>
                  ))}
                  <Campo
                    id="duracao"
                    type="number"
                    min={20}
                    max={300}
                    value={duracao}
                    onChange={(evento) => setDuracao(Number(evento.target.value))}
                    className="w-28"
                    aria-label="Duração personalizada em minutos"
                  />
                </div>
              </GrupoCampo>

              <GrupoCampo
                rotulo="Observação"
                htmlFor="observacao"
                dica="opcional"
              >
                <AreaTexto
                  id="observacao"
                  value={observacao}
                  maxLength={280}
                  placeholder="Conte como foi o treino, cargas, percurso ou sensação."
                  onChange={(evento) => setObservacao(evento.target.value)}
                />
                <p className="mt-1.5 text-right text-xs text-fumaca">{observacao.length} de 280</p>
              </GrupoCampo>
            </CartaoConteudo>
          </Cartao>

          <Cartao>
            <CartaoCabecalho
              titulo="Foto do treino"
              descricao="A imagem fica apenas no seu navegador nesta demonstração."
            />
            <CartaoConteudo className="pt-4">
              <input
                ref={entradaArquivo}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={escolherFoto}
              />

              {foto ? (
                <div className="space-y-3">
                  <div className="relative h-56 w-full overflow-hidden rounded-xl border border-grafite-600">
                    <Image src={foto} alt="Prévia da foto do treino" fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex gap-2">
                    <Botao
                      type="button"
                      variante="contorno"
                      tamanho="sm"
                      onClick={() => entradaArquivo.current?.click()}
                    >
                      <ImageUp />
                      Trocar imagem
                    </Botao>
                    <Botao type="button" variante="perigo" tamanho="sm" onClick={() => setFoto(null)}>
                      <Trash2 />
                      Remover
                    </Botao>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => entradaArquivo.current?.click()}
                  className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-grafite-500 bg-grafite-800/60 px-6 py-10 text-center transition-colors hover:border-lima-400/60 hover:bg-grafite-800"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-grafite-700 text-lima-400">
                    <Camera className="size-5" />
                  </span>
                  <span className="text-sm font-semibold text-neve">
                    Clique para enviar a foto do treino
                  </span>
                  <span className="text-xs text-fumaca">JPG, PNG ou WEBP até 10 MB</span>
                </button>
              )}
            </CartaoConteudo>
          </Cartao>

          <Cartao>
            <CartaoConteudo className="space-y-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={aceitouRegras}
                  onChange={(evento) => {
                    setAceitouRegras(evento.target.checked);
                    if (evento.target.checked) setErros((atual) => ({ ...atual, regras: "" }));
                  }}
                  className="mt-0.5 size-4.5 shrink-0 accent-[#c6f24e]"
                />
                <span className="text-sm text-nevoa">
                  Confirmo que este treino segue as regras do desafio {desafio.nome}: atividade
                  realizada na data informada, com duração mínima e registro único no dia.
                </span>
              </label>
              {erros.regras ? <p className="text-xs text-perigo">{erros.regras}</p> : null}

              <Botao type="submit" tamanho="lg" largura="cheia" disabled={enviando}>
                {enviando ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-grafite-950 border-t-transparent" />
                    Enviando treino
                  </>
                ) : (
                  <>
                    <Dumbbell />
                    Enviar treino
                  </>
                )}
              </Botao>
            </CartaoConteudo>
          </Cartao>
        </form>

        <div className="space-y-4">
          <Cartao className="overflow-hidden">
            <div className="relative h-28 w-full">
              <Image
                src={foto ?? fotoDoTipo(tipo)}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover opacity-70"
                unoptimized={Boolean(foto)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-grafite-850 to-transparent" />
              <p className="absolute bottom-3 left-4 font-display text-lg font-bold text-neve">
                {tipo}
              </p>
            </div>
            <CartaoCabecalho titulo="Pontuação prevista" className="pt-4" />
            <CartaoConteudo className="space-y-3 pt-3">
              <p className="font-display text-4xl font-extrabold text-lima-400">
                +{pontosPrevistos}
                <span className="ml-1 text-base font-semibold text-fumaca">pts</span>
              </p>
              <ul className="space-y-2 text-sm text-nevoa">
                <li className="flex items-center justify-between gap-3">
                  <span>Treino válido</span>
                  <span className="font-semibold text-neve">{desafio.pontosPorTreino} pts</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span>Intensidade, {REGRA_PONTOS.minutosParaIntensidade} min ou mais</span>
                  <span
                    className={cn(
                      "font-semibold",
                      duracao >= REGRA_PONTOS.minutosParaIntensidade
                        ? "text-lima-400"
                        : "text-fumaca",
                    )}
                  >
                    +{REGRA_PONTOS.bonusIntensidade} pts
                  </span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span>Treino no fim de semana</span>
                  <span className="font-semibold text-fumaca">
                    +{REGRA_PONTOS.bonusFimDeSemana} pts
                  </span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span>Marcar patrocinadores</span>
                  <span className="font-semibold text-fumaca">
                    +{REGRA_PONTOS.bonusPatrocinadores} pts
                  </span>
                </li>
              </ul>
              <div className="border-t border-grafite-600 pt-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-fumaca">Volume estimado</span>
                  <span className="font-semibold text-neve">
                    {formatarNumero(volumeEstimado(tipo, duracao))} kg
                  </span>
                </div>
              </div>
            </CartaoConteudo>
          </Cartao>

          <Cartao>
            <CartaoCabecalho titulo="Situação no desafio" />
            <CartaoConteudo className="space-y-3 pt-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-fumaca">Progresso</span>
                <span className="font-semibold text-neve">
                  {progresso.concluidos} de {progresso.meta}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-fumaca">Posição</span>
                <span className="font-semibold text-neve">{ordinal(usuario.posicao)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-fumaca">Sequência</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-lima-400">
                  <Flame className="size-4" />
                  {usuario.sequencia} dias
                </span>
              </div>
            </CartaoConteudo>
          </Cartao>

          <NotaDemo>
            Esta tela demonstra o registro de treino de ponta a ponta. Nenhum arquivo é enviado para
            servidor nesta etapa.
          </NotaDemo>
        </div>
      </div>
    </div>
  );
}
