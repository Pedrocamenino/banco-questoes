import type { Item, Skill } from '../core/types';
import { bars, lines, mapaBiomas, mapaRegioes } from './figures';
import { classify, mcq, order, pair, skill } from './kit';

const S = 'geografia';

/* ---------- mapas ---------- */
const ID_MAPA = `${S}.mapas`;

const mapas: Item[] = [
  mcq(ID_MAPA, 1, {
    stem: 'Toque na região que concentra a maior parte da produção industrial brasileira.',
    figure: { type: 'map', map: mapaRegioes('Regiões do Brasil — esquema') },
    options: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
    regionIds: ['norte', 'nordeste', 'centro-oeste', 'sudeste', 'sul'],
    answer: 3,
    why: 'O Sudeste concentra o maior parque industrial, herança da economia cafeeira, do capital acumulado e da infraestrutura de portos e energia.',
  }),
  mcq(ID_MAPA, 1, {
    stem: 'Toque na região onde predomina o clima semiárido no Brasil.',
    figure: { type: 'map', map: mapaRegioes('Regiões do Brasil — esquema') },
    options: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
    regionIds: ['norte', 'nordeste', 'centro-oeste', 'sudeste', 'sul'],
    answer: 1,
    why: 'O semiárido ocupa o sertão nordestino: chuvas escassas, irregulares e concentradas em poucos meses.',
  }),
  mcq(ID_MAPA, 2, {
    stem: 'Toque no bioma marcado por vegetação de galhos retorcidos, casca grossa e raízes profundas, adaptado a solo ácido e queimadas naturais.',
    figure: { type: 'map', map: mapaBiomas('Biomas brasileiros — esquema simplificado') },
    options: ['Amazônia', 'Caatinga', 'Cerrado', 'Pantanal', 'Mata Atlântica', 'Pampa'],
    regionIds: ['amazonia', 'caatinga', 'cerrado', 'pantanal', 'mata-atlantica', 'pampa'],
    answer: 2,
    why: 'É o Cerrado: a "floresta de cabeça para baixo", com biomassa subterrânea maior que a aérea e espécies adaptadas ao fogo.',
  }),
  mcq(ID_MAPA, 2, {
    stem: 'Toque no bioma mais devastado proporcionalmente, por coincidir com a faixa de ocupação colonial e com as maiores cidades do país.',
    figure: { type: 'map', map: mapaBiomas('Biomas brasileiros — esquema simplificado') },
    options: ['Amazônia', 'Caatinga', 'Cerrado', 'Pantanal', 'Mata Atlântica', 'Pampa'],
    regionIds: ['amazonia', 'caatinga', 'cerrado', 'pantanal', 'mata-atlantica', 'pampa'],
    answer: 4,
    why: 'A Mata Atlântica restou em fragmentos: a ocupação do litoral começou no século XVI e ali se concentram hoje as maiores metrópoles.',
  }),
  mcq(ID_MAPA, 3, {
    stem: 'Toque na região que mais recebeu migração interna a partir dos anos 1970, impulsionada pela expansão da fronteira agrícola.',
    figure: { type: 'map', map: mapaRegioes('Regiões do Brasil — esquema') },
    options: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
    regionIds: ['norte', 'nordeste', 'centro-oeste', 'sudeste', 'sul'],
    answer: 2,
    why: 'O Centro-Oeste recebeu sulistas e nordestinos com a mecanização da soja no Cerrado, depois da construção de Brasília e das rodovias de integração.',
  }),
  mcq(ID_MAPA, 3, {
    stem: 'Toque no bioma que funciona como planície inundável sazonal, com pulso de cheia que organiza toda a vida local.',
    figure: { type: 'map', map: mapaBiomas('Biomas brasileiros — esquema simplificado') },
    options: ['Amazônia', 'Caatinga', 'Cerrado', 'Pantanal', 'Mata Atlântica', 'Pampa'],
    regionIds: ['amazonia', 'caatinga', 'cerrado', 'pantanal', 'mata-atlantica', 'pampa'],
    answer: 3,
    why: 'O Pantanal é uma depressão que recebe as águas do planalto: a alternância cheia/seca comanda reprodução, pesca e pecuária extensiva.',
  }),
];

/* ---------- interpretação espacial ---------- */
const ID_ESP = `${S}.espacial`;

