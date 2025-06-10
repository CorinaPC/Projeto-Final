function mostrarCarros() { //feito para mostrar os carros no pesquisar
    let carros = localStorage.getItem("carros");
    let modelos = localStorage.getItem("modelos");
    if(carros){
        carros = JSON.parse(carros);
        modelos = JSON.parse(modelos);
        let carro_form = document.getElementById("carroidLocacoes");
        for(let carro of carros){
            const option = document.createElement("option");
            option.value = carro.id; // Corrigido para usar value
            for(let modelo of modelos){
                if(modelo.id == carro.modelo){
                    option.innerText = `${carro.placa} - ${modelo.nome} (${carro.ano}) | R$ ${carro.diaria}`
                }
            }
            carro_form.appendChild(option)
        } 
    }
}

mostrarCarros()

function mostrarPessoas() { //feito para mostrar os pessoas no pesquisar
    let pessoas = localStorage.getItem("pessoas");
    if(pessoas){
        pessoas = JSON.parse(pessoas);
        
        let pessoa_form = document.getElementById("pessoaidLocacoes");
        for(let pessoa of pessoas){
            const option = document.createElement("option");
            option.value = pessoa.id; // Corrigido para usar value
            option.innerText = `[${pessoa.CPF}] ${pessoa.nome}`
            pessoa_form.appendChild(option)
        } 
    }
}

mostrarPessoas()

function quantidadeDiarias() { //feito para mostrar os pessoas no pesquisar
    let locacoes = getLocacoes()

    for(let locacao of locacoes){

        console.log(locacao.dataFim)
    }
}

quantidadeDiarias()

function locacao() { //Acho que é a função que inicia toda a locação
    console.log("Locação iniciado");


    //locacoes = [{idLocacoes, pessoaIdLocacoes, carroIdLocacoes, dataInicio, dataFim, valorTotal, finalizado}, {idLocacoes, pessoaIdLocacoes, carroIdLocacoes, dataInicio, dataFim, valorTotal, finalizado}, {idLocacoes, pessoaIdLocacoes, carroIdLocacoes, dataInicio, dataFim, valorTotal, finalizado}]

    let locacoes = getLocacoes();

    if(renderizarTabelaLocacao(locacoes)){
        carregarDadosTabelaLocacao(locacoes);
    }
    

    document.getElementById("btnEnviar").addEventListener("click", enviarDados);
}


function enviarDados(){
    console.log("Função enviar dados acionada");

    let form = document.getElementById("cadastro");

    let pessoa_form = document.getElementById("pessoaidLocacoes").value; // Corrigido para usar value
    let carro_form = document.getElementById("carroidLocacoes").value;   // Corrigido para usar value
    let data_inicio_form = document.getElementById("dataInicial").value;
    let data_fim_form = document.getElementById("dataFinal").value;

    if(pessoa_form == "" || carro_form == "" || data_inicio_form == "" || data_fim_form == ""){
        window.alert("Preencha todos os campos!");
        return;
    }

    let locacoes = getLocacoes(); //
    
    // let dataFimExiste = false;

    // for(let locacao of locacoes){
    //     if(locacao.dataFim == data_fim_form){
    //         dataFimExiste = true;
    //         break; // interromper o loop
    //     }
    // }

    // if(dataFimExiste){
    //     window.alert("E-mail já existe no sistema!");
    //     return;
    // }



    // locacoes vazio --> idLocacoes = 1

    // locacoes não está vazio 

    let novoIDLocacoes;

    // novoIDLocacoes = locacoes.length == 0 ? 1 : locacoes[locacoes.length - 1].idLocacoes + 1;

    if(locacoes.length == 0){
        novoIDLocacoes = 1;
    }else{
        novoIDLocacoes = locacoes[locacoes.length - 1].id + 1; // locacoes[]
    }

    let locacao = {
        id: novoIDLocacoes, 
        pessoaId: parseInt(pessoa_form),
        carroId: parseInt(carro_form),
        dataInicio: data_inicio_form, 
        dataFim: data_fim_form,
        diarias: calcularDiarias(data_inicio_form, data_fim_form),
        valorTotal: calcularValorTotal(data_inicio_form, data_fim_form, parseInt(carro_form))
    };


    locacoes.push(locacao);
    localStorage.setItem("locacoes", JSON.stringify(locacoes));

    renderizarTabelaLocacao(locacoes);
    carregarDadosTabelaLocacao(locacoes);

    form.reset();
}
document.getElementById("cadastro").addEventListener("submit", function(event) {
event.preventDefault(); 
enviarDados(); 
});

function calcularDiarias(dataInicio, dataFim) {
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    const diffTime = Math.abs(fim - inicio);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // converte milissegundos para dias
    return diffDays;
}

