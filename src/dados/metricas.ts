import type { Atividade, PontoSerie } from "./tipos";

export const ATIVIDADES_INICIAIS: Atividade[] = [
  {
    id: "a-1",
    tipo: "treino",
    titulo: "Bruno Silveira registrou um treino",
    detalhe: "Musculação, 70 min, no desafio Força e Constância",
    quando: "há 12 minutos",
  },
  {
    id: "a-2",
    tipo: "inscricao",
    titulo: "Diego Vasques pediu inscrição",
    detalhe: "Aguardando aprovação do administrador",
    quando: "há 40 minutos",
  },
  {
    id: "a-3",
    tipo: "treino",
    titulo: "Gabriela Prado registrou um treino",
    detalhe: "Corrida, 45 min, no desafio Força e Constância",
    quando: "há 1 hora",
  },
  {
    id: "a-4",
    tipo: "patrocinador",
    titulo: "Energy Lab renovou o patrocínio",
    detalhe: "Vinculado às campanhas de agosto e setembro",
    quando: "há 3 horas",
  },
  {
    id: "a-5",
    tipo: "moderacao",
    titulo: "Registro reprovado por foto duplicada",
    detalhe: "Participante notificado dentro do aplicativo",
    quando: "ontem",
  },
  {
    id: "a-6",
    tipo: "desafio",
    titulo: "Desafio 21 Dias entrou em preparação",
    detalhe: "Período definido para 10 a 31 de agosto",
    quando: "ontem",
  },
];

/** Participação por semana: treinos registrados na base inteira. */
export const SERIE_PARTICIPACAO: PontoSerie[] = [
  { rotulo: "Sem 1", valor: 486, comparacao: 402 },
  { rotulo: "Sem 2", valor: 612, comparacao: 448 },
  { rotulo: "Sem 3", valor: 704, comparacao: 511 },
  { rotulo: "Sem 4", valor: 758, comparacao: 526 },
];

/** Percentual de participantes que bateram a meta do desafio. */
export const SERIE_CONCLUSAO: PontoSerie[] = [
  { rotulo: "Mar", valor: 41 },
  { rotulo: "Abr", valor: 47 },
  { rotulo: "Mai", valor: 52 },
  { rotulo: "Jun", valor: 58 },
  { rotulo: "Jul", valor: 64 },
];

/** Distribuição de engajamento da base ativa. */
export const SERIE_ENGAJAMENTO: PontoSerie[] = [
  { rotulo: "Alto", valor: 38 },
  { rotulo: "Médio", valor: 41 },
  { rotulo: "Baixo", valor: 21 },
];

/** Novas inscrições acumuladas por semana. */
export const SERIE_INSCRICOES: PontoSerie[] = [
  { rotulo: "24 jun", valor: 118 },
  { rotulo: "01 jul", valor: 164 },
  { rotulo: "08 jul", valor: 221 },
  { rotulo: "15 jul", valor: 268 },
  { rotulo: "22 jul", valor: 312 },
];

/** Retenção de participantes entre um desafio e o seguinte. */
export const SERIE_RETENCAO: PontoSerie[] = [
  { rotulo: "Abr", valor: 44 },
  { rotulo: "Mai", valor: 51 },
  { rotulo: "Jun", valor: 57 },
  { rotulo: "Jul", valor: 61 },
];
