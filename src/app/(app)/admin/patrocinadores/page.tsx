"use client";

import { useState } from "react";
import { Handshake, Pencil, Plus, Power } from "lucide-react";
import { toast } from "sonner";
import { CabecalhoPagina } from "@/componentes/dominio/cabecalho-pagina";
import { LogoPatrocinador } from "@/componentes/dominio/patrocinadores";
import { EstadoVazio, NotaDemo, Selo } from "@/componentes/ui/basicos";
import { Botao } from "@/componentes/ui/botao";
import { Cartao, CartaoConteudo } from "@/componentes/ui/cartao";
import { Dialogo } from "@/componentes/ui/dialogo";
import { AreaTexto, Campo, GrupoCampo } from "@/componentes/ui/formulario";
import type { Patrocinador } from "@/dados/tipos";
import { useDemo } from "@/estado/store";
import { cn } from "@/lib/utils";

const CORES = ["#c6f24e", "#4a8cf7", "#f6c445", "#3ecf8e", "#f2545b", "#b3bcc9"];

function monogramaDe(nome: string) {
  const partes = nome.trim().split(/\s+/);
  const primeira = partes[0]?.[0] ?? "M";
  const segunda = partes[1]?.[0] ?? partes[0]?.[1] ?? "P";
  return (primeira + segunda).toUpperCase();
}

