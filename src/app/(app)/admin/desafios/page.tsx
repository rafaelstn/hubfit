"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Flame, Pencil, Play, Plus, Square, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { FormularioDesafio } from "@/componentes/admin/formulario-desafio";
import { CabecalhoPagina } from "@/componentes/dominio/cabecalho-pagina";
import { SeloSituacao } from "@/componentes/dominio/cartao-desafio";
import { EstadoVazio, NotaDemo, Progresso } from "@/componentes/ui/basicos";
import { Botao } from "@/componentes/ui/botao";
import { Cartao, CartaoConteudo } from "@/componentes/ui/cartao";
import { Dialogo, DialogoConfirmacao } from "@/componentes/ui/dialogo";
import type { Desafio } from "@/dados/tipos";
import { useDemo } from "@/estado/store";
import { formatarMoeda, formatarNumero, formatarPeriodo } from "@/lib/formato";

export default function PaginaAdminDesafios() {
  const { estado, salvarDesafio, removerDesafio, alterarSituacaoDesafio } = useDemo();
  const [editando, setEditando] = useState<Desafio | null>(null);
  const [formularioAberto, setFormularioAberto] = useState(false);
  const [removendo, setRemovendo] = useState<Desafio | null>(null);
  const [participantesDe, setParticipantesDe] = useState<Desafio | null>(null);

  function abrirNovo() {
    setEditando(null);
    setFormularioAberto(true);
  }

  function abrirEdicao(desafio: Desafio) {
    setEditando(desafio);
    setFormularioAberto(true);
  }

  function salvar(desafio: Desafio) {
    salvarDesafio(desafio);
    setFormularioAberto(false);
    toast.success(editando ? "Desafio atualizado" : "Desafio criado", {
      description: `${desafio.nome} está na listagem com meta de ${desafio.metaTreinos} treinos.`,
    });
    setEditando(null);
  }

  function alternarSituacao(desafio: Desafio) {
    const proxima = desafio.situacao === "ativo" ? "encerrado" : "ativo";
    alterarSituacaoDesafio(desafio.id, proxima);
    toast.success(proxima === "ativo" ? "Desafio ativado" : "Desafio encerrado", {
      description:
        proxima === "ativo"
          ? `${desafio.nome} passou a ser a campanha em andamento.`
          : `${desafio.nome} foi encerrado e sai do fluxo de registro.`,
    });
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6">
      <CabecalhoPagina
        sobretitulo="Painel administrativo"
        titulo="Gestão de desafios"
        descricao="Crie campanhas, defina período, regras, pontuação, premiação e marcas parceiras."
        acao={
          <Botao onClick={abrirNovo}>
            <Plus />
            Criar desafio
          </Botao>
        }
      />

      {estado.desafios.length === 0 ? (
        <EstadoVazio
          icone={<Flame />}
          titulo="Nenhum desafio cadastrado"
          mensagem="Crie a primeira campanha para abrir inscrições e começar a receber registros de treino."
          acao={<Botao onClick={abrirNovo}>Criar desafio</Botao>}
        />
      ) : (
        <div className="space-y-3">
          {estado.desafios.map((desafio) => {
            const ocupacao = Math.min(100, Math.round((desafio.participantes / 400) * 100));
            return (
              <Cartao key={desafio.id}>
                <CartaoConteudo className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg font-bold text-neve">{desafio.nome}</h3>
                      <SeloSituacao situacao={desafio.situacao} />
                    </div>
                    <p className="mt-1 text-sm text-fumaca">{desafio.chamada}</p>
                    <p className="mt-2 text-xs text-fumaca">
                      {formatarPeriodo(desafio.inicio, desafio.fim)} · meta de {desafio.metaTreinos}{" "}
                      treinos · {desafio.pontosPorTreino} pts por treino ·{" "}
                      {formatarMoeda(desafio.premiacaoTotal)} em prêmios
                    </p>
                  </div>

                  <div className="w-full lg:w-48">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-fumaca">Inscritos</span>
                      <span className="font-semibold text-neve">
                        {formatarNumero(desafio.participantes)}
                      </span>
                    </div>
                    <Progresso valor={ocupacao} className="mt-1.5" tom="azul" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Botao
                      variante="contorno"
                      tamanho="sm"
                      onClick={() => setParticipantesDe(desafio)}
                    >
                      <Users />
                      Participantes
                    </Botao>
                    <Botao asChild variante="fantasma" tamanho="icone" aria-label="Ver página">
                      <Link href={`/desafios/${desafio.id}`}>
                        <Eye />
                      </Link>
                    </Botao>
                    <Botao
                      variante="fantasma"
                      tamanho="icone"
                      aria-label="Editar desafio"
                      onClick={() => abrirEdicao(desafio)}
                    >
                      <Pencil />
                    </Botao>
                    <Botao
                      variante={desafio.situacao === "ativo" ? "suave" : "estrutural"}
                      tamanho="sm"
                      onClick={() => alternarSituacao(desafio)}
                    >
                      {desafio.situacao === "ativo" ? <Square /> : <Play />}
                      {desafio.situacao === "ativo" ? "Encerrar" : "Ativar"}
                    </Botao>
                    <Botao
                      variante="perigo"
                      tamanho="icone"
                      aria-label="Remover desafio"
                      onClick={() => setRemovendo(desafio)}
                    >
                      <Trash2 />
                    </Botao>
                  </div>
                </CartaoConteudo>
              </Cartao>
            );
          })}
        </div>
      )}

      <NotaDemo>
        Esta tela demonstra a gestão das campanhas. Tudo que for criado, editado, ativado ou
        encerrado aqui aparece na hora nas telas do participante.
      </NotaDemo>

      <Dialogo
        aberto={formularioAberto}
        aoMudar={setFormularioAberto}
        titulo={editando ? "Editar desafio" : "Criar desafio"}
        descricao="Os campos abaixo alimentam a página pública da campanha."
        largura="lg"
      >
        <FormularioDesafio
          desafio={editando}
          patrocinadores={estado.patrocinadores}
          aoSalvar={salvar}
          aoCancelar={() => setFormularioAberto(false)}
        />
      </Dialogo>

      <DialogoConfirmacao
        aberto={Boolean(removendo)}
        aoMudar={(aberto) => !aberto && setRemovendo(null)}
        titulo="Remover desafio"
        mensagem={`O desafio ${removendo?.nome ?? ""} sai da listagem da demonstração. Use o botão de reiniciar para restaurar os dados originais.`}
        rotuloConfirmar="Remover"
        varianteConfirmar="perigo"
        aoConfirmar={() => {
          if (!removendo) return;
          removerDesafio(removendo.id);
          toast.success("Desafio removido", { description: `${removendo.nome} saiu da listagem.` });
          setRemovendo(null);
        }}
      />

      <Dialogo
        aberto={Boolean(participantesDe)}
        aoMudar={(aberto) => !aberto && setParticipantesDe(null)}
        titulo={participantesDe ? `Participantes de ${participantesDe.nome}` : ""}
        descricao="Lista demonstrativa com os participantes acompanhados na plataforma."
      >
        <div className="space-y-2">
          {estado.participantes.map((participante) => (
            <div
              key={participante.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-grafite-600 bg-grafite-800 px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-neve">{participante.nome}</p>
                <p className="truncate text-xs text-fumaca">
                  {participante.treinos} treinos · {participante.cidade}
                </p>
              </div>
              <span className="shrink-0 text-sm font-bold text-lima-400">
                {formatarNumero(participante.pontos)} pts
              </span>
            </div>
          ))}
        </div>
      </Dialogo>
    </div>
  );
}
