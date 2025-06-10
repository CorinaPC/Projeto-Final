// Função para inicializar o módulo de pessoas (pode ser usada para debug ou inicialização futura)
function pessoas() {
    console.log("Pessoas iniciado");
}

/**
 * Função para buscar uma pessoa cadastrada pelo CPF.
 * Lê o valor do campo de busca, procura no localStorage e exibe um alerta com os dados se encontrar.
 */
function buscarPessoaPorCPF() {
    const cpfBusca = document.getElementById('inputCPF').value.trim(); // Pega o CPF digitado no campo de busca
    if (!cpfBusca) {
        alert("Digite um CPF para buscar.");
        return;
    }
    // Recupera a lista de pessoas cadastradas do localStorage (ou array vazio se não houver)
    const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
    // Procura uma pessoa cujo CPF seja igual ao digitado (considera tanto 'CPF' quanto 'cpf')
    const pessoa = pessoas.find(p => p.CPF === cpfBusca || p.cpf === cpfBusca);
    if (pessoa) {
        // Exibe os dados da pessoa encontrada
        alert(
            `Pessoa já cadastrada!\n\nNome: ${pessoa.nome}\nCPF: ${pessoa.CPF || pessoa.cpf}\nEmail: ${pessoa.email}\nAtivo: ${pessoa.ativo ? "Sim" : "Não"}`
        );
    } else {
        alert("Pessoa não cadastrada.");
    }
}

/**
 * Função para calcular idade a partir da data de nascimento (no formato YYYY-MM-DD).
 * Retorna a idade em anos.
 */
function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
}

/**
 * Função para adicionar uma nova pessoa ao cadastro.
 * Lê os campos do formulário, valida, cria o objeto pessoa e salva no localStorage.
 */
function adicionarPessoa() {
    // Lê os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const email = document.getElementById('email').value;
    const cep = document.getElementById('cep').value;
    const logradouro = document.getElementById('logradouro').value;
    const numero = document.getElementById('numero').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    // Validação simples: todos os campos obrigatórios devem ser preenchidos
    if (!nome || !cpf || !dataNascimento || !email || !cep || !logradouro || !numero || !cidade || !estado) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Validação de idade mínima (18 anos)
    if (calcularIdade(dataNascimento) < 18) {
        alert("A pessoa deve ter 18 anos ou mais.");
        return;
    }

    // Recupera a lista de pessoas cadastradas do localStorage
    let pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
    // Gera um novo id incremental
    let novoId = pessoas.length > 0 ? pessoas[pessoas.length - 1].id + 1 : 1;

    // Cria o objeto pessoa conforme o padrão do projeto
    const pessoa = {
        id: novoId,
        nome,
        CPF: cpf,
        dataNascimento,
        email,
        ativo: true,
        endereco: {
            cep,
            logradouro,
            bairro,
            cidade,
            estado,
            numero
        }
    };

    // Adiciona a nova pessoa à lista e salva no localStorage
    pessoas.push(pessoa);
    localStorage.setItem('pessoas', JSON.stringify(pessoas));

    console.log("Pessoa adicionada:", pessoa);
    alert("Pessoa cadastrada com sucesso!");
}

/**
 * Função para preencher automaticamente o endereço ao digitar o CEP.
 * Consulta a API ViaCEP e preenche os campos de endereço se o CEP for válido.
 */
function preencherEndereco() {
    let cep = document.getElementById("cep").value;
    cep = cep.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length == 8) {
        fetch('https://viacep.com.br/ws/' + cep + '/json/')
            .then(resposta => resposta.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById("logradouro").value = data.logradouro;
                    document.getElementById("bairro").value = data.bairro;
                    document.getElementById("cidade").value = data.localidade;
                    document.getElementById("estado").value = data.uf;
                    document.getElementById("numero").focus(); // Foca no campo número
                } else {
                    window.alert("CEP Inválido");
                }
            })
            .catch(erro => {
                console.log("Erro ao consultar o CEP: " + erro)
            })
    }
}

/**
 * Função chamada ao carregar a página.
 * Adiciona o evento de blur (perda de foco) ao campo CEP para preencher o endereço automaticamente.
 */
function inicializar() {
    document.getElementById("cep").addEventListener("blur", preencherEndereco);
}