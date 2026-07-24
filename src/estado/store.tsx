"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  Desafio,
  EstadoDemo,
  Patrocinador,
  Perfil,
  SituacaoDesafio,
  StatusParticipante,
} from "@/dados/tipos";
import * as acoes from "./acoes";
import type { EntradaTreino, ResultadoRegistro } from "./acoes";
import { CHAVE_ARMAZENAMENTO, VERSAO_ESTADO, estadoInicial } from "./inicial";

interface ContextoDemo {
  estado: EstadoDemo;
  pronto: boolean;
  definirPerfil: (perfil: Perfil) => void;
  registrarTreino: (entrada: EntradaTreino) => ResultadoRegistro;
  aplicarBonusPatrocinadores: (treinoId: string) => number;
  salvarDesafio: (desafio: Desafio) => void;
  removerDesafio: (id: string) => void;
  alterarSituacaoDesafio: (id: string, situacao: SituacaoDesafio) => void;
  salvarPatrocinador: (patrocinador: Patrocinador) => void;
  alternarPatrocinador: (id: string) => void;
  definirStatusParticipante: (id: string, status: StatusParticipante) => void;
  alternarInscricao: (desafioId: string) => void;
  reiniciarDemo: () => void;
}

const Contexto = createContext<ContextoDemo | null>(null);

function carregarDoNavegador(): EstadoDemo | null {
  try {
    const bruto = window.localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (!bruto) return null;
    const salvo = JSON.parse(bruto) as EstadoDemo;
    if (salvo?.versao !== VERSAO_ESTADO || !Array.isArray(salvo.participantes)) return null;
    return salvo;
  } catch {
    return null;
  }
}

export function ProvedorDemo({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoDemo>(() => estadoInicial());
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const salvo = carregarDoNavegador();
    if (salvo) setEstado(salvo);
    const espera = window.setTimeout(() => setPronto(true), 240);
    return () => window.clearTimeout(espera);
  }, []);

  useEffect(() => {
    if (!pronto) return;
    try {
      window.localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(estado));
    } catch {
      /* Modo privado ou armazenamento cheio: a demonstração continua em memória. */
    }
  }, [estado, pronto]);

  const definirPerfil = useCallback((perfil: Perfil) => {
    setEstado((atual) => ({ ...atual, perfil }));
  }, []);

  const registrarTreino = useCallback(
    (entrada: EntradaTreino) => {
      const { estado: proximo, resultado } = acoes.registrarTreino(estado, entrada);
      setEstado(proximo);
      return resultado;
    },
    [estado],
  );

  const aplicarBonusPatrocinadores = useCallback(
    (treinoId: string) => {
      const { estado: proximo, creditado } = acoes.creditarBonusPatrocinadores(estado, treinoId);
      if (creditado > 0) setEstado(proximo);
      return creditado;
    },
    [estado],
  );

  const salvarDesafio = useCallback((desafio: Desafio) => {
    setEstado((atual) => acoes.salvarDesafio(atual, desafio));
  }, []);

  const removerDesafio = useCallback((id: string) => {
    setEstado((atual) => acoes.removerDesafio(atual, id));
  }, []);

  const alterarSituacaoDesafio = useCallback((id: string, situacao: SituacaoDesafio) => {
    setEstado((atual) => acoes.alterarSituacaoDesafio(atual, id, situacao));
  }, []);

  const salvarPatrocinador = useCallback((patrocinador: Patrocinador) => {
    setEstado((atual) => acoes.salvarPatrocinador(atual, patrocinador));
  }, []);

  const alternarPatrocinador = useCallback((id: string) => {
    setEstado((atual) => acoes.alternarPatrocinador(atual, id));
  }, []);

  const definirStatusParticipante = useCallback((id: string, status: StatusParticipante) => {
    setEstado((atual) => acoes.definirStatusParticipante(atual, id, status));
  }, []);

  const alternarInscricao = useCallback((desafioId: string) => {
    setEstado((atual) => acoes.alternarInscricao(atual, desafioId));
  }, []);

  const reiniciarDemo = useCallback(() => {
    try {
      window.localStorage.removeItem(CHAVE_ARMAZENAMENTO);
    } catch {
      /* Sem armazenamento disponível, basta restaurar o estado em memória. */
    }
    setEstado(estadoInicial());
  }, []);

  const valor = useMemo<ContextoDemo>(
    () => ({
      estado,
      pronto,
      definirPerfil,
      registrarTreino,
      aplicarBonusPatrocinadores,
      salvarDesafio,
      removerDesafio,
      alterarSituacaoDesafio,
      salvarPatrocinador,
      alternarPatrocinador,
      definirStatusParticipante,
      alternarInscricao,
      reiniciarDemo,
    }),
    [
      estado,
      pronto,
      definirPerfil,
      registrarTreino,
      aplicarBonusPatrocinadores,
      salvarDesafio,
      removerDesafio,
      alterarSituacaoDesafio,
      salvarPatrocinador,
      alternarPatrocinador,
      definirStatusParticipante,
      alternarInscricao,
      reiniciarDemo,
    ],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useDemo() {
  const contexto = useContext(Contexto);
  if (!contexto) throw new Error("useDemo precisa estar dentro de ProvedorDemo.");
  return contexto;
}

export type { EntradaTreino, ResultadoRegistro };