const espacial: Item[] = [
  mcq(ID_ESP, 1, {
    stem: 'Em um mapa de escala 1:100.000, 1 cm corresponde, no terreno, a:',
    options: ['100 m', '1 km', '10 km', '100 km'],
    answer: 1,
    why: '1 cm × 100.000 = 100.000 cm = 1.000 m = 1 km.',
  }),
  mcq(ID_ESP, 2, {
    stem: 'Comparando dois mapas da mesma área, um 1:25.000 e outro 1:1.000.000, é correto afirmar:',
    options: [
      'O 1:1.000.000 tem escala maior e mais detalhes.',
      'O 1:25.000 tem escala maior e mostra mais detalhes de uma área menor.',
      'Os dois têm o mesmo nível de detalhe.',
      'Escala não tem relação com nível de detalhe.',
    ],
    answer: 1,
    why: 'Quanto menor o denominador, maior a escala e maior o detalhe — em troca de abranger menos território.',
  }),
  mcq(ID_ESP, 2, {
    stem: 'A projeção de Mercator é criticada em análises geopolíticas porque:',
    options: [
      'Distorce as formas dos continentes de modo irreconhecível.',
      'Exagera as áreas em latitudes altas, ampliando visualmente Europa e América do Norte.',
      'Não permite navegação.',
      'Foi abandonada por todos os atlas modernos.',
    ],
    answer: 1,
    why: 'Mercator conserva ângulos (útil à navegação) ao custo da área: a Groenlândia aparece do tamanho da África, que é 14 vezes maior. Todo mapa é uma escolha, não uma cópia neutra do mundo.',
  }),
  mcq(ID_ESP, 3, {
    stem: 'Curvas de nível muito próximas entre si em uma carta topográfica indicam:',
    options: ['Terreno plano', 'Declividade acentuada', 'Presença de rio', 'Área urbanizada'],
    answer: 1,
    why: 'Curvas próximas = grande variação de altitude em pouca distância horizontal, ou seja, encosta íngreme — informação decisiva para risco de deslizamento.',
  }),
  mcq(ID_ESP, 3, {
    stem: 'Um anamorfose (cartograma) que representa países com área proporcional à população mostra, sobretudo:',
    options: [
      'A forma física real dos territórios.',
      'A distorção deliberada da área para revelar uma variável social.',
      'A extensão das zonas econômicas exclusivas.',
      'Os limites das placas tectônicas.',
    ],
    answer: 1,
    why: 'O cartograma abandona a fidelidade da forma para tornar visível outra grandeza — na prática, Índia e China incham e a Rússia encolhe.',
  }),
];

/* ---------- clima ---------- */
const ID_CLIMA = `${S}.clima`;

