"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Botao } from "./botao";

export function Dialogo({
  aberto,
  aoMudar,
  titulo,
  descricao,
  children,
  rodape,
  largura = "md",
}: {
  aberto: boolean;
  aoMudar: (aberto: boolean) => void;
  titulo: string;
  descricao?: string;
  children?: ReactNode;
  rodape?: ReactNode;
  largura?: "sm" | "md" | "lg";
}) {
  const larguras = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
  };

  return (
    <DialogPrimitive.Root open={aberto} onOpenChange={aoMudar}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-grafite-950/80 backdrop-blur-sm data-[state=open]:animate-[surgir_0.2s_ease-out]" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col rounded-t-2xl border border-grafite-600 bg-grafite-850 shadow-2xl outline-none",
            "sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:w-[calc(100%-2rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl",
            larguras[largura],
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-grafite-600 p-5">
            <div className="min-w-0">
              <DialogPrimitive.Title className="text-lg font-bold text-neve">
                {titulo}
              </DialogPrimitive.Title>
              {descricao ? (
                <DialogPrimitive.Description className="mt-1 text-sm text-fumaca">
                  {descricao}
                </DialogPrimitive.Description>
              ) : (
                <DialogPrimitive.Description className="sr-only">
                  {titulo}
                </DialogPrimitive.Description>
              )}
            </div>
            <DialogPrimitive.Close asChild>
              <Botao variante="fantasma" tamanho="icone" aria-label="Fechar">
                <X />
              </Botao>
            </DialogPrimitive.Close>
          </div>

          <div className="rolagem-fina min-h-0 flex-1 overflow-y-auto p-5">{children}</div>

          {rodape ? (
            <div className="flex flex-col-reverse gap-2 border-t border-grafite-600 p-5 sm:flex-row sm:justify-end">
              {rodape}
            </div>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function DialogoConfirmacao({
  aberto,
  aoMudar,
  titulo,
  mensagem,
  rotuloConfirmar = "Confirmar",
  varianteConfirmar = "principal",
  aoConfirmar,
}: {
  aberto: boolean;
  aoMudar: (aberto: boolean) => void;
  titulo: string;
  mensagem: string;
  rotuloConfirmar?: string;
  varianteConfirmar?: "principal" | "perigo";
  aoConfirmar: () => void;
}) {
  return (
    <Dialogo
      aberto={aberto}
      aoMudar={aoMudar}
      titulo={titulo}
      largura="sm"
      rodape={
        <>
          <Botao variante="contorno" onClick={() => aoMudar(false)}>
            Cancelar
          </Botao>
          <Botao
            variante={varianteConfirmar}
            onClick={() => {
              aoConfirmar();
              aoMudar(false);
            }}
          >
            {rotuloConfirmar}
          </Botao>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-nevoa">{mensagem}</p>
    </Dialogo>
  );
}
