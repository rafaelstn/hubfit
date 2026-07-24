"use client";

import type { ComponentProps, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const BASE_CAMPO =
  "w-full rounded-xl border border-grafite-600 bg-grafite-800 px-3.5 text-sm text-neve placeholder:text-fumaca outline-none transition-colors focus:border-damatech-500 focus:ring-2 focus:ring-damatech-500/25 disabled:opacity-60";

export function Rotulo({
  children,
  obrigatorio,
  dica,
  htmlFor,
}: {
  children: ReactNode;
  obrigatorio?: boolean;
  dica?: string;
  htmlFor?: string;
}) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <label htmlFor={htmlFor} className="text-sm font-medium text-nevoa">
        {children}
        {obrigatorio ? <span className="ml-1 text-lima-400">*</span> : null}
      </label>
      {dica ? <span className="text-xs text-fumaca">{dica}</span> : null}
    </div>
  );
}

export function Campo({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(BASE_CAMPO, "h-11", className)} {...props} />;
}

export function AreaTexto({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(BASE_CAMPO, "min-h-24 py-3 leading-relaxed", className)} {...props} />;
}

export function Selecao({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(BASE_CAMPO, "h-11 cursor-pointer appearance-none pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-fumaca" />
    </div>
  );
}

export function GrupoCampo({
  rotulo,
  htmlFor,
  obrigatorio,
  dica,
  erro,
  children,
  className,
}: {
  rotulo: string;
  htmlFor?: string;
  obrigatorio?: boolean;
  dica?: string;
  erro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Rotulo htmlFor={htmlFor} obrigatorio={obrigatorio} dica={dica}>
        {rotulo}
      </Rotulo>
      {children}
      {erro ? <p className="mt-1.5 text-xs text-perigo">{erro}</p> : null}
    </div>
  );
}
