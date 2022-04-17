let nameProd = "" //usado para informar o valor digitado no input para pegar o gif na api
/**
 * função para remover o item da lista HTML e do LocalStorage
 * @date 2022-04-12
 * @param {any} id
 * @returns {any}
 */
function removeItemFromList(id) {

  const allValue = localStorage.getItem("itensFromList") // pegando o valor do localstorage 

/*
arraylist caso o allvalue seja maior que 1 irá retorar os valores desestruturados dentro de um array se não 
irá retornar o proprio valor dentro do array
*/
  const arrayList = JSON.parse(allValue).length > 1 ? [...JSON.parse(allValue)] : [JSON.parse(allValue)]

  const deletItem = document.getElementById(id);// id que vem do botão incluso no HTML
  deletItem.remove(); //utizando o romove para remover o item do id
  const filterItem = arrayList.filter((value) => arrayList[id - 1].name != value.name) //filtro para pegar o valor do id e encontrar ele no localstorage
  if (filterItem.length === 0) {
    localStorage.removeItem("itensFromList")
    refreshList()
    sum()
    return
    //caso o filteritem.length for igual 0 ele remove o itensFromList do localstorage.
  }
  if (filterItem.length === 1) {
    const [value] = filterItem
    localStorage.setItem("itensFromList", JSON.stringify(value))
    refreshList()
    generateInputEvent()
    sum()
    return
    /* caso o filteritem.length for igual 1 ele atualiza o localstorage com 
  um objeto ao inves de atualizar com o array  */
  } 

  localStorage.setItem("itensFromList", JSON.stringify(filterItem)) //por ultimo devolvemos o array já filtrado sem o item excluido
  refreshList()
  generateInputEvent()
  sum()
}

/**
 * Função para atualizar lista no HTML
 * @date 2022-04-12
 * @returns {any}
 */
function refreshList() {
  const allValue = localStorage.getItem("itensFromList")
  if (allValue != null) { //pegamos os valores do localStorage se diferentes de null

    /*
    arraylist caso o allvalue seja maior que 1 irá retorar os valores desestruturados dentro de um array se não 
    irá retornar o proprio valor dentro do array
    */
    const arrayList = JSON.parse(allValue).length > 1 ? [...JSON.parse(allValue)] : [JSON.parse(allValue)]

    document.getElementById("listing").innerHTML = arrayList.map((item, index) => (
      `
      <li id="${index + 1}" class="listContent">
        <p style="text-decoration: ${item.price > 0 ? "line-through" : "none"}">
          Nome: ${item.name}
        </p>
        <p>
          Preço: R$ ${item.price}
        </p>
        <div>
          <input type="checkbox" id="${index + 1}" class="box" ${item.price > 0 ? "checked" : ""}>
          <button onclick="removeItemFromList(${index + 1})" class="remove">
            <img src="dump.png" alt="Imagem de uma lixeira" id="dump">
          </button>
        </div>
      </li>
      ` // Criando o item da lista , checkbox e o button para remover e adicionando o preço
    )).toString().replaceAll(",", "") // toString para transformar em String e replaceAll para retirar a virgula e trocar pelo espaço .
  }
}


/**
 * Função para adicionar o valor resgatado no input para a lista que será criada .
 * @date 2022-04-12
 * @returns {any}
 */
function addInList() {
  let inputValue = document.getElementById("add").value // valor do digitado no input
  if (inputValue.length > 150) { // se o valor tiver mais que 150 caracteres ele dispara a mensagem
    alert("Item com tamanho muito grande,Favor ajustar!")
    return
  }
  nameProd = inputValue //usado para informar o valor digitado no input para pegar o gif na api
  let itens = []; // array de itens vazio
  let allValue = localStorage.getItem("itensFromList") //pegando o valor do localstorage
  if (inputValue.trim() == "") { // utilizando .trim() para limpar os espaços em branco do inputValue
    alert("Digite o Item") // Alerta para quando digitar item invalido
    return
  }
  if (allValue != null) {
    /*
    arraylist caso o allvalue seja maior que 1 irá retorar os valores desestruturados dentro de um array se não 
    irá retornar o proprio valor dentro do array
    */
    const arrayList = JSON.parse(allValue).length > 1 ? [...JSON.parse(allValue)] : [JSON.parse(allValue)]

    if (arrayList.some((item) => item.name == inputValue)) { //Se o valor do inputValue Já estiver no arrayList. Utilizamos o some para encontrar os valores iguais e disparar o alerta.
      alert("Item já incluso")
      return
    }
    let value = [{ name: inputValue, price: 0.00 }] // let para gerar objeto
    if (JSON.parse(localStorage.getItem("itensFromList")).length > 1) { //se o valor for maior que 1 ele troca o resultado de value para array
      value = [{ name: inputValue, price: 0.00 }, ...JSON.parse(localStorage.getItem("itensFromList"))]
    } else {
      value.push(JSON.parse(localStorage.getItem("itensFromList")))

    }
    localStorage.setItem("itensFromList", JSON.stringify(value))
    document.getElementById("add").value = "" // substitui o valor digitado no input quando apertado o botao
    refreshList()
    generateInputEvent()
    getDataFromGit()
    return
  } else {
    itens.push(JSON.stringify({ name: inputValue, price: 0.00 }))
    localStorage.setItem("itensFromList", JSON.stringify({ name: inputValue, price: 0.00 }))
    document.getElementById("add").value = ""
    refreshList()
    generateInputEvent()
    getDataFromGit()
  }
}

