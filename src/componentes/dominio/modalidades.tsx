"use client";

import Image from "next/image";
import Link from "next/link";
import { TIPOS_TREINO } from "@/dados/catalogo";
import type { TipoTreino } from "@/dados/tipos";
import { cn } from "@/lib/utils";

/** Vitrine de modalidades usada no início, com atalho para o registro. */
export function VitrineModalidades() {
  return (
    <div className="sem-barra -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      {TIPOS_TREINO.map((modalidade) => (
        <Link
          key={modalidade.tipo}
          href="/registrar-treino"
          className="group relative h-40 w-40 shrink-0 overflow-hidden rounded-card border border-grafite-600 sm:h-44 sm:w-52"
        >
          <Image
            src={modalidade.foto}
            alt=""
            fill
            sizes="208px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-grafite-950 via-grafite-950/45 to-transparent" />
          <span
            className="absolute top-3 left-3 h-1 w-8 rounded-full"
            style={{ backgroundColor: modalidade.cor }}
          />
          <div className="absolute inset-x-0 bottom-0 p-3">
            <p className="font-display text-base font-bold text-neve">{modalidade.tipo}</p>
            <p className="mt-0.5 line-clamp-1 text-[11px] text-nevoa">{modalidade.chamada}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

/** Seleção visual da modalidade no registro de treino. */
export function SeletorModalidade({
  valor,
  aoSelecionar,
}: {
  valor: TipoTreino;
  aoSelecionar: (tipo: TipoTreino) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Tipo de treino"
      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
    >
      {TIPOS_TREINO.map((modalidade) => {
        const ativo = modalidade.tipo === valor;
        return (
          <button
            key={modalidade.tipo}
            type="button"
            role="radio"
            aria-checked={ativo}
            onClick={() => aoSelecionar(modalidade.tipo)}
            className={cn(
              "group relative h-24 overflow-hidden rounded-xl border transition-all",
              ativo
                ? "border-lima-400 ring-2 ring-lima-400/30"
                : "border-grafite-600 hover:border-grafite-500",
            )}
          >
            <Image
              src={modalidade.foto}
              alt=""
              fill
              sizes="200px"
              className={cn(
                "object-cover transition-all duration-500",
                ativo ? "opacity-70 scale-105" : "opacity-40 group-hover:opacity-60",
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-grafite-950 to-transparent" />
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 p-2 text-left text-sm font-semibold",
                ativo ? "text-lima-300" : "text-neve",
              )}
            >
              {modalidade.tipo}
            </span>
          </button>
        );
      })}
    </div>
  );
}
