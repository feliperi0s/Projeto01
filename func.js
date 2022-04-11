

let itens = [];
let valorDoStorege =localStorage.getItem("intesDaLista")
          if(valorDoStorege == null){
              valorDoStorege = []
            valorDoStorege.push(itens)             
              }  
  

function adicionarNaLista() {         
let valorDoInput = document.getElementById("adicionar").value
itens.push(valorDoInput)
localStorage.setItem("intesDaLista",itens)
console.log(itens)}

for (const item of valorDoStorege) {
    let itemDaLista = document.createElement("li")
    itemDaLista.innerText = item
    document.getElementById("listagem").appendChild(itemDaLista)
}








// function adicionarNaLista() {
    
//     let valorDoInput = document.getElementById("adicionar").value
//     let itemDaLista = document.createElement("li")
//     itemDaLista.innerText = valorDoInput
//     itens.push(valorDoInput)
//     document.getElementById("listagem").appendChild(itemDaLista)
    
//      
// }

