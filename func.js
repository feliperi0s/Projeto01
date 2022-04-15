let nomeProd = ""
/**
 * função para remover o item da lista HTML e do LocalStorage
 * @date 2022-04-12
 * @param {any} id
 * @returns {any}
 */
function removerItemDaLista(id) {

  const allValue = localStorage.getItem("itensDaLista") // retirando o valor do localstorage 

  const arrayList = JSON.parse(allValue).length > 1 ? [...JSON.parse(allValue)] : [JSON.parse(allValue)]

  const itemDeletado = document.getElementById(id);// id que vem do botão incluso no HTML
  itemDeletado.remove(); //utizando o romove para remover o item do id
  const itemfiltrado = arrayList.filter((value) => arrayList[id - 1].name != value.name) //filtro para pegar o valor do id e encontrar ele no localstorage
  if (itemfiltrado.length === 0) {
    localStorage.removeItem("itensDaLista")
    atualizarLista()
    soma()
    return
    //o filtro devolve o array no caso o localstorage sem o intem do id-button
  }
  if (itemfiltrado.length === 1) {
    const [value] = itemfiltrado
    localStorage.setItem("itensDaLista", JSON.stringify(value))
    atualizarLista()
    soma()
    return
  }
  localStorage.setItem("itensDaLista", JSON.stringify(itemfiltrado)) //por ultimo devolvemos o array já filtrado sem o item excluido
  atualizarLista()
  soma()
}

/**
 * Função para atualizar lista no HTML
 * @date 2022-04-12
 * @returns {any}
 */
function atualizarLista() {
  const allValue = localStorage.getItem("itensDaLista")
  if (allValue != null) { //pegamos os valores do localStorage se diferentes de null
    const arrayList = JSON.parse(allValue).length > 1 ? [...JSON.parse(allValue)] : [JSON.parse(allValue)]

    document.getElementById("listagem").innerHTML = arrayList.map((item, index) => (
      `<li id="${index + 1}" class="listaContent">
      <input type="checkbox" id="${index + 1}" class="box" ${item.preco > 0 ? "checked" : ""}>
      <span style="text-decoration: ${item.preco > 0 ? "line-through" : "none"}">${item.name}</span><span>R$ ${item.preco}</span>
      <button onclick="removerItemDaLista(${index + 1})" class="remover"><img src="lixeira.png" alt="" id="lixeira"></button>
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
  nomeProd = valorDoInput
  let itens = []; // array de itens vazio
  let allValue = localStorage.getItem("itensDaLista") // ValorDoStorege é igual ao valor do LocalStage
  if (valorDoInput.trim() == "") { // utilizando .trim() para limpar os espaços em branco do valorDoInput
    alert("Digite o Item") // Alerta para digitar item valido
    return
  }
  if (allValue != null) {
    const arrayList = JSON.parse(allValue).length > 1 ? [...JSON.parse(allValue)] : [JSON.parse(allValue)]
    if (arrayList.some((item) => item.name == valorDoInput)) { //Se o valor do valorDoInput Já estiver no arrayStorege ele retorna item já está incluso utilizado o .includes para verificar
      alert("Item já incluso")
      return
    }
    let value = [{ name: valorDoInput, preco: 0.00 }]
    if (JSON.parse(localStorage.getItem("itensDaLista")).length > 1) {
      value = [{ name: valorDoInput, preco: 0.00 }, ...JSON.parse(localStorage.getItem("itensDaLista"))]
    } else {
      value.push(JSON.parse(localStorage.getItem("itensDaLista")))

    }
    localStorage.setItem("itensDaLista", JSON.stringify(value))
    document.getElementById("adicionar").value = "" // substitui o valor digitado no input quando apertado o botao
    atualizarLista()
    gerarEventoInput()
    obterDadosGit()
    return
  } else {
    itens.push(JSON.stringify({ name: valorDoInput, preco: 0.00 }))
    localStorage.setItem("itensDaLista", JSON.stringify({ name: valorDoInput, preco: 0.00 }))
    document.getElementById("adicionar").value = ""
    atualizarLista()
    gerarEventoInput()
  }
}

function gerarJanela() {
  let janela = document.getElementById("janela");

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
    const arrayList = JSON.parse(allValue).length > 1 ? [...JSON.parse(allValue)] : [JSON.parse(allValue)]
    arrayList.map((item, index) => {
      document.getElementById(index + 1).addEventListener("change", (event) => {
        if (event.target.checked) {
          let janela = document.getElementById("janela");
          janela.style.display = "block";
          localStorage.setItem("item", JSON.stringify(item))
          let fechar = document.getElementsByClassName("close")[0];
          fechar.onclick = () => {
            janela.style.display = "none";
            event.target.checked = false
          }
        }
      })
    })
  }
}
gerarEventoInput()
async function obterDadosGit() {
  const resp = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=dpPu1kIHwa3fxoQiH9lzTfmUkMgEjtuS&q=${nomeProd}`)
  const dados = await resp.json();
  let numerogit = Math.floor(Math.random() * 50) + 1;
  const src = dados.data[numerogit].images.fixed_width.url
  document.getElementById("image").innerHTML = `<img src="${src}" alt="" style="width: 200px; height: 200px;"></img>`
}

function exibirValores() {
  const valorProduto = document.getElementById("valorProduto").value
  const value = localStorage.getItem("item")
  const objectValue = JSON.parse(value)
  const allValue = localStorage.getItem("itensDaLista")
  const arrayList = JSON.parse(allValue).length > 1 ? [...JSON.parse(allValue)] : [JSON.parse(allValue)]
  const updateValue = arrayList.map((list) => {
    if (list.name === objectValue.name) {
      return { name: objectValue.name, preco: Number(valorProduto) }
    }
    return list
  }
  )
  if (updateValue.length === 1) {
    const [value] = updateValue
    localStorage.setItem("itensDaLista", JSON.stringify(value))
    let janela = document.getElementById("janela");
    janela.style.display = "none";
    atualizarLista()
    gerarEventoInput()
    soma()
    return
  }
  localStorage.setItem("itensDaLista", JSON.stringify(updateValue))
  let janela = document.getElementById("janela");
  janela.style.display = "none";
  atualizarLista()
  gerarEventoInput()
  soma()
}

function soma() {
  let result = 0
  const allValue = localStorage.getItem("itensDaLista")
  if (allValue != null) {
    const arrayList = JSON.parse(allValue).length > 1 ? [...JSON.parse(allValue)] : [JSON.parse(allValue)]
    for (let index = 0; index < arrayList.length; index++) {
      result += arrayList[index].preco
    }
    document.getElementById("soma").innerHTML = `
    O valor total de compras é de
    R$ ${result.toFixed(2)}
    `
    return
  }
  document.getElementById("soma").innerHTML = `
  O valor total de compras é de
  R$ ${result}
  `
}

soma()