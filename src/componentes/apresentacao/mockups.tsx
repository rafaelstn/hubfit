"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Moldura de navegador com a captura real de uma tela desktop da demonstração. */
export function MolduraNavegador({
  imagem,
  legenda,
  className,
  flutuar = true,
  prioridade = false,
}: {
  imagem: string;
  legenda: string;
  className?: string;
  flutuar?: boolean;
  prioridade?: boolean;
}) {
  const reduzir = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "overflow-hidden rounded-xl border border-grafite-600 bg-grafite-850 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]",
        className,
      )}
      animate={flutuar && !reduzir ? { y: [0, -12, 0] } : undefined}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="flex items-center gap-2 border-b border-grafite-600 bg-grafite-800 px-4 py-2.5">
        <span className="size-3 rounded-full bg-perigo/70" />
        <span className="size-3 rounded-full bg-alerta/70" />
        <span className="size-3 rounded-full bg-sucesso/70" />
        <span className="mx-auto max-w-xs flex-1 rounded-md bg-grafite-700 px-3 py-1 text-center text-[11px] text-fumaca">
          app.hubfit.com.br
        </span>
      </div>
      <Image
        src={imagem}
        alt={legenda}
        width={1440}
        height={900}
        priority={prioridade}
        className="h-auto w-full"
      />
    </motion.div>
  );
}

/** Moldura de celular com notch e a captura real de uma tela mobile. */
export function MolduraCelular({
  imagem,
  legenda,
  className,
  flutuar = true,
  atraso = 0,
}: {
  imagem: string;
  legenda: string;
  className?: string;
  flutuar?: boolean;
  atraso?: number;
}) {
  const reduzir = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "relative w-[228px] rounded-[2.4rem] border-[6px] border-grafite-700 bg-grafite-950 p-1.5 shadow-[0_45px_90px_-30px_rgba(0,0,0,0.9)]",
        className,
      )}
      animate={flutuar && !reduzir ? { y: [0, -16, 0] } : undefined}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: atraso }}
    >
      <div className="absolute top-3 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-grafite-950" />
      <div className="overflow-hidden rounded-[1.9rem]">
        <Image
          src={imagem}
          alt={legenda}
          width={390}
          height={844}
          className="h-auto w-full"
        />
      </div>
    </motion.div>
  );
}

/** Reveal padrão ao rolar a página. */
export function Revela({
  children,
  atraso = 0,
  className,
}: {
  children: ReactNode;
  atraso?: number;
  className?: string;
}) {
  const reduzir = useReducedMotion();

  if (reduzir) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay: atraso }}
    >
      {children}
    </motion.div>
  );
}
