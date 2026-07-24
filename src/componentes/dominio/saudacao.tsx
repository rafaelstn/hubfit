"use client";

import { useEffect, useState } from "react";
import { primeiroNome, saudacao } from "@/lib/formato";

/**
 * A saudação depende do horário do visitante, então só é resolvida no navegador
 * para o texto do servidor e o do cliente nunca divergirem.
 */
export function Saudacao({ nome }: { nome: string }) {
  const [texto, setTexto] = useState("Olá");

  useEffect(() => {
    setTexto(saudacao(new Date().getHours()));
  }, []);

  return (
    <h1 className="font-display text-2xl font-extrabold text-neve sm:text-3xl">
      {texto}, {primeiroNome(nome)}
    </h1>
  );
}
