document.getElementById("BtCriarConta").addEventListener("click", async (event) => {
    event.preventDefault(); // Prevenir o comportamento padrão do botão

    // Capturar os dados do formulário
    const nome = document.getElementById("input-nome").value;
    const cpf = document.getElementById("input-cpf").value;
    const email = document.getElementById("input-email").value;
    const telefone = document.getElementById("input-telefone").value;
    const senha = document.getElementById("input-senha").value;

    // Validar os campos (opcional, mas recomendado)
    if (!nome || !cpf || !email || !telefone || !senha) {
        alert("Todos os campos são obrigatórios!");
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