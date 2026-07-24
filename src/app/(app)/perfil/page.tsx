"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Award,
  CalendarCheck,
  Dumbbell,
  Flame,
  Heart,
  Lock,
  Medal,
  Target,
  Trophy,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { CabecalhoPagina, Secao } from "@/componentes/dominio/cabecalho-pagina";
import { CartaoMetrica } from "@/componentes/dominio/cartao-metrica";
import { LogoPatrocinador } from "@/componentes/dominio/patrocinadores";
import { Avatar, EstadoVazio, NotaDemo, Progresso, Selo } from "@/componentes/ui/basicos";
import { Botao } from "@/componentes/ui/botao";
import { Cartao, CartaoCabecalho, CartaoConteudo } from "@/componentes/ui/cartao";
import type { Conquista } from "@/dados/tipos";
import { corDoTipo, fotoDoTipo } from "@/dados/catalogo";
import {
  desafioAtivoDe,
  progressoDoUsuario,
  treinosDoUsuario,
  usuarioClassificado,
} from "@/estado/seletores";
import { useDemo } from "@/estado/store";
import { formatarData, formatarNumero, formatarDuracao, ordinal } from "@/lib/formato";
import { cn } from "@/lib/utils";

const ICONES: Record<Conquista["icone"], LucideIcon> = {
  medalha: Medal,
  chama: Flame,
  trofeu: Trophy,
  alvo: Target,
  calendario: CalendarCheck,
  raio: Zap,
};

