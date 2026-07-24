"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Copy, Handshake, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { CabecalhoPagina } from "@/componentes/dominio/cabecalho-pagina";
import { CartaoPatrocinador, LogoPatrocinador } from "@/componentes/dominio/patrocinadores";
import { Dialogo } from "@/componentes/ui/dialogo";
import { EstadoVazio, EtiquetaDemonstrativa, NotaDemo, Selo } from "@/componentes/ui/basicos";
import { Botao } from "@/componentes/ui/botao";
import { Cartao } from "@/componentes/ui/cartao";
import type { Patrocinador } from "@/dados/tipos";
import { useDemo } from "@/estado/store";
import { cn } from "@/lib/utils";

export default function PaginaPatrocinadores() {
  const { estado } = useDemo();
  const [somenteAtivos, setSomenteAtivos] = useState(true);
  const [detalhe, setDetalhe] = useState<Patrocinador | null>(null);

  const listagem = useMemo(
    () =>
      estado.patrocinadores.filter((patrocinador) => (somenteAtivos ? patrocinador.ativo : true)),
    [estado.patrocinadores, somenteAtivos],
  );

  function nomesDosDesafios(patrocinador: Patrocinador) {
    return patrocinador.desafiosIds
      .map((id) => estado.desafios.find((desafio) => desafio.id === id)?.nome)
      .filter((nome): nome is string => Boolean(nome));
  }

  async function copiarCupom(cupom: string) {
    try {
      await navigator.clipboard.writeText(cupom);
      toast.success("Cupom copiado", { description: `${cupom} está na área de transferência.` });
    } catch {
      toast("Cupom demonstrativo", { description: `Use o código ${cupom} na versão oficial.` });
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6">
      <CabecalhoPagina
        sobretitulo="Marcas parceiras"
        titulo="Patrocinadores"
        descricao="Marcas que apoiam os desafios e oferecem benefícios aos participantes ativos. Todas as marcas e cupons desta tela são demonstrativos."
      />

      <Cartao className="relative overflow-hidden">
        <div className="relative h-40 w-full sm:h-48">
          <Image
            src="/fotos/patrocinio.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-grafite-850 via-grafite-850/85 to-transparent" />
          <div className="absolute inset-y-0 left-0 flex max-w-lg flex-col justify-center gap-2 p-5 sm:p-6">
            <Selo tom="lima">Espaço do patrocinador</Selo>
            <h2 className="font-display text-xl font-extrabold text-neve sm:text-2xl">
              Sua marca dentro do desafio, com público engajado
            </h2>
            <p className="text-sm text-fumaca">
              Visibilidade nas telas do participante, cupons exclusivos e relatórios de ativação por
              campanha.
            </p>
          </div>
        </div>
      </Cartao>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSomenteAtivos(true)}
          className={cn(
            "rounded-xl border px-4 py-2 text-sm font-semibold transition-colors",
            somenteAtivos
              ? "border-damatech-500 bg-damatech-500 text-white"
              : "border-grafite-600 bg-grafite-850 text-nevoa hover:border-grafite-500",
          )}
        >
          Ativos
        </button>
        <button
          type="button"
          onClick={() => setSomenteAtivos(false)}
          className={cn(
            "rounded-xl border px-4 py-2 text-sm font-semibold transition-colors",
            !somenteAtivos
              ? "border-damatech-500 bg-damatech-500 text-white"
              : "border-grafite-600 bg-grafite-850 text-nevoa hover:border-grafite-500",
          )}
        >
          Todos
        </button>
      </div>

      {listagem.length === 0 ? (
        <EstadoVazio
          icone={<Handshake />}
          titulo="Nenhum patrocinador ativo"
          mensagem="Assim que uma marca for ativada no painel administrativo, ela aparece aqui para os participantes."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {listagem.map((patrocinador) => (
            <CartaoPatrocinador
              key={patrocinador.id}
              patrocinador={patrocinador}
              desafios={nomesDosDesafios(patrocinador)}
              acao={
                <Botao largura="cheia" onClick={() => setDetalhe(patrocinador)}>
                  <Sparkles />
                  Ver benefício
                </Botao>
              }
            />
          ))}
        </div>
      )}

      <NotaDemo>
        Esta tela demonstra a área de patrocinadores vista pelo participante. As marcas, os cupons e
        os descontos são fictícios e servem para ilustrar o modelo de monetização.
      </NotaDemo>

      <Dialogo
        aberto={Boolean(detalhe)}
        aoMudar={(aberto) => !aberto && setDetalhe(null)}
        titulo={detalhe ? `Benefício ${detalhe.nome}` : ""}
        descricao={detalhe?.segmento}
        largura="sm"
        rodape={
          <>
            <Botao variante="contorno" onClick={() => setDetalhe(null)}>
              Fechar
            </Botao>
            {detalhe ? (
              <Botao onClick={() => copiarCupom(detalhe.cupom)}>
                <Copy />
                Copiar cupom
              </Botao>
            ) : null}
          </>
        }
      >
        {detalhe ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <LogoPatrocinador patrocinador={detalhe} tamanho="lg" />
              <div>
                <p className="font-display text-lg font-bold text-neve">{detalhe.nome}</p>
                <p className="text-xs text-fumaca">{detalhe.segmento}</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-nevoa">{detalhe.beneficio}</p>

            <div className="rounded-xl border border-dashed border-grafite-500 bg-grafite-800 p-4 text-center">
              <p className="font-mono text-xl font-bold tracking-[0.2em] text-lima-400">
                {detalhe.cupom}
              </p>
              <p className="mt-1 text-sm text-nevoa">{detalhe.desconto}</p>
              <EtiquetaDemonstrativa>Cupom demonstrativo</EtiquetaDemonstrativa>
            </div>

            <p className="text-xs text-fumaca">
              Na versão oficial, o resgate do benefício pode ser integrado ao site da marca ou
              validado por código único por participante.
            </p>
          </div>
        ) : null}
      </Dialogo>
    </div>
  );
}
