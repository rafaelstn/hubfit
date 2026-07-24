import type { TipoTreino } from "./tipos";

export interface PostMural {
  id: string;
  nome: string;
  gradiente: string;
  tipo: TipoTreino;
  quando: string;
  pontos: number;
  curtidas: number;
  cidade: string;
}

/**
 * Mural da comunidade: prova social do desafio, com os treinos recentes
 * dos participantes. Conteúdo demonstrativo e estático.
 */
export const MURAL_COMUNIDADE: PostMural[] = [
  {
    id: "m-1",
    nome: "Bruno Silveira",
    gradiente: "from-damatech-500 to-damatech-700",
    tipo: "Musculação",
    quando: "há 12 min",
    pontos: 190,
    curtidas: 24,
    cidade: "Juiz de Fora, MG",
  },
  {
    id: "m-2",
    nome: "Gabriela Prado",
    gradiente: "from-fuchsia-500 to-purple-600",
    tipo: "Corrida",
    quando: "há 1 h",
    pontos: 150,
    curtidas: 18,
    cidade: "Vitória, ES",
  },
  {
    id: "m-3",
    nome: "Lucas Mendes",
    gradiente: "from-sky-500 to-indigo-600",
    tipo: "Funcional",
    quando: "há 2 h",
    pontos: 180,
    curtidas: 15,
    cidade: "Belo Horizonte, MG",
  },
  {
    id: "m-4",
    nome: "Marina Duarte",
    gradiente: "from-teal-400 to-emerald-600",
    tipo: "Bike",
    quando: "há 3 h",
    pontos: 150,
    curtidas: 12,
    cidade: "Curitiba, PR",
  },
  {
    id: "m-5",
    nome: "Thiago Ramalho",
    gradiente: "from-amber-400 to-orange-600",
    tipo: "Crossfit",
    quando: "há 5 h",
    pontos: 190,
    curtidas: 21,
    cidade: "Juiz de Fora, MG",
  },
];