const clima: Item[] = [
  mcq(ID_CLIMA, 1, {
    stem: 'O climograma indica qual tipo climático?',
    figure: { type: 'chart', chart: bars(['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'], [180, 160, 140, 60, 20, 5, 2, 5, 25, 80, 140, 190], { title: 'Precipitação média mensal (mm)', yLabel: 'mm' }) },
    options: ['Equatorial úmido', 'Tropical com estação seca definida', 'Semiárido', 'Subtropical úmido'],
    answer: 1,
    why: 'Chuva forte no verão e seca nítida no inverno: é o tropical típico do Brasil central. No equatorial não haveria meses quase sem chuva.',
  }),
  mcq(ID_CLIMA, 1, {
    stem: 'A diferença entre tempo e clima é que:',
    options: [
      'Tempo é o estado momentâneo da atmosfera; clima é o padrão médio ao longo de décadas.',
      'São sinônimos em geografia.',
      'Clima refere-se apenas à temperatura.',
      'Tempo é medido por satélite e clima por estações de superfície.',
    ],
    answer: 0,
    why: 'Uma chuva hoje é tempo; trinta anos de chuvas nesse mesmo mês formam o clima.',
  }),
  mcq(ID_CLIMA, 2, {
    stem: 'As massas de ar polar atlântica, ao avançarem sobre o Sul e o Sudeste no inverno, provocam:',
    options: [
      'Queda de temperatura e formação de frentes frias.',
      'Aumento da umidade equatorial.',
      'Estiagem prolongada no Nordeste.',
      'Formação de furacões no litoral.',
    ],
    answer: 0,
    why: 'O encontro da massa polar com o ar quente e úmido gera a frente fria: chuva na passagem e queda de temperatura depois.',
  }),
  mcq(ID_CLIMA, 2, {
    stem: 'O fenômeno El Niño, na sua fase típica, está associado no Brasil a:',
    options: [
      'Secas no Nordeste e chuvas acima da média no Sul.',
      'Chuvas no Nordeste e seca no Sul.',
      'Resfriamento global uniforme.',
      'Ausência de efeitos sobre o território brasileiro.',
    ],
    answer: 0,
    why: 'O aquecimento anômalo do Pacífico equatorial desorganiza a circulação atmosférica: enfraquece as chuvas no semiárido e intensifica as frentes no Sul.',
  }),
  mcq(ID_CLIMA, 3, {
    stem: 'A ilha de calor urbana resulta principalmente de:',
    options: [
      'Maior absorção de calor por asfalto e concreto somada à redução da cobertura vegetal.',
      'Aumento da altitude média das cidades.',
      'Proximidade das cidades ao Equador.',
      'Elevação do nível dos oceanos.',
    ],
    answer: 0,
    why: 'Superfícies impermeáveis armazenam calor, a vegetação que evapotranspiraria foi removida e o calor antrópico se soma — daí núcleos urbanos vários graus mais quentes que a periferia rural.',
  }),
  mcq(ID_CLIMA, 3, {
    stem: 'As linhas mostram a temperatura média anual de duas cidades na mesma latitude. A diferença é mais bem explicada por:',
    figure: { type: 'chart', chart: lines(['Jan', 'Mar', 'Mai', 'Jul', 'Set', 'Nov'], [{ name: 'Cidade A (litoral)', values: [26, 25, 22, 20, 22, 25] }, { name: 'Cidade B (900 m)', values: [21, 20, 17, 14, 17, 20] }], { title: 'Temperatura média (°C)', yLabel: '°C' }) },
    options: ['Latitude', 'Altitude', 'Longitude', 'Correntes marítimas frias'],
    answer: 1,
    why: 'Mesma latitude, temperaturas cerca de 5–6 °C menores: a altitude é o fator. A cada 100 m de subida, a temperatura cai em média 0,6 °C.',
  }),
];

/* ---------- população ---------- */
const ID_POP = `${S}.populacao`;

const populacao: Item[] = [
  mcq(ID_POP, 1, {
    stem: 'A transição demográfica brasileira caracteriza-se por:',
    options: [
      'Queda da mortalidade seguida de queda da natalidade, com envelhecimento da população.',
      'Aumento simultâneo de natalidade e mortalidade.',
      'Estabilidade das duas taxas desde 1950.',
      'Queda da natalidade sem qualquer efeito na estrutura etária.',
    ],
    answer: 0,
    why: 'Primeiro caem os óbitos (saneamento, vacinas), depois os nascimentos (urbanização, escolaridade feminina, contracepção). O resultado é a pirâmide etária que se estreita na base.',
  }),
  mcq(ID_POP, 2, {
    stem: 'O gráfico mostra a estrutura etária de dois países. Qual conclusão é correta?',
    figure: {
      type: 'table',
      head: ['Faixa etária', 'País X', 'País Y'],
      rows: [['0–14 anos', '42%', '15%'], ['15–64 anos', '55%', '63%'], ['65+ anos', '3%', '22%']],
      caption: 'Distribuição da população por faixa etária',
    },
    options: [
      'X enfrentará pressão por previdência antes de Y.',
      'Y tem demanda maior por vagas em creche e ensino fundamental.',
      'X terá forte demanda por educação e geração de empregos nas próximas décadas.',
      'Os dois países têm a mesma estrutura etária.',
    ],
    answer: 2,
    why: 'Base larga (42% de crianças) significa pressão por escola agora e por emprego em seguida — o chamado bônus demográfico, que só vira vantagem se houver investimento.',
  }),
  mcq(ID_POP, 2, {
    stem: 'O êxodo rural brasileiro da segunda metade do século XX foi impulsionado principalmente por:',
    options: [
      'Mecanização do campo e concentração fundiária somadas à oferta de emprego urbano.',
      'Política de reforma agrária bem-sucedida.',
      'Crescimento das cidades pequenas do interior apenas.',
      'Redução da população total do país.',
    ],
    answer: 0,
    why: 'Expulsão do campo (máquinas, latifúndio) e atração da cidade (indústria) formam o par clássico dos fatores de repulsão e atração.',
  }),
  mcq(ID_POP, 3, {
    stem: 'Chamar o crescimento das periferias metropolitanas de "urbanização sem urbanidade" significa afirmar que:',
    options: [
      'A população cresce sem acesso proporcional a saneamento, transporte e serviços.',
      'As cidades pararam de crescer.',
      'A população urbana é menor que a rural.',
      'Não há moradia nas periferias.',
    ],
    answer: 0,
    why: 'A cidade se expande fisicamente, mas o direito à cidade não acompanha — é a chave de leitura da segregação socioespacial.',
  }),
  mcq(ID_POP, 3, {
    stem: 'Inverter o sentido histórico da migração interna brasileira, com nordestinos retornando à região de origem nos anos 2000, associa-se a:',
    options: [
      'Interiorização do investimento, programas de transferência de renda e perda de dinamismo industrial no Sudeste.',
      'Fim do semiárido.',
      'Queda da população total do Nordeste.',
      'Proibição legal da migração interna.',
    ],
    answer: 0,
    why: 'Expansão de universidades, indústrias incentivadas, aposentadorias rurais e transferência de renda reduziram a pressão de saída e tornaram o retorno viável.',
  }),
];

