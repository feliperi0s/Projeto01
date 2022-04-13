/**
 * função para remover o item da lista HTML e do LocalStorage
 * @date 2022-04-12
 * @param {any} id
 * @returns {any}
 */
function removerItemDaLista(id) {
  const allValue = localStorage.getItem("itensDaLista") // retirando o valor do localstorage 
  const arrayList = allValue.split(",") //transformando em array com o split

  const itemDeletado = document.getElementById(id);// id que vem do botão incluso no HTML
  itemDeletado.remove(); //utizando o romove para remover o item do id

  const itemfiltrado = arrayList.filter((value) => arrayList[id - 1] != value) //filtro para pegar o valor do id e encontrar ele no localstorage
  if (itemfiltrado.length === 0) {
    localStorage.removeItem("itensDaLista")
    return
    //o filtro devolve o array no caso o localstorage sem o intem do id-button
  }
  localStorage.setItem("itensDaLista", itemfiltrado.toString()) //por ultimo devolvemos o array já filtrado sem o item excluido
  console.log(itemfiltrado)
}

/**
 * Função para atualizar lista no HTML
 * @date 2022-04-12
 * @returns {any}
 */
function atualizarLista() {
  const allValue = localStorage.getItem("itensDaLista")
  if (allValue != null) { //pegamos os valores do localStorage se diferentes de null
    const arrayList = allValue.split(",") // c

    document.getElementById("listagem").innerHTML = arrayList.map((item, index) => (
      `<li id="${index + 1}">
      <span>${item}</span>
      <input type="checkbox" id="${index + 1}">
      <button onclick="removerItemDaLista(${index + 1})" class="remover">x</button>
      </li>` // Criando o item da lista , checkbox e o button para remover
    )).toString().replaceAll(",", "") // toString para transformar em String e replaceAll para retirar a virgula e trocar pelo espaço .

  }

}
atualizarLista()

/**
 * Função para adicionar o valor resgatado no input para a lista que será criada .
 * @date 2022-04-12
 * @returns {any}
 */
function adicionarNaLista() {
  let valorDoInput = document.getElementById("adicionar").value // valor do digitado no input
  let itens = []; // array de itens vazio
  let valorDoStorege = localStorage.getItem("itensDaLista") // ValorDoStorege é igual ao valor do LocalStage
  if (valorDoInput.trim() == "") { // utilizando .trim() para limpar os espaços em branco do valorDoInput
    alert("Digite o Item") // Alerta para digitar item valido
    return
  }
  if (valorDoStorege != null) {
    const arrayStorege = valorDoStorege.split(",") //transforma o valor do localstorage em array com o split
    if (arrayStorege.includes(valorDoInput)) { //Se o valor do valorDoInput Já estiver no arrayStorege ele retorna item já está incluso utilizado o .includes para verificar
      alert("Item já incluso")
      return
    }
    const value = localStorage.getItem("itensDaLista") ?
      `${valorDoInput},${localStorage.getItem("itensDaLista")}` :
      valorDoInput // if ternario que verifica se já existe valor no localstorage se sim ele adiciona + o valor do input se não adiciona somento o valor do input
    itens.push(value)
    localStorage.setItem("itensDaLista", itens)
    document.getElementById("adicionar").value = "" // substitui o valor digitado no input quando apertado o botao
    atualizarLista()
    gerarEventoInput()
    return
  } else {
    itens.push(valorDoInput)
    localStorage.setItem("itensDaLista",itens)
    document.getElementById("adicionar").value = ""
    atualizarLista()
    gerarEventoInput()
  }
}

function gerarJanela() {
  let janela = document.getElementById("myModal");

  let botao = document.getElementById("myBtn");

  let fechar = document.getElementsByClassName("close")[0];

  botao.onclick = () => {
    janela.style.display = "block";
  }

  fechar.onclick = () => {
    janela.style.display = "none";
  }

  window.onclick = (event) => {
    if (event.target == janela) {
      janela.style.display = "none";
    }
  }
}

function gerarEventoInput() {
  const allValue = localStorage.getItem("itensDaLista") // retirando o valor do localstorage 
if (allValue != null) {
  const arrayList = allValue.split(",") //transformando em array com o split
arrayList.map((item, index) => {
  const inputCheckbox = document.getElementById(index+1).addEventListener("change", (event) => {
    if (event.target.checked) {
      let janela = document.getElementById("myModal");
      janela.style.display = "block";
      let fechar = document.getElementsByClassName("close")[0];
      fechar.onclick = () => {
        janela.style.display = "none";
        event.target.checked=false
      }
    }
    console.log(event.target.checked)
  })
})
}
}

gerarEventoInput()






