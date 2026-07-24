import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Trophy, Users } from "lucide-react";
import type { Desafio } from "@/dados/tipos";
import { Selo } from "@/componentes/ui/basicos";
import { Progresso } from "@/componentes/ui/basicos";
import { formatarMoeda, formatarNumero, formatarPeriodo } from "@/lib/formato";
import { cn } from "@/lib/utils";

export function SeloSituacao({ situacao }: { situacao: Desafio["situacao"] }) {
  if (situacao === "ativo") return <Selo tom="lima">Em andamento</Selo>;
  if (situacao === "futuro") return <Selo tom="azul">Programado</Selo>;
  return <Selo tom="neutro">Encerrado</Selo>;
}

export function CartaoDesafio({
  desafio,
  progresso,
  className,
}: {
  desafio: Desafio;
  progresso?: { concluidos: number; meta: number; percentual: number };
  className?: string;
}) {
  return (
    <Link
      href={`/desafios/${desafio.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-card border border-grafite-600 bg-grafite-850 transition-colors hover:border-grafite-500",
        className,
      )}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={desafio.imagem}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-grafite-850 via-grafite-850/60 to-transparent" />
        <div className="absolute top-3 left-3">
          <SeloSituacao situacao={desafio.situacao} />
        </div>
        <div className="absolute right-4 bottom-3 left-4">
          <h3 className="font-display text-lg font-extrabold text-neve">{desafio.nome}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="line-clamp-2 text-sm text-fumaca">{desafio.chamada}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-fumaca">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {formatarPeriodo(desafio.inicio, desafio.fim)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-3.5" />
            {formatarNumero(desafio.participantes)} participantes
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Trophy className="size-3.5" />
            {formatarMoeda(desafio.premiacaoTotal)} em prêmios
          </span>
        </div>

        {progresso ? (
          <div className="mt-auto space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-fumaca">Seu progresso</span>
              <span className="font-semibold text-neve">
                {progresso.concluidos} de {progresso.meta} treinos
              </span>
            </div>
            <Progresso valor={progresso.percentual} />
          </div>
        ) : (
          <div className="mt-auto flex items-center justify-between pt-1 text-xs">
            <span className="text-fumaca">Meta do desafio</span>
            <span className="font-semibold text-neve">{desafio.metaTreinos} treinos</span>
          </div>
        )}
      </div>
    </Link>
  );
}
