import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const variantesBotao = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-lima-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-grafite-900 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variante: {
        principal:
          "bg-lima-400 text-grafite-950 hover:bg-lima-300 active:bg-lima-500 shadow-[0_8px_24px_-12px_rgba(198,242,78,0.9)]",
        estrutural: "bg-damatech-500 text-white hover:bg-damatech-400 active:bg-damatech-600",
        contorno:
          "border border-grafite-500 bg-transparent text-neve hover:border-grafite-500 hover:bg-grafite-800",
        suave: "bg-grafite-700 text-neve hover:bg-grafite-600",
        fantasma: "bg-transparent text-nevoa hover:bg-grafite-800 hover:text-neve",
        perigo: "bg-perigo/15 text-perigo hover:bg-perigo/25 border border-perigo/30",
      },
      tamanho: {
        sm: "h-9 px-3 text-sm [&_svg]:size-4",
        md: "h-11 px-4 text-sm [&_svg]:size-4",
        lg: "h-13 px-6 text-base [&_svg]:size-5",
        icone: "size-10 [&_svg]:size-4",
      },
      largura: {
        auto: "",
        cheia: "w-full",
      },
    },
    defaultVariants: {
      variante: "principal",
      tamanho: "md",
      largura: "auto",
    },
  },
);

export interface PropsBotao
  extends ComponentProps<"button">,
    VariantProps<typeof variantesBotao> {
  asChild?: boolean;
}

export function Botao({
  className,
  variante,
  tamanho,
  largura,
  asChild = false,
  ...props
}: PropsBotao) {
  const Componente = asChild ? Slot : "button";
  return (
    <Componente
      className={cn(variantesBotao({ variante, tamanho, largura }), className)}
      {...props}
    />
  );
}

export { variantesBotao };
