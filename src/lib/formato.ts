const MESES_CURTOS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

/** Datas da demo trafegam como "AAAA-MM-DD" e sao formatadas sem fuso, para nao virar o dia. */
function partesData(iso: string) {
  const [ano, mes, dia] = iso.slice(0, 10).split("-").map(Number);
  return { ano, mes, dia };
}

export function formatarData(iso: string) {
  const { ano, mes, dia } = partesData(iso);
  return `${String(dia).padStart(2, "0")}/${String(mes).padStart(2, "0")}/${ano}`;
}

export function formatarDataCurta(iso: string) {
  const { mes, dia } = partesData(iso);
  return `${String(dia).padStart(2, "0")} ${MESES_CURTOS[mes - 1]}`;
}

export function formatarPeriodo(inicio: string, fim: string) {
  const a = partesData(inicio);
  const b = partesData(fim);
  const mesmoAno = a.ano === b.ano;
  const esquerda = `${String(a.dia).padStart(2, "0")} ${MESES_CURTOS[a.mes - 1]}${
    mesmoAno ? "" : ` ${a.ano}`
  }`;
  const direita = `${String(b.dia).padStart(2, "0")} ${MESES_CURTOS[b.mes - 1]} ${b.ano}`;
  return `${esquerda} a ${direita}`;
}

export function formatarNumero(valor: number) {
  return new Intl.NumberFormat("pt-BR").format(Math.round(valor));
}

export function formatarMoeda(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(valor);
}

export function formatarDuracao(minutos: number) {
  if (minutos < 60) return `${minutos} min`;
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  return resto === 0 ? `${horas}h` : `${horas}h ${resto}min`;
}

export function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/);
  const primeira = partes[0]?.[0] ?? "";
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}

export function primeiroNome(nome: string) {
  return nome.trim().split(/\s+/)[0];
}

export function saudacao(hora: number) {
  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
}

export function diasEntre(inicioIso: string, fimIso: string) {
  const inicio = Date.parse(`${inicioIso.slice(0, 10)}T00:00:00`);
  const fim = Date.parse(`${fimIso.slice(0, 10)}T00:00:00`);
  return Math.round((fim - inicio) / 86_400_000);
}

export function ordinal(posicao: number) {
  return `${posicao}º`;
}
