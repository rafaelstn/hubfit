"use client";

import { useMemo, useState } from "react";
import { Ban, CheckCircle2, Eye, Search, Users } from "lucide-react";
import { toast } from "sonner";
import { CabecalhoPagina } from "@/componentes/dominio/cabecalho-pagina";
import { Avatar, EstadoVazio, NotaDemo, Progresso, Selo } from "@/componentes/ui/basicos";
import { Botao } from "@/componentes/ui/botao";
import { Cartao, CartaoConteudo } from "@/componentes/ui/cartao";
import { Dialogo } from "@/componentes/ui/dialogo";
import { Campo, Selecao } from "@/componentes/ui/formulario";
import type { ParticipanteClassificado, StatusParticipante } from "@/dados/tipos";
import { classificar, desafioAtivoDe } from "@/estado/seletores";
import { useDemo } from "@/estado/store";
import { formatarData, formatarNumero, ordinal } from "@/lib/formato";

const ROTULO_STATUS: Record<StatusParticipante, string> = {
  ativo: "Ativo",
  pendente: "Pendente",
  bloqueado: "Bloqueado",
};

function SeloStatus({ status }: { status: StatusParticipante }) {
  if (status === "ativo") return <Selo tom="sucesso">Ativo</Selo>;
  if (status === "pendente") return <Selo tom="alerta">Pendente</Selo>;
  return <Selo tom="perigo">Bloqueado</Selo>;
}

