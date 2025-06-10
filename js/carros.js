function pegarNomeModelo(idModelo){
    let modelos = JSON.parse(localStorage.getItem("modelos")) || [];
    if(modelos){
        for(let modelo of modelos){
            if(modelo.id == idModelo){
                return modelo.nome;
                break;
            }
        }
    }
}

function pegarNomeMarca(idMarca){
    let marcas = JSON.parse(localStorage.getItem("marcas")) || [];
    if(marcas){
        for(let marca of marcas){
            if(marca.id == idMarca){
                return marca.nome;
                break;
            }
        }
    }
}

function modelos(){
    console.log("modelos Inicializado");
    let modelos = JSON.parse(localStorage.getItem("modelos"));
    let tbody = document.getElementById("modelos-info");

    for(let modelo of modelos){
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        tr.innerHTML=`
                <td>${pegarNomeModelo(modelo.id)}</td>
                <td>${pegarNomeMarca(modelo.marcaId)}</td>
                <td><button type="button" class="btn btn-primary"><i class="fa-solid fa-square-pen"></i></button>  <button type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
        `;
    }
}

function marcas(){
    console.log("Marcas Iniciado");
    let marcas = JSON.parse(localStorage.getItem("marcas"));
    console.log(marcas);
    let tbody = document.getElementById("marcas-info");

    for( let marca of marcas){
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        tr.innerHTML=`
            <td>${pegarNomeMarca(marca.id)}</td>
            <td><button type="button" class="btn btn-primary"><i class="fa-solid fa-square-pen"></i></button>  <button type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
                                
        `;
    }
}

function novoCarro(){
    let novoCarro = document.getElementById("novo-carro");
    novoCarro = document.createElement(section);
    div.id("carros-cont").appendChild (section);
    innerHTML=`
                <!-- Botão para abrir o modal -->
        <button class="btn btn-primary" onclick="abrirCadastroVeiculo()">Novo Veículo</button>

        <!-- Modal -->
        <div class="modal fade" id="modalCadastroVeiculo" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">Cadastro de Novo Veículo</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div class="modal-body">
                <form id="formVeiculo">
                <div class="mb-3">
                    <label for="placa" class="form-label">Placa</label>
                    <input type="text" class="form-control" id="placa" required>
                </div>

                <!-- Accordion para Marca -->
                <div class="accordion mb-3" id="accordionMarca">
                    <div class="accordion-item">
                    <h2 class="accordion-header" id="headingMarca">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMarca" aria-expanded="true" aria-controls="collapseMarca">
                        Escolher Marca
                        </button>
                    </h2>
                    <div id="collapseMarca" class="accordion-collapse collapse show" aria-labelledby="headingMarca" data-bs-parent="#accordionMarca">
                        <div class="accordion-body">
                        <select class="form-select" id="marca" required>
                            <option value="">Selecione</option>
                            <option value="Fiat">Fiat</option>
                            <option value="Chevrolet">Chevrolet</option>
                            <option value="Ford">Ford</option>
                        </select>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- Accordion para Modelo -->
                <div class="accordion mb-3" id="accordionModelo">
                    <div class="accordion-item">
                    <h2 class="accordion-header" id="headingModelo">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseModelo" aria-expanded="true" aria-controls="collapseModelo">
                        Escolher Modelo
                        </button>
                    </h2>
                    <div id="collapseModelo" class="accordion-collapse collapse show" aria-labelledby="headingModelo" data-bs-parent="#accordionModelo">
                        <div class="accordion-body">
                        <select class="form-select" id="modelo" required>
                            <option value="">Selecione</option>
                            <option value="Uno">Uno</option>
                            <option value="Onix">Onix</option>
                            <option value="Ka">Ka</option>
                        </select>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="ano" class="form-label">Ano</label>
                    <input type="number" class="form-control" id="ano" required>
                </div>

                <div class="mb-3">
                    <label for="valorDiaria" class="form-label">Valor da Diária (R$)</label>
                    <input type="number" step="0.01" class="form-control" id="valorDiaria" required>
                </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-success" onclick="salvarVeiculo()">Salvar</button>
            </div>
            </div>
        </div>
        </div>

    `;
}


function carros(){
    console.log("Carros iniciado");

    let carros = JSON.parse(localStorage.getItem("carros"));
    let tbody = document.getElementById("carros-info");


    
    for(let carro of carros){
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        tr.innerHTML = `
            <td>${carro.placa}</td>
            <td>${pegarNomeModelo(carro.modelo)}</td>
            <td>${carro.ano}</td>
            <td>R$ ${carro.diaria},00</td>
            <td><button type="button" class="btn btn-primary"><i class="fa-solid fa-square-pen"></i></button>  <button type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
        `;
    };

    modelos();
    marcas();
    document.querySelector("novo-carro");addEventListener("click", novoCarro);
}

