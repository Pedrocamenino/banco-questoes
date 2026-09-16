# Prisma — direção de arte e princípios de produto

Documento escrito **antes** do código. Ele define o que a interface deve fazer sentir,
quais regras a linguagem visual segue e por que cada decisão existe. Se algo no código
divergir deste documento, o documento é a fonte da verdade.

---

## 1. Leitura da referência (assaadgames.com.br)

O site de referência não pôde ser acessado a partir deste ambiente (bloqueio de rede
do proxy de saída). A análise abaixo, portanto, não descreve aquele site em particular:
ela extrai os princípios da **categoria** de produto que ele representa — plataformas
brasileiras que transformam conteúdo de vestibular em partidas curtas de minijogos.
Nenhum código, texto, imagem, marca ou elemento visual de terceiros foi copiado.

### Princípios de UX que valem a pena herdar

1. **Tempo até a primeira jogada é quase zero.** O aluno não configura nada, não
   escolhe "plano de estudos", não preenche cadastro antes de jogar. Abriu, jogou.
2. **A unidade de uso é a partida, não a aula.** 5 a 15 minutos, começo, meio e fim
   visíveis. O aluno sempre sabe quanto falta.
3. **O conteúdo é a mecânica.** Ordenar acontecimentos *é* o jogo de História; balancear
   equação *é* o jogo de Química. Quando a mecânica é só um quiz com skin, o efeito morre.
4. **Feedback imediato e sem punição afetiva.** O erro devolve explicação na hora, não
   uma tela de derrota. Errar precisa ser barato para o aluno tentar de novo.
5. **Progresso legível à distância.** O aluno reconhece seu avanço em meio segundo,
   sem ler números — por preenchimento, por cor, por posição.
6. **O gancho do "só mais uma".** A tela de resultado termina com uma ação óbvia e
   barata, não com um beco sem saída.
7. **Ritmo.** Alternar tipos de desafio dentro da sessão evita a fadiga do formulário.

### O que decidimos **não** herdar

- Ranking global e competição entre alunos: cria ansiedade e premia quem tem mais tempo
  livre, não quem aprende. Trocamos por competição contra o próprio histórico.
- Moeda virtual e loja cosmética: desloca a motivação do aprendizado para a coleção.
  Mantemos apenas XP, que é medida de esforço, e **domínio**, que é medida de aprendizado.
- Vidas/energia que bloqueiam o estudo: nenhuma mecânica pode impedir alguém de estudar.

---

## 2. Conceito da identidade: **Prisma**

Uma única luz entra; doze faixas saem. As doze matérias do ENEM não são doze produtos
diferentes — são decomposições do mesmo feixe. Isso resolve, de forma não decorativa,
o problema mais difícil de um produto com 12 áreas: **fazer tudo parecer da mesma família
sem que tudo pareça igual.**

Consequências práticas do conceito (é daqui que saem as regras, não de gosto):

- **Cor = matéria.** Cada matéria é um ângulo de refração (`--hue`). A página inteira de
  uma matéria se retinge com aquele matiz. Cor nunca é enfeite: ela informa onde você está.
- **Luz = progresso.** Elemento sem domínio aparece apagado; conforme o domínio sobe, a
  faceta acende. Evolução é percebida como luminosidade, não como número subindo.
- **Faceta = habilidade.** O corte de canto que aparece em painéis e cards é a assinatura
  geométrica do produto, sempre no mesmo canto e sempre no mesmo ângulo.

### 2.1 Cor

Escala neutra fria (quase preta, levemente azul — nunca preto puro, nunca cinza neutro):

| token | uso |
|---|---|
| `--bg` | fundo do app |
| `--surface` / `--surface-2` / `--surface-3` | painéis por elevação |
| `--line` / `--line-soft` | bordas de 1px, o principal separador da interface |
| `--fg` / `--fg-muted` / `--fg-faint` | três níveis de texto, nunca mais que três |

Os 12 matizes são gerados em **OKLCH com luminosidade e croma fixos**, variando apenas o
ângulo de matiz. Isso é o que garante que nenhuma matéria pareça mais "forte" que outra e
que as 12 convivam na mesma tela sem briga — é harmonia por construção, não por olho.

```
--accent:        oklch(76% 0.14 H)   /* traços, ícones, títulos de destaque */
--accent-strong: oklch(84% 0.16 H)   /* estado ativo, foco */
--accent-dim:    oklch(45% 0.09 H)   /* bordas e trilhos */
--accent-wash:   oklch(26% 0.05 H)   /* fundo de área, chips */
```