export default function PaginaAdminParticipantes() {
  const { estado, definirStatusParticipante } = useDemo();
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<StatusParticipante | "todos">("todos");
  const [detalhe, setDetalhe] = useState<ParticipanteClassificado | null>(null);
  const desafio = desafioAtivoDe(estado);

  const ranking = useMemo(() => classificar(estado.participantes), [estado.participantes]);

  const listagem = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return ranking.filter((participante) => {
      const combina =
        !termo ||
        participante.nome.toLowerCase().includes(termo) ||
        participante.apelido.toLowerCase().includes(termo) ||
        participante.cidade.toLowerCase().includes(termo);
      const status = filtro === "todos" || participante.status === filtro;
      return combina && status;
    });
  }, [ranking, busca, filtro]);

  function alterarStatus(participante: ParticipanteClassificado, status: StatusParticipante) {
    definirStatusParticipante(participante.id, status);
    setDetalhe(null);
    toast.success(status === "ativo" ? "Participante aprovado" : "Participante bloqueado", {
      description: `${participante.nome} está com o acesso ${ROTULO_STATUS[status].toLowerCase()} nesta demonstração.`,
    });
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6">
      <CabecalhoPagina
        sobretitulo="Painel administrativo"
        titulo="Gestão de participantes"
        descricao="Base de atletas inscritos, com pontuação, posição, desafio atual e ações de moderação."
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fumaca" />
          <Campo
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
            placeholder="Buscar por nome, usuário ou cidade"
            aria-label="Buscar participante"
            className="pl-9"
          />
        </div>
        <Selecao
          value={filtro}
          onChange={(evento) => setFiltro(evento.target.value as StatusParticipante | "todos")}
          aria-label="Filtrar por status"
          className="sm:w-52"
        >
          <option value="todos">Todos os status</option>
          <option value="ativo">Ativos</option>
          <option value="pendente">Pendentes</option>
          <option value="bloqueado">Bloqueados</option>
        </Selecao>
      </div>

      {listagem.length === 0 ? (
        <EstadoVazio
          icone={<Users />}
          titulo="Nenhum participante encontrado"
          mensagem="Ajuste a busca ou o filtro de status para ver outros atletas da base."
        />
      ) : (
        <>
          <Cartao className="hidden overflow-hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-grafite-600 bg-grafite-800">
                  <tr className="text-xs tracking-wide text-fumaca uppercase">
                    <th className="px-4 py-3 font-semibold">Participante</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Treinos</th>
                    <th className="px-4 py-3 font-semibold">Pontuação</th>
                    <th className="px-4 py-3 font-semibold">Posição</th>
                    <th className="px-4 py-3 font-semibold">Desafio atual</th>
                    <th className="px-4 py-3 font-semibold">Entrada</th>
                    <th className="px-4 py-3 text-right font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {listagem.map((participante) => (
                    <tr
                      key={participante.id}
                      className="border-b border-grafite-700 last:border-0 hover:bg-grafite-800/60"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar
                            nome={participante.nome}
                            gradiente={participante.gradiente}
                            tamanho="sm"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-neve">{participante.nome}</p>
                            <p className="truncate text-xs text-fumaca">{participante.cidade}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <SeloStatus status={participante.status} />
                      </td>
                      <td className="px-4 py-3 text-nevoa">{participante.treinos}</td>
                      <td className="px-4 py-3 font-semibold text-neve">
                        {formatarNumero(participante.pontos)}
                      </td>
                      <td className="px-4 py-3 text-nevoa">{ordinal(participante.posicao)}</td>
                      <td className="px-4 py-3 text-nevoa">{desafio.nome}</td>
                      <td className="px-4 py-3 text-fumaca">
                        {formatarData(participante.entrouEm)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <Botao
                            variante="fantasma"
                            tamanho="icone"
                            aria-label={`Ver perfil de ${participante.nome}`}
                            onClick={() => setDetalhe(participante)}
                          >
                            <Eye />
                          </Botao>
                          {participante.status === "ativo" ? (
                            <Botao
                              variante="fantasma"
                              tamanho="icone"
                              aria-label={`Bloquear ${participante.nome}`}
                              onClick={() => alterarStatus(participante, "bloqueado")}
                            >
                              <Ban />
                            </Botao>
                          ) : (
                            <Botao
                              variante="fantasma"
                              tamanho="icone"
                              aria-label={`Aprovar ${participante.nome}`}
                              onClick={() => alterarStatus(participante, "ativo")}
                            >
                              <CheckCircle2 />
                            </Botao>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Cartao>

          <div className="space-y-3 lg:hidden">
            {listagem.map((participante) => (
              <Cartao key={participante.id}>
                <CartaoConteudo className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar nome={participante.nome} gradiente={participante.gradiente} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-neve">{participante.nome}</p>
                      <p className="truncate text-xs text-fumaca">{participante.cidade}</p>
                    </div>
                    <SeloStatus status={participante.status} />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-grafite-800 py-2">
                      <p className="font-semibold text-neve">{participante.treinos}</p>
                      <p className="text-[11px] text-fumaca">treinos</p>
                    </div>
                    <div className="rounded-lg bg-grafite-800 py-2">
                      <p className="font-semibold text-neve">
                        {formatarNumero(participante.pontos)}
                      </p>
                      <p className="text-[11px] text-fumaca">pontos</p>
                    </div>
                    <div className="rounded-lg bg-grafite-800 py-2">
                      <p className="font-semibold text-neve">{ordinal(participante.posicao)}</p>
                      <p className="text-[11px] text-fumaca">posição</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Botao
                      variante="contorno"
                      tamanho="sm"
                      largura="cheia"
                      onClick={() => setDetalhe(participante)}
                    >
                      <Eye />
                      Ver perfil
                    </Botao>
                    {participante.status === "ativo" ? (
                      <Botao
                        variante="perigo"
                        tamanho="sm"
                        largura="cheia"
                        onClick={() => alterarStatus(participante, "bloqueado")}
                      >
                        <Ban />
                        Bloquear
                      </Botao>
                    ) : (
                      <Botao
                        variante="estrutural"
                        tamanho="sm"
                        largura="cheia"
                        onClick={() => alterarStatus(participante, "ativo")}
                      >
                        <CheckCircle2 />
                        Aprovar
                      </Botao>
                    )}
                  </div>
                </CartaoConteudo>
              </Cartao>
            ))}
          </div>
        </>
      )}

      <NotaDemo>
        Esta tela demonstra a gestão da base de participantes. As ações de aprovar e bloquear são
        simuladas e ficam registradas nas atividades recentes do painel.
      </NotaDemo>

      <Dialogo
        aberto={Boolean(detalhe)}
        aoMudar={(aberto) => !aberto && setDetalhe(null)}
        titulo={detalhe?.nome ?? ""}
        descricao={detalhe ? `${detalhe.cidade} · participa desde ${formatarData(detalhe.entrouEm)}` : ""}
        rodape={
          detalhe ? (
            <>
              <Botao variante="contorno" onClick={() => setDetalhe(null)}>
                Fechar
              </Botao>
              {detalhe.status === "ativo" ? (
                <Botao variante="perigo" onClick={() => alterarStatus(detalhe, "bloqueado")}>
                  <Ban />
                  Bloquear acesso
                </Botao>
              ) : (
                <Botao onClick={() => alterarStatus(detalhe, "ativo")}>
                  <CheckCircle2 />
                  Aprovar participante
                </Botao>
              )}
            </>
          ) : null
        }
      >
        {detalhe ? (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar nome={detalhe.nome} gradiente={detalhe.gradiente} tamanho="lg" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-lg font-bold text-neve">{detalhe.nome}</p>
                  <SeloStatus status={detalhe.status} />
                </div>
                <p className="text-xs text-fumaca">
                  Nível {detalhe.nivel} · {detalhe.patente}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { rotulo: "Pontos", valor: formatarNumero(detalhe.pontos) },
                { rotulo: "Treinos", valor: String(detalhe.treinos) },
                { rotulo: "Posição", valor: ordinal(detalhe.posicao) },
                { rotulo: "Sequência", valor: `${detalhe.sequencia} dias` },
              ].map((item) => (
                <div
                  key={item.rotulo}
                  className="rounded-xl border border-grafite-600 bg-grafite-800 p-3 text-center"
                >
                  <p className="font-display text-xl font-extrabold text-neve">{item.valor}</p>
                  <p className="text-xs text-fumaca">{item.rotulo}</p>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-fumaca">Progresso na meta de {desafio.metaTreinos} treinos</span>
                <span className="font-semibold text-neve">
                  {Math.min(100, Math.round((detalhe.treinos / desafio.metaTreinos) * 100))}%
                </span>
              </div>
              <Progresso
                valor={Math.min(100, Math.round((detalhe.treinos / desafio.metaTreinos) * 100))}
                className="mt-2"
              />
            </div>
          </div>
        ) : null}
      </Dialogo>
    </div>
  );
}
