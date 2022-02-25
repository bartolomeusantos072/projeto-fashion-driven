let blusa = {};
validarNome();

function validarNome() {

    let nome;
    do {
        nome = prompt("Qual o seu nome?");
    } while ((nome == "") || ((/^[a-z][a-z\s]*$/i).test(nome) == false));
    blusa.owner = nome;

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

    if (document.querySelectorAll(".selecionado").length == 3) {
        document.getElementById("post-encomenda").focus();
    }

}

function verificarImagem() {
    console.log("Eu estou aqui olhando");
    
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
        blusa.author = blusa.owner;
    }

}


function get() {
    axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts")
        .then(res => showResponse(res)).catch(function (error) {
            console.log(error);
        });


}

get();




function confirmarPedido() {

    axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", blusa)
        .then(function (res) {
            alert("Encomenda Confirmada");
            showResponse(res);
        }

        ).catch(function (error) {
            alert("Ops, não conseguimos processar sua encomenda");
        });

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
            <div class="blusas" onclick="encomendaBlusaGet(${res.data[i].id})">
            <img src="${res.data[i].image}"/>   
             </div>
            <span class="autor"><h3>
                            <strong>Criador:</strong>
            
            ${res.data[i].owner}</h3></span> </div>`;
        montarBlusas += ``;


    }
    montarBlusas += `</div>`;

    document.querySelector('.text').innerHTML +=
        montarBlusas;


}


function encomendaBlusaGet(id) {

    let blusaEscolhida = {};   

    axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts")
        .then(function (res) {
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].id == id) {
                    blusaEscolhida.model = res.data[i].model;
                    blusaEscolhida.neck = res.data[i].neck;
                    blusaEscolhida.material = res.data[i].material;
                    blusaEscolhida.image = res.data[i].image;
                    blusaEscolhida.owner = blusa.owner;
                    blusaEscolhida.author= blusa.owner;
                    
                   
                }
            }
            encomendaBlusaPost(blusaEscolhida);

        }).catch(function (error) {

            console.log(error);
        });
       
         
}



function encomendaBlusaPost(blusaEncomendada){

 console.log(blusaEncomendada);

    if (window.confirm("Você deseja encomendar esta blusa?")) {
    

            axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", blusaEncomendada)
            .then( function (res){
                alert("Encomenda Confirmada");
                showResponse(res);
                setTimeout(function () {
                    window.location.reload(1);
                }, 1000);
            }

            ).catch(function (error) {
                alert("Ops, não conseguimos processar sua encomenda");
                console.error(error);
            });

        
    }

}

