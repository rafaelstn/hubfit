"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export function SimboloHubfit({ className }: { className?: string }) {
  // Cada instância recebe um identificador próprio: com id fixo, vários símbolos
  // na mesma página disputam a mesma referência de gradiente.
  const idGradiente = `gradiente-hubfit-${useId().replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("size-9 shrink-0", className)}
      role="presentation"
      aria-hidden
    >
      <defs>
        <linearGradient id={idGradiente} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c6f24e" />
          <stop offset="100%" stopColor="#1b63e8" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={`url(#${idGradiente})`} />
      <path
        d="M14 12v16M26 12v16M14 20h12"
        stroke="#08090b"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MarcaHubfit({
  className,
  assinatura = true,
  tamanho = "md",
}: {
  className?: string;
  assinatura?: boolean;
  tamanho?: "md" | "lg";
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <SimboloHubfit className={tamanho === "lg" ? "size-11" : "size-9"} />
      <div className="leading-none">
        <p
          className={cn(
            "font-display font-extrabold tracking-tight",
            tamanho === "lg" ? "text-2xl" : "text-xl",
          )}
        >
          <span className="text-neve">HUB</span>
          <span className="text-lima-400">FIT</span>
        </p>
        {assinatura ? (
          <p className="mt-1 text-[10px] font-medium tracking-[0.22em] text-fumaca uppercase">
            Desafios e performance
          </p>
        ) : null}
      </div>
    </div>
  );
}
