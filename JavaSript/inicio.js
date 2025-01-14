const API_URL = "https://api.themoviedb.org/3";
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjdkNGQxYjdjYmQwYzI2NWU0MTliMzk5Y2I4OGMxOSIsInN1YiI6IjY2Mzk1ZWI5MmZhZjRkMDEyYWM2OTBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pSD_4lowFkWaHyOhHE1_4hu5ht9c24Oc-KzVIjI_zO0";


const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
};


async function getFeaturedMovies() {
  try {
    const response = await fetch(`${API_URL}/movie/now_playing?language=pt-BR`, options);
    const data = await response.json();
    displayFeaturedMovies(data.results);
  } catch (error) {
    console.error("Erro ao buscar filmes em destaque:", error);
  }
}


function displayFeaturedMovies(movies) {
  const highlightsContainer = document.querySelector(".highlights");
  const dotsContainer = document.querySelector(".dots");

  // Limpar conteúdo existente
  dotsContainer.innerHTML = "";

  movies.slice(0, 3).forEach((movie, index) => {
    const movieDiv = document.createElement("div");
    movieDiv.className = "highlight";
    movieDiv.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    `;

    if (index === 0) movieDiv.classList.add("active");
    highlightsContainer.appendChild(movieDiv);

    // Adicionar indicador de página
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });

  setupCarousel();
}

// Função para buscar filmes para sessões
async function getSessionMovies() {
  try {
    const response = await fetch(`${API_URL}/movie/popular?language=pt-BR`, options);
    const data = await response.json();
    displaySessionMovies(data.results);
  } catch (error) {
    console.error("Erro ao buscar filmes populares:", error);
  }
}


function displaySessionMovies(movies) {
  const cardsContainer = document.querySelector(".cards");

  
  cardsContainer.innerHTML = "";

  movies.slice(0, 4).forEach((movie) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Data: ${movie.release_date}</p>
    `;
    cardsContainer.appendChild(card);
  });
}

// Configuração do carrossel
function setupCarousel() {
  const highlights = document.querySelectorAll(".highlight");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;

  function showHighlight(index) {
    highlights.forEach((highlight, i) => {
      highlight.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    currentIndex = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showHighlight(index));
  });

  // Navegação automática
  setInterval(() => {
    const nextIndex = (currentIndex + 1) % highlights.length;
    showHighlight(nextIndex);
  }, 5000);
}

async function getMovieTrailer(movieId) {
    try {
      const response = await fetch(`${API_URL}/movie/${movieId}/videos?language=pt-BR`, options);
      const data = await response.json();
      const trailer = data.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
  
      if (trailer) {
        const trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
        window.open(trailerUrl, "_blank"); 
      } else {
        alert("Trailer não disponível para este filme.");
      }
    } catch (error) {
      console.error("Erro ao buscar o trailer:", error);
      alert("Ocorreu um erro ao tentar carregar o trailer.");
    }
  }
  
  
  function setupCardLinks() {
    const cards = document.querySelectorAll(".card");
  
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const movieId = card.dataset.movieId;
        window.location.href = `desc_filmes.html?movieId=${movieId}`;
      });
    });
  }
  
  
  function displaySessionMovies(movies) {
    const cardsContainer = document.querySelector(".cards");
  
    // Limpar conteúdo existente
    cardsContainer.innerHTML = "";
  
    movies.slice(0, 4).forEach((movie) => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.movieId = movie.id; 
      card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>Data: ${movie.release_date}</p>
      `;
      cardsContainer.appendChild(card);
    });
  
    setupCardLinks(); 
  }


getFeaturedMovies();
getSessionMovies();