function relatorio() { 
    console.log("Relatorio iniciado")
    let locacoes = localStorage.getItem("locacoes");
    locacoes = JSON.parse(locacoes);
    //let data_inicio_form = document.getElementById("dataInicio").value;
    //let data_fim_form = document.getElementById("dataFim").value;
    
    carregarDadosTabelaLocacao(locacoes)
}

function carregarDadosTabelaLocacao(locacoes){
    if(locacoes.length > 0){
        let tbody = document.getElementById("tabela-corpo-locacao");
        console.log(tbody);
        tbody.innerHTML = ``;
        for(let locacao of locacoes){
            let carro = buscaCarroId(locacao.carroId)
            let modelo = buscaModeloId(carro.modelo)
            let pessoa = buscaPessoaId(locacao.pessoaId)
            
            tbody.innerHTML +=  `
                <tr>
                    <td>${pessoa.nome}</td>
                    <td>${carro.placa} - ${modelo.nome}</td>
                    <td>${locacao.dataInicio}</td>
                    <td>${locacao.dataFim}</td>
                    <td>${locacao.diarias}</td>
                    <td>${locacao.valorTotal}</td>
                    <td><button class="btn btn-danger" onClick="removerLocacao(${locacao.idLocacoes})">Finalizarr</button></td>
                </tr>
            `;
        }
    }
}






























    /*
function relatorio() {
    console.log("Relatório iniciado");

    function relatorio() {
        console.log("Relatório iniciado");

        let data = JSON.parse(localStorage.getItem('pessos')) || [];
        let cliente = JSON.parse(localStorage.getItem('carros')) || [];
        let carro = JSON.parse(localStorage.getItem('modelo')) || [];
        let placa = JSON.parse(localStorage.getItem('locacoes')) || [];
       let dias = JSON.parse(localStorage.getItem('dias')) || [];
        let valor = JSON.parse(localStorage.getItem('valor')) || []; 
    
        carregaRelatorio();
    }
 function listaRelatorio() {
    for (const relatorio of listaRelatorio){
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${pessoas.id}</td>
            <td>${pessoas.nome}</td>
            <td>${pessoas.email}</td>
            <td>${pessoas.ativo}</td>
            <td>${pessoas.dataNascimento}</td>
            <td>${pessoas.endereco}</td>
            <td>R$ ${pessoas.preco.toFixed(2)}</td>
        `; // R$ 200.00
     for (const relatorio of listaRelatorio){
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${carros.id}</td>
            <td>${carros.nome}</td>
            <td>${carros.email}</td>
            <td>${carros.ativo}</td>
            <td>${carros.dataNascimento}</td>
            <td>${carros.endereco}</td>
            <td>R$ ${pessoas.preco.toFixed(2)}</td>
            `
     }
     for (const relatorio of listaRelatorio){
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${locacoes.id}</td>
            <td>${locacoes.nome}</td>
            <td>${locacoes.email}</td>
            <td>${locacoes.ativo}</td>
            <td>${locacoes.dataNascimento}</td>
            <td>${loacoes.endereco}</td>
            <td>R$ ${pessoas.preco.toFixed(2)}</td>
            `
     }
     /* for (const relatorio of listaRelatorio){
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${carros.id} ${carros.nome}</td>
            <td>${carros.id} ${carros.nome}</td>
            <td>${carros.id} ${carros.nome} </td>
            <td>${carros.id} ${carros.nome}</td>
            <td>${carros.id} ${carros.nome} </td>
            <td>${carros.id} ${carros.nome}</td>
            <td>${carros.id} ${carros.nome}</td>
            <td>R$ ${pessoas.preco.toFixed(2)}</td>
            `
     }
     for (const relatorio of listaRelatorio){
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${modelos.id} ${modelos.nome} ${modelos.marcaId} </td>
            <td>${modelos.id} ${modelos.nome} ${modelos.marcaId}</td>
            <td>${modelos.id} ${pessoas.nome} ${pessoas.marcaId}</td>
            <td>${pessoas.id} ${pessoas.nome} ${pessoas.marcaId}</td>
            <td>${pessoas.id} ${pessoas.nome} ${pessoas.marcaId}</td>
            <td>${pessoas.id} ${pessoas.nome} ${pessoas.marcaId}</td>
            <td>${pessoas.id} ${pessoas.nome} ${pessoas.marcaId}</td>
            <td>${pessoas.id} ${pessoas.nome} ${pessoas.marcaId}</td>
            <td>${pessoas.id} ${pessoas.nome} ${pessoas.marcaId}</td>
            <td>R$ ${pessoas.preco.toFixed(2)}</td>
            `
           
        tbody.appendChild(tr);
    }
}

    function carregaRelatorio(listaRelatorio){
        let locacoes = JSON.parse(localStorage.getItem("locacoes"));
        console.log(locacoes);
        if(listaRelatorio.length > 0){
            let tbody = document.getElementById("reportBody");
            tbody.innerHTML = ``;
            for(let relatorio of listaRelatorio){
                tbody.innerHTML +=  `
                    <tr>
                        <td>${relatorio.data}</td>
                        <td>${relatorio.cliente}</td>
                        <td>${relatorio.carro}</td>
                        <td>${relatorio.placa}</td>
                        <td>${relatorio.dias}</td>
                        <td>${relatorio.valor-total}</td>
                        <td><button class="btn btn-danger" onClick="removerPessoa(${relatorio.id})">Remover</button></td>
                    </tr>
                `;
            };
        };
    };

}


    /* function getPessoas(){
        let listaRelatorio = localStorage.getItem("geraRelatorio");

        if(pessoas){
            listaRelatorio = JSON.parse(listaRelatorio);
        }else{
            listaRelatorio = [];
        }

        return listaRelatorio;
    }
}
function inicializar() {
    let listaRelatorio = getPessoas();

    if(renderizarTabela(listaRelatorio)){
        carregarDadosTabela(listaRelatorio);
    }
    

    




    document.getElementById("btnEnviar").addEventListener("click", enviarDados);
}
 */

