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
const PRECO_INTEIRA = 20.00; 
const PRECO_MEIA = 10.00;    

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

    
    const cartazElement = document.querySelector(".cartaz img"); 
    const imagemURL = cartazElement ? cartazElement.src : "";

   
    const descricao = document.querySelector(".descricao").innerText;

    // Armazenando no localStorage
    localStorage.setItem("cartaz", imagemURL);
    localStorage.setItem("descricao", descricao);
    localStorage.setItem("totalItens", totalItens);
    localStorage.setItem("totalValor", totalValor.toFixed(2));

    // Redirecionar para a página de pagamento
    window.location.href = "Pagamento.html";
}

document.getElementById("lupa").addEventListener("click", async () => {
    const busca = document.getElementById("barra-busca").value.trim();
  
    if (busca === "") {
      alert("Digite o nome do filme!");
      return;
    }
  
    const url = `${API_URL}/search/movie?query=${encodeURIComponent(busca)}&language=pt-BR`;
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error("Erro ao buscar o filme");
      }
  
      const data = await response.json();
  
      if (data.results.length > 0) {
        const filme = data.results[0];
  
        // Aqui você deve garantir que o parâmetro seja 'movieId', não 'id'
        window.location.href = `desc_filmes.html?movieId=${filme.id}`;
      } else {
        alert("Filme não encontrado!");
      }
    } catch (error) {
      console.error("Erro na busca:", error);
      alert("Erro ao buscar o filme. Tente novamente!");
    }
  });