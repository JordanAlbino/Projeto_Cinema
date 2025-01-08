const API_URL = "https://api.themoviedb.org/3";
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjdkNGQxYjdjYmQwYzI2NWU0MTliMzk5Y2I4OGMxOSIsInN1YiI6IjY2Mzk1ZWI5MmZhZjRkMDEyYWM2OTBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pSD_4lowFkWaHyOhHE1_4hu5ht9c24Oc-KzVIjI_zO0";

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
};

// Função para buscar os detalhes do filme
async function getMovieDetails(movieId) {
  try {
    const response = await fetch(`${API_URL}/movie/${movieId}?language=pt-BR`, options);
    const movie = await response.json();

    // Preencher a capa
    const capaFilme = document.querySelector(".capaFilme");
    capaFilme.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;

    // Preencher o trailer
    const trailerResponse = await fetch(`${API_URL}/movie/${movieId}/videos?language=pt-BR`, options);
    const trailerData = await trailerResponse.json();
    const trailer = trailerData.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
    if (trailer) {
      const trailerDiv = document.querySelector(".trailer");
      trailerDiv.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>`;
    } else {
      document.querySelector(".trailer").innerHTML = `<p>Trailer não disponível.</p>`;
    }

    // Preencher a descrição
    const descricaoDiv = document.querySelector(".descricao");
    descricaoDiv.innerHTML = `<p>${movie.overview || "Descrição não disponível."}</p>`;

    // Preencher as salas
    const salasDivs = document.querySelectorAll(".salas > div");
    salasDivs.forEach((sala, index) => {
      sala.innerHTML = `
        <p><strong>Sala ${index + 1}</strong></p>
        <p>Horário: ${18 + index}:00</p>
      `;
    });
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
  }
}

// Função para recuperar o ID do filme da URL
function getMovieIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("movieId");
}

// Função para o botão de voltar
document.querySelector(".back").addEventListener("click", () => {
  window.history.back();
});

// Recuperar o ID do filme e carregar os detalhes
const movieId = getMovieIdFromURL();
if (movieId) {
  getMovieDetails(movieId);
} else {
  console.error("ID do filme não encontrado na URL.");
}