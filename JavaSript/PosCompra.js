window.onload = function () {
    function getLocalStorageItem(key, defaultValue = "Não informado") {
        return localStorage.getItem(key) || defaultValue;
    }

    const totalItens = getLocalStorageItem("totalItens", "0");
    let totalValor = getLocalStorageItem("totalValor", "0,00");
    const cartaz = localStorage.getItem("cartaz"); 
    const descricao = localStorage.getItem("descricao");
    const assento = getLocalStorageItem("assento");
    const horario = getLocalStorageItem("horario");
    const data = getLocalStorageItem("data");
    const pagamento = getLocalStorageItem("pagamento");

   
    if (!isNaN(parseFloat(totalValor))) {
        totalValor = parseFloat(totalValor).toFixed(2).replace(".", ",");
    }

    
    function updateElement(selector, content) {
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = content;
        }
    }

    // Atualizando os elementos com as informações recuperadas
    updateElement(".contInfo", `
        <p><strong>Assento:</strong> ${assento}</p>
        <p><strong>Horário:</strong> ${horario}</p>
        <p><strong>Forma de Pagamento:</strong> ${pagamento}</p>
        <p><strong>Itens:</strong> ${totalItens}</p>
        <p><strong>Total:</strong> R$ ${totalValor}</p>
    `);

    if (cartaz) {
        updateElement(".cartazIngresso", `<img src="${cartaz}" alt="Cartaz do Filme" style="width: 100%;" />`);
        updateElement(".contCartaz", `<img src="${cartaz}" alt="Cartaz do Filme" style="width: 100%;" />`);
    }

    if (descricao) {
        updateElement(".descIngresso", `<p>${descricao}</p>`);
        updateElement(".contDesc", `<p>${descricao}</p>`);
    }
};