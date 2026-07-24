"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PontoSerie } from "@/dados/tipos";
import { formatarNumero } from "@/lib/formato";

const EIXO = {
  stroke: "#7d8797",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
};

interface DicaProps {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number; color?: string }>;
  label?: string;
  sufixo?: string;
}

function Dica({ active, payload, label, sufixo = "" }: DicaProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-grafite-500 bg-grafite-800 px-3 py-2 shadow-xl">
      <p className="text-xs font-semibold text-neve">{label}</p>
      {payload.map((item, indice) => (
        <p key={indice} className="mt-0.5 text-xs text-nevoa">
          <span
            className="mr-1.5 inline-block size-2 rounded-full align-middle"
            style={{ backgroundColor: item.color }}
          />
          {item.name}: {formatarNumero(item.value ?? 0)}
          {sufixo}
        </p>
      ))}
    </div>
  );
}

export function GraficoArea({
  dados,
  altura = 220,
  nome = "Valor",
  sufixo = "",
}: {
  dados: PontoSerie[];
  altura?: number;
  nome?: string;
  sufixo?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={altura}>
      <AreaChart data={dados} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
        <defs>
          <linearGradient id="preenchimento-lima" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c6f24e" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#c6f24e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 4" stroke="#1a1f26" vertical={false} />
        <XAxis dataKey="rotulo" {...EIXO} />
        <YAxis {...EIXO} width={48} />
        <Tooltip content={<Dica sufixo={sufixo} />} cursor={{ stroke: "#2e3641" }} />
        <Area
          type="monotone"
          dataKey="valor"
          name={nome}
          stroke="#c6f24e"
          strokeWidth={2.5}
          fill="url(#preenchimento-lima)"
          dot={false}
          activeDot={{ r: 4, fill: "#c6f24e" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function GraficoBarras({
  dados,
  altura = 220,
  nome = "Atual",
  nomeComparacao = "Período anterior",
}: {
  dados: PontoSerie[];
  altura?: number;
  nome?: string;
  nomeComparacao?: string;
}) {
  const temComparacao = dados.some((ponto) => typeof ponto.comparacao === "number");
  return (
    <ResponsiveContainer width="100%" height={altura}>
      <BarChart data={dados} margin={{ top: 8, right: 8, bottom: 0, left: -18 }} barGap={6}>
        <CartesianGrid strokeDasharray="4 4" stroke="#1a1f26" vertical={false} />
        <XAxis dataKey="rotulo" {...EIXO} />
        <YAxis {...EIXO} width={48} />
        <Tooltip content={<Dica />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        {temComparacao ? (
          <Bar dataKey="comparacao" name={nomeComparacao} fill="#232932" radius={[6, 6, 0, 0]} />
        ) : null}
        <Bar dataKey="valor" name={nome} fill="#c6f24e" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function GraficoLinha({
  dados,
  altura = 220,
  nome = "Valor",
  sufixo = "%",
}: {
  dados: PontoSerie[];
  altura?: number;
  nome?: string;
  sufixo?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={altura}>
      <LineChart data={dados} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="#1a1f26" vertical={false} />
        <XAxis dataKey="rotulo" {...EIXO} />
        <YAxis {...EIXO} width={48} />
        <Tooltip content={<Dica sufixo={sufixo} />} cursor={{ stroke: "#2e3641" }} />
        <Line
          type="monotone"
          dataKey="valor"
          name={nome}
          stroke="#4a8cf7"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#4a8cf7" }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

const CORES_ROSCA = ["#c6f24e", "#4a8cf7", "#2e3641"];

export function GraficoRosca({
  dados,
  altura = 220,
}: {
  dados: PontoSerie[];
  altura?: number;
}) {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="w-full sm:w-1/2">
        <ResponsiveContainer width="100%" height={altura}>
          <PieChart>
            <Pie
              data={dados}
              dataKey="valor"
              nameKey="rotulo"
              innerRadius="62%"
              outerRadius="92%"
              paddingAngle={3}
              stroke="none"
            >
              {dados.map((ponto, indice) => (
                <Cell key={ponto.rotulo} fill={CORES_ROSCA[indice % CORES_ROSCA.length]} />
              ))}
            </Pie>
            <Tooltip content={<Dica sufixo="%" />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="w-full space-y-2 sm:w-1/2">
        {dados.map((ponto, indice) => (
          <li key={ponto.rotulo} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-nevoa">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: CORES_ROSCA[indice % CORES_ROSCA.length] }}
              />
              {ponto.rotulo} engajamento
            </span>
            <span className="font-semibold text-neve">{ponto.valor}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
