// URL da API e opções para autenticação
const API_URL = "https://api.themoviedb.org/3";
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjdkNGQxYjdjYmQwYzI2NWU0MTliMzk5Y2I4OGMxOSIsInN1YiI6IjY2Mzk1ZWI5MmZhZjRkMDEyYWM2OTBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pSD_4lowFkWaHyOhHE1_4hu5ht9c24Oc-KzVIjI_zO0"; // Substitua pela sua chave de API
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500"; // Base URL para imagens
const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`, // Substitua pelo seu token Bearer
    "Content-Type": "application/json;charset=utf-8",
  },
};

// Função para carregar os gêneros no dropdown
async function loadGenres() {
  try {
    const response = await fetch(`${API_URL}/genre/movie/list?language=pt-BR`, options);
    const data = await response.json();
    populateGenreDropdown(data.genres);
  } catch (error) {
    console.error("Erro ao carregar gêneros:", error);
  }
}

// Preenche o dropdown de gêneros
function populateGenreDropdown(genres) {
  const genreSelect = document.querySelector("#genreSelect");
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.name;
    genreSelect.appendChild(option);
  });
}

// Listener para quando um gênero é selecionado
document.querySelector("#genreSelect").addEventListener("change", (event) => {
  const selectedGenre = event.target.value;
  if (selectedGenre) {
    loadMoviesByGenre(selectedGenre);
  }
});

// Busca filmes pelo gênero selecionado
async function loadMoviesByGenre(genreId) {
  try {
    const response = await fetch(`${API_URL}/discover/movie?with_genres=${genreId}&language=pt-BR`, options);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Erro ao carregar filmes por gênero:", error);
  }
}

// Exibe os filmes no container
function displayMovies(movies) {
  const container = document.querySelector(".cartaz-container");
  container.innerHTML = ""; // Limpa os filmes anteriores

  if (movies.length === 0) {
    container.innerHTML = "<p>Nenhum filme encontrado para esse gênero.</p>";
    return;
  }

  const limitedMovies = movies.slice(0,4);

  limitedMovies.forEach((movie) => {
    const cartazDiv = document.createElement("div");
    cartazDiv.classList.add("cartaz");

    const movieImage = document.createElement("img");
    movieImage.src = `${IMG_BASE_URL}${movie.poster_path}`; // URL da imagem do filme
    movieImage.alt = movie.title;

    const movieTitle = document.createElement("p");
    movieTitle.textContent = movie.title;

    cartazDiv.appendChild(movieImage);
    cartazDiv.appendChild(movieTitle);
    container.appendChild(cartazDiv);
  });
}

// Inicializa o carregamento dos gêneros ao carregar a página
document.addEventListener("DOMContentLoaded", loadGenres);