calcularValorTotal = (dataInicio, dataFim, carroId) => {
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    const diffTime = Math.abs(fim - inicio);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // converte milissegundos para dias

    let carros = localStorage.getItem("carros");
    carros = JSON.parse(carros);

    let diariaCarro = 0;

    for(let carro of carros){
        if(carro.id == carroId){
            diariaCarro = carro.diaria;
            break;
        }
    }

    return diffDays * diariaCarro;
}

function renderizarTabelaLocacao(locacoes){
    if(locacoes.length == 0) {
        document.getElementById("locacoes").innerHTML = `
            <div class="m-3 alert alert-primary" role="alert">
                Não há locacoes cadastradas!
            </div>
        `;
    }else{
        document.getElementById("locacoes").innerHTML = `
            <table class="table table-striped">
                <thead>
                    <th>Pessoa</th>
                    <th>Carro</th>
                    <th>Data Início</th>
                    <th>Data Fim</th>
                    <th>Diaria</th>
                    <th>Valor Total</th>
                    <th>Ações</th>
                </thead>
                <tbody id="tabela-corpo-locacao">
                </tbody>
            </table>
        `;
    }
    return true;
}

function removerLocacao(idLocacoes){ // terioa que ser finalizado ou locar e estaria em Ações
    let novalocacao = [];
    let locacoes = getLocacoes();

    for(let locacao of locacoes){
        if(locacao.idLocacoes !== idLocacoes){
            novalocacao.push(locacao)
        }
    }

    localStorage.setItem("locacoes", JSON.stringify(novalocacao));

    renderizarTabelaLocacao(novalocacao);
    carregarDadosTabelaLocacao(novalocacao);
}

function buscaPessoaId(pessoaId){
    let pessoas = localStorage.getItem("pessoas");
    pessoas = JSON.parse(pessoas);
    for(let pessoa of pessoas){
        if(pessoa.id == pessoaId){
            return pessoa
        }
    }
}

function buscaCarroId(carroId){
    let carros = localStorage.getItem("carros");
    carros = JSON.parse(carros); 
    for(let carro of carros){
        if(carro.id == carroId){
            return carro
        }
    }
}



function buscaModeloId(modeloId){
    let modelos = localStorage.getItem("modelos");
    modelos = JSON.parse(modelos); 
    for(let modelo of modelos){
        if(modelo.id == modeloId){
            return modelo
        }
    }
}


function carregarDadosTabelaLocacao(locacoes){
    if(locacoes.length > 0){
        let tbody = document.getElementById("tabela-corpo-locacao");
        tbody.innerHTML = ``;
        for(let locacao of locacoes){
            let carro = buscaCarroId(locacao.carroId);
            let modelo = carro ? buscaModeloId(carro.modelo) : null;
            let pessoa = buscaPessoaId(locacao.pessoaId);

            if (!carro || !modelo || !pessoa) {
                continue;
            }
            if(!locacao.diaria){
                locacao.diarias = calcularDiarias(locacao.dataInicio, locacao.dataFim);
            }
            tbody.innerHTML +=  `
                <tr>
                    <td>${pessoa.nome}</td>
                    <td>${carro.placa} - ${modelo.nome}</td>
                    <td>${locacao.dataInicio}</td>
                    <td>${locacao.dataFim}</td>
                    <td>${locacao.diarias || ""}</td>
                    <td>${locacao.valorTotal || ""}</td>
                    <td><button class="btn btn-danger" onClick="removerLocacao(${locacao.id})">Finalizar</button></td>
                </tr>
            `;
        }
    }
}

function getLocacoes(){ //confere se ja existe locaçoes
    let locacoes = localStorage.getItem("locacoes");

    if(locacoes){
        locacoes = JSON.parse(locacoes); //pegando de texto e passando pra json
    }else{
        locacoes = [];
    }
    return locacoes;
}

function buscarPessoaPorCPF() {
    console.log("Buscar pessoa pelo CPF iniciado");
    const cpfBusca = document.getElementById('inputCPF').value.trim();
    if (!cpfBusca) {
        alert("Digite um CPF para buscar.");
        return;
    }
    const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
    // Busca a pessoa com o CPF exato informado
    const pessoa = pessoas.find(p => (p.CPF || p.cpf) === cpfBusca);
    if (pessoa) {
        // Aqui você pode retornar a pessoa encontrada, exibir na tela ou preencher campos do formulário
        // Exemplo: preencher o campo de nome automaticamente
        document.getElementById('nomePessoa').value = pessoa.nome;
        // Ou apenas retornar o objeto pessoa
        return pessoa;
    } else {
        alert("Pessoa não cadastrada.");
        return null;
    }
}

// Exemplo de uso: ao clicar no botão, busca e retorna a pessoa pelo CPF
document.getElementById("inputCPF").addEventListener("click", buscarPessoaPorCPF);
