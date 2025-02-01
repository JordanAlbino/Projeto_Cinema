const API_URL = "https://api.themoviedb.org/3";
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjdkNGQxYjdjYmQwYzI2NWU0MTliMzk5Y2I4OGMxOSIsInN1YiI6IjY2Mzk1ZWI5MmZhZjRkMDEyYWM2OTBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pSD_4lowFkWaHyOhHE1_4hu5ht9c24Oc-KzVIjI_zO0"; 
const options = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
    },
};

// Função para recuperar parâmetros da URL
function getParamsFromURL() {
    const params = new URLSearchParams(window.location.search);
    return {
        movieId: params.get("movieId"),
        salaId: params.get("salaId"),
    };
}

// Função para buscar detalhes do filme
async function getMovieDetails(movieId) {
    try {
        const response = await fetch(`${API_URL}/movie/${movieId}?language=pt-BR`, options);
        const movie = await response.json();

        // Atualizar a descrição e o cartaz na página
        document.querySelector(".cartaz").innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />`;
        document.querySelector(".descricao").innerHTML = `<p>${movie.overview || "Descrição não disponível."}</p>`;
    } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
    }
}

// Inicializar a página
function init() {
    const { movieId } = getParamsFromURL();
    if (movieId) {
        getMovieDetails(movieId);
    } else {
        console.error("ID do filme não encontrado na URL.");
    }
}

init();


// Preços dos ingressos
const PRECO_INTEIRA = 20.00; // Preço da Inteira
const PRECO_MEIA = 10.00;    // Preço da Meia Estudante

// Referências aos elementos
const itensSpan = document.getElementById("itens");
const totalSpan = document.getElementById("total");

let quantidadeInteira = 0;
let quantidadeMeia = 0;

// Função para atualizar o total dinamicamente
function atualizarTotal() {
    const totalItens = quantidadeInteira + quantidadeMeia;
    const totalValor = (quantidadeInteira * PRECO_INTEIRA) + (quantidadeMeia * PRECO_MEIA);

    // Atualizar os elementos na página
    itensSpan.textContent = totalItens;
    totalSpan.textContent = `R$ ${totalValor.toFixed(2)}`;
}

// Funções para adicionar ingressos
function addIngressoInteira() {
    quantidadeInteira++;
    atualizarTotal();
}

function addIngressoMeia() {
    quantidadeMeia++;
    atualizarTotal();
}

function redirecionarParaPagamento() {
    const totalItens = quantidadeInteira + quantidadeMeia;
    const totalValor = (quantidadeInteira * PRECO_INTEIRA) + (quantidadeMeia * PRECO_MEIA);

    if (totalItens === 0) {
        alert("Você deve selecionar pelo menos um ingresso antes de prosseguir para o pagamento.");
        return;
    }

    // Salvar detalhes da compra no localStorage
    localStorage.setItem("totalItens", totalItens);
    localStorage.setItem("totalValor", totalValor.toFixed(2));

    // Capturar a URL da imagem do cartaz corretamente
    const cartazElement = document.querySelector(".cartaz");
    const cartazBackground = cartazElement.style.backgroundImage;

    // Extraindo apenas a URL correta da imagem
    const cartazURL = cartazBackground.match(/url\("?(.*?)"?\)/);
    const imagemURL = cartazURL ? cartazURL[1] : "";

    // Capturar a descrição do filme
    const descricao = document.querySelector(".descricao").innerText;

    // Armazena os dados no localStorage
    localStorage.setItem("cartaz", imagemURL);
    localStorage.setItem("descricao", descricao);

    // Redirecionar para a página de pagamento
    window.location.href = "pagamento.html";
}