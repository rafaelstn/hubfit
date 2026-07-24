# HUBFIT — site de apresentação e demonstração navegável

Site comercial do HUBFIT, aplicativo de desafios fitness com gamificação de treinos, ranking,
patrocinadores e painel administrativo. A página inicial (`/`) é uma **apresentação completa do
produto** (problema, solução, jornada, escopo da Fase 1, monetização, roadmap e investimento) com
mockups animados das telas reais. A partir dela o visitante entra na **demonstração navegável** dos
fluxos do participante e do administrador.

Não é o produto final. Não existe banco de dados, autenticação real nem integração externa nesta
etapa. Todo o estado da demonstração vive no navegador (LocalStorage).

## Stack

- Next.js 15 (App Router) e React 19
- TypeScript em modo estrito
- Tailwind CSS 4 (tokens de tema declarados em `src/app/globals.css`)
- Componentes no padrão shadcn/ui, copiados para dentro do projeto em `src/componentes/ui`
  (Radix UI + class-variance-authority), com nomenclatura em português
- Lucide Icons, Recharts (gráficos), Framer Motion (apenas transições discretas), Sonner (avisos)
- Dados mockados em `src/dados` e estado persistido em LocalStorage

## Instalação e execução

Requisitos: Node.js 20 ou superior.

```bash
npm install
npm run dev       # http://localhost:3000
```

Verificações antes de publicar:

```bash
npm run lint      # ESLint (eslint-config-next)
npm run typecheck # TypeScript sem emissão
npm run build     # build de produção
npm run start     # serve o build local
```

Observação de ambiente (HD F da rede): trabalhe sempre pela unidade mapeada `F:\Projetos\...`, nunca
pelo caminho UNC `\\192.168.18.170\f\...`. Em UNC o `npm install` falha no postinstall de uma
dependência (`Cannot find module 'C:\Windows\postinstall.js'`). Pela letra `F:` a instalação
conclui normalmente, apenas mais lenta por ser sobre SMB.

## Deploy na Vercel (recomendado)

O projeto é um app Next.js padrão, sem banco nem variáveis de ambiente, então roda na Vercel sem
configuração extra.

Pelo painel:

1. Acesse [vercel.com/new](https://vercel.com/new) e importe este repositório do GitHub.
2. A Vercel detecta o Next.js automaticamente (framework preset "Next.js").
3. Build command, output e install ficam nos padrões. Nada a alterar.
4. Clique em **Deploy**. Cada push na branch `main` gera um novo deploy automático.

Pela CLI:

```bash
npm i -g vercel
vercel          # deploy de preview
vercel --prod   # deploy de produção
```

## Deploy no Railway (alternativa)

1. Novo projeto no Railway apontando para este repositório.
2. Build command: `npm run build` · Start command: `npm run start`.
3. Railway injeta a porta pela variável `PORT`, que o `next start` respeita.
4. Node 20 ou superior (declarado em `engines` no `package.json`).

## Rotas disponíveis

| Rota                      | Perfil        | Descrição                                                        |
| ------------------------- | ------------- | ---------------------------------------------------------------- |
| `/`                       | público       | Site de apresentação do produto (problema, solução, jornada, Fase 1, planos) |
| `/dashboard`              | participante  | Desafio atual, progresso, sequência, ranking, treino da semana    |
| `/desafios`               | participante  | Lista de campanhas com filtro por situação                        |
| `/desafios/[id]`          | participante  | Detalhe completo: regras, premiação, patrocinadores, progresso    |
| `/registrar-treino`       | participante  | Fluxo de registro, confirmação e compartilhamento                 |
| `/ranking`                | participante  | Classificação geral com filtros de semana, mês e desafio          |
| `/patrocinadores`         | participante  | Marcas parceiras, benefícios e cupons demonstrativos              |
| `/perfil`                 | participante  | Nível, histórico de treinos, conquistas e marcas favoritas        |
| `/admin`                  | administrador | Visão geral com métricas, gráficos e atividades recentes          |
| `/admin/desafios`         | administrador | Criar, editar, ativar, encerrar e remover campanhas               |
| `/admin/participantes`    | administrador | Tabela com busca, filtro, perfil e moderação                      |
| `/admin/patrocinadores`   | administrador | Cadastro de marcas, benefícios, cupons e vínculo com campanhas    |

A troca entre os perfis é feita pelo seletor "Visualizar como", no topo de todas as telas do
aplicativo. Não há controle de permissão real: o seletor apenas muda a experiência demonstrada.

## O que é funcional na demonstração

- Registro de treino completo: tipo, data, duração, observação, prévia local da foto e confirmação
  de regras, com validação de campos e carregamento simulado.
- Pontuação calculada por regra: 150 pontos por treino no desafio ativo, mais 40 de intensidade
  (60 minutos ou mais), 30 por treino em fim de semana e 25 ao marcar os patrocinadores.
- Atualização em tempo real de progresso, sequência de dias, volume, nível, conquistas e ranking.
- Persistência no LocalStorage, com botão "Reiniciar demonstração" que restaura o estado original.
- Inscrição e cancelamento em desafios futuros, refletindo na contagem de participantes.
- Painel administrativo com criação, edição, ativação, encerramento e remoção de desafios; todas as
  mudanças aparecem imediatamente nas telas do participante.
- Cadastro e edição de patrocinadores, com ativação e desativação refletidas na área do participante.
- Moderação de participantes (aprovar e bloquear), registrada nas atividades recentes.
- Busca e filtros funcionais em ranking, desafios, participantes e patrocinadores.
- Estados vazios, mensagens de sucesso, erro e carregamento em todas as telas.

## O que é apenas conceitual

- Autenticação, cadastro e recuperação de senha: a demonstração entra direto como o participante
  Reginaldo Moura.
- Compartilhamento em redes sociais: o botão abre a arte conceitual e informa que, na versão
  oficial, o compartilhamento poderá ser adaptado conforme as permissões disponíveis nas APIs.
- Envio de foto para servidor: a imagem é reduzida e mantida somente no navegador.
- Séries históricas dos gráficos administrativos (participação, conclusão, engajamento, retenção,
  inscrições) e os recortes de semana e mês do ranking: valores demonstrativos.
- Marcas, cupons, descontos, premiações e valores em reais: fictícios, sinalizados na interface.
- Notificações, busca global do topo e integrações com wearables: ilustrativos.

## Estrutura

```
src/
  app/                 rotas (App Router); o grupo (app) usa a casca com menu e topo
  componentes/
    admin/             formulários do painel administrativo
    dominio/           blocos de negócio (ranking, desafio, patrocinadores, progresso)
    graficos/          invólucros do Recharts com o tema escuro
    layout/            barra lateral, topo, navegação inferior e reinício da demonstração
    ui/                base no padrão shadcn/ui (botão, cartão, diálogo, formulário)
  dados/               dados mockados e regras de pontuação
  estado/              estado da demonstração, ações puras e seletores
  lib/                 formatação, utilidades e leitura local de imagem
public/fotos/          imagens usadas em banners e cards
```

A demonstração usa a data fixa `2026-07-24` como "hoje" (`DATA_DEMO`, em `src/dados/catalogo.ts`),
para que progresso, dias restantes e calendário da semana permaneçam coerentes em qualquer data de
apresentação.

## Créditos das imagens

As fotos em `public/fotos` são do Unsplash, sob a licença de uso livre da plataforma, e devem ser
substituídas por material próprio do cliente na versão oficial.
