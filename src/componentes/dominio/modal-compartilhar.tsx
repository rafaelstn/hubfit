"use client";

import { Camera, Share2 } from "lucide-react";
import { SimboloHubfit } from "@/componentes/marca";
import { LogoPatrocinador } from "@/componentes/dominio/patrocinadores";
import { Botao } from "@/componentes/ui/botao";
import { Dialogo } from "@/componentes/ui/dialogo";
import { NotaDemo } from "@/componentes/ui/basicos";
import type { Patrocinador } from "@/dados/tipos";
import { formatarNumero } from "@/lib/formato";

/** Arte conceitual do compartilhamento, montada na própria tela. */
export function ModalCompartilhar({
  aberto,
  aoMudar,
  nome,
  desafio,
  pontos,
  posicao,
  sequencia,
  tipoTreino,
  duracaoMin,
  patrocinadores,
  patrocinadoresMarcados,
}: {
  aberto: boolean;
  aoMudar: (aberto: boolean) => void;
  nome: string;
  desafio: string;
  pontos: number;
  posicao: number;
  sequencia: number;
  tipoTreino: string;
  duracaoMin: number;
  patrocinadores: Patrocinador[];
  patrocinadoresMarcados: boolean;
}) {
  return (
    <Dialogo
      aberto={aberto}
      aoMudar={aoMudar}
      titulo="Compartilhar resultado"
      descricao="Prévia da arte que o participante publica nas redes."
      rodape={
        <Botao variante="contorno" onClick={() => aoMudar(false)}>
          Fechar
        </Botao>
      }
    >
      <div className="space-y-4">
        <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-grafite-600 bg-gradient-to-br from-grafite-800 via-grafite-850 to-grafite-900 p-5">
          <div className="absolute inset-0 grade-tenue opacity-70" />
          <div className="relative space-y-5">
            <div className="flex items-center justify-between">
              <SimboloHubfit className="size-8" />
              <span className="text-[10px] font-semibold tracking-[0.2em] text-fumaca uppercase">
                {desafio}
              </span>
            </div>

            <div>
              <p className="text-xs text-fumaca">Treino concluído</p>
              <p className="font-display text-2xl font-extrabold text-neve">
                {tipoTreino}, {duracaoMin} min
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-grafite-600 bg-grafite-900/70 p-3 text-center">
                <p className="font-display text-xl font-extrabold text-lima-400">
                  +{formatarNumero(pontos)}
                </p>
                <p className="text-[10px] text-fumaca">pontos</p>
              </div>
              <div className="rounded-xl border border-grafite-600 bg-grafite-900/70 p-3 text-center">
                <p className="font-display text-xl font-extrabold text-neve">{posicao}º</p>
                <p className="text-[10px] text-fumaca">no ranking</p>
              </div>
              <div className="rounded-xl border border-grafite-600 bg-grafite-900/70 p-3 text-center">
                <p className="font-display text-xl font-extrabold text-neve">{sequencia}</p>
                <p className="text-[10px] text-fumaca">dias seguidos</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-grafite-600 pt-4">
              <p className="text-sm font-semibold text-neve">{nome}</p>
              {patrocinadoresMarcados ? (
                <div className="flex items-center gap-1.5">
                  {patrocinadores.slice(0, 4).map((patrocinador) => (
                    <LogoPatrocinador
                      key={patrocinador.id}
                      patrocinador={patrocinador}
                      tamanho="sm"
                    />
                  ))}
                </div>
              ) : (
                <span className="text-[10px] text-fumaca">
                  Marque os patrocinadores para exibi-los aqui
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Botao variante="suave" tamanho="sm" disabled>
            <Camera />
            Publicar nos stories
          </Botao>
          <Botao variante="suave" tamanho="sm" disabled>
            <Share2 />
            Outras redes
          </Botao>
        </div>

        <NotaDemo>
          Na versão oficial, o compartilhamento poderá ser adaptado conforme as permissões
          disponíveis nas APIs das redes sociais.
        </NotaDemo>
      </div>
    </Dialogo>
  );
}
