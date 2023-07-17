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

  export const formatarData = (data) =>{
  var dataFormatada = data.split('-').reverse().join('/');
  console.log(dataFormatada);
  return dataFormatada;
}