/* ---------- geopolítica ---------- */
const ID_GEOP = `${S}.geopolitica`;

const geopolitica: Item[] = [
  mcq(ID_GEOP, 1, {
    stem: 'O Mercosul é, em sua natureza original, um:',
    options: ['Bloco militar', 'Mercado comum em construção entre países sul-americanos', 'Órgão da ONU', 'Acordo climático'],
    answer: 1,
    why: 'Criado em 1991 pelo Tratado de Assunção, visa livre circulação de bens, serviços e fatores produtivos — é integração econômica, não aliança militar.',
  }),
  mcq(ID_GEOP, 2, {
    stem: 'A expressão "multipolaridade" no sistema internacional atual indica:',
    options: [
      'A existência de vários centros de poder econômico e político relevantes.',
      'O retorno à bipolaridade da Guerra Fria.',
      'A hegemonia isolada dos Estados Unidos.',
      'A ausência de Estados nacionais.',
    ],
    answer: 0,
    why: 'China, União Europeia, EUA, Índia e blocos regionais disputam influência simultaneamente — nenhum define sozinho as regras.',
  }),
  mcq(ID_GEOP, 2, {
    stem: 'A disputa pela região do Ártico se intensificou porque:',
    options: [
      'O degelo abre rotas de navegação e acesso a reservas de petróleo e gás.',
      'A região ganhou população permanente numerosa.',
      'Foi declarada patrimônio da humanidade sem donos.',
      'Deixou de ter valor estratégico.',
    ],
    answer: 0,
    why: 'O aquecimento converte uma barreira em corredor: rotas mais curtas entre Ásia e Europa e jazidas antes inacessíveis. É geopolítica produzida pela crise climática.',
  }),
  order(ID_GEOP, 3, {
    stem: 'Ordene as etapas de aprofundamento da integração econômica regional.',
    axis: 'menos integrado → mais integrado',
    tokens: ['União monetária', 'Zona de livre comércio', 'Mercado comum', 'União aduaneira'],
    answer: [1, 3, 2, 0],
    why: 'Livre comércio (sem tarifas internas) → união aduaneira (tarifa externa comum) → mercado comum (livre circulação de fatores) → união monetária (moeda única).',
  }),
  mcq(ID_GEOP, 3, {
    stem: 'A noção de "guerra híbrida" designa:',
    options: [
      'Combinação de ações militares, econômicas, cibernéticas e informacionais.',
      'Conflito travado exclusivamente por drones.',
      'Guerra entre blocos econômicos, sem violência.',
      'Qualquer guerra civil.',
    ],
    answer: 0,
    why: 'O conflito se dilui em várias frentes simultâneas — sanções, desinformação, ataques a infraestrutura digital — o que dificulta identificar início, fim e responsáveis.',
  }),
];

/* ---------- questões ambientais ---------- */
const ID_AMB = `${S}.ambiental`;

