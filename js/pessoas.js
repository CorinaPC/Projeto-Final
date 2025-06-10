function pessoas() {
    console.log("Pessoas iniciado");
    

}







/* function podeEditarPessoa(cpf) {
  const locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];
  const pessoa = (JSON.parse(localStorage.getItem('pessoas')) || []).find(p => p.CPF === cpf);
  if (!pessoa) return false;

  const locacaoAberta = locacoes.some(loc => loc.pessoaId === pessoa.id && loc.finalizado === false);
  return !locacaoAberta;
}

if (!podeEditarPessoa('12345678900')) {
  alert("Esta pessoa possui uma locação em aberto e não pode ser editada.");
  return;
}

document.getElementById('cep').addEventListener('blur', async function () {
  const cep = this.value;
  if (cep.length === 8) {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    if (!data.erro) {
      document.getElementById('logradouro').value = data.logradouro;
      document.getElementById('bairro').value = data.bairro;
      document.getElementById('cidade').value = data.localidade;
      document.getElementById('estado').value = data.uf;
      document.getElementById('numero').focus(); // Foco no número
    }
  }
});

function calcularIdade(dataNascimento) {
  const nasc = new Date(dataNascimento);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();

  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
    idade--;
  }

  return idade;
}

// Exemplo de uso:
const idade = calcularIdade('2007-01-01');
if (idade < 18) {
  alert("É necessário ter 18 anos ou mais para se cadastrar.");
}
 */