export default function PaginaPerfil() {
  const { estado } = useDemo();
  const usuario = usuarioClassificado(estado);
  const desafio = desafioAtivoDe(estado);
  const progresso = progressoDoUsuario(estado, desafio);
  const historico = treinosDoUsuario(estado);
  const encerrados = estado.desafios.filter((item) => item.situacao === "encerrado");
  const favoritos = estado.patrocinadores.filter((item) => item.ativo).slice(0, 4);
  const desbloqueadas = estado.conquistas.filter((item) => item.desbloqueada);

  const pontosNoNivel = usuario.pontos % 180;
  const percentualNivel = Math.round((pontosNoNivel / 180) * 100);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6">
      <CabecalhoPagina
        sobretitulo="Participante"
        titulo="Meu perfil"
        descricao="Histórico, conquistas e evolução dentro dos desafios."
        acao={
          <Botao asChild variante="contorno">
            <Link href="/registrar-treino">Registrar treino</Link>
          </Botao>
        }
      />

      <Cartao className="overflow-hidden">
        <div className="relative h-36 w-full sm:h-44">
          <Image
            src="/fotos/ambiente-academia.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-grafite-850 via-grafite-850/60 to-transparent" />
        </div>

        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="-mt-10 mb-4">
            <Avatar nome={usuario.nome} gradiente={usuario.gradiente} tamanho="xl" destaque />
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-2xl font-extrabold text-neve">{usuario.nome}</h2>
                <Selo tom="lima">Nível {usuario.nivel}</Selo>
                <Selo tom="azul">{usuario.patente}</Selo>
              </div>
              <p className="mt-1 text-sm text-fumaca">
                {usuario.cidade} · participa desde {formatarData(usuario.entrouEm)}
              </p>
            </div>

            <div className="w-full max-w-sm space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-fumaca">Progresso para o nível {usuario.nivel + 1}</span>
                <span className="font-semibold text-neve">{pontosNoNivel} de 180 pts</span>
              </div>
              <Progresso valor={percentualNivel} />
            </div>
          </div>
        </div>
      </Cartao>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CartaoMetrica
          rotulo="Pontos"
          valor={formatarNumero(usuario.pontos)}
          detalhe="acumulados na plataforma"
          icone={Zap}
        />
        <CartaoMetrica
          rotulo="Posição"
          valor={ordinal(usuario.posicao)}
          detalhe={`entre ${estado.participantes.length} participantes`}
          icone={Trophy}
        />
        <CartaoMetrica
          rotulo="Sequência atual"
          valor={usuario.sequencia}
          unidade="dias"
          detalhe="sem quebrar o ritmo"
          icone={Flame}
        />
        <CartaoMetrica
          rotulo="Desafios concluídos"
          valor={encerrados.length}
          detalhe={`${historico.length} treinos registrados`}
          icone={Award}
        />
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-3">
        <Cartao className="lg:col-span-2">
          <CartaoCabecalho
            titulo="Histórico de treinos"
            descricao={`${historico.length} registros no desafio ${desafio.nome}`}
          />
          <CartaoConteudo className="pt-3">
            {historico.length === 0 ? (
              <EstadoVazio
                icone={<Dumbbell />}
                titulo="Nenhum treino registrado"
                mensagem="Assim que você registrar o primeiro treino, ele aparece aqui com pontuação e evolução."
                acao={
                  <Botao asChild>
                    <Link href="/registrar-treino">Registrar treino</Link>
                  </Botao>
                }
              />
            ) : (
              <ul className="rolagem-fina max-h-[28rem] space-y-2 overflow-y-auto pr-1">
                {historico.map((treino) => (
                  <li
                    key={treino.id}
                    className="flex items-center gap-3 rounded-xl border border-grafite-600 bg-grafite-800 p-3"
                  >
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={treino.foto ?? fotoDoTipo(treino.tipo)}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                        unoptimized={Boolean(treino.foto)}
                      />
                      <span
                        className="absolute inset-x-0 bottom-0 h-1"
                        style={{ backgroundColor: corDoTipo(treino.tipo) }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold text-neve">{treino.tipo}</p>
                        {treino.registradoNaDemo ? <Selo tom="lima">Novo</Selo> : null}
                      </div>
                      <p className="truncate text-xs text-fumaca">
                        {formatarData(treino.data)} · {formatarDuracao(treino.duracaoMin)}
                        {treino.volumeKg > 0
                          ? ` · ${formatarNumero(treino.volumeKg)} kg`
                          : ""}
                      </p>
                      {treino.observacao ? (
                        <p className="mt-1 line-clamp-1 text-xs text-nevoa">{treino.observacao}</p>
                      ) : null}
                    </div>

                    <span className="shrink-0 text-sm font-bold text-lima-400">
                      +{treino.pontos}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CartaoConteudo>
        </Cartao>

        <div className="space-y-4">
          <Cartao>
            <CartaoCabecalho
              titulo="Conquistas"
              descricao={`${desbloqueadas.length} de ${estado.conquistas.length} desbloqueadas`}
            />
            <CartaoConteudo className="space-y-2 pt-3">
              {estado.conquistas.map((conquista) => {
                const Icone = ICONES[conquista.icone];
                return (
                  <div
                    key={conquista.id}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border p-3",
                      conquista.desbloqueada
                        ? "border-lima-400/30 bg-lima-400/8"
                        : "border-grafite-600 bg-grafite-800",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl",
                        conquista.desbloqueada
                          ? "bg-lima-400 text-grafite-950"
                          : "bg-grafite-700 text-fumaca",
                      )}
                    >
                      {conquista.desbloqueada ? (
                        <Icone className="size-5" />
                      ) : (
                        <Lock className="size-4" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-neve">{conquista.nome}</p>
                      <p className="truncate text-xs text-fumaca">
                        {conquista.desbloqueada && conquista.em
                          ? `Conquistada em ${formatarData(conquista.em)}`
                          : conquista.descricao}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CartaoConteudo>
          </Cartao>

          <Cartao>
            <CartaoCabecalho
              titulo="Patrocinadores favoritos"
              acao={<Heart className="size-4 text-fumaca" />}
            />
            <CartaoConteudo className="space-y-2 pt-3">
              {favoritos.map((patrocinador) => (
                <Link
                  key={patrocinador.id}
                  href="/patrocinadores"
                  className="flex items-center gap-3 rounded-xl border border-grafite-600 bg-grafite-800 px-3 py-2.5 transition-colors hover:border-grafite-500"
                >
                  <LogoPatrocinador patrocinador={patrocinador} tamanho="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-neve">{patrocinador.nome}</p>
                    <p className="truncate text-xs text-fumaca">{patrocinador.desconto}</p>
                  </div>
                </Link>
              ))}
            </CartaoConteudo>
          </Cartao>
        </div>
      </div>

      <Secao titulo="Desafios concluídos">
        {encerrados.length === 0 ? (
          <EstadoVazio
            icone={<Award />}
            titulo="Nenhum desafio concluído ainda"
            mensagem="Ao encerrar uma campanha com a meta batida, o resultado aparece aqui no seu histórico."
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {encerrados.map((item) => (
              <Link
                key={item.id}
                href={`/desafios/${item.id}`}
                className="flex items-center justify-between gap-4 rounded-card border border-grafite-600 bg-grafite-850 p-4 transition-colors hover:border-grafite-500"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-neve">{item.nome}</p>
                  <p className="text-xs text-fumaca">
                    Meta de {item.metaTreinos} treinos · {formatarNumero(item.participantes)}{" "}
                    participantes
                  </p>
                </div>
                <Selo tom="neutro">Encerrado</Selo>
              </Link>
            ))}
          </div>
        )}
      </Secao>

      <NotaDemo>
        Esta tela demonstra o perfil do participante com progresso de nível, histórico e conquistas.
        Novos treinos registrados aparecem no topo do histórico com o selo de novidade.
      </NotaDemo>

      <div className="pt-2 text-center">
        <p className="text-xs text-fumaca">
          Progresso salvo apenas neste navegador · {formatarNumero(progresso.volumeTotal)} kg de
          volume no desafio atual
        </p>
      </div>
    </div>
  );
}
