import { nivelParaPontos, patenteParaPontos, volumeEstimado } from "@/dados/catalogo";
import { ID_USUARIO } from "@/dados/participantes";
import { REGRA_PONTOS, calcularPontos, ehFimDeSemana } from "@/dados/treinos";
import type {
  Atividade,
  Conquista,
  Desafio,
  EstadoDemo,
  Participante,
  Patrocinador,
  SituacaoDesafio,
  StatusParticipante,
  TipoTreino,
  Treino,
} from "@/dados/tipos";
import { classificar, desafioAtivoDe, sequenciaAtual } from "./seletores";

export interface EntradaTreino {
  tipo: TipoTreino;
  data: string;
  duracaoMin: number;
  observacao: string;
  foto: string | null;
}

export interface ResultadoRegistro {
  treinoId: string;
  pontos: number;
  pontosTotais: number;
  posicao: number;
  posicaoAnterior: number;
  concluidos: number;
  meta: number;
  percentual: number;
  sequencia: number;
  conquistasNovas: Conquista[];
}

export function novoId(prefixo: string) {
  const aleatorio =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefixo}-${aleatorio}`;
}

function comAtividade(estado: EstadoDemo, atividade: Atividade): EstadoDemo {
  return { ...estado, atividades: [atividade, ...estado.atividades].slice(0, 24) };
}

/** Fixa a posição atual de cada participante antes de uma mudança de pontuação. */
function congelarPosicoes(participantes: Participante[]): Participante[] {
  const ranking = classificar(participantes);
  return participantes.map((participante) => ({
    ...participante,
    posicaoAnterior: ranking.find((item) => item.id === participante.id)?.posicao ?? 0,
  }));
}

function desbloquear(conquistas: Conquista[], ids: string[], data: string) {
  const novas: Conquista[] = [];
  const lista = conquistas.map((conquista) => {
    if (ids.includes(conquista.id) && !conquista.desbloqueada) {
      const atualizada = { ...conquista, desbloqueada: true, em: data };
      novas.push(atualizada);
      return atualizada;
    }
    return conquista;
  });
  return { lista, novas };
}

export function registrarTreino(
  estado: EstadoDemo,
  entrada: EntradaTreino,
): { estado: EstadoDemo; resultado: ResultadoRegistro } {
  const desafio = desafioAtivoDe(estado);
  const pontos = calcularPontos(entrada.duracaoMin, entrada.data, desafio.pontosPorTreino);

  const treino: Treino = {
    id: novoId("t"),
    participanteId: ID_USUARIO,
    desafioId: desafio.id,
    tipo: entrada.tipo,
    data: entrada.data,
    duracaoMin: entrada.duracaoMin,
    observacao: entrada.observacao.trim(),
    volumeKg: volumeEstimado(entrada.tipo, entrada.duracaoMin),
    pontos,
    foto: entrada.foto,
    registradoNaDemo: true,
  };

  const treinos = [...estado.treinos, treino];
  const doUsuario = treinos.filter((item) => item.participanteId === ID_USUARIO);
  const noDesafio = doUsuario.filter((item) => item.desafioId === desafio.id);
  const pontosTotais = doUsuario.reduce((total, item) => total + item.pontos, 0);
  const sequencia = sequenciaAtual(doUsuario);

  const congelados = congelarPosicoes(estado.participantes);
  const posicaoAnterior = congelados.find((item) => item.id === ID_USUARIO)?.posicaoAnterior ?? 0;

  const participantes = congelados.map((participante) =>
    participante.id === ID_USUARIO
      ? {
          ...participante,
          pontos: pontosTotais,
          treinos: doUsuario.length,
          sequencia,
          nivel: nivelParaPontos(pontosTotais),
          patente: patenteParaPontos(pontosTotais),
        }
      : participante,
  );

  const posicao =
    classificar(participantes).find((item) => item.id === ID_USUARIO)?.posicao ?? posicaoAnterior;

  const idsParaDesbloquear = ["primeiro-treino"];
  if (sequencia >= 7) idsParaDesbloquear.push("sete-dias");
  if (posicao <= 10) idsParaDesbloquear.push("top-10");
  if (posicao === 1) idsParaDesbloquear.push("topo-do-ranking");
  if (ehFimDeSemana(entrada.data)) idsParaDesbloquear.push("fim-de-semana");
  if (noDesafio.length >= desafio.metaTreinos) idsParaDesbloquear.push("desafio-concluido");

  const { lista, novas } = desbloquear(estado.conquistas, idsParaDesbloquear, entrada.data);

  const atualizado = comAtividade(
    { ...estado, treinos, participantes, conquistas: lista },
    {
      id: novoId("a"),
      tipo: "treino",
      titulo: "Reginaldo Moura registrou um treino",
      detalhe: `${entrada.tipo}, ${entrada.duracaoMin} min, no desafio ${desafio.nome}`,
      quando: "agora",
    },
  );

  return {
    estado: atualizado,
    resultado: {
      treinoId: treino.id,
      pontos,
      pontosTotais,
      posicao,
      posicaoAnterior,
      concluidos: noDesafio.length,
      meta: desafio.metaTreinos,
      percentual: Math.min(100, Math.round((noDesafio.length / desafio.metaTreinos) * 100)),
      sequencia,
      conquistasNovas: novas,
    },
  };
}

export function creditarBonusPatrocinadores(
  estado: EstadoDemo,
  treinoId: string,
): { estado: EstadoDemo; creditado: number } {
  const treino = estado.treinos.find((item) => item.id === treinoId);
  if (!treino || treino.bonusPatrocinadores) return { estado, creditado: 0 };

  const creditado = REGRA_PONTOS.bonusPatrocinadores;
  const treinos = estado.treinos.map((item) =>
    item.id === treinoId
      ? { ...item, pontos: item.pontos + creditado, bonusPatrocinadores: true }
      : item,
  );
  const pontosTotais = treinos
    .filter((item) => item.participanteId === ID_USUARIO)
    .reduce((total, item) => total + item.pontos, 0);

  const participantes = congelarPosicoes(estado.participantes).map((participante) =>
    participante.id === ID_USUARIO
      ? {
          ...participante,
          pontos: pontosTotais,
          nivel: nivelParaPontos(pontosTotais),
          patente: patenteParaPontos(pontosTotais),
        }
      : participante,
  );

  return { estado: { ...estado, treinos, participantes }, creditado };
}

export function salvarDesafio(estado: EstadoDemo, desafio: Desafio): EstadoDemo {
  const existe = estado.desafios.some((item) => item.id === desafio.id);
  const desafios = existe
    ? estado.desafios.map((item) => (item.id === desafio.id ? desafio : item))
    : [...estado.desafios, desafio];

  return comAtividade(
    { ...estado, desafios },
    {
      id: novoId("a"),
      tipo: "desafio",
      titulo: existe ? `Desafio ${desafio.nome} atualizado` : `Desafio ${desafio.nome} criado`,
      detalhe: `Meta de ${desafio.metaTreinos} treinos e ${desafio.pontosPorTreino} pontos por treino`,
      quando: "agora",
    },
  );
}

export function removerDesafio(estado: EstadoDemo, id: string): EstadoDemo {
  const alvo = estado.desafios.find((item) => item.id === id);
  if (!alvo) return estado;

  return comAtividade(
    { ...estado, desafios: estado.desafios.filter((item) => item.id !== id) },
    {
      id: novoId("a"),
      tipo: "desafio",
      titulo: `Desafio ${alvo.nome} removido`,
      detalhe: "Remoção feita pelo administrador na demonstração",
      quando: "agora",
    },
  );
}

const ROTULO_SITUACAO: Record<SituacaoDesafio, string> = {
  ativo: "em andamento",
  futuro: "programado",
  encerrado: "encerrado",
};

export function alterarSituacaoDesafio(
  estado: EstadoDemo,
  id: string,
  situacao: SituacaoDesafio,
): EstadoDemo {
  const alvo = estado.desafios.find((item) => item.id === id);
  if (!alvo) return estado;

  const desafios = estado.desafios.map((item) => {
    if (item.id === id) return { ...item, situacao };
    // A operação mantém um único desafio em andamento por vez.
    if (situacao === "ativo" && item.situacao === "ativo") {
      return { ...item, situacao: "encerrado" as SituacaoDesafio };
    }
    return item;
  });

  return comAtividade(
    { ...estado, desafios },
    {
      id: novoId("a"),
      tipo: "desafio",
      titulo: `Desafio ${alvo.nome} agora está ${ROTULO_SITUACAO[situacao]}`,
      detalhe: "Situação alterada pelo administrador",
      quando: "agora",
    },
  );
}

export function salvarPatrocinador(estado: EstadoDemo, patrocinador: Patrocinador): EstadoDemo {
  const existe = estado.patrocinadores.some((item) => item.id === patrocinador.id);
  const patrocinadores = existe
    ? estado.patrocinadores.map((item) => (item.id === patrocinador.id ? patrocinador : item))
    : [...estado.patrocinadores, patrocinador];

  return comAtividade(
    { ...estado, patrocinadores },
    {
      id: novoId("a"),
      tipo: "patrocinador",
      titulo: existe
        ? `Patrocinador ${patrocinador.nome} atualizado`
        : `Patrocinador ${patrocinador.nome} cadastrado`,
      detalhe: patrocinador.beneficio,
      quando: "agora",
    },
  );
}

export function alternarPatrocinador(estado: EstadoDemo, id: string): EstadoDemo {
  const alvo = estado.patrocinadores.find((item) => item.id === id);
  if (!alvo) return estado;

  return comAtividade(
    {
      ...estado,
      patrocinadores: estado.patrocinadores.map((item) =>
        item.id === id ? { ...item, ativo: !item.ativo } : item,
      ),
    },
    {
      id: novoId("a"),
      tipo: "patrocinador",
      titulo: `${alvo.nome} foi ${alvo.ativo ? "desativado" : "ativado"}`,
      detalhe: "Alteração feita no painel administrativo",
      quando: "agora",
    },
  );
}

const ROTULO_STATUS: Record<StatusParticipante, string> = {
  ativo: "aprovado",
  pendente: "pendente de aprovação",
  bloqueado: "bloqueado",
};

export function definirStatusParticipante(
  estado: EstadoDemo,
  id: string,
  status: StatusParticipante,
): EstadoDemo {
  const alvo = estado.participantes.find((item) => item.id === id);
  if (!alvo) return estado;

  return comAtividade(
    {
      ...estado,
      participantes: estado.participantes.map((item) =>
        item.id === id ? { ...item, status } : item,
      ),
    },
    {
      id: novoId("a"),
      tipo: "moderacao",
      titulo: `${alvo.nome} está ${ROTULO_STATUS[status]}`,
      detalhe: "Ação simulada de moderação no painel administrativo",
      quando: "agora",
    },
  );
}

export function alternarInscricao(estado: EstadoDemo, desafioId: string): EstadoDemo {
  const desafio = estado.desafios.find((item) => item.id === desafioId);
  if (!desafio) return estado;

  const inscrito = estado.inscricoes.includes(desafioId);
  const inscricoes = inscrito
    ? estado.inscricoes.filter((item) => item !== desafioId)
    : [...estado.inscricoes, desafioId];

  const desafios = estado.desafios.map((item) =>
    item.id === desafioId
      ? { ...item, participantes: Math.max(0, item.participantes + (inscrito ? -1 : 1)) }
      : item,
  );

  return comAtividade(
    { ...estado, inscricoes, desafios },
    {
      id: novoId("a"),
      tipo: "inscricao",
      titulo: inscrito
        ? `Reginaldo Moura saiu do desafio ${desafio.nome}`
        : `Reginaldo Moura entrou no desafio ${desafio.nome}`,
      detalhe: inscrito ? "Inscrição cancelada na demonstração" : "Regras aceitas na inscrição",
      quando: "agora",
    },
  );
}
