# Prisma — estudo gamificado para o ENEM

Plataforma de estudo em partidas curtas: o conteúdo das 12 matérias do ENEM vira
minijogo, o progresso é medido por **domínio de habilidade** (não por número de
questões feitas) e a revisão do que você errou é agendada sozinha.

Uma luz entra, doze faixas saem: é daí que vem o nome e toda a linguagem visual.
Cada matéria é um ângulo de refração — a interface inteira se retinge quando você
entra nela, e a evolução aparece como luz acendendo, não como número subindo.

A direção de arte e os princípios de produto estão em
[`docs/DIRECAO-DE-ARTE.md`](docs/DIRECAO-DE-ARTE.md) — foi escrita antes do código
e é a fonte da verdade sobre cor, tipografia, forma, movimento e gamificação.

---

## Rodando

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # checagem de tipos + build de produção
npm run preview   # serve o build
```

Sem back-end, sem cadastro, sem chave de API: todo o progresso fica no
`localStorage` do navegador. Em `Progresso → Ajustes` há um botão para preencher
um histórico de exemplo (útil para ver as telas com dados) e outro para apagar tudo.

---

## O que existe hoje

**12 matérias · 60 habilidades · 259 itens autorais + 9 habilidades com banco infinito · 6 formatos de minijogo**

| Área | Matérias |
|---|---|
| Linguagens e Códigos | Português, Literatura, Inglês, Redação |
| Ciências Humanas | História, Geografia, Filosofia, Sociologia |
| Ciências da Natureza | Física, Química, Biologia |
| Matemática | Matemática |

### Os seis minijogos

O formato não é decoração: ele nasce do conteúdo. Ordenar acontecimentos *é* o
jogo de História; equilibrar uma equação *é* o jogo de Química.

| Jogo | O que se faz | Onde aparece |
|---|---|---|
| **Decisão** | múltipla escolha com figura, texto-fonte, tabela ou mapa clicável | todas as matérias |
| **Relâmpago** | resposta numérica em teclado próprio, contra o relógio interno | Matemática, Física, Química |
| **Sequência** | colocar acontecimentos ou etapas em ordem | História, Geopolítica, Redação, Fisiologia |
| **Conexão** | parear conceito e definição, autor e tese, função e grupo | Filosofia, Sociologia, Química orgânica, Literatura |
| **Triagem** | distribuir itens entre grupos | Ecologia, Tabela periódica, Gêneros textuais |
| **Equilíbrio** | ajustar coeficientes com contador de átomos ao vivo | Química |

Mapas e gráficos são desenhados em SVG pelo próprio app — nenhuma imagem externa,
nenhuma biblioteca de gráficos com estética própria. Os mapas do Brasil são
esquemas deliberadamente simplificados e estão rotulados como tais.

### Progressão

A regra central: **XP mede esforço, Domínio mede aprendizado.** Dá para ganhar XP
num dia ruim; não dá para ganhar domínio sem acertar item difícil com consistência.

- **Domínio por habilidade (0–100)** em cinco faixas — Contato, Prática,
  Consistência, Domínio, Maestria. Sobe mais com item difícil, cai mais ao errar
  item fácil e **decai com o tempo parado**, com carência de 2 dias e um piso.
- **Dificuldade adaptativa**: três acertos seguidos sobem o nível do item, dois
  erros o descem. O aluno fica onde ainda erra, mas não trava.
- **Revisão espaçada**: todo erro volta em 1 dia; acertando, o intervalo vira
  3, 7, 16, 35 e 60 dias. A tela inicial mostra o que venceu antes de qualquer novidade.
- **Sequência (combo)** multiplica XP, nunca domínio: quebrar a sequência não
  apaga nada do que já foi aprendido.
- **Sessões de 5, 10 ou 15 minutos** (8, 14 ou 20 itens), em quatro modos:
  habilidade, desafio da matéria, revisão do dia e treino misto das 12 matérias.

O que foi deixado de fora de propósito: ranking entre alunos (premia quem tem mais
tempo livre, não quem aprende), moeda e loja cosmética (desloca a motivação) e
vidas que bloqueiam o estudo.

---

## Arquitetura

```
src/
  core/         domínio puro, sem React
    types.ts      itens, habilidades, matérias, progresso (união discriminada por formato)
    mastery.ts    domínio, decaimento, faixas, dificuldade adaptativa, repetição espaçada, XP
    store.ts      estado persistido em localStorage sobre useSyncExternalStore
    session.ts    montagem dos planos de sessão e escolha do próximo item
  content/      banco de conteúdo, uma matéria por arquivo
    kit.ts        autoria dos itens (mcq, order, pair, num, classify, balance)
    figures.ts    esquemas de mapa e atalhos de gráfico
    index.ts      catálogo: áreas, matérias, habilidades
  games/        um componente por formato + o renderizador de figuras
  routes/       Início, Matéria, Sessão (com resultado), Revisão, Progresso
  ui/           ícones próprios, glifos das matérias, medidores de progresso
  styles/       tokens → base → ui → games → routes