export default function PaginaAdminPatrocinadores() {
  const { estado, salvarPatrocinador, alternarPatrocinador } = useDemo();
  const [aberto, setAberto] = useState(false);
  const [editando, setEditando] = useState<Patrocinador | null>(null);

  const [nome, setNome] = useState("");
  const [segmento, setSegmento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [beneficio, setBeneficio] = useState("");
  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState("");
  const [cor, setCor] = useState(CORES[0]);
  const [desafiosIds, setDesafiosIds] = useState<string[]>([]);
  const [erros, setErros] = useState<Record<string, string>>({});

  function abrir(patrocinador: Patrocinador | null) {
    setEditando(patrocinador);
    setNome(patrocinador?.nome ?? "");
    setSegmento(patrocinador?.segmento ?? "");
    setDescricao(patrocinador?.descricao ?? "");
    setBeneficio(patrocinador?.beneficio ?? "");
    setCupom(patrocinador?.cupom ?? "");
    setDesconto(patrocinador?.desconto ?? "");
    setCor(patrocinador?.cor ?? CORES[0]);
    setDesafiosIds(patrocinador?.desafiosIds ?? []);
    setErros({});
    setAberto(true);
  }

  function salvar(evento: React.FormEvent) {
    evento.preventDefault();

    const novos: Record<string, string> = {};
    if (!nome.trim()) novos.nome = "Informe o nome da marca.";
    if (!segmento.trim()) novos.segmento = "Informe o segmento de atuação.";
    if (!beneficio.trim()) novos.beneficio = "Descreva o benefício oferecido.";
    if (!cupom.trim()) novos.cupom = "Informe o código do cupom.";
    setErros(novos);
    if (Object.keys(novos).length > 0) return;

    const id =
      editando?.id ??
      nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    salvarPatrocinador({
      id,
      nome: nome.trim(),
      segmento: segmento.trim(),
      descricao: descricao.trim() || `Marca parceira do segmento de ${segmento.trim()}.`,
      beneficio: beneficio.trim(),
      cupom: cupom.trim().toUpperCase(),
      desconto: desconto.trim() || "Benefício exclusivo",
      desafiosIds,
      ativo: editando?.ativo ?? true,
      cor,
      monograma: editando?.monograma ?? monogramaDe(nome),
    });

    toast.success(editando ? "Patrocinador atualizado" : "Patrocinador cadastrado", {
      description: `${nome.trim()} está vinculado a ${desafiosIds.length} campanha${
        desafiosIds.length === 1 ? "" : "s"
      }.`,
    });
    setAberto(false);
  }

  function alternarDesafio(id: string) {
    setDesafiosIds((atual) =>
      atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id],
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6">
      <CabecalhoPagina
        sobretitulo="Painel administrativo"
        titulo="Gestão de patrocinadores"
        descricao="Cadastre marcas, defina benefícios e cupons, vincule campanhas e controle a exibição no aplicativo."
        acao={
          <Botao onClick={() => abrir(null)}>
            <Plus />
            Cadastrar patrocinador
          </Botao>
        }
      />

      {estado.patrocinadores.length === 0 ? (
        <EstadoVazio
          icone={<Handshake />}
          titulo="Nenhum patrocinador cadastrado"
          mensagem="Cadastre a primeira marca parceira para começar a oferecer benefícios aos participantes."
          acao={<Botao onClick={() => abrir(null)}>Cadastrar patrocinador</Botao>}
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {estado.patrocinadores.map((patrocinador) => {
            const campanhas = patrocinador.desafiosIds
              .map((id) => estado.desafios.find((desafio) => desafio.id === id)?.nome)
              .filter((nomeCampanha): nomeCampanha is string => Boolean(nomeCampanha));

            return (
              <Cartao key={patrocinador.id}>
                <CartaoConteudo className="space-y-4">
                  <div className="flex items-start gap-4">
                    <LogoPatrocinador patrocinador={patrocinador} tamanho="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate font-display text-lg font-bold text-neve">
                          {patrocinador.nome}
                        </h3>
                        {patrocinador.ativo ? (
                          <Selo tom="sucesso">Ativo</Selo>
                        ) : (
                          <Selo tom="neutro">Inativo</Selo>
                        )}
                      </div>
                      <p className="text-xs text-fumaca">{patrocinador.segmento}</p>
                      <p className="mt-2 line-clamp-2 text-sm text-nevoa">
                        {patrocinador.beneficio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-lg border border-dashed border-grafite-500 px-2.5 py-1 font-mono font-bold text-neve">
                      {patrocinador.cupom}
                    </span>
                    <span className="font-semibold text-lima-400">{patrocinador.desconto}</span>
                    <span className="text-fumaca">
                      {campanhas.length === 0
                        ? "sem campanha vinculada"
                        : `${campanhas.length} campanha${campanhas.length === 1 ? "" : "s"}`}
                    </span>
                  </div>

                  {campanhas.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {campanhas.map((campanha) => (
                        <Selo key={campanha} tom="neutro">
                          {campanha}
                        </Selo>
                      ))}
                    </div>
                  ) : null}

                  <div className="flex gap-2 border-t border-grafite-600 pt-4">
                    <Botao
                      variante="contorno"
                      tamanho="sm"
                      largura="cheia"
                      onClick={() => abrir(patrocinador)}
                    >
                      <Pencil />
                      Editar
                    </Botao>
                    <Botao
                      variante={patrocinador.ativo ? "suave" : "estrutural"}
                      tamanho="sm"
                      largura="cheia"
                      onClick={() => {
                        alternarPatrocinador(patrocinador.id);
                        toast.success(
                          patrocinador.ativo ? "Patrocinador desativado" : "Patrocinador ativado",
                          {
                            description: patrocinador.ativo
                              ? `${patrocinador.nome} deixa de aparecer para os participantes.`
                              : `${patrocinador.nome} volta a aparecer nas telas do participante.`,
                          },
                        );
                      }}
                    >
                      <Power />
                      {patrocinador.ativo ? "Desativar" : "Ativar"}
                    </Botao>
                  </div>
                </CartaoConteudo>
              </Cartao>
            );
          })}
        </div>
      )}

      <NotaDemo>
        Esta tela demonstra a gestão comercial das marcas. Ao desativar um patrocinador, ele some da
        área de patrocinadores do participante imediatamente.
      </NotaDemo>

      <Dialogo
        aberto={aberto}
        aoMudar={setAberto}
        titulo={editando ? "Editar patrocinador" : "Cadastrar patrocinador"}
        descricao="As informações aparecem na área de patrocinadores e nos desafios vinculados."
      >
        <form onSubmit={salvar} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <GrupoCampo rotulo="Nome da marca" htmlFor="marca" obrigatorio erro={erros.nome}>
              <Campo
                id="marca"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                placeholder="Ex.: Vita Suplementos"
              />
            </GrupoCampo>
            <GrupoCampo rotulo="Segmento" htmlFor="segmento" obrigatorio erro={erros.segmento}>
              <Campo
                id="segmento"
                value={segmento}
                onChange={(evento) => setSegmento(evento.target.value)}
                placeholder="Ex.: Suplementação"
              />
            </GrupoCampo>
          </div>

          <GrupoCampo rotulo="Descrição" htmlFor="descricao-marca" dica="opcional">
            <AreaTexto
              id="descricao-marca"
              value={descricao}
              onChange={(evento) => setDescricao(evento.target.value)}
              placeholder="Breve apresentação da marca para os participantes."
            />
          </GrupoCampo>

          <GrupoCampo rotulo="Benefício" htmlFor="beneficio" obrigatorio erro={erros.beneficio}>
            <AreaTexto
              id="beneficio"
              value={beneficio}
              onChange={(evento) => setBeneficio(evento.target.value)}
              placeholder="Ex.: 15% de desconto para participantes ativos do desafio."
            />
          </GrupoCampo>

          <div className="grid gap-4 sm:grid-cols-2">
            <GrupoCampo rotulo="Cupom" htmlFor="cupom" obrigatorio erro={erros.cupom}>
              <Campo
                id="cupom"
                value={cupom}
                onChange={(evento) => setCupom(evento.target.value.toUpperCase())}
                placeholder="HUBFIT15"
              />
            </GrupoCampo>
            <GrupoCampo rotulo="Desconto" htmlFor="desconto" dica="texto exibido">
              <Campo
                id="desconto"
                value={desconto}
                onChange={(evento) => setDesconto(evento.target.value)}
                placeholder="15% OFF"
              />
            </GrupoCampo>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-nevoa">Cor da marca</p>
            <div className="flex flex-wrap gap-2">
              {CORES.map((opcao) => (
                <button
                  key={opcao}
                  type="button"
                  onClick={() => setCor(opcao)}
                  aria-label={`Selecionar cor ${opcao}`}
                  className={cn(
                    "size-9 rounded-xl border-2 transition-transform",
                    cor === opcao ? "border-neve scale-110" : "border-transparent",
                  )}
                  style={{ backgroundColor: opcao }}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-nevoa">Campanhas vinculadas</p>
            <div className="flex flex-wrap gap-2">
              {estado.desafios.map((desafio) => {
                const marcado = desafiosIds.includes(desafio.id);
                return (
                  <button
                    key={desafio.id}
                    type="button"
                    onClick={() => alternarDesafio(desafio.id)}
                    aria-pressed={marcado}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-sm font-semibold transition-colors",
                      marcado
                        ? "border-lima-400 bg-lima-400/12 text-lima-300"
                        : "border-grafite-600 bg-grafite-800 text-nevoa hover:border-grafite-500",
                    )}
                  >
                    {desafio.nome}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-grafite-600 pt-4 sm:flex-row sm:justify-end">
            <Botao type="button" variante="contorno" onClick={() => setAberto(false)}>
              Cancelar
            </Botao>
            <Botao type="submit">{editando ? "Salvar alterações" : "Cadastrar"}</Botao>
          </div>
        </form>
      </Dialogo>
    </div>
  );
}
