let blusa = {};
validarNome();

function validarNome() {

    let nome;
    do {
        nome = prompt("Qual o seu nome?");
    } while ((nome == "") || ((/^[a-z][a-z\s]*$/i).test(nome) == false));
    blusa.owner =nome;
    blusa.author=nome;


}

function escolherBlusa(id, categoria, item) {

   

    const itemSelecionado = document.querySelector(`#${id}`);

    const categoriaDoItemSelecionado = document.querySelector(`.${categoria}`);

    const listaDeItensDaCategoria = categoriaDoItemSelecionado.querySelectorAll('figure');


    for (let i = 0; i < listaDeItensDaCategoria.length; i++) {
        listaDeItensDaCategoria[i].children[0].classList.remove('selecionado');
    }


    itemSelecionado.children[0].classList.add('selecionado');

    

    if (categoria === 'modelo') {
         blusa.model = item;

    }

    if (categoria === 'gola') {
         blusa.neck = item;

    }

    if (categoria === 'material') {
         blusa.material = item;

    }

    if(document.querySelectorAll(".selecionado").length == 3){
        document.getElementById("post-encomenda").focus();
    }
    
}

function verificarImagem(){

    let imagem = document.getElementById("post-encomenda");
    let botao = document.getElementById("botao");
        if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imagem.value) == false) {
        alert("Endereço de imagem invalido ou vazio");
        document.querySelector('#post-encomenda').focus();
        return;
    } else {
       botao.disabled = false; 
       botao.classList.add("ativar");
       blusa.image = imagem.value;
    }
   
}


function get() {
    axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts")
        .then(res => showResponse(res)).catch(function (error) {
            console.log(error);
        });


}
get();


// confirmarPedido();

function confirmarPedido() {

    console.log(blusa); 

    axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", blusa)
    .then(
         alert("Encomenda Confirmada")
    ).catch(function (error) {
        alert("Ops, não conseguimos processar sua encomenda");
    }).then(res => showResponse(res));

    setTimeout(function () {
        window.location.reload(1);
    }, 1000);
}


function showResponse(res) {


    let montarBlusas = `
        
        <div class="pedidos">`;

    for (let i = 0; i < res.data.length; i++) {
        montarBlusas += `
            <div class="criacao">
            <div class="blusas" onclick="encomendarBlusa(this)">
            <img src="${res.data[i].image}"/>   
             </div>
            <span class="autor"><h3>
                            <strong>Criador:</strong>
            
            ${res.data[i].owner}</h3></span> </div>`;
        montarBlusas += ``;


    }
    montarBlusas += `</div>`;
    // montarBlusas+=`${JSON.stringify(res.data,null,'\t')}`;

    document.querySelector('.text').innerHTML +=
        montarBlusas;


}

function encomendarBlusa(objeto) {
   
    if (window.confirm("Você deseja encomendar esta blusa?")) {
        /*
        Deve fazer uma encomenda com os dados da blusa clicada;
        */
      }
}






//     if (modelo != "" && gola != "" && material != "") {
//         document.getElementById('post-encomenda').focus();
//         document.getElementById("post-encomenda").placeholder ="Insira o link da imagem";

//     } else {
//         alert("Faltou selecionar um categoria");
//     }
// }