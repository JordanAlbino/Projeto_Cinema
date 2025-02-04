const API_URL = "https://api.themoviedb.org/3";
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjdkNGQxYjdjYmQwYzI2NWU0MTliMzk5Y2I4OGMxOSIsInN1YiI6IjY2Mzk1ZWI5MmZhZjRkMDEyYWM2OTBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pSD_4lowFkWaHyOhHE1_4hu5ht9c24Oc-KzVIjI_zO0"; 
const options = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
    },
};





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

function init() {
  const { movieId } = getParamsFromURL();
  if (movieId) {
      getMovieDetails(movieId);
  } else {
      console.error("ID do filme não encontrado na URL.");
  }
}

init(); 


function getParamsFromURL() {
  const params = new URLSearchParams(window.location.search);
  return {
      movieId: params.get("movieId"),
      salaId: params.get("salaId"),
  };
}



// Variável para armazenar o método de pagamento selecionado
let selectedPaymentMethod = "";


function showPaymentForm(method, detailsHTML) {
  const paymentContainer = document.getElementById("payment-container");
  paymentContainer.style.display = "block";

  const paymentMethodTitle = document.getElementById("payment-method");
  paymentMethodTitle.textContent = `Método Selecionado: ${method}`;

  const paymentDetails = document.getElementById("payment-details");
  paymentDetails.innerHTML = detailsHTML;

  selectedPaymentMethod = method;
}

// Função genérica para validar entrada de texto
function validateInput(id, regex, errorMsg) {
    const input = document.getElementById(id);
    if (!input || !regex.test(input.value.trim())) {
        alert(errorMsg);
        input.focus();
        return false;
    }
    return true;
}

// Formulários de pagamento com validação
function payWithCreditCard() {
  showPaymentForm(
    "Cartão de Crédito",
    `
    <label for="cc-number">Número do Cartão:</label>
    <input type="text" id="cc-number" placeholder="0000 0000 0000 0000" /><br />

    <label for="cc-expiration">Validade:</label>
    <input type="text" id="cc-expiration" placeholder="MM/AA" /><br />

    <label for="cc-cvv">CVV:</label>
    <input type="text" id="cc-cvv" placeholder="123" /><br />
    `
  );
}

function payWithDebitCard() {
  showPaymentForm(
    "Cartão de Débito",
    `
    <label for="debit-number">Número do Cartão:</label>
    <input type="text" id="debit-number" placeholder="0000 0000 0000 0000" /><br />

    <label for="debit-password">Senha:</label>
    <input type="password" id="debit-password" placeholder="Senha do Cartão" /><br />
    `
  );
}

function payWithNubank() {
  showPaymentForm(
    "Nubank",
    `
    <label for="nubank-email">E-mail da Conta Nubank:</label>
    <input type="email" id="nubank-email" placeholder="seuemail@exemplo.com" /><br />

    <label for="nubank-password">Senha:</label>
    <input type="password" id="nubank-password" placeholder="Senha" /><br />
    `
  );
}

function payWithGooglePay() {
  showPaymentForm(
    "Google Pay",
    `
    <label for="google-account">Conta Google:</label>
    <input type="email" id="google-account" placeholder="seuemail@gmail.com" /><br />
    `
  );
}

function payWithPix() {
  showPaymentForm(
    "Pix",
    `
    <p>Chave Pix Gerada:</p>
    <strong>123.456.789-00</strong><br />
    <p>Escaneie o QR Code com o aplicativo do seu banco:</p>
    <img src="https://media.nbcbayarea.com/2020/10/qr-code-huge.png?resize=906,1024" alt="QR Code Pix" />
    `
  );
}

// Função para validar os campos do formulário antes de confirmar o pagamento
function validatePayment() {
  if (!selectedPaymentMethod) {
    alert("Selecione um método de pagamento antes de confirmar.");
    return false;
  }

  switch (selectedPaymentMethod) {
    case "Cartão de Crédito":
      if (
          !validateInput("cc-number", /^\d{16}$/, "Número do cartão inválido! Deve conter 16 dígitos.") ||
          !validateInput("cc-expiration", /^(0[1-9]|1[0-2])\/\d{2}$/, "Data de validade inválida! Use o formato MM/AA.") ||
          !validateInput("cc-cvv", /^\d{3,4}$/, "CVV inválido! Deve conter 3 ou 4 dígitos.")
      ) return false;
        break;

    case "Cartão de Débito":
      if (
          !validateInput("debit-number", /^\d{16}$/, "Número do cartão inválido! Deve conter 16 dígitos.") ||
          !validateInput("debit-password", /^.{4,}$/, "Senha inválida! Deve ter pelo menos 4 caracteres.")
      ) return false;
        break;

    case "Nubank":
      if (
          !validateInput("nubank-email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "E-mail inválido!") ||
          !validateInput("nubank-password", /^.{4,}$/, "Senha inválida! Deve ter pelo menos 4 caracteres.")
      ) return false;
        break;

    case "Google Pay":
      if (!validateInput("google-account", /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "E-mail inválido!"))
          return false;
          break;

      case "Pix":
        // Para Pix, não há campos a validar, pois o pagamento ocorre externamente
        break;

      default:
        alert("Método de pagamento não reconhecido.");
        return false;
  }
  return true;
}

// Confirmação do pagamento com validação
function confirmPayment() {
  if (validatePayment()) {
    const result = document.getElementById("payment-result");
    result.innerHTML = `<p>Pagamento realizado com sucesso pelo método: <strong>${selectedPaymentMethod}</strong>.</p>`;
    alert("Pagamento confirmado!");
  }
}

window.onload = function() {
  const totalItens = localStorage.getItem("totalItens");
  const totalValor = localStorage.getItem("totalValor");
  const cartaz = localStorage.getItem("cartaz");
  const descricao = localStorage.getItem("descricao");

  if (totalItens && totalValor) {
      document.getElementById("detalhes").innerHTML = `
          <p>ITENS: ${totalItens}</p>
          <p>TOTAL: R$ ${totalValor}</p>
      `;
  }

 
  if (cartaz) {
      document.querySelector(".cartaz").innerHTML = `<img src="${cartaz}" alt="Cartaz do Filme" />`;
  }
  
 
  if (descricao) {
      document.querySelector(".descricao").innerHTML = `<p>${descricao}</p>`;
  }
};

