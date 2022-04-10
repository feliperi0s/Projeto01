
let itens = [];

function adicionarNaLista() {
    let valorDoInput = document.getElementById("adicionar").value
    let itemDaLista = document.createElement("li")
    itemDaLista.innerText = valorDoInput
    itens.push(itemDaLista)
    document.getElementById("listagem").appendChild(itemDaLista)
    console.log(itens)
    
}

//const valor = document.getElementById("adicionar").value
const localStorege =JSON.parse(localStorage.setItem('valor'))
let valor = localStorage.getItem()