import type { ReactNode } from "react";

export function CabecalhoPagina({
  sobretitulo,
  titulo,
  descricao,
  acao,
}: {
  sobretitulo?: string;
  titulo: string;
  descricao?: string;
  acao?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {sobretitulo ? (
          <p className="text-xs font-semibold tracking-[0.18em] text-lima-400 uppercase">
            {sobretitulo}
          </p>
        ) : null}
        <h1 className="mt-1.5 font-display text-2xl font-extrabold text-neve sm:text-3xl">
          {titulo}
        </h1>
        {descricao ? <p className="mt-2 max-w-2xl text-sm text-fumaca">{descricao}</p> : null}
      </div>
      {acao ? <div className="shrink-0">{acao}</div> : null}
    </div>
  );
}

export function Secao({
  titulo,
  acao,
  children,
}: {
  titulo: string;
  acao?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-lg font-bold text-neve">{titulo}</h2>
        {acao}
      </div>
      {children}
    </section>
  );
}
