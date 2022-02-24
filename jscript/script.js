let blusa={};
// validarNome();

// function validarNome(){
//     let nome= prompt("Qual o seu nome?");

//     let valida_nome = nome.match(/[^a-zà-ú]/gi);
   
//     if( valida_nome || !nome ){
//        alerte("Você digitou um nome inválido ou deixou o campo vazio!");
//     }else{
//        alert("Nome Ok!")
//     }
// }


function get(){
    axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts")
        .then(res =>showResponse(res)).catch(function (error) {
			console.log(error);
		  });
    
    
}
setTimeout(function(){
    window.location.reload(1);
 }, 5000);
get();

function post(){
    
    blusa.model= "t-shirt";
    blusa.neck="v-neck";
    blusa.material="silk";
    blusa.owner="Bartolomeu";
    blusa.author="tiago";    
    blusa.image= document.querySelector('#post-encomenda').value;

    axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts",blusa).then(res => showResponse(res)).catch(function (error) {
        alert(error);
      });
      
}


let teste=[];
function showResponse(res){
    
    let montarBlusas = `
        
        <div class="pedidos">`;
        
        for (let i = 0; i < res.data.length; i++) {
            montarBlusas +=`
            <div class="criacao">
            <div class="blusas">
            <img src="${res.data[i].image}"/>   
             </div>
            <span class="autor"><h3>
                            <stong>Criador:</strong>
            
            ${res.data[i].owner}</h3></span> </div>`;
            montarBlusas += ``;
            
    
        }
        montarBlusas += `</div>`;
    // montarBlusas+=`${JSON.stringify(res.data,null,'\t')}`;
         document.querySelector('.text').innerHTML +=
        montarBlusas;
            
            // style="background:url('${res.data[i].image}');background-size: contain;"
            // 
        
}

function selecionarBlusa(){
    alert("Essa blusa");
}