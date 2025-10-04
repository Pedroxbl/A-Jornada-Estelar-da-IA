// ==== Dados do jogo ====
const nomes = ["Comandante Vega", "Tenente Aurora", "Capitão Orion", "Doutora Lyra", "Almirante Kael", "Engenheiro Solis", "Piloto Nova"];
const nome = nomes[Math.floor(Math.random() * nomes.length)];

const perguntas = [
    {
        enunciado: "Durante a viagem pela Nebulosa de Andrômeda, a nave detecta um sinal estranho vindo de uma IA desconhecida. O que você faz?",
        alternativas: [
            {
                texto: "Acessa o sinal imediatamente.",
                afirmacao: [
                    "Decidiu investigar o código misterioso que vinha do espaço profundo.",
                    "A curiosidade falou mais alto: decifrou fragmentos de dados que pareciam quase humanos."
                ],
                proxima: 1
            },
            {
                texto: "Ignora o sinal por segurança.",
                afirmacao: [
                    "Optou por preservar a tripulação em vez de arriscar contato.",
                    "Registrou o evento nos arquivos estelares e seguiu a rota principal."
                ],
                proxima: 1
            }
        ]
    },
    {
        enunciado: "A IA central da nave sugere alterar a rota para um atalho no hiperespaço, mas o cálculo parece arriscado. Qual sua escolha?",
        alternativas: [
            {
                texto: "Confia na IA e entra no atalho.",
                afirmacao: [
                    "O salto foi turbulento, mas economizou dias de viagem.",
                    "A tripulação percebeu que sem a IA não teriam conseguido atravessar o setor."
                ]
            },
            {
                texto: "Mantém a rota original.",
                afirmacao: [
                    "A viagem foi mais longa, porém segura.",
                    "A tripulação sentiu confiança na sua liderança, mesmo sem depender totalmente da IA."
                ]
            }
        ]
    }
];

// ==== Seleção de elementos do DOM ====
const telaInicial = document.querySelector(".tela-inicial");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoIniciar = document.querySelector(".iniciar-btn");
const botaoJogarNovamente = document.querySelector(".novamente-btn");

// ==== Variáveis de controle ====
let atual = 0;
let historiaFinal = "";

// ==== Funções do jogo ====
botaoIniciar.addEventListener("click", iniciaJogo);
botaoJogarNovamente.addEventListener("click", iniciaJogo);

function iniciaJogo() {
    atual = 0;
    historiaFinal = "";
    telaInicial.style.display = "none";
    caixaResultado.classList.remove("mostrar");
    mostraPergunta();
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    const pergunta = perguntas[atual];
    caixaPerguntas.textContent = pergunta.enunciado.replace(/você/g, nome);
    caixaPerguntas.style.display = "block";

    caixaAlternativas.innerHTML = "";
    caixaAlternativas.style.display = "flex";

    pergunta.alternativas.forEach((alt) => {
        const botao = document.createElement("button");
        botao.textContent = alt.texto;
        botao.classList.add("btn");
        botao.addEventListener("click", () => {
            const afirmacao = alt.afirmacao[Math.floor(Math.random() * alt.afirmacao.length)];
            historiaFinal += afirmacao + " ";
            atual++;
            mostraPergunta();
        });
        caixaAlternativas.appendChild(botao);
    });
}

function mostraResultado() {
    caixaPerguntas.style.display = "none";
    caixaAlternativas.style.display = "none";
    textoResultado.textContent = `Relatório da missão: Em 2142, ${nome}... ` + historiaFinal;
    caixaResultado.classList.add("mostrar");
}
