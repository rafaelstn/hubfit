import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Cartao({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-card border border-grafite-600 bg-grafite-850/90 backdrop-blur-[2px]",
        className,
      )}
      {...props}
    />
  );
}

export function CartaoCabecalho({
  titulo,
  descricao,
  acao,
  className,
}: {
  titulo: ReactNode;
  descricao?: ReactNode;
  acao?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4 p-5 pb-0", className)}>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold tracking-wide text-nevoa uppercase">{titulo}</h3>
        {descricao ? <p className="mt-1 text-sm text-fumaca">{descricao}</p> : null}
      </div>
      {acao ? <div className="shrink-0">{acao}</div> : null}
    </div>
  );
}

export function CartaoConteudo({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("p-5", className)} {...props} />;
}

export function CartaoRodape({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-3 border-t border-grafite-600 px-5 py-4", className)}
      {...props}
    />
  );
}
