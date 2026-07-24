import { Esqueleto } from "@/componentes/ui/basicos";

/** Carregamento simulado exibido enquanto o estado da demonstração é restaurado. */
export function CarregandoDemo() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6">
      <div className="space-y-3">
        <Esqueleto className="h-4 w-40" />
        <Esqueleto className="h-8 w-72" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Esqueleto className="h-64 lg:col-span-2" />
        <Esqueleto className="h-64" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Esqueleto className="h-28" />
        <Esqueleto className="h-28" />
        <Esqueleto className="h-28" />
        <Esqueleto className="h-28" />
      </div>
    </div>
  );
}
