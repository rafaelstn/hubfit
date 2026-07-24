import Image from "next/image";
import Link from "next/link";
import type { Patrocinador } from "@/dados/tipos";
import { EtiquetaDemonstrativa, Selo } from "@/componentes/ui/basicos";
import { Cartao } from "@/componentes/ui/cartao";
import { cn } from "@/lib/utils";

export function LogoPatrocinador({
  patrocinador,
  tamanho = "md",
}: {
  patrocinador: Patrocinador;
  tamanho?: "sm" | "md" | "lg";
}) {
  const tamanhos = {
    sm: "size-8 text-[11px]",
    md: "size-11 text-sm",
    lg: "size-14 text-base",
  };

  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl border font-display font-extrabold tracking-tight",
        tamanhos[tamanho],
      )}
      style={{
        color: patrocinador.cor,
        borderColor: `${patrocinador.cor}40`,
        backgroundColor: `${patrocinador.cor}14`,
      }}
    >
      {patrocinador.monograma}
    </span>
  );
}

export function FaixaPatrocinadores({
  patrocinadores,
  titulo = "Patrocinadores",
}: {
  patrocinadores: Patrocinador[];
  titulo?: string;
}) {
  if (patrocinadores.length === 0) return null;

  return (
    <Cartao className="p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold tracking-wide text-fumaca uppercase">{titulo}</p>
        <Link
          href="/patrocinadores"
          className="text-xs font-semibold text-damatech-300 hover:text-damatech-400"
        >
          Ver todos
        </Link>
      </div>

      <div className="sem-barra mt-4 flex gap-3 overflow-x-auto pb-1">
        {patrocinadores.map((patrocinador) => (
          <div
            key={patrocinador.id}
            className="flex min-w-[164px] flex-1 items-center gap-3 rounded-xl border border-grafite-600 bg-grafite-800 px-3 py-3"
          >
            <LogoPatrocinador patrocinador={patrocinador} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-neve">{patrocinador.nome}</p>
              <p className="truncate text-xs text-fumaca">{patrocinador.segmento}</p>
            </div>
          </div>
        ))}
      </div>
    </Cartao>
  );
}

export function CartaoPatrocinador({
  patrocinador,
  desafios,
  acao,
}: {
  patrocinador: Patrocinador;
  desafios: string[];
  acao?: React.ReactNode;
}) {
  return (
    <Cartao className="flex h-full flex-col overflow-hidden">
      {patrocinador.foto ? (
        <div className="relative h-32 w-full">
          <Image
            src={patrocinador.foto}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-grafite-850 via-grafite-850/50 to-transparent" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start gap-4">
          <LogoPatrocinador patrocinador={patrocinador} tamanho="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-display text-lg font-bold text-neve">
                {patrocinador.nome}
              </h3>
              {patrocinador.ativo ? (
                <Selo tom="sucesso">Ativo</Selo>
              ) : (
                <Selo tom="neutro">Inativo</Selo>
              )}
            </div>
            <p className="text-xs text-fumaca">{patrocinador.segmento}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-nevoa">{patrocinador.descricao}</p>

        <div className="mt-4 rounded-xl border border-grafite-600 bg-grafite-800 p-4">
          <p className="text-xs font-semibold tracking-wide text-lima-400 uppercase">Benefício</p>
          <p className="mt-1.5 text-sm text-nevoa">{patrocinador.beneficio}</p>

          <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-dashed border-grafite-500 px-3 py-2">
            <div>
              <p className="font-mono text-sm font-bold tracking-wider text-neve">
                {patrocinador.cupom}
              </p>
              <EtiquetaDemonstrativa>Cupom demonstrativo</EtiquetaDemonstrativa>
            </div>
            <span className="font-display text-lg font-extrabold text-lima-400">
              {patrocinador.desconto}
            </span>
          </div>
        </div>

        {desafios.length > 0 ? (
          <div className="mt-4">
            <p className="text-xs font-semibold tracking-wide text-fumaca uppercase">
              Desafios patrocinados
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {desafios.map((nome) => (
                <Selo key={nome} tom="neutro">
                  {nome}
                </Selo>
              ))}
            </div>
          </div>
        ) : null}

        {acao ? <div className="mt-5 pt-1">{acao}</div> : null}
      </div>
    </Cartao>
  );
}
