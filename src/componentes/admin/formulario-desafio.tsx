"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import { Botao } from "@/componentes/ui/botao";
import { AreaTexto, Campo, GrupoCampo, Selecao } from "@/componentes/ui/formulario";
import type { Desafio, Patrocinador, Premio, SituacaoDesafio } from "@/dados/tipos";
import { cn } from "@/lib/utils";

const IMAGENS = [
  { arquivo: "/fotos/desafio-forca.jpg", nome: "Força" },
  { arquivo: "/fotos/desafio-verao.jpg", nome: "Ao ar livre" },
  { arquivo: "/fotos/desafio-21dias.jpg", nome: "Rotina" },
  { arquivo: "/fotos/desafio-evolucao.jpg", nome: "Evolução" },
];

function gerarId(nome: string) {
  const base = nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return base || `desafio-${Math.random().toString(36).slice(2, 7)}`;
}

export function FormularioDesafio({
  desafio,
  patrocinadores,
  aoSalvar,
  aoCancelar,
}: {
  desafio: Desafio | null;
  patrocinadores: Patrocinador[];
  aoSalvar: (desafio: Desafio) => void;
  aoCancelar: () => void;
}) {
  const [nome, setNome] = useState(desafio?.nome ?? "");
  const [chamada, setChamada] = useState(desafio?.chamada ?? "");
  const [descricao, setDescricao] = useState(desafio?.descricao ?? "");
  const [situacao, setSituacao] = useState<SituacaoDesafio>(desafio?.situacao ?? "futuro");
  const [inicio, setInicio] = useState(desafio?.inicio ?? "");
  const [fim, setFim] = useState(desafio?.fim ?? "");
  const [metaTreinos, setMetaTreinos] = useState(desafio?.metaTreinos ?? 20);
  const [pontosPorTreino, setPontosPorTreino] = useState(desafio?.pontosPorTreino ?? 150);
  const [premiacaoTotal, setPremiacaoTotal] = useState(desafio?.premiacaoTotal ?? 5000);
  const [regras, setRegras] = useState((desafio?.regras ?? []).join("\n"));
  const [premios, setPremios] = useState<Premio[]>(
    desafio?.premios ?? [{ colocacao: "1º lugar", descricao: "" }],
  );
  const [selecionados, setSelecionados] = useState<string[]>(desafio?.patrocinadoresIds ?? []);
  const [imagem, setImagem] = useState(desafio?.imagem ?? IMAGENS[0].arquivo);
  const [erros, setErros] = useState<Record<string, string>>({});

  function alternarPatrocinador(id: string) {
    setSelecionados((atual) =>
      atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id],
    );
  }

  function atualizarPremio(indice: number, campo: keyof Premio, valor: string) {
    setPremios((atual) =>
      atual.map((premio, posicao) =>
        posicao === indice ? { ...premio, [campo]: valor } : premio,
      ),
    );
  }

  function salvar(evento: React.FormEvent) {
    evento.preventDefault();

    const novos: Record<string, string> = {};
    if (!nome.trim()) novos.nome = "Informe o nome do desafio.";
    if (!chamada.trim()) novos.chamada = "Informe a chamada que aparece no card.";
    if (!inicio) novos.inicio = "Informe a data de início.";
    if (!fim) novos.fim = "Informe a data de encerramento.";
    if (inicio && fim && fim <= inicio) novos.fim = "O encerramento precisa ser depois do início.";
    if (metaTreinos < 1) novos.metaTreinos = "A meta precisa ser de pelo menos 1 treino.";
    if (pontosPorTreino < 1) novos.pontosPorTreino = "Informe a pontuação por treino.";
    const listaRegras = regras
      .split("\n")
      .map((linha) => linha.trim())
      .filter(Boolean);
    if (listaRegras.length === 0) novos.regras = "Cadastre ao menos uma regra.";

    setErros(novos);
    if (Object.keys(novos).length > 0) return;

    aoSalvar({
      id: desafio?.id ?? gerarId(nome),
      nome: nome.trim(),
      chamada: chamada.trim(),
      descricao: descricao.trim() || chamada.trim(),
      situacao,
      inicio,
      fim,
      metaTreinos,
      pontosPorTreino,
      participantes: desafio?.participantes ?? 0,
      premiacaoTotal,
      premios: premios.filter((premio) => premio.colocacao.trim() && premio.descricao.trim()),
      regras: listaRegras,
      patrocinadoresIds: selecionados,
      banner: desafio?.banner ?? "from-lima-400/25 via-grafite-850 to-damatech-500/25",
      imagem,
      criadoNaDemo: desafio?.criadoNaDemo ?? !desafio,
    });
  }

  return (
    <form onSubmit={salvar} className="space-y-5" noValidate>
      <GrupoCampo rotulo="Nome do desafio" htmlFor="nome" obrigatorio erro={erros.nome}>
        <Campo
          id="nome"
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          placeholder="Ex.: Setembro Sem Desculpas"
        />
      </GrupoCampo>

      <GrupoCampo rotulo="Chamada" htmlFor="chamada" obrigatorio erro={erros.chamada}>
        <Campo
          id="chamada"
          value={chamada}
          onChange={(evento) => setChamada(evento.target.value)}
          placeholder="Frase curta que aparece no card do desafio"
        />
      </GrupoCampo>

      <GrupoCampo rotulo="Descrição" htmlFor="descricao" dica="opcional">
        <AreaTexto
          id="descricao"
          value={descricao}
          onChange={(evento) => setDescricao(evento.target.value)}
          placeholder="Explique o objetivo da campanha e o que o participante precisa fazer."
        />
      </GrupoCampo>

      <div className="grid gap-4 sm:grid-cols-3">
        <GrupoCampo rotulo="Situação" htmlFor="situacao">
          <Selecao
            id="situacao"
            value={situacao}
            onChange={(evento) => setSituacao(evento.target.value as SituacaoDesafio)}
          >
            <option value="futuro">Programado</option>
            <option value="ativo">Em andamento</option>
            <option value="encerrado">Encerrado</option>
          </Selecao>
        </GrupoCampo>

        <GrupoCampo rotulo="Início" htmlFor="inicio" obrigatorio erro={erros.inicio}>
          <Campo
            id="inicio"
            type="date"
            value={inicio}
            onChange={(evento) => setInicio(evento.target.value)}
          />
        </GrupoCampo>

        <GrupoCampo rotulo="Encerramento" htmlFor="fim" obrigatorio erro={erros.fim}>
          <Campo id="fim" type="date" value={fim} onChange={(evento) => setFim(evento.target.value)} />
        </GrupoCampo>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <GrupoCampo
          rotulo="Meta de treinos"
          htmlFor="meta"
          obrigatorio
          erro={erros.metaTreinos}
        >
          <Campo
            id="meta"
            type="number"
            min={1}
            max={60}
            value={metaTreinos}
            onChange={(evento) => setMetaTreinos(Number(evento.target.value))}
          />
        </GrupoCampo>

        <GrupoCampo
          rotulo="Pontos por treino"
          htmlFor="pontos"
          obrigatorio
          erro={erros.pontosPorTreino}
        >
          <Campo
            id="pontos"
            type="number"
            min={1}
            max={1000}
            step={10}
            value={pontosPorTreino}
            onChange={(evento) => setPontosPorTreino(Number(evento.target.value))}
          />
        </GrupoCampo>

        <GrupoCampo rotulo="Premiação total" htmlFor="premiacao" dica="em reais">
          <Campo
            id="premiacao"
            type="number"
            min={0}
            step={500}
            value={premiacaoTotal}
            onChange={(evento) => setPremiacaoTotal(Number(evento.target.value))}
          />
        </GrupoCampo>
      </div>

      <GrupoCampo
        rotulo="Regras"
        htmlFor="regras"
        obrigatorio
        dica="uma por linha"
        erro={erros.regras}
      >
        <AreaTexto
          id="regras"
          value={regras}
          onChange={(evento) => setRegras(evento.target.value)}
          className="min-h-32"
          placeholder={"Registrar 20 treinos no período.\nFoto obrigatória em cada registro."}
        />
      </GrupoCampo>

      <div>
        <p className="mb-2 text-sm font-medium text-nevoa">Premiação por colocação</p>
        <div className="space-y-2">
          {premios.map((premio, indice) => (
            <div key={indice} className="flex flex-col gap-2 sm:flex-row">
              <Campo
                value={premio.colocacao}
                onChange={(evento) => atualizarPremio(indice, "colocacao", evento.target.value)}
                placeholder="1º lugar"
                className="sm:w-40"
                aria-label={`Colocação do prêmio ${indice + 1}`}
              />
              <Campo
                value={premio.descricao}
                onChange={(evento) => atualizarPremio(indice, "descricao", evento.target.value)}
                placeholder="Prêmio oferecido"
                aria-label={`Descrição do prêmio ${indice + 1}`}
              />
              <Botao
                type="button"
                variante="perigo"
                tamanho="icone"
                aria-label={`Remover prêmio ${indice + 1}`}
                onClick={() => setPremios((atual) => atual.filter((_, i) => i !== indice))}
              >
                <Trash2 />
              </Botao>
            </div>
          ))}
        </div>
        <Botao
          type="button"
          variante="contorno"
          tamanho="sm"
          className="mt-2"
          onClick={() =>
            setPremios((atual) => [...atual, { colocacao: "", descricao: "" }])
          }
        >
          <Plus />
          Adicionar prêmio
        </Botao>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-nevoa">Patrocinadores da campanha</p>
        <div className="flex flex-wrap gap-2">
          {patrocinadores.map((patrocinador) => {
            const marcado = selecionados.includes(patrocinador.id);
            return (
              <button
                key={patrocinador.id}
                type="button"
                onClick={() => alternarPatrocinador(patrocinador.id)}
                aria-pressed={marcado}
                className={cn(
                  "rounded-xl border px-3 py-2 text-sm font-semibold transition-colors",
                  marcado
                    ? "border-lima-400 bg-lima-400/12 text-lima-300"
                    : "border-grafite-600 bg-grafite-800 text-nevoa hover:border-grafite-500",
                )}
              >
                {patrocinador.nome}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-nevoa">Imagem do banner</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {IMAGENS.map((opcao) => (
            <button
              key={opcao.arquivo}
              type="button"
              onClick={() => setImagem(opcao.arquivo)}
              className={cn(
                "relative h-20 overflow-hidden rounded-xl border transition-colors",
                imagem === opcao.arquivo
                  ? "border-lima-400"
                  : "border-grafite-600 hover:border-grafite-500",
              )}
            >
              <Image src={opcao.arquivo} alt={opcao.nome} fill sizes="180px" className="object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-grafite-950/70 py-1 text-center text-[11px] font-semibold text-neve">
                {opcao.nome}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t border-grafite-600 pt-4 sm:flex-row sm:justify-end">
        <Botao type="button" variante="contorno" onClick={aoCancelar}>
          Cancelar
        </Botao>
        <Botao type="submit">{desafio ? "Salvar alterações" : "Criar desafio"}</Botao>
      </div>
    </form>
  );
}
