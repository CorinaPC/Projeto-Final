  // Função para formatar CPF
  function formatarCPF(cpf) {
    // Remove tudo que não é dígito
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
      return cpf; // Retorna o original se não tiver 11 dígitos
    }

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }


function loadScripts(container, functionName) {
    const scripts = container.querySelectorAll('script'); // Seleciona todos os scripts dentro do container

    for (let script of scripts) {
        const newScript = document.createElement('script');
        if (script.src) {
            // External script
            let newScriptName = script.src.split('/').pop().split('.').shift(); // pega o nome do script sem extensão
            console.log(`Carregando script: ${newScriptName}`);
            newScript.src = script.src; // define o src do novo script
            newScript.async = false; // Preserva a ordem de execução
            newScript.onload = () => { // Callback para quando o script for carregado
                if(newScriptName === functionName) { // Verifica se o nome do script corresponde ao nome da função
                    console.log(`executando a função: ${functionName}()`);
                    if (typeof window[functionName] === 'function') {
                        window[functionName](); // Chama a função correspondente
                    } else {
                        console.error(`Function ${functionName} not found.`);
                    }
                }
            }

            // Remove the old script element
            script.parentNode.removeChild(script);
            //add script to body
            document.body.appendChild(newScript);
        }
    }

}



 function carregarPaginas(){
    // seleciona todos os elementos com a classe 'nav-link' 
    const navLinks = document.querySelectorAll('.nav-link');
    // seleciona o elemento onde o conteúdo da aba será carregado
    const tabContent = document.getElementById('tab-content');

    //Para cada link de navegação rode o laço de repetição
    for(let link of navLinks) {
        // Verifica se o link tem o atributo 'data-page'
        if (!link.hasAttribute('data-page')) {
            console.log('Link does not have data-page attribute:', link);
            return;
        }

        // Adiciona um evento de clique ao link com a função
        link.addEventListener('click', function(){
            for(let l of navLinks) {
                l.classList.remove('active'); // Remove a classe 'active' de todos os links
            }
            link.classList.add('active'); // Adiciona a classe 'active' ao link clicado

            const page = link.getAttribute('data-page'); // Obtém o valor do atributo 'data-page'
            fetch(page) // Faz uma requisição para o arquivo especificado no atributo 'data-page'
                .then(response => {
                    if (!response.ok) throw new Error('Página não encontrada'); // Verifica se a resposta é OK
                    return response.text(); // Retorna o conteúdo da resposta como texto
                })
                .then(html => {
                    tabContent.innerHTML = html; // Insere o conteúdo HTML na div 'tab-content'
                    let functionName = page.replace('.html', ''); // remove a extensão '.html' do nome da função
                    functionName = functionName.replace("pages/", ''); // remove o prefixo 'pages/' se existir
                    loadScripts(tabContent, functionName);
                })
                .catch(err => {
                    // se ocorrer um erro, exibe uma mensagem de erro
                    tabContent.innerHTML = `<p class="text-danger">Error loading page: ${err.message}</p>`;
                });
        });
    }
 }
    
// Evento para carregar as páginas quando o DOM estiver completamente carregado | o mesmo que onload no body
window.addEventListener('DOMContentLoaded', () => {
    carregarPaginas();
    carregarDadosIniciais(); 
    document.querySelector('.nav-link.active').click(); // Simula o clique no primeiro link ativo para carregar a primeira página
});