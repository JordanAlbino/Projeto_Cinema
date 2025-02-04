document.getElementById("BtCriarConta").addEventListener("click", async (event) => {
    event.preventDefault(); // Prevenir o comportamento padrão do botão

    // Capturar os dados do formulário
    const nome = document.getElementById("input-nome").value;
    const cpf = document.getElementById("input-cpf").value;
    const email = document.getElementById("input-email").value;
    const telefone = document.getElementById("input-telefone").value;
    const senha = document.getElementById("input-senha").value;

// Função de validação do CPF (apenas exemplo simples)
function validarCPF(cpf) {
    // Verificar se o CPF tem 11 dígitos numéricos
    const regex = /^\d{11}$/;
    return regex.test(cpf);
}

// Função de validação de email
function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

// Função de validação do telefone (formato simples)
function validarTelefone(telefone) {
    const regex = /^\d{10,11}$/; // 10 ou 11 dígitos
    return regex.test(telefone);
}

// Validar os campos
    if (!nome || !cpf || !email || !telefone || !senha) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

// Validar CPF
if (!validarCPF(cpf)) {
    alert("CPF inválido! Deve conter 11 dígitos.");
    return;
}

// Validar email
if (!validarEmail(email)) {
    alert("Email inválido! Por favor, insira um email válido.");
    return;
}

// Validar telefone
if (!validarTelefone(telefone)) {
    alert("Telefone inválido! Deve conter entre 10 e 11 dígitos.");
    return;
}

    // Criar o objeto para enviar ao back-end
    const userData = { nome, cpf, email, telefone, senha };

    // Enviar os dados ao back-end
    await fetch("http://localhost:8080/api/clientes", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao criar conta. Verifique os dados e tente novamente.");
        }
        return response.json()
    })
    .then(data => { 
        console.log(data)
        alert(`Conta criada com sucesso! Bem-vindo, ${data.nome}!`);
        document.getElementById("input-nome").value = '';
        document.getElementById("input-cpf").value = '';
        document.getElementById("input-email").value = '';
        document.getElementById("input-telefone").value = '';
        document.getElementById("input-senha").value = '';
    })
    .catch(error => {
        console.error(error);
        alert("Erro ao criar conta. Por favor, tente novamente.");
    });
        
});