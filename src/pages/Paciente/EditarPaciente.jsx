import { buscaCep } from "../../service/Cep";
import { verificaCpf } from "../../service/web";
import { PagesContext } from "../../context/PagesContext";
import { formatarCPF, formatarTelefone } from "../../service/Cadastro";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";
import { PacienteContext } from "../../context/PacienteContext";
import { GetAllExamesOuConsultas } from "../../service/web";
import { Put } from "../../service/web";
import { Delete } from "../../service/web";

export default function EditarPaciente() {
  const { PageSetCurrentPage } = useContext(PagesContext);
  const { PacienteSelecionado, SetPaciente } = useContext(PacienteContext);
  const navegue = useNavigate();
  const [editar, setEditar] = useState(false);
  const navigate = useLocation();
  const pathName = navigate.pathname;
  const [errorCep, setErrorCep] = useState(false);

  useEffect(() => {
    PageSetCurrentPage(pathName);
    console.log(pathName);
  }, []);

  const handleChange = (event) => {
    SetPaciente({
      ...PacienteSelecionado,
      [event.target.name]: event.target.value,
    });
  };

  const handleTelefoneChange = (event) => {
    const valor = event.target.value;
    const telefoneFormatado = formatarTelefone(valor);
    SetPaciente({
      ...PacienteSelecionado,
      [event.target.name]: telefoneFormatado,
    });
  };

  const handleBuscaCep = async (event) => {
    event.preventDefault();
    const endereco = await buscaCep(setPacienteSelecionado.cep);
    if (!("erro" in endereco)) {
      SetPaciente({
        ...PacienteSelecionado,
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        localidade: endereco.localidade,
        uf: endereco.uf,
      });
      setErrorCep(false);
      return;
    }
    setErrorCep(true);
    SetPaciente({
      ...PacienteSelecionado,
      cep: "",
      logradouro: "",
      bairro: "",
      localidade: "",
      uf: "",
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await Put(`pacientes/${PacienteSelecionado.id}`, PacienteSelecionado).then(
      () => {
        setEditar(false);
      }
    );
  };

  const handleEditarUsuario = () => {
    setEditar(true);
  };

  const handleApagarUsuario = async () => {
    console.log("Deletar usuario");
      const quantidadeDeExames = await GetAllExamesOuConsultas(
        "exames",
        PacienteSelecionado.id
      ).then((response) => response.length);
      const quantidadeDeConsultas = await GetAllExamesOuConsultas(
        "consultas",
        PacienteSelecionado.id
      ).then((response) => response.length);
    if (quantidadeDeConsultas === 0 || quantidadeDeExames === 0) {
      await Delete(`pacientes/${PacienteSelecionado.id}`).then(() =>
        navegue("/")
      );
    } else {
      alert(
        "Não foi possível excluir cadastro pois ainda constam exames ou consultas cadastradas."
      );
      console.log(quantidadeDeConsultas);
      console.log(quantidadeDeExames);
    }
  };
  return (
    <>
      <button onClick={handleEditarUsuario} disabled={editar ? true : false}>
        Editar
      </button>
      <button onClick={handleApagarUsuario}>Excluir</button>

      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome completo:</label>
        <input
          disabled
          required
          autoFocus
          type="text"
          name="nome"
          id="nome"
          onChange={handleChange}
          value={PacienteSelecionado.nome}
          minLength={8}
          maxLength={64}
        />
        <br />

        <label htmlFor="genero">Gênero:</label>
        <select
          disabled={editar ? false : true}
          required
          name="genero"
          id="genero"
          value={PacienteSelecionado.genero}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
        <br />
        <label htmlFor="data-nascimento">Data de nascimento:</label>
        <input
          disabled
          required
          type="date"
          name="dataDeNascimento"
          id="dataDeNascimento"
          value={PacienteSelecionado.dataDeNascimento}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="cpf">CPF:</label>
        <input
          disabled
          required
          type="text"
          minLength={11}
          maxLength={11}
          placeholder="000.000.000-00"
          name="cpf"
          id="cpf"
          value={PacienteSelecionado.cpf}
        />
        <br />

        <label htmlFor="rg">RG com órgão expeditor:</label>
        <input
          disabled
          required
          type="text"
          name="rg"
          id="rg"
          maxLength={7}
          value={PacienteSelecionado.rg}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="estadoCivil">Estado civil:</label>
        <select
          disabled={editar ? false : true}
          required
          name="estadoCivil"
          id="estadoCivil"
          value={PacienteSelecionado.estadoCivil}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          <option value="solteiro">Solteiro</option>
          <option value="casado">Casado</option>
          <option value="divorciado">Divorciado</option>
          <option value="separado">Separado</option>
          <option value="viuvo">Viúvo</option>
        </select>
        <br />

        <label htmlFor="telefone">Telefone:</label>
        <input
          disabled={editar ? false : true}
          required
          type="text"
          id="telefone"
          name="telefone"
          minLength={14}
          maxLength={15}
          value={PacienteSelecionado.telefone}
          onChange={handleTelefoneChange}
          placeholder="(xx) xxxxx-xxxx"
        />
        <br />

        <label htmlFor="email">Email</label>
        <input
          disabled={editar ? false : true}
          type="email"
          name="email"
          id="email"
          value={PacienteSelecionado.email}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="naturalidade">Naturalidade</label>
        <input
          disabled
          required
          type="text"
          minLength={8}
          maxLength={64}
          name="naturalidade"
          id="naturalidade"
          value={PacienteSelecionado.naturalidade}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="contatoDeEmergencia">Contato de emergência</label>
        <input
          disabled={editar ? false : true}
          required
          type="text"
          minLength={14}
          maxLength={15}
          name="contatoDeEmergencia"
          id="contatoDeEmergencia"
          value={PacienteSelecionado.contatoDeEmergencia}
          onChange={handleTelefoneChange}
          placeholder="(xx) xxxxx-xxxx"
        />
        <br />

        <label htmlFor="alergias">Alergias</label>
        <input
          disabled={editar ? false : true}
          type="text"
          name="alergias"
          id="alergias"
          value={PacienteSelecionado.alergias}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="cuidadosEspecificos">Cuidados específicos</label>
        <input
          disabled={editar ? false : true}
          type="text"
          name="cuidadosEspecificos"
          id="cuidadosEspecificos"
          value={PacienteSelecionado.cuidadosEspecificos}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="convenio">Convênio</label>
        <input
          disabled={editar ? false : true}
          type="text"
          name="convenio"
          id="convenio"
          value={PacienteSelecionado.convenio}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="numeroDoConvenio">Número do convênio</label>
        <input
          disabled={editar ? false : true}
          type="number"
          name="numeroDoConvenio"
          id="numeroDoConvenio"
          value={PacienteSelecionado.numeroDoConvenio}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="validadeDoConvenio">Validade do convênio</label>
        <input
          disabled={editar ? false : true}
          type="date"
          name="validadeDoConvenio"
          id="validadeDoConvenio"
          value={PacienteSelecionado.validadeDoConvenio}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="cep">Cep</label>
        <input
          disabled={editar ? false : true}
          required
          type="text"
          name="cep"
          id="cep"
          value={PacienteSelecionado.cep}
          onChange={handleChange}
          maxLength={8}
        />
        <button disabled={editar ? false : true} onClick={handleBuscaCep}>
          Buscar cep
        </button>
        <br />
        <label htmlFor="logradouro">Rua</label>
        <input
          disabled
          type="text"
          id="logradouro"
          name="logradouro"
          value={PacienteSelecionado.logradouro}
        />
        <br />

        <label htmlFor="bairro">Bairro</label>
        <input
          disabled
          type="text"
          id="bairro"
          name="bairro"
          value={PacienteSelecionado.bairro}
        />
        <br />

        <label htmlFor="localidade">Cidade</label>
        <input
          disabled
          type="text"
          id="localidade"
          name="localidade"
          value={PacienteSelecionado.localidade}
        />
        <br />

        <label htmlFor="uf">Estado</label>
        <input
          disabled
          type="text"
          id="uf"
          name="uf"
          value={PacienteSelecionado.uf}
        />
        <br />

        <label htmlFor="numero">Número</label>
        <input
          disabled={editar ? false : true}
          required
          type="text"
          id="numero"
          name="numero"
          value={PacienteSelecionado.numero}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="complemento">Complemento</label>
        <input
          disabled={editar ? false : true}
          type="text"
          id="complemento"
          name="complemento"
          value={PacienteSelecionado.complemento}
          onChange={handleChange}
        />
        <label htmlFor="pontoDeReferencia">Ponto de referência</label>
        <input
          disabled={editar ? false : true}
          type="text"
          id="pontoDeReferencia"
          name="pontoDeReferencia"
          value={PacienteSelecionado.pontoDeReferencia}
          onChange={handleChange}
        />
        <br />

        <button type="submit" disabled={editar ? false : true}>
          Salvar
        </button>
      </form>
    </>
  );
}
