import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Cartao } from "@/componentes/ui/cartao";
import { cn } from "@/lib/utils";

export function CartaoMetrica({
  rotulo,
  valor,
  unidade,
  detalhe,
  variacao,
  icone: Icone,
  quedaEhBoa = false,
  className,
}: {
  rotulo: string;
  valor: string | number;
  unidade?: string;
  detalhe?: string;
  variacao?: number;
  icone?: LucideIcon;
  quedaEhBoa?: boolean;
  className?: string;
}) {
  const positivo = typeof variacao === "number" ? variacao >= 0 : undefined;
  const bom = positivo === undefined ? undefined : quedaEhBoa ? !positivo : positivo;
  const Seta = positivo ? ArrowUpRight : ArrowDownRight;

  return (
    <Cartao className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold tracking-wide text-fumaca uppercase">{rotulo}</p>
        {Icone ? (
          <span className="flex size-9 items-center justify-center rounded-xl bg-grafite-700 text-nevoa">
            <Icone className="size-4" />
          </span>
        ) : null}
      </div>

      <p className="mt-3 font-display text-3xl font-extrabold text-neve">
        {valor}
        {unidade ? <span className="ml-1 text-base font-semibold text-fumaca">{unidade}</span> : null}
      </p>

      <div className="mt-2 flex items-center gap-2">
        {typeof variacao === "number" ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold",
              bom ? "text-sucesso" : "text-perigo",
            )}
          >
            <Seta className="size-3.5" />
            {Math.abs(variacao)}%
          </span>
        ) : null}
        {detalhe ? <span className="text-xs text-fumaca">{detalhe}</span> : null}
      </div>
    </Cartao>
  );
}
