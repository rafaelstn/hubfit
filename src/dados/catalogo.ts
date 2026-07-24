import type { TipoTreino } from "./tipos";

/**
 * A demonstração roda sobre uma data fixa para os números continuarem
 * coerentes em qualquer dia de apresentação.
 */
export const DATA_DEMO = "2026-07-24";

export interface DefinicaoTipoTreino {
  tipo: TipoTreino;
  /** Multiplicador de volume ilustrativo por minuto de treino. */
  volumePorMinuto: number;
  cor: string;
  foto: string;
  chamada: string;
}

export const TIPOS_TREINO: DefinicaoTipoTreino[] = [
  {
    tipo: "Musculação",
    volumePorMinuto: 13,
    cor: "#c6f24e",
    foto: "/fotos/tipo-musculacao.jpg",
    chamada: "Carga, série e progressão",
  },
  {
    tipo: "Crossfit",
    volumePorMinuto: 11,
    cor: "#b2e132",
    foto: "/fotos/tipo-crossfit.jpg",
    chamada: "Alta intensidade em circuito",
  },
  {
    tipo: "Funcional",
    volumePorMinuto: 8,
    cor: "#4a8cf7",
    foto: "/fotos/tipo-funcional.jpg",
    chamada: "Força aplicada ao movimento",
  },
  {
    tipo: "Corrida",
    volumePorMinuto: 0,
    cor: "#f6c445",
    foto: "/fotos/tipo-corrida.jpg",
    chamada: "Ritmo, fôlego e quilometragem",
  },
  {
    tipo: "Bike",
    volumePorMinuto: 0,
    cor: "#3ecf8e",
    foto: "/fotos/tipo-bike.jpg",
    chamada: "Pedal na rua ou no rolo",
  },
  {
    tipo: "Natação",
    volumePorMinuto: 0,
    cor: "#7fb0ff",
    foto: "/fotos/tipo-natacao.jpg",
    chamada: "Baixo impacto, corpo inteiro",
  },
  {
    tipo: "Luta",
    volumePorMinuto: 6,
    cor: "#f2545b",
    foto: "/fotos/tipo-luta.jpg",
    chamada: "Condicionamento e técnica",
  },
  {
    tipo: "Mobilidade",
    volumePorMinuto: 0,
    cor: "#b3bcc9",
    foto: "/fotos/tipo-mobilidade.jpg",
    chamada: "Recuperação e amplitude",
  },
];

export function volumeEstimado(tipo: TipoTreino, duracaoMin: number) {
  const definicao = TIPOS_TREINO.find((item) => item.tipo === tipo);
  return Math.round((definicao?.volumePorMinuto ?? 0) * duracaoMin);
}

export function corDoTipo(tipo: TipoTreino) {
  return TIPOS_TREINO.find((item) => item.tipo === tipo)?.cor ?? "#b3bcc9";
}

export function fotoDoTipo(tipo: TipoTreino) {
  return TIPOS_TREINO.find((item) => item.tipo === tipo)?.foto ?? "/fotos/tipo-musculacao.jpg";
}

export function patenteParaPontos(pontos: number) {
  if (pontos >= 3200) return "Referência do desafio";
  if (pontos >= 2400) return "Atleta consistente";
  if (pontos >= 1500) return "Constância em alta";
  if (pontos >= 800) return "Em evolução";
  return "Aquecendo";
}

/** Nível ilustrativo: um nível a cada 180 pontos acumulados. */
export function nivelParaPontos(pontos: number) {
  return Math.max(1, Math.floor(pontos / 180));
}
