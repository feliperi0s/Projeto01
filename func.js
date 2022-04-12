
// função para remover o item da lista HTML e do LocalStorage
function removerItemDaLista(id) {
  const allValue = localStorage.getItem("itensDaLista")
  const arrayList = allValue.split(",")
  // retirando o valor do localstorage e transformando em array com o split
  //utizando o romove para remover o item do id
  const itemDeletado = document.getElementById(id);
  itemDeletado.remove();
  // id que vem do botão incluso no HTML nesse primeiro momento removendo apenas do html
 //deposi feito ul filtro para pegar o valor do id e encontrar ele no localstorage
  const itemfiltrado = arrayList.filter((value) => arrayList[id - 1] != value)
  if (itemfiltrado.length === 0) {
    localStorage.removeItem("itensDaLista")
    return
    //o filtro devolve o array no caso o localstorage sem o intem do id-button
  }
  localStorage.setItem("itensDaLista", itemfiltrado.toString())
  console.log(itemfiltrado)
//por ultimo devolvemos o array já filtrado sem o item excluido
}

//função para atualizar a lista
function atualizarLista() {
  const allValue = localStorage.getItem("itensDaLista")
  if (allValue != null) {
    const arrayList = allValue.split(",")
//pegamos os valores do localStorage se diferentes de null transformamos eles em array com o split
    document.getElementById("listagem").innerHTML = arrayList.map((item, index) => (
      `<li id="${index + 1}">
      <span>${item}</span>
      <input type="checkbox">
      <button onclick="removerItemDaLista(${index + 1})">x</button>
      </li>`
    )).toString().replaceAll(",", "")
    
  }

}
atualizarLista()

function adicionarNaLista() {
  let valorDoInput = document.getElementById("adicionar").value
  let itens = [];
  let valorDoStorege = localStorage.getItem("itensDaLista")
  if (valorDoInput.trim() == "") {
    alert("Digite o Item")
    return
  }
  if (valorDoStorege != null) {
    const arrayStorege = valorDoStorege.split(",")
    if (arrayStorege.includes(valorDoInput)) {
      alert("Item já incluso")
      return
    }
    const value = localStorage.getItem("itensDaLista") ? `${valorDoInput},${localStorage.getItem("itensDaLista")}` : valorDoInput
    itens.push(value)
    localStorage.setItem("itensDaLista", itens)
    document.getElementById("adicionar").value = ""
    atualizarLista()
    return
  } else {
    itens.push(valorDoInput)
    localStorage.setItem("itensDaLista", itens)
    document.getElementById("adicionar").value = ""
    atualizarLista()
  }
}






