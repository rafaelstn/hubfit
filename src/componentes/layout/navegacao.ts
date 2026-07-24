import {
  BarChart3,
  Dumbbell,
  Flame,
  Handshake,
  LayoutDashboard,
  Medal,
  Target,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Perfil } from "@/dados/tipos";

export interface ItemNavegacao {
  rotulo: string;
  rotuloCurto: string;
  href: string;
  icone: LucideIcon;
  /** Marca o item como ativo também nas rotas filhas. */
  prefixo?: boolean;
  soDesktop?: boolean;
}

export const NAVEGACAO_PARTICIPANTE: ItemNavegacao[] = [
  { rotulo: "Início", rotuloCurto: "Início", href: "/dashboard", icone: LayoutDashboard },
  { rotulo: "Desafios", rotuloCurto: "Desafios", href: "/desafios", icone: Target, prefixo: true },
  { rotulo: "Registrar treino", rotuloCurto: "Treino", href: "/registrar-treino", icone: Dumbbell },
  { rotulo: "Ranking", rotuloCurto: "Ranking", href: "/ranking", icone: Trophy },
  {
    rotulo: "Patrocinadores",
    rotuloCurto: "Marcas",
    href: "/patrocinadores",
    icone: Handshake,
    soDesktop: true,
  },
  { rotulo: "Perfil", rotuloCurto: "Perfil", href: "/perfil", icone: Medal },
];

export const NAVEGACAO_ADMIN: ItemNavegacao[] = [
  { rotulo: "Visão geral", rotuloCurto: "Geral", href: "/admin", icone: BarChart3 },
  { rotulo: "Desafios", rotuloCurto: "Desafios", href: "/admin/desafios", icone: Flame },
  { rotulo: "Participantes", rotuloCurto: "Pessoas", href: "/admin/participantes", icone: Users },
  {
    rotulo: "Patrocinadores",
    rotuloCurto: "Marcas",
    href: "/admin/patrocinadores",
    icone: Handshake,
  },
];

export function navegacaoDoPerfil(perfil: Perfil) {
  return perfil === "admin" ? NAVEGACAO_ADMIN : NAVEGACAO_PARTICIPANTE;
}

export function estaAtivo(item: ItemNavegacao, caminho: string) {
  if (item.prefixo) return caminho === item.href || caminho.startsWith(`${item.href}/`);
  return caminho === item.href;
}
