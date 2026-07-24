import { DATA_DEMO } from "@/dados/catalogo";
import { ID_USUARIO } from "@/dados/participantes";
import type {
  Desafio,
  EstadoDemo,
  Participante,
  ParticipanteClassificado,
  Treino,
} from "@/dados/tipos";
import { diasEntre } from "@/lib/formato";

export function classificar(participantes: Participante[]): ParticipanteClassificado[] {
  return [...participantes]
    .sort((a, b) => b.pontos - a.pontos || b.treinos - a.treinos || a.nome.localeCompare(b.nome))
    .map((participante, indice) => ({
      ...participante,
      posicao: indice + 1,
      variacao: participante.posicaoAnterior - (indice + 1),
    }));
}

export function usuarioDe(estado: EstadoDemo): Participante {
  return estado.participantes.find((item) => item.id === ID_USUARIO) ?? estado.participantes[0];
}

export function usuarioClassificado(estado: EstadoDemo): ParticipanteClassificado {
  const ranking = classificar(estado.participantes);
  return ranking.find((item) => item.id === ID_USUARIO) ?? ranking[0];
}

export function desafioAtivoDe(estado: EstadoDemo): Desafio {
  return estado.desafios.find((item) => item.situacao === "ativo") ?? estado.desafios[0];
}

export function treinosDoUsuario(estado: EstadoDemo, desafioId?: string): Treino[] {
  return estado.treinos
    .filter((treino) => treino.participanteId === ID_USUARIO)
    .filter((treino) => (desafioId ? treino.desafioId === desafioId : true))
    .sort((a, b) => (a.data < b.data ? 1 : a.data > b.data ? -1 : 0));
}

export interface ProgressoDesafio {
  concluidos: number;
  meta: number;
  percentual: number;
  diasRestantes: number;
  pontosNoDesafio: number;
  volumeTotal: number;
}

export function progressoDoUsuario(estado: EstadoDemo, desafio: Desafio): ProgressoDesafio {
  const treinos = treinosDoUsuario(estado, desafio.id);
  const concluidos = treinos.length;
  const percentual = Math.min(100, Math.round((concluidos / desafio.metaTreinos) * 100));
  return {
    concluidos,
    meta: desafio.metaTreinos,
    percentual,
    diasRestantes: Math.max(0, diasEntre(DATA_DEMO, desafio.fim)),
    pontosNoDesafio: treinos.reduce((total, treino) => total + treino.pontos, 0),
    volumeTotal: treinos.reduce((total, treino) => total + treino.volumeKg, 0),
  };
}

function somarDias(iso: string, dias: number) {
  const base = new Date(`${iso.slice(0, 10)}T12:00:00`);
  base.setDate(base.getDate() + dias);
  const mes = String(base.getMonth() + 1).padStart(2, "0");
  const dia = String(base.getDate()).padStart(2, "0");
  return `${base.getFullYear()}-${mes}-${dia}`;
}

/** Sequência de dias seguidos com treino, contada a partir do dia atual da demonstração. */
export function sequenciaAtual(treinos: Treino[], hoje = DATA_DEMO) {
  const dias = new Set(treinos.map((treino) => treino.data.slice(0, 10)));
  if (dias.size === 0) return 0;

  let referencia = dias.has(hoje) ? hoje : somarDias(hoje, -1);
  if (!dias.has(referencia)) return 0;

  let total = 0;
  while (dias.has(referencia)) {
    total += 1;
    referencia = somarDias(referencia, -1);
  }
  return total;
}

export interface DiaDaSemana {
  sigla: string;
  data: string;
  treinou: boolean;
  futuro: boolean;
}

const SIGLAS = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];

/** Semana corrente (segunda a domingo) com marcação dos dias treinados. */
export function semanaDoUsuario(treinos: Treino[], hoje = DATA_DEMO): DiaDaSemana[] {
  const base = new Date(`${hoje}T12:00:00`);
  const diaSemana = (base.getDay() + 6) % 7;
  const segunda = somarDias(hoje, -diaSemana);
  const dias = new Set(treinos.map((treino) => treino.data.slice(0, 10)));

  return SIGLAS.map((sigla, indice) => {
    const data = somarDias(segunda, indice);
    return { sigla, data, treinou: dias.has(data), futuro: data > hoje };
  });
}

/** Evolução de pontos acumulados do usuário ao longo do desafio. */
export function evolucaoDePontos(treinos: Treino[]) {
  const ordenados = [...treinos].sort((a, b) => (a.data < b.data ? -1 : 1));
  let acumulado = 0;
  return ordenados.map((treino) => {
    acumulado += treino.pontos;
    return { rotulo: treino.data, valor: acumulado };
  });
}

export function volumePorSemana(treinos: Treino[]) {
  const grupos = new Map<string, number>();
  const ordenados = [...treinos].sort((a, b) => (a.data < b.data ? -1 : 1));
  ordenados.forEach((treino) => {
    const dia = new Date(`${treino.data}T12:00:00`);
    const deslocamento = (dia.getDay() + 6) % 7;
    const segunda = somarDias(treino.data, -deslocamento);
    grupos.set(segunda, (grupos.get(segunda) ?? 0) + treino.volumeKg);
  });
  return [...grupos.entries()].map(([rotulo, valor]) => ({ rotulo, valor }));
}

export function proximosDesafios(estado: EstadoDemo) {
  return estado.desafios
    .filter((desafio) => desafio.situacao === "futuro")
    .sort((a, b) => (a.inicio < b.inicio ? -1 : 1));
}

export function patrocinadoresDoDesafio(estado: EstadoDemo, desafio: Desafio) {
  return estado.patrocinadores.filter((patrocinador) =>
    desafio.patrocinadoresIds.includes(patrocinador.id),
  );
}