/**
 * Função para identificar eventos do input e ativar o modal ao clicar em algum dos inputs
 * @date 2022-04-16
 * @returns {any}
 */
function generateInputEvent() {
  const allValue = localStorage.getItem("itensFromList") // retirando o valor do localstorage 
  if (allValue != null) {
    const arrayList = JSON.parse(allValue).length > 1 ? [...JSON.parse(allValue)] : [JSON.parse(allValue)]
    arrayList.map((item, index) => { // map realizado para instanciar o evento a partir dos ids dos inputs
      document.getElementById(index + 1).addEventListener("change", (event) => {
        if (event.target.checked) { //se o checkbox de algum dos inputs for acionado irá retorar checked como true executando o if e gerando o modal
          let window = document.getElementById("window");
          window.style.display = "block";
          localStorage.setItem("item", JSON.stringify(item))
          let closed = document.getElementsByClassName("close")[0];
          closed.onclick = () => { // dentro do modal existe um botao para fechar o modal ao clicado ele esconde o modal e troca o checkbox para false
            window.style.display = "none";
            event.target.checked = false
          }
        }
      })
    })
  }
}

/**
 * função para gerar o GIF animado
 * @date 2022-04-16
 * @returns {any}
 */
async function getDataFromGit() {
  const resp = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=dpPu1kIHwa3fxoQiH9lzTfmUkMgEjtuS&q=${nameProd}`) // retirando a imagem de dentro da api e utilizando o nome digitado no input text
  const data = await resp.json();
  let numbergit = Math.floor(Math.random() * 50) + 1; // logica para gerar numero aleatorio para pegar um gif sempre diferente
  const src = data.data[numbergit].images.fixed_width.url
  document.getElementById("image").innerHTML = `<img src="${src}" alt="Gif animado" style="width: 70px; height: 70px;"></img>`
}

/**
 * função para enviar o valor digitado no input do modal e atualizar o valor do localStorage
 * @date 2022-04-16
 * @returns {any}
 */
function sendValue() {
  const productValue = document.getElementById("productValue").value // valor do input do modal
  const value = localStorage.getItem("item") // pegando o valor do localstorage item.
  const objectValue = JSON.parse(value) //transformando o valor em objeto
  const allValue = localStorage.getItem("itensFromList") //pegando o valor do localstorage itensFromList.
  /*
   arraylist caso o allvalue seja maior que 1 irá retorar os valores desestruturados dentro de um array se não 
   irá retornar o proprio valor dentro do array
   */
  const arrayList = JSON.parse(allValue).length > 1 ? [...JSON.parse(allValue)] : [JSON.parse(allValue)]

  const updateValue = arrayList.map((list) => {
    if (list.name === objectValue.name) { // inserindo o valor do produto de acordo com o nome do produto informado no localstorage
      return { name: objectValue.name, price: Number(productValue) }
    }
    return list
  }
  )
  if (updateValue.length === 1) { // if feito para salvar o valor como objeto não como array
    const [value] = updateValue
    localStorage.setItem("itensFromList", JSON.stringify(value))
    let window = document.getElementById("window");
    window.style.display = "none"; // também fecha o modal
    refreshList()
    generateInputEvent()
    sum()
    return
  }
  localStorage.setItem("itensFromList", JSON.stringify(updateValue)) // salva como array
  let window = document.getElementById("window");
  window.style.display = "none"; // também fecha o modal
  refreshList()
  generateInputEvent()
  sum()
}

/**
 * função para somar os valores e salvar a soma
 * @date 2022-04-16
 * @returns {any}
 */
function sum() {
  let result = 0
  const allValue = localStorage.getItem("itensFromList")
  if (allValue != null) {
      /*
      arraylist caso o allvalue seja maior que 1 irá retorar os valores desestruturados dentro de um array se não 
      irá retornar o proprio valor dentro do array
      */
    const arrayList = JSON.parse(allValue).length > 1 ? [...JSON.parse(allValue)] : [JSON.parse(allValue)]
    for (let index = 0; index < arrayList.length; index++) { // for para somar todos os valores dos itens
      result += arrayList[index].price
    }
    //adicionando os valores no html
    document.getElementById("sum").innerHTML = `
    O valor total de compras é de
    R$ ${result.toFixed(2)}
    `
    return
  }
  document.getElementById("sum").innerHTML = `
  O valor total de compras é de
  R$ ${result.toFixed(2)}
  `
}

refreshList()
generateInputEvent()
sum()