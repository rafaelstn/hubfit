import {
  Award,
  Building2,
  Camera,
  Cpu,
  Flag,
  Handshake,
  LayoutDashboard,
  LineChart,
  ListChecks,
  LogIn,
  Medal,
  Share2,
  ShoppingBag,
  Target,
  Trophy,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export interface ItemIcone {
  icone: LucideIcon;
  titulo: string;
  texto: string;
}

/** Pilares da capa da apresentação (slide 1). */
export const PILARES: ItemIcone[] = [
  { icone: Flag, titulo: "Desafios mensais", texto: "Campanhas com regra, período e meta" },
  { icone: Trophy, titulo: "Ranking", texto: "Classificação automática e justa" },
  { icone: Handshake, titulo: "Patrocinadores", texto: "Marcas com visibilidade real" },
  { icone: LayoutDashboard, titulo: "Painel admin", texto: "Gestão centralizada da operação" },
];

/** O problema (slide 2). */
export const PROBLEMAS: { numero: string; titulo: string; texto: string }[] = [
  {
    numero: "01",
    titulo: "Baixa constância",
    texto: "Muitos começam bem, mas perdem ritmo com o tempo.",
  },
  {
    numero: "02",
    titulo: "Sem prova social",
    texto: "O treino acontece, mas não vira visibilidade nem comunidade.",
  },
  {
    numero: "03",
    titulo: "Patrocínio disperso",
    texto: "Marcas apoiam ações isoladas, sem uma estrutura contínua.",
  },
  {
    numero: "04",
    titulo: "Sem ranking claro",
    texto: "Fica difícil comparar desempenho e premiar com justiça.",
  },
  {
    numero: "05",
    titulo: "Dificuldade de retenção",
    texto: "Sem incentivo recorrente, o desafio perde tração.",
  },
];

/** A solução (slide 3). */
export const SOLUCOES: ItemIcone[] = [
  {
    icone: Target,
    titulo: "Desafio mensal",
    texto: "Regras, período, meta e premiação em um só fluxo.",
  },
  {
    icone: Camera,
    titulo: "Registro com foto",
    texto: "O usuário envia o treino e soma pontos na disputa.",
  },
  {
    icone: Trophy,
    titulo: "Ranking automático",
    texto: "A classificação mostra evolução e estimula a competição saudável.",
  },
  {
    icone: Handshake,
    titulo: "Área de patrocinadores",
    texto: "Marcas e parceiros ganham visibilidade dentro da campanha.",
  },
];

/** Jornada, como funciona na prática (slide 4). */
export const JORNADA: { passo: string; icone: LucideIcon; titulo: string; texto: string }[] = [
  {
    passo: "1",
    icone: Flag,
    titulo: "Entra no desafio",
    texto: "O usuário escolhe a campanha ativa e aceita as regras.",
  },
  {
    passo: "2",
    icone: Camera,
    titulo: "Registra o treino",
    texto: "Após treinar, envia a foto e as informações do treino.",
  },
  {
    passo: "3",
    icone: Share2,
    titulo: "Compartilha e marca parceiros",
    texto: "O conteúdo pode ir às redes com apoio dos patrocinadores.",
  },
  {
    passo: "4",
    icone: Trophy,
    titulo: "O sistema pontua",
    texto: "A plataforma registra a participação e atualiza o ranking.",
  },
  {
    passo: "5",
    icone: Medal,
    titulo: "Ranking e premiação",
    texto: "O desempenho fica visível e a disputa ganha tração.",
  },
];

/** O que entra na Fase 1 (slide 5). */
export const FASE_1: { numero: string; icone: LucideIcon; titulo: string; texto: string }[] = [
  { numero: "01", icone: LogIn, titulo: "Cadastro e login", texto: "Acesso seguro e perfil básico." },
  {
    numero: "02",
    icone: UserRound,
    titulo: "Perfil do atleta",
    texto: "Dados e histórico do participante.",
  },
  {
    numero: "03",
    icone: Target,
    titulo: "Desafios mensais",
    texto: "Campanhas com regras e período.",
  },
  { numero: "04", icone: Camera, titulo: "Envio de foto", texto: "Registro do treino no aplicativo." },
  {
    numero: "05",
    icone: Trophy,
    titulo: "Ranking geral",
    texto: "Classificação dos participantes.",
  },
  {
    numero: "06",
    icone: Handshake,
    titulo: "Patrocinadores",
    texto: "Espaço para marcas parceiras.",
  },
  {
    numero: "07",
    icone: LayoutDashboard,
    titulo: "Painel admin",
    texto: "Gestão dos desafios e acompanhamento.",
  },
  {
    numero: "08",
    icone: ListChecks,
    titulo: "Regras e pontuação",
    texto: "Critérios visíveis e organizados.",
  },
];

/** Estrutura de monetização (slide 6). */
export const MONETIZACAO: ItemIcone[] = [
  {
    icone: Handshake,
    titulo: "Patrocinadores",
    texto: "Marcas apoiam o desafio e ganham visibilidade.",
  },
  {
    icone: Building2,
    titulo: "Academias",
    texto: "Parcerias e desafios exclusivos para bases locais.",
  },
  {
    icone: Award,
    titulo: "Desafios premium",
    texto: "Campanhas especiais com benefícios ou premiações maiores.",
  },
  {
    icone: ShoppingBag,
    titulo: "Marketplace parceiro",
    texto: "Suplementos, produtos e ativações futuras.",
  },
];

/** Roadmap por fases (slide 7). */
export interface ColunaRoadmap {
  etiqueta: string;
  icone: LucideIcon;
  destaque?: boolean;
  itens: string[];
}

export const ROADMAP: ColunaRoadmap[] = [
  {
    etiqueta: "Fase 1",
    icone: Flag,
    destaque: true,
    itens: [
      "Cadastro e login",
      "Desafios mensais",
      "Envio de foto do treino",
      "Ranking",
      "Painel administrativo",
    ],
  },
  {
    etiqueta: "Fase 2",
    icone: LineChart,
    itens: [
      "Compartilhamento avançado",
      "Patrocinadores expandidos",
      "Planos e monetização",
      "Relatórios gerenciais",
    ],
  },
  {
    etiqueta: "Evolução contínua",
    icone: Cpu,
    itens: [
      "Integrações com Instagram",
      "Notificações",
      "Wearables",
      "IA e novos módulos",
    ],
  },
];

/** Passos do primeiro passo (slide 8). */
export const PRIMEIRO_PASSO: string[] = [
  "Definir regras do desafio",
  "Fechar escopo da Fase 1",
  "Validar fluxo do usuário",
  "Iniciar design e desenvolvimento",
];