Semânticas fora do sistema de matérias, e só elas: `--ok` (acerto), `--err` (erro),
`--xp` (energia/XP). Nunca usar o matiz de uma matéria para dizer "certo" ou "errado".

### 2.2 Tipografia

Três famílias, cada uma com uma função — nunca por variedade.

- **Sora** (display): títulos, números grandes de HUD, nomes de matéria. Geométrica com
  personalidade, não corporativa.
- **Inter** (texto): enunciados, alternativas, explicações. Escolhida por legibilidade em
  blocos longos e em tela pequena — o enunciado é o lugar onde legibilidade vence estética.
- **IBM Plex Mono** (numérico): cronômetro, placar, porcentagem, sequência. Números
  tabulares não "dançam" quando mudam, o que importa num HUD que atualiza em tempo real.

Escala fluida com `clamp()`, razão ~1.25. Enunciado nunca abaixo de 16px em nenhuma tela.

### 2.3 Forma, profundidade e textura

- Raios: 8 / 12 / 18 / pill. Um único corte de canto (`clip-path`) como assinatura, sempre
  no canto superior direito, sempre 14px.
- **Profundidade por borda e luz, não por sombra.** Painéis se separam por borda de 1px e
  por um leve brilho interno no topo. Nenhuma sombra "drop-shadow genérica de biblioteca".
- Um único ruído sutil no fundo (SVG inline) para tirar o aspecto de gradiente de banco de
  imagem. Gradientes existem, mas sempre abaixo de 12% de opacidade e sempre radiais,
  simulando luz, nunca "capa de caderno".
- **Ícones:** conjunto próprio em SVG, traço único de 1.7px, grid de 24px, cantos vivos.
  Nenhum emoji como ícone. Cada matéria tem um glifo geométrico construído com o mesmo
  vocabulário (círculo, arco, linha, polígono) e o mesmo peso de traço.
- **Zero pixel art.** Pixel art aqui seria fantasia de "gamificado": não combina com
  tipografia geométrica nem com iluminação contínua.

### 2.4 Movimento

Rápido, curto e sempre com função. `--t-fast 140ms`, `--t 220ms`, `--t-slow 420ms`,
easing padrão `cubic-bezier(.2,.8,.2,1)`.

- Acerto: varredura de luz atravessa o card + preenchimento da faceta (220ms). Sem confete.
- Erro: deslocamento lateral de 4px em 120ms + brilho na borda. Nunca um "X" vermelho grande.
- Troca de tela: entrada com 8px de subida e fade de 220ms. Nada de slide de carrossel.
- Tudo respeita `prefers-reduced-motion`.

### 2.5 Regras de recusa (o que nunca fazemos)

Emoji como ícone · gradiente saturado de canto a canto · sombra colorida difusa · card
dentro de card dentro de card · uma quarta família tipográfica · ilustração genérica de
banco de imagens · barra de progresso decorativa que não mede nada real · vermelho para
qualquer coisa que não seja erro.

---

## 3. Gamificação a serviço do aprendizado

O modelo tem uma regra central: **XP mede esforço, Domínio mede aprendizado — e as duas
coisas nunca se misturam.** É possível ganhar XP num dia ruim; não é possível ganhar
domínio sem acertar itens difíceis com consistência.

- **Domínio por habilidade (0–100)**, em cinco faixas: Contato, Prática, Consistência,
  Domínio, Maestria. Sobe mais com item difícil, sobe pouco com item fácil, cai com erro —
  e **decai com o tempo**, o que cria uma razão honesta para voltar.
- **Dificuldade adaptativa:** a faixa de dificuldade do próximo item é escolhida pelo
  domínio atual e pela sequência de acertos recente. Três acertos seguidos puxam para cima;
  dois erros puxam para baixo. O aluno fica na zona em que ainda erra, mas não trava.
- **Sequência (combo)** dentro da sessão: multiplica XP, nunca domínio. Quebrou, não perde
  nada do que já aprendeu.
- **Revisão automática:** todo erro agenda o assunto para revisão espaçada (1, 3, 7, 16, 35
  dias). A tela inicial mostra o que está vencido antes de mostrar qualquer novidade.
- **Sessões de 5 a 15 minutos**, com tamanho escolhido pelo aluno (rápida/padrão/longa).
- **Estatísticas úteis, não vaidosas:** acerto por habilidade, tempo médio de resposta,
  assuntos mais frágeis, constância nas últimas semanas. Nada de "você é top 3%".
