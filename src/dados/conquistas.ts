import type { Conquista } from "./tipos";

export const CONQUISTAS_INICIAIS: Conquista[] = [
  {
    id: "primeiro-treino",
    nome: "Primeiro treino",
    descricao: "Registrou o primeiro treino dentro de um desafio.",
    icone: "medalha",
    desbloqueada: true,
    em: "2026-06-05",
  },
  {
    id: "sete-dias",
    nome: "7 dias de constância",
    descricao: "Sete dias seguidos com treino registrado.",
    icone: "chama",
    desbloqueada: true,
    em: "2026-07-23",
  },
  {
    id: "top-10",
    nome: "Top 10",
    descricao: "Entrou nas dez primeiras posições do ranking geral.",
    icone: "trofeu",
    desbloqueada: true,
    em: "2026-06-19",
  },
  {
    id: "fim-de-semana",
    nome: "Treino no fim de semana",
    descricao: "Treinou em um sábado ou domingo durante a campanha.",
    icone: "calendario",
    desbloqueada: true,
    em: "2026-07-11",
  },
  {
    id: "desafio-concluido",
    nome: "Desafio concluído",
    descricao: "Bateu a meta de treinos de um desafio completo.",
    icone: "alvo",
    desbloqueada: false,
    em: null,
  },
  {
    id: "topo-do-ranking",
    nome: "Líder do ranking",
    descricao: "Assumiu a primeira posição do ranking geral.",
    icone: "raio",
    desbloqueada: false,
    em: null,
  },
];
