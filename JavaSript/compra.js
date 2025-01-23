// Configurações de preço e estado inicial
const precoAssento = 15.00;
let assentosSelecionados = [];

// Gerar assentos dinamicamente
const containerAssentos = document.querySelector(".assentos");

function criarAssentos() {
  for (let i = 0; i < 64; i++) {
    const assento = document.createElement("div");
    assento.classList.add("assento");

    // Marcar alguns assentos como ocupados (exemplo)
    if (Math.random() < 0.3) {
      assento.classList.add("ocupado");
    }

    assento.addEventListener("click", () => selecionarAssento(assento));
    containerAssentos.appendChild(assento);
  }
}

// Função para selecionar/desselecionar assentos
function selecionarAssento(assento) {
  if (assento.classList.contains("ocupado")) return;

  if (assento.classList.contains("selecionado")) {
    assento.classList.remove("selecionado");
    assentosSelecionados.pop();
  } else {
    assento.classList.add("selecionado");
    assentosSelecionados.push(assento);
  }

  atualizarResumo();
}

// Atualizar o resumo (itens e total)
function atualizarResumo() {
  const itens = assentosSelecionados.length;
  const total = (itens * precoAssento).toFixed(2);

  document.getElementById("itens").textContent = itens;
  document.getElementById("total").textContent = total;
}

// Função voltar
function voltar() {
  window.history.back();
}

// Inicializar
criarAssentos();