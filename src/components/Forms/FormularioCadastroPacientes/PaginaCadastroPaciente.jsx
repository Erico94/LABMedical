// const formatarData = (data) =>{
//   var formatado = data.split('-').reverse().join('/');
//   console.log(formatado);
// }
// Endereço: Cep, Cidade, Estado, Logradouro, Número, Complemento, Bairro e Ponto de Referência.
// Deverá utilizar a API do ViaCEP para buscar os dados de endereço.
// Deverá apresentar animação ao salvar.

import { useState } from "react";
import { buscaCep } from "../../../service/Cep";

export default function PaginaCadastroPaciente() {
  // const [cepValido, setCepValido] = useState();
  const [novoPaciente, setNovoPaciente] = useState({
    nome: "",
    genero: "",
    dataDeNascimento: "",
    cpf: "",
    rg: "",
    estadoCivil: "",
    telefone: "",
    email: "",
    naturalidade: "",
    contatoDeEmergencia: "",
    alergias: "",
    cuidadosEspecificos: "",
    convenio: "",
    numeroDoConvenio: "",
    validadeDoConvenio: "",
    cep: "",
    numero: "",
    complemento: "",
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
  });

  const formatarTelefone = (valor) => {
    const numero = valor.replace(/\D/g, "");
    const padrao = /(\d{2})(\d{4,5})(\d{4,5})/;

    if (padrao.test(numero)) {
      return numero.replace(padrao, "($1) $2-$3");
    }

    return numero;
  };

  const handleTelefoneChange = (event) => {
    const valor = event.target.value;
    const telefoneFormatado = formatarTelefone(valor);
    setNovoPaciente({
      ...novoPaciente,
      [event.target.name]: telefoneFormatado,
    });
  };

  const formatarCPF = (valor) => {
    const numero = valor.replace(/\D/g, "");
    const padrao = /(\d{3})(\d{3})(\d{3})(\d{2})/;

    if (padrao.test(numero)) {
      return numero.replace(padrao, "$1.$2.$3-$4");
    }

    return numero;
  };

  const handleCpfChange = (event) => {
    const valor = event.target.value;
    const cpfFormatado = formatarCPF(valor);
    setNovoPaciente({
      ...novoPaciente,
      [event.target.name]: cpfFormatado,
    });
    console.log(cpfFormatado);
  };

  const handleChange = (event) => {
    setNovoPaciente({
      ...novoPaciente,
      [event.target.name]: event.target.value,
    });
  };

  const handleBuscaCep = async (event) => {
    event.preventDefault();
    const endereco = await buscaCep(novoPaciente.cep);
    if (!("erro" in endereco)) {
      // const { logradouro, bairro, localidade, uf } = endereco;
      setNovoPaciente({
        ...novoPaciente,
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        localidade: endereco.localidade,
        uf: endereco.uf,
      });
      // setCepValido(true)
      console.log(novoPaciente);
      return;
    }
    // setNovoPaciente({
    //   ...novoPaciente,
    //   [logradouro]: '',
    //   [bairro]: '',
    //   [localidade]: '',
    //   [uf]: '',
    // });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(novoPaciente);
  };

  const handleEditarUsuario = () => {
    //edita um usuário
  };

  const handleApagarUsuario = () => {
    //apaga um usuário
  };

  return (
    <>
      <button onClick={handleEditarUsuario}>Editar</button>
      <button onClick={handleApagarUsuario}>Apagar</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome completo:</label>
        <input
          required
          autoFocus
          type="text"
          name="nome"
          id="nome"
          onChange={handleChange}
          value={novoPaciente.nome}
          minLength={8}
          maxLength={64}
        />
        <br />
        <label htmlFor="genero">Gênero:</label>
        <select
          required
          name="genero"
          id="genero"
          value={novoPaciente.genero}
          onChange={handleChange}
        >
          <option value="selecione">Selecione</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
        <br />
        <label htmlFor="data-nascimento">Data de nascimento:</label>
        <input
          required
          type="date"
          name="dataDeNascimento"
          id="dataDeNascimento"
          value={novoPaciente.dataDeNascimento}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="cpf">CPF:</label>
        <input
          required
          type="text"
          minLength={11}
          maxLength={11}
          placeholder="000.000.000-00"
          name="cpf"
          id="cpf"
          value={novoPaciente.cpf}
          onChange={handleCpfChange}
        />
        <br />
        <label htmlFor="rg">RG:</label>
        <input
          required
          type="text"
          name="rg"
          id="rg"
          maxLength={20}
          value={novoPaciente.rg}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="estadoCivil">Estado civil:</label>
        <select
          required
          name="estadoCivil"
          id="estadoCivil"
          value={novoPaciente.estadoCivil}
          onChange={handleChange}
        >
          <option value="selecione">Selecione</option>
          <option value="solteiro">Solteiro</option>
          <option value="casado">Casado</option>
          <option value="divorciado">Divorciado</option>
          <option value="separado">Separado</option>
          <option value="viuvo">Viúvo</option>
        </select>
        <br />
        <label htmlFor="telefone">Telefone:</label>
        <input
          required
          type="text"
          id="telefone"
          name="telefone"
          minLength={14}
          maxLength={15}
          value={novoPaciente.telefone}
          onChange={handleTelefoneChange}
          placeholder="(xx) xxxxx-xxxx"
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={novoPaciente.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="naturalidade">Naturalidade</label>
        <input
          required
          type="text"
          minLength={8}
          maxLength={64}
          name="naturalidade"
          id="naturalidade"
          value={novoPaciente.naturalidade}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="contatoDeEmergencia">Contato de emergência</label>
        <input
          required
          type="text"
          minLength={14}
          maxLength={15}
          name="contatoDeEmergencia"
          id="contatoDeEmergencia"
          value={novoPaciente.contatoDeEmergencia}
          onChange={handleTelefoneChange}
          placeholder="(xx) xxxxx-xxxx"
        />
        <br />
        <label htmlFor="alergias">Alergias</label>
        <input
          type="text"
          name="alergias"
          id="alergias"
          value={novoPaciente.alergias}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="cuidadosEspecificos">Cuidados específicos</label>
        <input
          type="text"
          name="cuidadosEspecificos"
          id="cuidadosEspecificos"
          value={novoPaciente.cuidadosEspecificos}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="convenio">Convênio</label>
        <input
          type="text"
          name="convenio"
          id="convenio"
          value={novoPaciente.convenio}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="numeroDoConvenio">Número do convênio</label>
        <input
          type="number"
          name="numeroDoConvenio"
          id="numeroDoConvenio"
          value={novoPaciente.numeroDoConvenio}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="validadeDoConvenio">Validade do convênio</label>
        <input
          type="date"
          name="validadeDoConvenio"
          id="validadeDoConvenio"
          value={novoPaciente.validadeDoConvenio}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="cep">Cep</label>
        <input
          type="text"
          name="cep"
          id="cep"
          value={novoPaciente.cep}
          onChange={handleChange}
          maxLength={8}
        />
        {/* {!cepValido && <span>Insira um cep válido</span>} */}
        <button onClick={handleBuscaCep}>Buscar cep</button>
        <br />
        <label htmlFor="logradouro">Rua</label>
        <input
        disabled
          type="text"
          id="logradouro"
          name="logradouro"
          value={novoPaciente.logradouro}
        />
        <br />
        <label htmlFor="bairro">Bairro</label>
        <input
        disabled
          type="text"
          id="bairro"
          name="bairro"
          value={novoPaciente.bairro}
        />
        <br />
        <label htmlFor="localidade">Cidade</label>
         <input
         disabled
          type="text"
          id="localidade"
          name="localidade"
          value={novoPaciente.localidade}
        />
        <br />
        <label htmlFor="uf">Estado</label>
         <input
         disabled
          type="text"
          id="uf"
          name="uf"
          value={novoPaciente.uf}
        />
        <br />
        <label htmlFor="numero">Número</label>
        <input
          type="text"
          id="numero"
          name="numero"
          value={novoPaciente.numero}
        />
      <br />
      <label htmlFor="complemento">Complemento</label>
      <input
          type="text"
          id="complemento"
          name="complemento"
          value={novoPaciente.complemento}
        />
      <br />
      </form>
      <button type="submit">Enviar</button>
    </>
  );
}
