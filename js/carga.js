function carregarPessoasNoLocalStorage(){
    let pessoas = localStorage.getItem('pessoas');
    if (pessoas) {
        return;
    } else {
        pessoas = [
            {
                id: 1,
                nome: 'João da Silva',
                CPF: '12345678900',
                email: 'joaosilva@gmail.com',
                ativo: true,
                dataNascimento: '1990-01-01',
                endereco: {
                    logradouro: 'Rua A',
                    numero: '123',
                    bairro: 'Centro',
                    cidade: 'São Paulo',
                    estado: 'SP',
                    cep: '01000-000'
                }
            },
            {
                id: 2,
                nome: 'Maria Oliveira',
                CPF: '98765432100',
                email: 'moliveira@gmail.com',
                ativo: true,
                dataNascimento: '1985-05-15',
                endereco: {
                    logradouro: 'Avenida B',
                    numero: '456',
                    bairro: 'Jardim',
                    cidade: 'Rio de Janeiro',
                    estado: 'RJ',
                    cep: '02000-000'
                }
            },
            {
                id: 3,
                nome: 'Carlos Souza',
                CPF: '45678912300',
                email: 'carlos@gmail.com',
                ativo: false,
                dataNascimento: '1992-03-20',
                endereco: {
                    logradouro: 'Travessa C',
                    numero: '789',
                    bairro: 'Vila',
                    cidade: 'Belo Horizonte',
                    estado: 'MG',
                    cep: '03000-000'
                }
            },
            {
                id: 4,
                nome: 'Ana Costa',
                CPF: '32165498700',
                email: 'acosta@gmail.com',
                ativo: true,
                dataNascimento: '1988-07-30',
                endereco: {
                    logradouro: 'Rua D',
                    numero: '101',
                    bairro: 'Lagoa',
                    cidade: 'Curitiba',
                    estado: 'PR',
                    cep: '04000-000'
                }
            },
            {
                id: 5,
                nome: 'Pedro Santos',
                CPF: '78912345600',
                email: 'psantos@gmail.com',
                ativo: true,
                dataNascimento: '1995-11-10',
                endereco: {
                    logradouro: 'Avenida E',
                    numero: '202',
                    bairro: 'Praia',
                    cidade: 'Salvador',
                    estado: 'BA',
                    cep: '05000-000'
                }
            },
        ];
    }
    // Salva as pessoas no localStorage
    localStorage.setItem('pessoas', JSON.stringify(pessoas));
}

function carregarCarrosNoLocalStorage(){
    let carros = localStorage.getItem('carros');
    if (carros) {
        return;
    } else {
        carros = [
            {
                id: 1,
                modelo: 1,
                ano: 1976,
                placa: 'QWD0D12',
                diaria: 100.00,
                excluido: false
            },
            {
                id: 2,
                modelo: 2,
                ano: 2020,
                placa: 'XYZ8D23',
                diaria: 150.00,
                excluido: false
            },
            {
                id: 3,
                modelo: 3,
                ano: 2019,
                placa: 'ABC5U67',
                diaria: 200.00,
                excluido: false
            },
            {
                id: 4,
                modelo: 4,
                ano: 2021,
                placa: 'UTR0T45',
                diaria: 120.00,
                excluido: false
            },
            {
                id: 5,
                modelo: 5,
                ano: 2018,
                placa: 'PLT3R89',
                diaria: 110.00,
                excluido: false
            },
            {
                id: 6,
                modelo: 6,
                ano: 2022,
                placa: 'QWE1R23',
                diaria: 90.00,
                excluido: false
            },
            {
                id: 7,
                modelo: 7,
                ano: 2023,
                placa: 'ZXC4V56',
                diaria: 180.00,
                excluido: false
            },
            {
                id: 8,
                modelo: 8,
                ano: 2020,
                placa: 'YUI9O87',
                diaria: 160.00,
                excluido: false
            },
            {
                id: 9,
                modelo: 9,
                ano: 2021,
                placa: 'HJK2L34',
                diaria: 170.00,
                excluido: false
            },
            {
                id: 10,
                modelo: 10,
                ano: 2019,
                placa: 'MNB5V67',
                diaria: 190.00,
                excluido: false
            }
        ];
    }
    // Salva os carros no localStorage
    localStorage.setItem('carros', JSON.stringify(carros));
}

function carregarLocacoesNoLocalStorage(){
    let locacoes = localStorage.getItem('locacoes');
    if (locacoes) {
        return;
    } else {
        locacoes = [
            {
                id: 1,
                pessoaId: 1,
                carroId: 2,
                dataInicio: '2025-06-05',
                dataFim: '2025-06-09',
                valorTotal: 750.00,  // 5 dias * 150.00 por dia
                finalizado: false
            },
            {
                id: 2,
                pessoaId: 2,
                carroId: 5,
                dataInicio: '2025-07-02',
                dataFim: '2023-07-06',
                valorTotal: 550.00, // 5 dias * 110.00 por dia
                finalizado: false
            },
            {
                id: 3,
                pessoaId: 3,
                carroId: 7,
                dataInicio: '2025-06-03',
                dataFim: '2025-06-07',
                valorTotal: 900.00, // 5 dias * 180.00 por dia
                finalizado: false
            }
        ];
    }
    // Salva as locações no localStorage
    localStorage.setItem('locacoes', JSON.stringify(locacoes));
}

function carregarMarcasNoLocalStorage() {
    let marcas = localStorage.getItem('marcas');
    if (marcas) {
        return;
    } else {
        marcas = [
            { id: 1, nome: 'Volkswagen' },
            { id: 2, nome: 'Honda' },
            { id: 3, nome: 'Toyota' },
            { id: 4, nome: 'Chevrolet' },
            { id: 5, nome: 'Hyundai' },
            { id: 6, nome: 'Renault' }
        ];
    }
    // Salva as marcas no localStorage
    localStorage.setItem('marcas', JSON.stringify(marcas));
}

function carregarModelosNoLocalStorage() {
    let modelos = localStorage.getItem('modelos');
    if (modelos) {
        return;
    } else {
        modelos = [
            { id: 1, nome: 'Fusca', marcaId: 1 },
            { id: 2, nome: 'Civic', marcaId: 2 },
            { id: 3, nome: 'Corolla', marcaId: 3 },
            { id: 4, nome: 'Onix', marcaId: 4 },
            { id: 5, nome: 'HB20', marcaId: 5 },
            { id: 6, nome: 'Kwid', marcaId: 6 },
            { id: 7, nome: 'T-Cross', marcaId: 1 },
            { id: 8, nome: 'Tracker', marcaId: 4 },
            { id: 9, nome: 'Creta', marcaId: 5 },
            { id: 10, nome: 'HR-V', marcaId: 2 }
        ];
    }
    // Salva os modelos no localStorage
    localStorage.setItem('modelos', JSON.stringify(modelos));
}

function carregarDadosIniciais() {
    carregarPessoasNoLocalStorage();
    carregarCarrosNoLocalStorage();
    carregarMarcasNoLocalStorage();
    carregarModelosNoLocalStorage();
    carregarLocacoesNoLocalStorage();
}

