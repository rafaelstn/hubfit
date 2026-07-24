const LARGURA_MAXIMA = 720;
const QUALIDADE = 0.72;

/**
 * Lê a foto escolhida e devolve uma prévia local já reduzida.
 * O arquivo não sai do navegador: a demonstração não envia nada para servidor,
 * e a compressão evita estourar o limite do armazenamento local.
 */
export function lerPreviaLocal(arquivo: File): Promise<string> {
  return new Promise((resolver, rejeitar) => {
    if (!arquivo.type.startsWith("image/")) {
      rejeitar(new Error("Selecione uma imagem nos formatos JPG, PNG ou WEBP."));
      return;
    }

    const leitor = new FileReader();
    leitor.onerror = () => rejeitar(new Error("Não foi possível ler a imagem escolhida."));
    leitor.onload = () => {
      const imagem = new Image();
      imagem.onerror = () => rejeitar(new Error("Não foi possível abrir a imagem escolhida."));
      imagem.onload = () => {
        const escala = Math.min(1, LARGURA_MAXIMA / imagem.width);
        const largura = Math.round(imagem.width * escala);
        const altura = Math.round(imagem.height * escala);

        const tela = document.createElement("canvas");
        tela.width = largura;
        tela.height = altura;
        const contexto = tela.getContext("2d");
        if (!contexto) {
          resolver(String(leitor.result));
          return;
        }
        contexto.drawImage(imagem, 0, 0, largura, altura);
        resolver(tela.toDataURL("image/jpeg", QUALIDADE));
      };
      imagem.src = String(leitor.result);
    };
    leitor.readAsDataURL(arquivo);
  });
}
