import type { Treino } from "./tipos";
import { ID_USUARIO } from "./participantes";
import { ID_DESAFIO_ATUAL } from "./desafios";

interface Rascunho {
  data: string;
  tipo: Treino["tipo"];
  duracaoMin: number;
  observacao: string;
  volumeKg: number;
}

/** Histórico do usuário no desafio ativo: 13 treinos, com os 7 últimos em dias seguidos. */
const RASCUNHOS: Rascunho[] = [
  {
    data: "2026-07-07",
    tipo: "Musculação",
    duracaoMin: 55,
    observacao: "Peito e tríceps. Subi 2,5 kg no supino inclinado.",
    volumeKg: 640,
  },
  {
    data: "2026-07-08",
    tipo: "Corrida",
    duracaoMin: 40,
    observacao: "6 km em ritmo leve, foco em respiração.",
    volumeKg: 0,
  },
  {
    data: "2026-07-10",
    tipo: "Musculação",
    duracaoMin: 62,
    observacao: "Costas e bíceps. Série longa no puxador.",
    volumeKg: 780,
  },
  {
    data: "2026-07-11",
    tipo: "Funcional",
    duracaoMin: 45,
    observacao: "Circuito de sábado com kettlebell e corda.",
    volumeKg: 320,
  },
  {
    data: "2026-07-13",
    tipo: "Musculação",
    duracaoMin: 58,
    observacao: "Perna completa. Agachamento pesado.",
    volumeKg: 1180,
  },
  {
    data: "2026-07-15",
    tipo: "Bike",
    duracaoMin: 50,
    observacao: "Pedal na esteira de rolo, 22 km.",
    volumeKg: 0,
  },
  {
    data: "2026-07-17",
    tipo: "Musculação",
    duracaoMin: 65,
    observacao: "Ombro e trapézio. Melhor treino da semana.",
    volumeKg: 720,
  },
  {
    data: "2026-07-18",
    tipo: "Crossfit",
    duracaoMin: 48,
    observacao: "WOD em dupla, sábado cheio na box.",
    volumeKg: 540,
  },
  {
    data: "2026-07-19",
    tipo: "Mobilidade",
    duracaoMin: 35,
    observacao: "Domingo de recuperação e alongamento.",
    volumeKg: 0,
  },
  {
    data: "2026-07-20",
    tipo: "Musculação",
    duracaoMin: 60,
    observacao: "Peito e ombro. Mantive a carga da semana passada.",
    volumeKg: 860,
  },
  {
    data: "2026-07-21",
    tipo: "Corrida",
    duracaoMin: 42,
    observacao: "7 km com tiros de 400 m no final.",
    volumeKg: 0,
  },
  {
    data: "2026-07-22",
    tipo: "Musculação",
    duracaoMin: 64,
    observacao: "Costas pesado. Barra fixa sem assistência.",
    volumeKg: 1240,
  },
  {
    data: "2026-07-23",
    tipo: "Funcional",
    duracaoMin: 45,
    observacao: "Core e estabilidade antes de fechar a semana.",
    volumeKg: 380,
  },
];

/**
 * Pontuação do desafio ativo. A mesma regra roda quando o participante
 * registra um treino novo dentro da demonstração.
 */
export const REGRA_PONTOS = {
  base: 150,
  bonusIntensidade: 40,
  minutosParaIntensidade: 60,
  bonusFimDeSemana: 30,
  bonusPatrocinadores: 25,
};

export function ehFimDeSemana(dataIso: string) {
  const dia = new Date(`${dataIso.slice(0, 10)}T12:00:00`).getDay();
  return dia === 0 || dia === 6;
}

export function calcularPontos(
  duracaoMin: number,
  dataIso: string,
  pontosBase = REGRA_PONTOS.base,
) {
  let total = pontosBase;
  if (duracaoMin >= REGRA_PONTOS.minutosParaIntensidade) total += REGRA_PONTOS.bonusIntensidade;
  if (ehFimDeSemana(dataIso)) total += REGRA_PONTOS.bonusFimDeSemana;
  return total;
}

export const TREINOS_INICIAIS: Treino[] = RASCUNHOS.map((rascunho, indice) => ({
  id: `t-seed-${indice + 1}`,
  participanteId: ID_USUARIO,
  desafioId: ID_DESAFIO_ATUAL,
  tipo: rascunho.tipo,
  data: rascunho.data,
  duracaoMin: rascunho.duracaoMin,
  observacao: rascunho.observacao,
  volumeKg: rascunho.volumeKg,
  pontos: calcularPontos(rascunho.duracaoMin, rascunho.data),
  foto: null,
}));