const ambiental: Item[] = [
  classify(ID_AMB, 1, {
    stem: 'Separe cada fonte de energia pela sua natureza.',
    groups: ['Renovável', 'Não renovável'],
    things: [
      { t: 'Eólica', g: 0 }, { t: 'Carvão mineral', g: 1 },
      { t: 'Solar fotovoltaica', g: 0 }, { t: 'Gás natural', g: 1 },
      { t: 'Biomassa de cana', g: 0 }, { t: 'Urânio', g: 1 },
    ],
    why: 'Renovável é a fonte que se repõe em escala de tempo humana. Renovável não significa automaticamente sem impacto: hidrelétricas alagam e a biomassa ocupa terra agrícola.',
  }),
  classify(ID_AMB, 2, {
    stem: 'Separe cada processo pelo problema ambiental a que pertence.',
    groups: ['Efeito estufa intensificado', 'Chuva ácida'],
    things: [
      { t: 'Emissão de CO₂ por queima de combustíveis fósseis', g: 0 },
      { t: 'Liberação de óxidos de enxofre por indústrias', g: 1 },
      { t: 'Metano da pecuária e de aterros', g: 0 },
      { t: 'Óxidos de nitrogênio reagindo com vapor d\'água', g: 1 },
      { t: 'Desmatamento que reduz o sequestro de carbono', g: 0 },
      { t: 'Corrosão de monumentos de mármore', g: 1 },
    ],
    why: 'São problemas distintos e frequentemente confundidos: o primeiro é de balanço energético do planeta; o segundo, de química atmosférica local e regional.',
  }),
  pair(ID_AMB, 2, {
    stem: 'Relacione cada impacto ambiental à sua causa principal.',
    leftLabel: 'Impacto',
    rightLabel: 'Causa',
    left: ['Assoreamento de rios', 'Ilhas de calor', 'Salinização do solo', 'Inversão térmica'],
    right: ['Impermeabilização e remoção de vegetação urbana', 'Irrigação mal manejada em clima seco', 'Retirada da mata ciliar e erosão das margens', 'Camada de ar frio retendo poluentes junto ao solo'],
    answer: [2, 0, 1, 3],
    why: 'Todos são efeitos de intervenções humanas sobre dinâmicas naturais — e todos aparecem no ENEM ligados a soluções de manejo, não apenas a diagnóstico.',
  }),
  mcq(ID_AMB, 3, {
    stem: 'O conceito de "justiça ambiental" chama atenção para o fato de que:',
    options: [
      'Os danos ambientais atingem de forma desigual grupos sociais mais vulneráveis.',
      'Toda a população sofre igualmente os efeitos da poluição.',
      'Questões ambientais não têm dimensão social.',
      'A natureza deve ser preservada sem presença humana.',
    ],
    answer: 0,
    why: 'Aterro, refinaria e área de risco raramente ficam nos bairros ricos. A distribuição do dano é social, não aleatória.',
  }),
  mcq(ID_AMB, 3, {
    stem: 'A afirmação "o desmatamento da Amazônia afeta o regime de chuvas do Centro-Sul" apoia-se em:',
    options: [
      'Transporte de umidade pelos chamados rios voadores.',
      'Deslocamento de placas tectônicas.',
      'Aumento da radiação solar na região.',
      'Mudança no eixo de rotação da Terra.',
    ],
    answer: 0,
    why: 'A floresta evapotranspira e as correntes de ar levam essa umidade até o Sudeste e o Centro-Oeste. Menos floresta, menos umidade transportada.',
  }),
];

export const GEOGRAFIA: Skill[] = [
  skill(S, 'mapas', { name: 'Mapas', blurb: 'Localizar regiões e biomas tocando direto no mapa.', kind: 'mcq', game: 'Mapa', bank: mapas }),
  skill(S, 'espacial', { name: 'Interpretação espacial', blurb: 'Escala, projeção, curvas de nível e o que o mapa esconde.', kind: 'mcq', game: 'Decisão', bank: espacial }),
  skill(S, 'clima', { name: 'Clima', blurb: 'Climogramas, massas de ar, El Niño e clima urbano.', kind: 'mcq', game: 'Leitura', bank: clima }),
  skill(S, 'populacao', { name: 'População', blurb: 'Transição demográfica, migrações e estrutura etária.', kind: 'mcq', game: 'Leitura', bank: populacao }),
  skill(S, 'geopolitica', { name: 'Geopolítica', blurb: 'Blocos, multipolaridade e disputas por território e rota.', kind: 'mcq', game: 'Decisão', bank: geopolitica }),
  skill(S, 'ambiental', { name: 'Questões ambientais', blurb: 'Energia, impactos e a dimensão social da crise ambiental.', kind: 'classify', game: 'Triagem', bank: ambiental }),
];
