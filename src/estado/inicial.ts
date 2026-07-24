import { CONQUISTAS_INICIAIS } from "@/dados/conquistas";
import { DESAFIOS_INICIAIS, ID_DESAFIO_ATUAL } from "@/dados/desafios";
import { ATIVIDADES_INICIAIS } from "@/dados/metricas";
import { ID_USUARIO, PARTICIPANTES_INICIAIS } from "@/dados/participantes";
import { PATROCINADORES_INICIAIS } from "@/dados/patrocinadores";
import { TREINOS_INICIAIS } from "@/dados/treinos";
import type { EstadoDemo } from "@/dados/tipos";
import { sequenciaAtual } from "./seletores";

export const VERSAO_ESTADO = 1;
export const CHAVE_ARMAZENAMENTO = "hubfit-demo";

/**
 * Monta o estado inicial derivando pontos, treinos e sequência do usuário
 * a partir do histórico de treinos, para os números nunca se contradizerem.
 */
export function estadoInicial(): EstadoDemo {
  const treinosDoUsuario = TREINOS_INICIAIS.filter((treino) => treino.participanteId === ID_USUARIO);
  const pontos = treinosDoUsuario.reduce((total, treino) => total + treino.pontos, 0);

  const participantes = PARTICIPANTES_INICIAIS.map((participante) =>
    participante.id === ID_USUARIO
      ? {
          ...participante,
          pontos,
          treinos: treinosDoUsuario.length,
          sequencia: sequenciaAtual(treinosDoUsuario),
        }
      : { ...participante },
  );

  return {
    versao: VERSAO_ESTADO,
    perfil: "participante",
    participantes,
    desafios: DESAFIOS_INICIAIS.map((desafio) => ({ ...desafio })),
    patrocinadores: PATROCINADORES_INICIAIS.map((patrocinador) => ({ ...patrocinador })),
    treinos: TREINOS_INICIAIS.map((treino) => ({ ...treino })),
    conquistas: CONQUISTAS_INICIAIS.map((conquista) => ({ ...conquista })),
    atividades: ATIVIDADES_INICIAIS.map((atividade) => ({ ...atividade })),
    inscricoes: [ID_DESAFIO_ATUAL],
  };
}
