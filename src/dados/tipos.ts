export type Perfil = "participante" | "admin";

export type SituacaoDesafio = "ativo" | "futuro" | "encerrado";

export type StatusParticipante = "ativo" | "pendente" | "bloqueado";

export type TipoTreino =
  | "Musculação"
  | "Corrida"
  | "Funcional"
  | "Bike"
  | "Natação"
  | "Mobilidade"
  | "Crossfit"
  | "Luta";

export interface Participante {
  id: string;
  nome: string;
  apelido: string;
  ehUsuario: boolean;
  status: StatusParticipante;
  nivel: number;
  patente: string;
  pontos: number;
  treinos: number;
  sequencia: number;
  desafioId: string;
  entrouEm: string;
  cidade: string;
  /** Posição antes da última atualização, usada para mostrar a evolução no ranking. */
  posicaoAnterior: number;
  gradiente: string;
}

export interface ParticipanteClassificado extends Participante {
  posicao: number;
  variacao: number;
}

export interface Premio {
  colocacao: string;
  descricao: string;
}

export interface Desafio {
  id: string;
  nome: string;
  chamada: string;
  descricao: string;
  situacao: SituacaoDesafio;
  inicio: string;
  fim: string;
  metaTreinos: number;
  pontosPorTreino: number;
  participantes: number;
  premiacaoTotal: number;
  premios: Premio[];
  regras: string[];
  patrocinadoresIds: string[];
  banner: string;
  imagem: string;
  criadoNaDemo?: boolean;
}

export interface Treino {
  id: string;
  participanteId: string;
  desafioId: string;
  tipo: TipoTreino;
  data: string;
  duracaoMin: number;
  observacao: string;
  /** Volume ilustrativo em quilos, usado no acompanhamento de evolução. */
  volumeKg: number;
  pontos: number;
  foto: string | null;
  registradoNaDemo?: boolean;
  /** Bônus de engajamento creditado ao marcar os patrocinadores no compartilhamento. */
  bonusPatrocinadores?: boolean;
}

export interface Patrocinador {
  id: string;
  nome: string;
  segmento: string;
  descricao: string;
  beneficio: string;
  cupom: string;
  desconto: string;
  desafiosIds: string[];
  ativo: boolean;
  cor: string;
  monograma: string;
  /** Imagem temática exibida no topo do cartão da marca. */
  foto?: string;
}

export interface Conquista {
  id: string;
  nome: string;
  descricao: string;
  icone: "medalha" | "chama" | "trofeu" | "alvo" | "calendario" | "raio";
  desbloqueada: boolean;
  em: string | null;
}

export interface Atividade {
  id: string;
  tipo: "treino" | "inscricao" | "desafio" | "patrocinador" | "moderacao";
  titulo: string;
  detalhe: string;
  quando: string;
}

export interface PontoSerie {
  rotulo: string;
  valor: number;
  comparacao?: number;
}

export interface EstadoDemo {
  versao: number;
  perfil: Perfil;
  participantes: Participante[];
  desafios: Desafio[];
  patrocinadores: Patrocinador[];
  treinos: Treino[];
  conquistas: Conquista[];
  atividades: Atividade[];
  /** Desafios em que o participante da demonstração está inscrito. */
  inscricoes: string[];
}
