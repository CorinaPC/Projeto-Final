function mostrarCarros() { //feito para mostrar os carros no pesquisar
    let locacoes = JSON.parse(localStorage.getItem("locacoes")) || [];
    let carros = JSON.parse(localStorage.getItem("carros")) || [];
    let modelos = JSON.parse(localStorage.getItem("modelos")) || [];
    if(carros){
        let carro_form = document.getElementById("carroidLocacoes");
        for(let carro of carros){
            // Verifica se o carro está excluído
            if (carro.excluido === true) continue;
            // Verifica se o carro está locado (locação ativa)
            let estaLocado = locacoes.some(locacao => locacao.carroId == carro.id && locacao.finalizado === false);
            if (estaLocado) continue;
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
    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
    if(pessoas){   
        let pessoa_form = document.getElementById("pessoaidLocacoes");
        for(let pessoa of pessoas){
            if(pessoa.ativo == true){ // Verifica se a pessoa está ativa
                const option = document.createElement("option");
                option.value = pessoa.id; // Corrigido para usar value
                option.innerText = `[${pessoa.CPF}] ${pessoa.nome}`
                pessoa_form.appendChild(option)
            }
        } 
    }
}

mostrarPessoas()

function locacao() { //Acho que é a função que inicia toda a locação
    console.log("Locação iniciado");

    //locacoes = [{idLocacoes, pessoaIdLocacoes, carroIdLocacoes, dataInicio, dataFim, valorTotal, finalizado}, {idLocacoes, pessoaIdLocacoes, carroIdLocacoes, dataInicio, dataFim, valorTotal, finalizado}, {idLocacoes, pessoaIdLocacoes, carroIdLocacoes, dataInicio, dataFim, valorTotal, finalizado}]
    let locacoes = getLocacoes();

    if(renderizarTabelaLocacao(locacoes, "novaLocacao")){
        carregarDadosTabelaLocacao(locacoes, "novaLocacao");
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

    let locacoes = getLocacoes(); 

    let novoIDLocacoes;

    novoIDLocacoes = locacoes.length == 0 ? 1 : locacoes[locacoes.length - 1].idLocacoes + 1;

    let locacao = {
        id: novoIDLocacoes, 
        pessoaId: parseInt(pessoa_form),
        carroId: parseInt(carro_form),
        dataInicio: data_inicio_form, 
        dataFim: data_fim_form,
        finalizado: false, // Inicialmente não finalizado
        valorTotal: calcularValorTotal(data_inicio_form, data_fim_form, parseInt(carro_form))
    };


    locacoes.push(locacao);
    localStorage.setItem("locacoes", JSON.stringify(locacoes));

    renderizarTabelaLocacao(locacoes, "novaLocacao");
    carregarDadosTabelaLocacao(locacoes, "novaLocacao");

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

function calcularValorTotal(dataInicio, dataFim, carroId) {
    const carros = JSON.parse(localStorage.getItem("carros")) || []; // Recupera a lista de carros do localStorage e converte de texto para array de objetos
    const carro = carros.find(c => c.id === carroId); // Procura o carro com o id correspondente ao carroId informado
    if (!carro) return 0; // Se não encontrar o carro, retorna 0 (evita erro)
    const diarias = calcularDiarias(dataInicio, dataFim); // Calcula o número de diárias usando a função calcularDiarias
    return diarias * carro.diaria; // Retorna o valor total multiplicando o número de diárias pelo valor da diária do carro
}

function renderizarTabelaLocacao(locacoes, idHTML){
    if(locacoes.length == 0) {
        document.getElementById(idHTML).innerHTML = `
            <div class="m-3 alert alert-primary" role="alert">
                Não há locacoes cadastradas!
            </div>
        `;
    }else{
        document.getElementById(idHTML).innerHTML = `
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
                <tbody id="tabela-corpo-${idHTML}">
                </tbody>
            </table>
        `;
    }
    return true;
}

function removerLocacao(idLocacao) {
    let locacoes = getLocacoes();
    for (let locacao of locacoes) {
        if (locacao.id === idLocacao) {
            locacao.finalizado = true; // Atualiza o status de finalizado
            break;
        }
    }
    localStorage.setItem("locacoes", JSON.stringify(locacoes));
    renderizarTabelaLocacao(locacoes, "novaLocacao");
    carregarDadosTabelaLocacao(locacoes, "novaLocacao");
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


function carregarDadosTabelaLocacao(locacoes, idHTML){
    if(idHTML == "novaLocacao"){
        idHTML = "tabela-corpo-novaLocacao";
    } else if(idHTML == "pesquisarLocaçãoAtiva"){
        idHTML = "tabela-corpo-pesquisarLocaçãoAtiva";
    }
    console.log("Carregando dados na tabela de locação");
    console.log(locacoes);
    if(locacoes.length >= 0){
        let tbody = document.getElementById(idHTML);
        tbody.innerHTML = ``;
        for(let locacao of locacoes){
            let carro = buscaCarroId(locacao.carroId);
            let modelo = carro ? buscaModeloId(carro.modelo) : null;
            let pessoa = buscaPessoaId(locacao.pessoaId);
            let finalizado = locacao.finalizado;
            if (finalizado == false) { // Verifica se a locação não está finalizada
                finalizado = "Finalizar";
            } else {
                finalizado = "Finalizado";
            }

            if (!carro || !modelo || !pessoa) {
                continue;
            }
            locacao.diarias = calcularDiarias(locacao.dataInicio, locacao.dataFim);
            tbody.innerHTML +=  `
                <tr>
                    <td>${pessoa.nome}</td>
                    <td>${carro.placa} - ${modelo.nome}</td>
                    <td>${locacao.dataInicio}</td>
                    <td>${locacao.dataFim}</td>
                    <td>${locacao.diarias || ""}</td>
                    <td>${locacao.valorTotal || ""}</td>
                    <td><button class="btn btn-danger" onClick="removerLocacao(${locacao.id})">${finalizado}</button></td>
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
    let locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];
    let pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
    // Busca a pessoa com o CPF exato informado
    let pessoa = pessoas.find(p => (p.CPF || p.cpf) === cpfBusca);

    if (pessoa) { // Verifica se a pessoa existe e está ativa
        let locacaosPorPessoa = locacoes.filter(locacao => locacao.pessoaId === pessoa.id);
        if (locacaosPorPessoa.filter(locacao => locacao.finalizado === false) == true){
            renderizarTabelaLocacao(locacaosPorPessoa, "pesquisarLocaçãoAtiva");
            carregarDadosTabelaLocacao(locacaosPorPessoa, "pesquisarLocaçãoAtiva");
        }else{
            alert("Nenhuma locação ativa encontrada para este CPF.");
            return;
        }
    } else {
        alert("Pessoa não cadastrada.");
        return null;
    }
}

document.getElementById("inputCPF").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita o envio do formulário, se houver
        buscarPessoaPorCPF();
    }
});