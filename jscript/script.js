let blusa={};
validarNome();
function validarNome(){

    let nome;
        do{
            nome=prompt("Qual o seu nome?");
        }while((nome=="") ||( (/^[a-z][a-z\s]*$/i).test(nome) ==false) );   
        blusa.owner= nome;
        blusa.author= nome;
       
}
        


function get(){
    axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts")
        .then(res =>showResponse(res)).catch(function (error) {
			console.log(error);
		  });
          
          
}
get();



function validarOjeto(){

    if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(document.querySelector('#post-encomenda').value) == false) {
        alert("Endereço de imagem invalido");
        document.querySelector('#post-encomenda').focus();
        return;
    }else{
       return blusa.image = document.querySelector('#post-encomenda').value;
    }

}
function confirmarPedido(){
    
    blusa.model= "t-shirt";
    blusa.neck="v-neck";
    blusa.material="silk";
      
    validarOjeto();

    axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts",blusa).then(
        function (res){ alert("Encomenda Confirmada");}
    ).catch(function (error) {
        alert("Ops, não conseguimos processar sua encomenda");
      }).then(res => showResponse(res));

      setTimeout(function(){
        window.location.reload(1);
     }, 1000);
}

function showResponse(res){
    

    let montarBlusas = `
        
        <div class="pedidos">`;
        
        for (let i = 0; i < res.data.length; i++) {
            montarBlusas +=`
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



let teste={};
function encomendarBlusa(objeto){
    teste=objeto;
    console.log(objeto);
}