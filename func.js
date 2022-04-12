function removerItemDaLista(id) {
  const allValue = localStorage.getItem("itensDaLista")
    const arrayList = allValue.split(",")
    const itemDeletado = document.getElementById(id);
    itemDeletado.remove();
    const itemfiltrado = arrayList.filter((value)=> arrayList[id-1] != value)
    if (itemfiltrado.length === 0) {
      localStorage.removeItem("itensDaLista")
      return
    }
    localStorage.setItem("itensDaLista",itemfiltrado.toString())
  console.log(itemfiltrado)
}

function atualizarLista() {
  const allValue = localStorage.getItem("itensDaLista")
  if (allValue != null) {
    const arrayList = allValue.split(",")

    document.getElementById("listagem").innerHTML = arrayList.map((item,index) => (
      `<li id="${index+1}">
      <span>${item}</span>
      <input type="checkbox">
      <button onclick="removerItemDaLista(${index+1})">x</button>
      </li>`
    )).toString().replaceAll(",", "")
    console.log(arrayList)
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






