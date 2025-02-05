document.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
        document.getElementById("Box1").value = userData.nome;
        document.getElementById("Box2").value = userData.email;
        document.getElementById("Box3").value = userData.telefone;
        document.getElementById("Box4").value = userData.cpf;
    }

   
    const inputs = document.querySelectorAll(".box");
    inputs.forEach(input => {
        input.addEventListener("click", () => {
            inputs.forEach(i => i.removeAttribute("disabled"));
            document.getElementById("botaoCancelar").removeAttribute("disabled");
            document.getElementById("botaoSalvar").removeAttribute("disabled");
        });
    });

    
    document.getElementById("botaoCancelar").addEventListener("click", () => {
        location.reload();
    });


    document.getElementById("botaoSalvar").addEventListener("click", () => {
        
        const updatedUserData = {
            nome: document.getElementById("Box1").value,
            email: document.getElementById("Box2").value,
            telefone: document.getElementById("Box3").value,
            cpf: document.getElementById("Box4").value
        };

        localStorage.setItem("userData", JSON.stringify(updatedUserData));
        alert("Dados atualizados com sucesso!");
        window.location.href = "inicio.html"; 
    });
});