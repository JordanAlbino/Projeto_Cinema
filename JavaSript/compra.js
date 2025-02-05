const API_URL = "https://api.themoviedb.org/3";
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjdkNGQxYjdjYmQwYzI2NWU0MTliMzk5Y2I4OGMxOSIsInN1YiI6IjY2Mzk1ZWI5MmZhZjRkMDEyYWM2OTBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pSD_4lowFkWaHyOhHE1_4hu5ht9c24Oc-KzVIjI_zO0";

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
};

// Função para carregar informações do filme
async function carregarDetalhes(movieId) {
  try {
    const response = await fetch(`${API_URL}/movie/${movieId}?language=pt-BR`, options);
    const movie = await response.json();

    // Preencher o cartaz
    const cartazDiv = document.querySelector(".cartaz");
    cartazDiv.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />`;

    // Preencher a descrição
    const descricaoDiv = document.querySelector(".descricao");
    descricaoDiv.innerHTML = `<p>${movie.overview || "Descrição não disponível."}</p>`;
  } catch (error) {
    console.error("Erro ao carregar os detalhes do filme:", error);
  }
}

// Função para recuperar os parâmetros da URL
function getParamsFromURL() {
  const params = new URLSearchParams(window.location.search);
  return {
    movieId: params.get("movieId"),
    salaId: params.get("salaId"),
  };
}

// Função para inicializar a página
function inicializar() {
  const { movieId, salaId } = getParamsFromURL();
  if (movieId) {
    carregarDetalhes(movieId);
  } else {
    console.error("ID do filme não encontrado na URL.");
  }

  // Exibir o número da sala
  if (salaId) {
    document.querySelector(".detalhes").innerHTML += `<p>Sala Selecionada: ${salaId}</p>`;
  }
}

inicializar();


// Função para gerar assentos dinamicamente
const assentosContainer = document.querySelector(".assentos");

function gerarAssentos() {
  for (let i = 1; i <= 64; i++) {
    const assento = document.createElement("div");
    assento.classList.add("assento");
    assento.textContent = i;
    assento.addEventListener("click", () => selecionarAssento(assento));
    assentosContainer.appendChild(assento);
  }
}

function selecionarAssento(assento) {
  if (assento.classList.contains("ocupado")) return;

  assento.classList.toggle("selecionado");


  const assentosSelecionados = Array.from(document.querySelectorAll(".assento.selecionado"))
      .map(a => a.textContent)
      .join(", ");

  localStorage.setItem("assento", assentosSelecionados); 

  atualizarResumo();
}

function atualizarResumo() {
  const selecionados = document.querySelectorAll(".assento.selecionado").length;

  document.getElementById("itens").textContent = selecionados;
}

function voltar() {
  window.history.back();
}

gerarAssentos();

function redirecionarParaIngressos() {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("movieId");
  const salaId = params.get("salaId");
  if (movieId && salaId) {
      window.location.href = `ingresso.html?movieId=${movieId}&salaId=${salaId}`;
  } else {
      console.error("Parâmetros de filme ou sala não encontrados!");
  }
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

      
      window.location.href = `desc_filmes.html?movieId=${filme.id}`;
    } else {
      alert("Filme não encontrado!");
    }
  } catch (error) {
    console.error("Erro na busca:", error);
    alert("Erro ao buscar o filme. Tente novamente!");
  }
});

