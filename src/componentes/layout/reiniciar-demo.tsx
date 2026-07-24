"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Botao } from "@/componentes/ui/botao";
import { DialogoConfirmacao } from "@/componentes/ui/dialogo";
import { useDemo } from "@/estado/store";

export function ReiniciarDemo({ variante = "texto" }: { variante?: "texto" | "icone" }) {
  const [aberto, setAberto] = useState(false);
  const { reiniciarDemo } = useDemo();
  const router = useRouter();

  function confirmar() {
    reiniciarDemo();
    toast.success("Demonstração reiniciada", {
      description: "Os dados voltaram ao estado original.",
    });
    router.push("/dashboard");
  }

  return (
    <>
      {variante === "icone" ? (
        <Botao
          variante="fantasma"
          tamanho="icone"
          onClick={() => setAberto(true)}
          aria-label="Reiniciar demonstração"
          title="Reiniciar demonstração"
        >
          <RotateCcw />
        </Botao>
      ) : (
        <Botao variante="fantasma" tamanho="sm" onClick={() => setAberto(true)}>
          <RotateCcw />
          Reiniciar demonstração
        </Botao>
      )}

      <DialogoConfirmacao
        aberto={aberto}
        aoMudar={setAberto}
        titulo="Reiniciar demonstração"
        mensagem="Os treinos registrados, os desafios criados e as alterações feitas nesta sessão serão apagados. Os dados voltam ao estado inicial e a navegação retorna ao início."
        rotuloConfirmar="Reiniciar agora"
        aoConfirmar={confirmar}
      />
    </>
  );
}
