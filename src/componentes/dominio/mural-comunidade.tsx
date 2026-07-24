import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { MURAL_COMUNIDADE } from "@/dados/mural";
import { corDoTipo, fotoDoTipo } from "@/dados/catalogo";
import { Avatar, EtiquetaDemonstrativa } from "@/componentes/ui/basicos";
import { Cartao, CartaoCabecalho, CartaoConteudo } from "@/componentes/ui/cartao";
import { formatarNumero } from "@/lib/formato";

/** Prova social do desafio: treinos recentes dos participantes. */
export function MuralComunidade() {
  return (
    <Cartao>
      <CartaoCabecalho
        titulo="Mural da comunidade"
        descricao="Treinos recentes dos participantes do desafio"
        acao={<EtiquetaDemonstrativa>Prova social</EtiquetaDemonstrativa>}
      />
      <CartaoConteudo className="pt-4">
        <div className="sem-barra flex gap-4 overflow-x-auto pb-1">
          {MURAL_COMUNIDADE.map((post) => (
            <article
              key={post.id}
              className="flex w-64 shrink-0 flex-col overflow-hidden rounded-xl border border-grafite-600 bg-grafite-800"
            >
              <div className="relative h-28 w-full">
                <Image
                  src={fotoDoTipo(post.tipo)}
                  alt=""
                  fill
                  sizes="256px"
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-grafite-800 to-transparent" />
                <span
                  className="absolute top-2.5 left-2.5 rounded-md px-2 py-0.5 text-[11px] font-semibold text-grafite-950"
                  style={{ backgroundColor: corDoTipo(post.tipo) }}
                >
                  {post.tipo}
                </span>
                <span className="absolute right-2.5 bottom-2.5 rounded-md bg-grafite-950/70 px-2 py-0.5 text-xs font-bold text-lima-400">
                  +{post.pontos} pts
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-3">
                <Avatar nome={post.nome} gradiente={post.gradiente} tamanho="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-neve">{post.nome}</p>
                  <p className="truncate text-xs text-fumaca">
                    {post.cidade} · {post.quando}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t border-grafite-600 px-3 py-2 text-xs text-fumaca">
                <span className="inline-flex items-center gap-1.5">
                  <Heart className="size-3.5 text-perigo" />
                  {formatarNumero(post.curtidas)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MessageCircle className="size-3.5" />
                  comentar
                </span>
              </div>
            </article>
          ))}
        </div>
      </CartaoConteudo>
    </Cartao>
  );
}
