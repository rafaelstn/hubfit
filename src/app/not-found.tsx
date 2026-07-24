import Link from "next/link";
import { MarcaHubfit } from "@/componentes/marca";
import { Botao } from "@/componentes/ui/botao";

export default function PaginaNaoEncontrada() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-grafite-900 px-6 text-center">
      <MarcaHubfit tamanho="lg" />
      <div>
        <p className="font-display text-6xl font-extrabold text-lima-400">404</p>
        <h1 className="mt-3 font-display text-2xl font-extrabold text-neve">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-fumaca">
          O endereço acessado não existe nesta demonstração. Volte para o início e continue a
          navegação pelos desafios.
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Botao asChild>
          <Link href="/dashboard">Ir para o início</Link>
        </Botao>
        <Botao asChild variante="contorno">
          <Link href="/">Voltar para a abertura</Link>
        </Botao>
      </div>
    </div>
  );
}
