// Variável para armazenar o método de pagamento selecionado
let selectedPaymentMethod = "";

function showPaymentForm(method, detailsHTML) {
  // Exibe o contêiner de pagamento
  const paymentContainer = document.getElementById("payment-container");
  paymentContainer.style.display = "block";

  // Atualiza o método selecionado
  const paymentMethodTitle = document.getElementById("payment-method");
  paymentMethodTitle.textContent = `Método Selecionado: ${method}`;

  // Adiciona os detalhes específicos do método
  const paymentDetails = document.getElementById("payment-details");
  paymentDetails.innerHTML = detailsHTML;

  // Salva o método selecionado
  selectedPaymentMethod = method;
}

window.onload = function() {
  const totalItens = localStorage.getItem("totalItens");
  const totalValor = localStorage.getItem("totalValor");

  if (totalItens && totalValor) {
      document.getElementById("detalhes").innerHTML = `
          <p>ITENS: ${totalItens}</p>
          <p>TOTAL: R$ ${totalValor}</p>
      `;
  }
}

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
    <img src="https://via.placeholder.com/150" alt="QR Code Pix" />
    `
  );
}

function confirmPayment() {
  const result = document.getElementById("payment-result");
  result.innerHTML = `<p>Pagamento realizado com sucesso pelo método: <strong>${selectedPaymentMethod}</strong>.</p>`;
  alert("Pagamento confirmado!");
}
