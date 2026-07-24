import { Crown, Minus, TrendingDown, TrendingUp } from "lucide-react";
import type { ParticipanteClassificado } from "@/dados/tipos";
import { Avatar } from "@/componentes/ui/basicos";
import { formatarNumero } from "@/lib/formato";
import { cn } from "@/lib/utils";

function Variacao({ valor }: { valor: number }) {
  if (valor === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-fumaca">
        <Minus className="size-3.5" />
        estável
      </span>
    );
  }
  const subiu = valor > 0;
  const Icone = subiu ? TrendingUp : TrendingDown;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-semibold",
        subiu ? "text-sucesso" : "text-perigo",
      )}
    >
      <Icone className="size-3.5" />
      {Math.abs(valor)}
    </span>
  );
}

export function LinhaRanking({
  participante,
  compacto = false,
}: {
  participante: ParticipanteClassificado;
  compacto?: boolean;
}) {
  const ehUsuario = participante.ehUsuario;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors",
        ehUsuario
          ? "border-lima-400/40 bg-lima-400/8"
          : "border-transparent hover:border-grafite-600 hover:bg-grafite-800/60",
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
          participante.posicao === 1
            ? "bg-lima-400 text-grafite-950"
            : participante.posicao <= 3
              ? "bg-grafite-600 text-neve"
              : "text-fumaca",
        )}
      >
        {participante.posicao === 1 ? <Crown className="size-4" /> : participante.posicao}
      </span>

      <Avatar
        nome={participante.nome}
        gradiente={participante.gradiente}
        tamanho="sm"
        destaque={ehUsuario}
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-neve">
          {ehUsuario ? "Você" : participante.nome}
        </p>
        {!compacto ? (
          <p className="truncate text-xs text-fumaca">
            {participante.treinos} treinos · {participante.patente}
          </p>
        ) : null}
      </div>

      {!compacto ? <Variacao valor={participante.variacao} /> : null}

      <span
        className={cn(
          "shrink-0 text-sm font-bold tabular-nums",
          ehUsuario ? "text-lima-400" : "text-neve",
        )}
      >
        {formatarNumero(participante.pontos)}
        <span className="ml-1 text-xs font-medium text-fumaca">pts</span>
      </span>
    </div>
  );
}
