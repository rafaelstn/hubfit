import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { iniciais } from "@/lib/formato";

const variantesSelo = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      tom: {
        lima: "border-lima-400/30 bg-lima-400/12 text-lima-300",
        azul: "border-damatech-400/30 bg-damatech-500/15 text-damatech-300",
        neutro: "border-grafite-500 bg-grafite-700 text-nevoa",
        sucesso: "border-sucesso/30 bg-sucesso/12 text-sucesso",
        alerta: "border-alerta/30 bg-alerta/12 text-alerta",
        perigo: "border-perigo/30 bg-perigo/12 text-perigo",
      },
    },
    defaultVariants: { tom: "neutro" },
  },
);

export function Selo({
  className,
  tom,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof variantesSelo>) {
  return <span className={cn(variantesSelo({ tom }), className)} {...props} />;
}

export function Avatar({
  nome,
  gradiente = "from-grafite-500 to-grafite-700",
  tamanho = "md",
  destaque = false,
}: {
  nome: string;
  gradiente?: string;
  tamanho?: "sm" | "md" | "lg" | "xl";
  destaque?: boolean;
}) {
  const tamanhos = {
    sm: "size-8 text-[11px]",
    md: "size-10 text-xs",
    lg: "size-14 text-sm",
    xl: "size-20 text-lg",
  };

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-bold text-grafite-950",
        tamanhos[tamanho],
        gradiente,
        destaque && "ring-2 ring-lima-400 ring-offset-2 ring-offset-grafite-900",
      )}
    >
      {iniciais(nome)}
    </span>
  );
}

export function Progresso({
  valor,
  className,
  tom = "lima",
}: {
  valor: number;
  className?: string;
  tom?: "lima" | "azul";
}) {
  const limitado = Math.max(0, Math.min(100, valor));
  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-full bg-grafite-700", className)}
      role="progressbar"
      aria-valuenow={limitado}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-700 ease-out",
          tom === "lima" ? "bg-lima-400" : "bg-damatech-500",
        )}
        style={{ width: `${limitado}%` }}
      />
    </div>
  );
}

export function EstadoVazio({
  icone,
  titulo,
  mensagem,
  acao,
}: {
  icone: ReactNode;
  titulo: string;
  mensagem: string;
  acao?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-grafite-500 bg-grafite-850/50 px-6 py-12 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-grafite-700 text-fumaca [&_svg]:size-5">
        {icone}
      </span>
      <div>
        <p className="font-semibold text-neve">{titulo}</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-fumaca">{mensagem}</p>
      </div>
      {acao}
    </div>
  );
}

export function Esqueleto({ className }: { className?: string }) {
  return <div className={cn("animate-pulsar-suave rounded-lg bg-grafite-700", className)} />;
}

/** Mensagem explicativa usada para orientar o cliente durante a apresentação. */
export function NotaDemo({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-damatech-500/25 bg-damatech-500/8 px-4 py-3",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0 text-damatech-300" />
      <p className="text-sm leading-relaxed text-nevoa">{children}</p>
    </div>
  );
}

export function EtiquetaDemonstrativa({ children }: { children?: ReactNode }) {
  return (
    <span className="text-[11px] font-medium tracking-wide text-fumaca uppercase">
      {children ?? "Dado demonstrativo"}
    </span>
  );
}
