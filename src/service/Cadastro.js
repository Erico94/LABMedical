export const formatarCPF = (valor) => {
  const numero = valor.replace(/\D/g, "");
  const padrao = /(\d{3})(\d{3})(\d{3})(\d{2})/;

  if (padrao.test(numero)) {
    return numero.replace(padrao, "$1.$2.$3-$4");
  }

  return numero;
};

export const formatarTelefone = (valor) => {
  const numero = valor.replace(/\D/g, "");
  const padrao = /(\d{2})(\d{4,5})(\d{4,5})/;

  if (padrao.test(numero)) {
    return numero.replace(padrao, "($1) $2-$3");
  }

  return numero;
};

export const formatarData = (data) => {
  var dataFormatada = data.split('-').reverse().join('/');
  return dataFormatada;
}

export const calcularIdade = (dataNascimento) => {
  const dataAtual = new Date();
  const data = new Date(dataNascimento);
  let atual = dataAtual.getFullYear();
  let anoNascimento = data.getFullYear();
  let idade = atual - anoNascimento;
  const mesAtual = dataAtual.getMonth() + 1;
  const diaAtual = dataAtual.getDate();
  const mesNascimento = data.getMonth();
  const diaNascimento = data.getDate();
  if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
    idade--;
  }
  return idade;
}

