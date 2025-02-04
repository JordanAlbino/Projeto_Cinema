const API_URL = "https://api.themoviedb.org/3";
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjdkNGQxYjdjYmQwYzI2NWU0MTliMzk5Y2I4OGMxOSIsInN1YiI6IjY2Mzk1ZWI5MmZhZjRkMDEyYWM2OTBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pSD_4lowFkWaHyOhHE1_4hu5ht9c24Oc-KzVIjI_zO0";

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
};

// Função para buscar e carregar os gêneros no seletor
async function loadGenres() {
  try {
    const response = await fetch(`${API_URL}/genre/movie/list?language=pt-BR`, options);
    const data = await response.json();
    const genreSelect = document.querySelector("#genreSelect");

    // Popula o seletor com os gêneros
    data.genres.forEach((genre) => {
      const option = document.createElement("option");
      option.value = genre.id;
      option.textContent = genre.name;
      genreSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar gêneros:", error);
  }
}

// Função para buscar os filmes por gênero
async function fetchMoviesByGenre(genreId) {
  try {
    const response = await fetch(`${API_URL}/discover/movie?with_genres=${genreId}&language=pt-BR`, options);
    const data = await response.json();
    renderMovies(data.results);
  } catch (error) {
    console.error("Erro ao buscar filmes por gênero:", error);
  }
}

// Função para exibir os filmes no HTML
function renderMovies(movies) {
  const cartazContainer = document.querySelector(".cartaz-container");
  cartazContainer.innerHTML = ""; // Limpa os cartazes existentes

  // Limita a exibição a 4 filmes
  movies.slice(0, 4).forEach((movie) => {
    const cartazDiv = document.createElement("div");
    cartazDiv.classList.add("cartaz");
    cartazDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
    cartazDiv.dataset.movieId = movie.id;

    // Evento para abrir os detalhes do filme
    cartazDiv.addEventListener("click", () => {
      window.location.href = `desc_filmes.html?movieId=${movie.id}`;
    });

    cartazContainer.appendChild(cartazDiv);
  });
}

// Evento do seletor de gênero
document.querySelector("#genreSelect").addEventListener("change", (event) => {
  const genreId = event.target.value;
  if (genreId) {
    fetchMoviesByGenre(genreId);
  }
});

// Carrega os gêneros e os filmes em destaque ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  loadGenres();
  loadFeaturedMovies(); // Exibe os filmes populares inicialmente
});

// Função para carregar filmes populares
async function loadFeaturedMovies() {
  try {
    const response = await fetch(`${API_URL}/movie/popular?language=pt-BR`, options);
    const data = await response.json();
    renderMovies(data.results);
  } catch (error) {
    console.error("Erro ao carregar filmes em destaque:", error);
  }
};

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

