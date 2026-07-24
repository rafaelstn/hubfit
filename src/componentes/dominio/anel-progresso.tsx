"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnelProgresso({
  percentual,
  tamanho = 148,
  espessura = 12,
  rotulo,
  detalhe,
  className,
}: {
  percentual: number;
  tamanho?: number;
  espessura?: number;
  rotulo?: string;
  detalhe?: string;
  className?: string;
}) {
  const limitado = Math.max(0, Math.min(100, percentual));
  const raio = (tamanho - espessura) / 2;
  const circunferencia = 2 * Math.PI * raio;
  const preenchido = (limitado / 100) * circunferencia;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={tamanho} height={tamanho} className="-rotate-90">
        <circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          fill="none"
          stroke="var(--color-grafite-700)"
          strokeWidth={espessura}
        />
        <motion.circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          fill="none"
          stroke="var(--color-lima-400)"
          strokeWidth={espessura}
          strokeLinecap="round"
          strokeDasharray={circunferencia}
          initial={{ strokeDashoffset: circunferencia }}
          animate={{ strokeDashoffset: circunferencia - preenchido }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-extrabold text-neve">{limitado}%</span>
        {rotulo ? <span className="text-xs text-fumaca">{rotulo}</span> : null}
        {detalhe ? <span className="mt-0.5 text-[11px] text-fumaca">{detalhe}</span> : null}
      </div>
    </div>
  );
}