```

Quatro decisões que sustentam o resto:

1. **O domínio não sabe que existe React.** `core/` é TypeScript puro; a store é
   uma assinatura de 40 linhas sobre `useSyncExternalStore`. Sem provider, sem
   dependência de estado externa.
2. **O item declara seu formato, não sua tela.** `kind` decide qual engine o
   renderiza, então um banco pode misturar formatos dentro da mesma habilidade
   e um novo minijogo entra sem tocar no conteúdo existente.
3. **O próximo item é escolhido no momento**, nunca sorteado de antemão: é o que
   permite a dificuldade reagir ao que acabou de acontecer na partida.
4. **Cor é dado, não enfeite.** Um único `--hue` por matéria, com luminosidade e
   croma fixos, gera toda a paleta daquela tela. As 12 matérias convivem sem
   briga porque a harmonia é construída, não escolhida no olho.

### Como adicionar conteúdo

Uma habilidade nova são poucas linhas em `src/content/<materia>.ts`:

```ts
const ID = 'geografia.clima';

const clima: Item[] = [
  mcq(ID, 2, {
    stem: 'O climograma indica qual tipo climático?',
    figure: { type: 'chart', chart: bars(['J','F','M'], [180, 160, 40]) },
    options: ['Equatorial', 'Tropical com estação seca', 'Semiárido'],
    answer: 1,
    why: 'Chuva forte no verão e seca nítida no inverno...',   // obrigatório: é o que ensina
  }),
];

skill('geografia', 'clima', {
  name: 'Clima', blurb: '...', kind: 'mcq', game: 'Leitura', bank: clima,
});
```

Habilidades calculáveis usam `gen` no lugar de `bank` — um gerador procedural que
recebe a dificuldade e devolve um item novo, com a explicação já montada a partir
dos números sorteados. Cálculo mental, porcentagem, funções, geometria,
cinemática, energia, eletricidade e estequiometria funcionam assim: banco infinito,
sem repetição.

---

## Acessibilidade e desempenho

- Alvos de toque de 44px ou mais, teclado completo na sessão (1–4 para alternativas,
  dígitos e Enter no teclado numérico, Enter para avançar), foco visível.
- `prefers-reduced-motion` desliga as animações.
- Fontes auto-hospedadas (Sora, Inter, IBM Plex Mono — SIL OFL 1.1): nenhuma
  requisição a CDN em tempo de execução, nenhum salto de layout.
- Build de produção em torno de 150 kB comprimidos, incluindo todo o banco de conteúdo.

## Créditos e conteúdo

Itens, textos, esquemas e identidade visual são autorais. Os trechos literários
citados estão em domínio público e trazem autor e ano; fontes históricas adaptadas
estão identificadas como adaptação. O site que serviu de referência foi usado
apenas para extrair princípios gerais de UX e gamificação — nenhum código, texto,
imagem ou elemento visual de terceiros foi copiado.
